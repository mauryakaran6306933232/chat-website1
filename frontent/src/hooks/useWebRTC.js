
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import API_URL from '../utils/apiUrl';
export const useWebRTC = () => {
  const { socket } = useSelector((store) => store.socket);
  const { authUser } = useSelector((store) => store.user);
  const peerConnection = useRef(null);
  const localStream = useRef(null);
  const remoteStreamRef = useRef(new MediaStream());
  const currentTargetRef = useRef(null);
  const incomingSignalRef = useRef(null);
  const iceCandidatesQueue = useRef([]);
  
  // REFS FOR CALL RECORDS
  const callStartTime = useRef(null);
  const wasConnected = useRef(false);
  
  // REFS FOR RINGING TIMEOUT
  const ringTimeoutRef = useRef(null);

  // ■ NEW: AUDIO REFS FOR RINGTONES
  const ringbackToneRef = useRef(null);
  const incomingRingtoneRef = useRef(null);

  const [localStreamState, setLocalStreamState] = useState(null);
  const [remoteStreamState, setRemoteStreamState] = useState(null);

  const [callState, setCallState] = useState({
    isCallActive: false,
    isIncomingCall: false,
    callType: null,
    callerId: null,
  });

  const iceServers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  // ==========================================
  // ■ NEW: AUDIO HELPER FUNCTIONS
  // ==========================================
  const playRingback = () => {
    try {
      if (!ringbackToneRef.current) {
        ringbackToneRef.current = new Audio('/ringback.mp3'); // Make sure this file is in /public
        ringbackToneRef.current.loop = true;
      }
      ringbackToneRef.current.play().catch(e => console.log("Ringback blocked by browser:", e));
    } catch (e) { console.error(e); }
  };

  const stopRingback = () => {
    if (ringbackToneRef.current) {
      ringbackToneRef.current.pause();
      ringbackToneRef.current.currentTime = 0;
    }
  };

  const playIncoming = () => {
    try {
      if (!incomingRingtoneRef.current) {
        incomingRingtoneRef.current = new Audio('/incoming.mp3'); // Make sure this file is in /public
        incomingRingtoneRef.current.loop = true;
      }
      incomingRingtoneRef.current.play().catch(e => console.log("Incoming ringtone blocked by browser:", e));
    } catch (e) { console.error(e); }
  };

  const stopIncoming = () => {
    if (incomingRingtoneRef.current) {
      incomingRingtoneRef.current.pause();
      incomingRingtoneRef.current.currentTime = 0;
    }
  };
  // ==========================================

  const processQueue = () => {
    if (peerConnection.current && peerConnection.current.remoteDescription) {
      iceCandidatesQueue.current.forEach((candidate) => {
        peerConnection.current.addIceCandidate(candidate).catch(e => console.error("ICE Error", e));
      });
      iceCandidatesQueue.current = [];
    }
  };

  const createPeerConnection = () => {
    peerConnection.current = new RTCPeerConnection(iceServers);
    peerConnection.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStreamRef.current.addTrack(track);
      });
      setRemoteStreamState(new MediaStream(remoteStreamRef.current.getTracks()));
    };
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        const targetId = callState.callerId || currentTargetRef.current;
        socket.emit("ice_candidate", { to: targetId, candidate: event.candidate });
      }
    };
    peerConnection.current.onconnectionstatechange = () => {
      if (peerConnection.current?.connectionState === "connected") {
        wasConnected.current = true;
        callStartTime.current = Date.now();
      }

      if (
        peerConnection.current?.connectionState === "disconnected" ||
        peerConnection.current?.connectionState === "failed"
      ) {
        cleanupCall();
      }
    };
  };

  const initiateCall = async (targetUserId, callType) => {
    try {
      currentTargetRef.current = targetUserId;
      iceCandidatesQueue.current = [];
      callStartTime.current = null;
      wasConnected.current = false;
      
      setCallState({ isCallActive: true, isIncomingCall: false, callType, callerId: null });
      const stream = await navigator.mediaDevices.getUserMedia({
        video: callType === "video",
        audio: true,
      });
      localStream.current = stream;
      setLocalStreamState(stream);
      createPeerConnection();
      stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
      });
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.emit("call_user", {
        userToCall: targetUserId,
        from: authUser?._id,
        signal: offer,
        callType,
      });

      // ■ PLAY RINGBACK TONE (What the CALLER hears)
      playRingback();

      // 1 MINUTE RINGING TIMEOUT
      if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
      ringTimeoutRef.current = setTimeout(() => {
        console.log("Call timed out after 1 minute of ringing");
        socket.emit("end_call", { to: targetUserId });
        saveCallToDB({
          senderId: authUser._id,
          receiverId: targetUserId,
          callType: callType,
          callStatus: "missed",
          callDuration: 0
        });
        cleanupCall();
      }, 60000);

    } catch (error) {
      console.error("Error getting media:", error);
      alert("Could not access camera/microphone.");
      cleanupCall();
    }
  };

  const answerCall = async () => {
    try {
      if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
      
      // ■ STOP INCOMING RINGTONE (Because the RECEIVER clicked Accept)
      stopIncoming();

      iceCandidatesQueue.current = [];
      callStartTime.current = null;
      wasConnected.current = false;

      const currentCallType = callState.callType;
      const currentCallerId = callState.callerId;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: currentCallType === "video",
        audio: true,
      });
      localStream.current = stream;
      setLocalStreamState(stream);
      createPeerConnection();
      stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
      });
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(incomingSignalRef.current)
      );
      processQueue();
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("answer_call", {
        to: currentCallerId,
        signal: answer,
      });
      setCallState((prev) => ({ ...prev, isIncomingCall: false, isCallActive: true }));
    } catch (error) {
      console.error("Error answering call:", error);
      rejectCall();
    }
  };

  const rejectCall = () => {
    socket.emit("reject_call", { to: callState.callerId });
    
    // ■ STOP INCOMING RINGTONE (Because the RECEIVER clicked Reject)
    stopIncoming();

    saveCallToDB({
      senderId: callState.callerId,       
      receiverId: authUser._id,           
      callType: callState.callType,
      callStatus: "missed",
      callDuration: 0
    });
    cleanupCall();
  };

  const endCall = () => {
    if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
    
    // ■ STOP RINGBACK (In case caller hangs up before answer)
    stopRingback();

    const targetId = callState.callerId || currentTargetRef.current;
    if (targetId) socket.emit("end_call", { to: targetId });

    let duration = 0;
    let status = "missed";
    if (wasConnected.current && callStartTime.current) {
      duration = Math.floor((Date.now() - callStartTime.current) / 1000);
      status = "completed";
    }
    
    const isCaller = !callState.callerId; 
    
    saveCallToDB({
      senderId: isCaller ? authUser._id : callState.callerId, 
      receiverId: isCaller ? currentTargetRef.current : authUser._id, 
      callType: callState.callType,
      callStatus: status,
      callDuration: duration
    });
    
    cleanupCall();
  };

  const saveCallToDB = async (payload) => {
    try {
      await axios.post(`${API_URL}/test/save-call`, payload, { withCredentials: true });
    } catch (err) {
      console.error("Failed to save call record", err);
    }
  };

  const cleanupCall = () => {
    if (ringTimeoutRef.current) {
      clearTimeout(ringTimeoutRef.current);
      ringTimeoutRef.current = null;
    }

    // ■ STOP ALL SOUNDS ON CLEANUP (Safety net)
    stopRingback();
    stopIncoming();

    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
    }
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    remoteStreamRef.current = new MediaStream();
    incomingSignalRef.current = null;
    currentTargetRef.current = null;
    iceCandidatesQueue.current = [];
    callStartTime.current = null;
    wasConnected.current = false;

    setLocalStreamState(null);
    setRemoteStreamState(null);
    setCallState({ isCallActive: false, isIncomingCall: false, callType: null, callerId: null });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("incoming_call", ({ from, signal, callType }) => {
      incomingSignalRef.current = signal;
      setCallState({ isCallActive: false, isIncomingCall: true, callType, callerId: from });
      
      // ■ PLAY INCOMING RINGTONE (What the RECEIVER hears)
      playIncoming();
    });

    socket.on("call_accepted", async ({ signal }) => {
      if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
      
      // ■ STOP RINGBACK TONE (Because the CALLER sees the call connected)
      stopRingback();

      await peerConnection.current?.setRemoteDescription(
        new RTCSessionDescription(signal)
      );
      processQueue();
      setCallState((prev) => ({ ...prev, isCallActive: true }));
    });

    socket.on("ice_candidate", ({ candidate }) => {
      iceCandidatesQueue.current.push(candidate);
      processQueue();
    });
    
    socket.on("call_ended", () => {
      cleanupCall();
    });
    
    socket.on("call_rejected", () => {
      cleanupCall();
    });

    return () => {
      socket.off("incoming_call");
      socket.off("call_accepted");
      socket.off("ice_candidate");
      socket.off("call_ended");
      socket.off("call_rejected");
    };
  }, [socket]);

  const toggleMic = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
      return !localStream.current.getAudioTracks()[0]?.enabled;
    }
  };
  const toggleCamera = () => {
    if (localStream.current) {
      localStream.current.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
      return !localStream.current.getVideoTracks()[0]?.enabled;
    }
  };

  return {
    callState,
    localStream: localStreamState,
    remoteStream: remoteStreamState,
    initiateCall,
    answerCall,
    rejectCall,
    endCall,
    toggleMic,
    toggleCamera,
  };
};