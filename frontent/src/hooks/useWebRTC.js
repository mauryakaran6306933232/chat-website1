
// import { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import API_URL from '../utils/apiUrl';
// export const useWebRTC = () => {
//   const { socket } = useSelector((store) => store.socket);
//   const { authUser } = useSelector((store) => store.user);
//   const peerConnection = useRef(null);
//   const localStream = useRef(null);
//   const remoteStreamRef = useRef(new MediaStream());
//   const currentTargetRef = useRef(null);
//   const incomingSignalRef = useRef(null);
//   const iceCandidatesQueue = useRef([]);
  
//   // REFS FOR CALL RECORDS
//   const callStartTime = useRef(null);
//   const wasConnected = useRef(false);
  
//   // REFS FOR RINGING TIMEOUT
//   const ringTimeoutRef = useRef(null);

//   // ■ NEW: AUDIO REFS FOR RINGTONES
//   const ringbackToneRef = useRef(null);
//   const incomingRingtoneRef = useRef(null);

//   const [localStreamState, setLocalStreamState] = useState(null);
//   const [remoteStreamState, setRemoteStreamState] = useState(null);

//   const [callState, setCallState] = useState({
//     isCallActive: false,
//     isIncomingCall: false,
//     callType: null,
//     callerId: null,
//   });

//   const iceServers = {
//     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//   };

//   // ==========================================
//   // ■ NEW: AUDIO HELPER FUNCTIONS
//   // ==========================================
//   const playRingback = () => {
//     try {
//       if (!ringbackToneRef.current) {
//         ringbackToneRef.current = new Audio('/ringback.mp3'); // Make sure this file is in /public
//         ringbackToneRef.current.loop = true;
//       }
//       ringbackToneRef.current.play().catch(e => console.log("Ringback blocked by browser:", e));
//     } catch (e) { console.error(e); }
//   };

//   const stopRingback = () => {
//     if (ringbackToneRef.current) {
//       ringbackToneRef.current.pause();
//       ringbackToneRef.current.currentTime = 0;
//     }
//   };

//   const playIncoming = () => {
//     try {
//       if (!incomingRingtoneRef.current) {
//         incomingRingtoneRef.current = new Audio('/incoming.mp3'); // Make sure this file is in /public
//         incomingRingtoneRef.current.loop = true;
//       }
//       incomingRingtoneRef.current.play().catch(e => console.log("Incoming ringtone blocked by browser:", e));
//     } catch (e) { console.error(e); }
//   };

//   const stopIncoming = () => {
//     if (incomingRingtoneRef.current) {
//       incomingRingtoneRef.current.pause();
//       incomingRingtoneRef.current.currentTime = 0;
//     }
//   };
//   // ==========================================

//   const processQueue = () => {
//     if (peerConnection.current && peerConnection.current.remoteDescription) {
//       iceCandidatesQueue.current.forEach((candidate) => {
//         peerConnection.current.addIceCandidate(candidate).catch(e => console.error("ICE Error", e));
//       });
//       iceCandidatesQueue.current = [];
//     }
//   };

//   const createPeerConnection = () => {
//     peerConnection.current = new RTCPeerConnection(iceServers);
//     peerConnection.current.ontrack = (event) => {
//       event.streams[0].getTracks().forEach((track) => {
//         remoteStreamRef.current.addTrack(track);
//       });
//       setRemoteStreamState(new MediaStream(remoteStreamRef.current.getTracks()));
//     };
//     peerConnection.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         const targetId = callState.callerId || currentTargetRef.current;
//         socket.emit("ice_candidate", { to: targetId, candidate: event.candidate });
//       }
//     };
//     peerConnection.current.onconnectionstatechange = () => {
//       if (peerConnection.current?.connectionState === "connected") {
//         wasConnected.current = true;
//         callStartTime.current = Date.now();
//       }

//       if (
//         peerConnection.current?.connectionState === "disconnected" ||
//         peerConnection.current?.connectionState === "failed"
//       ) {
//         cleanupCall();
//       }
//     };
//   };

//   const initiateCall = async (targetUserId, callType) => {
//     try {
//       currentTargetRef.current = targetUserId;
//       iceCandidatesQueue.current = [];
//       callStartTime.current = null;
//       wasConnected.current = false;
      
//       setCallState({ isCallActive: true, isIncomingCall: false, callType, callerId: null });
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: callType === "video",
//         audio: true,
//       });
//       localStream.current = stream;
//       setLocalStreamState(stream);
//       createPeerConnection();
//       stream.getTracks().forEach((track) => {
//         peerConnection.current.addTrack(track, stream);
//       });
//       const offer = await peerConnection.current.createOffer();
//       await peerConnection.current.setLocalDescription(offer);
//       socket.emit("call_user", {
//         userToCall: targetUserId,
//         from: authUser?._id,
//         signal: offer,
//         callType,
//       });

//       // ■ PLAY RINGBACK TONE (What the CALLER hears)
//       playRingback();

//       // 1 MINUTE RINGING TIMEOUT
//       if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
//       ringTimeoutRef.current = setTimeout(() => {
//         console.log("Call timed out after 1 minute of ringing");
//         socket.emit("end_call", { to: targetUserId });
//         saveCallToDB({
//           senderId: authUser._id,
//           receiverId: targetUserId,
//           callType: callType,
//           callStatus: "missed",
//           callDuration: 0
//         });
//         cleanupCall();
//       }, 60000);

//     } catch (error) {
//       console.error("Error getting media:", error);
//       alert("Could not access camera/microphone.");
//       cleanupCall();
//     }
//   };

//   const answerCall = async () => {
//     try {
//       if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
      
//       // ■ STOP INCOMING RINGTONE (Because the RECEIVER clicked Accept)
//       stopIncoming();

//       iceCandidatesQueue.current = [];
//       callStartTime.current = null;
//       wasConnected.current = false;

//       const currentCallType = callState.callType;
//       const currentCallerId = callState.callerId;
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: currentCallType === "video",
//         audio: true,
//       });
//       localStream.current = stream;
//       setLocalStreamState(stream);
//       createPeerConnection();
//       stream.getTracks().forEach((track) => {
//         peerConnection.current.addTrack(track, stream);
//       });
//       await peerConnection.current.setRemoteDescription(
//         new RTCSessionDescription(incomingSignalRef.current)
//       );
//       processQueue();
//       const answer = await peerConnection.current.createAnswer();
//       await peerConnection.current.setLocalDescription(answer);
//       socket.emit("answer_call", {
//         to: currentCallerId,
//         signal: answer,
//       });
//       setCallState((prev) => ({ ...prev, isIncomingCall: false, isCallActive: true }));
//     } catch (error) {
//       console.error("Error answering call:", error);
//       rejectCall();
//     }
//   };

//   const rejectCall = () => {
//     socket.emit("reject_call", { to: callState.callerId });
    
//     // ■ STOP INCOMING RINGTONE (Because the RECEIVER clicked Reject)
//     stopIncoming();

//     saveCallToDB({
//       senderId: callState.callerId,       
//       receiverId: authUser._id,           
//       callType: callState.callType,
//       callStatus: "missed",
//       callDuration: 0
//     });
//     cleanupCall();
//   };

//   const endCall = () => {
//     if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
    
//     // ■ STOP RINGBACK (In case caller hangs up before answer)
//     stopRingback();

//     const targetId = callState.callerId || currentTargetRef.current;
//     if (targetId) socket.emit("end_call", { to: targetId });

//     let duration = 0;
//     let status = "missed";
//     if (wasConnected.current && callStartTime.current) {
//       duration = Math.floor((Date.now() - callStartTime.current) / 1000);
//       status = "completed";
//     }
    
//     const isCaller = !callState.callerId; 
    
//     saveCallToDB({
//       senderId: isCaller ? authUser._id : callState.callerId, 
//       receiverId: isCaller ? currentTargetRef.current : authUser._id, 
//       callType: callState.callType,
//       callStatus: status,
//       callDuration: duration
//     });
    
//     cleanupCall();
//   };

//   const saveCallToDB = async (payload) => {
//     try {
//       await axios.post(`${API_URL}/test/save-call`, payload, { withCredentials: true });
//     } catch (err) {
//       console.error("Failed to save call record", err);
//     }
//   };

//   const cleanupCall = () => {
//     if (ringTimeoutRef.current) {
//       clearTimeout(ringTimeoutRef.current);
//       ringTimeoutRef.current = null;
//     }

//     // ■ STOP ALL SOUNDS ON CLEANUP (Safety net)
//     stopRingback();
//     stopIncoming();

//     if (localStream.current) {
//       localStream.current.getTracks().forEach((track) => track.stop());
//       localStream.current = null;
//     }
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       peerConnection.current = null;
//     }
//     remoteStreamRef.current = new MediaStream();
//     incomingSignalRef.current = null;
//     currentTargetRef.current = null;
//     iceCandidatesQueue.current = [];
//     callStartTime.current = null;
//     wasConnected.current = false;

//     setLocalStreamState(null);
//     setRemoteStreamState(null);
//     setCallState({ isCallActive: false, isIncomingCall: false, callType: null, callerId: null });
//   };

//   useEffect(() => {
//     if (!socket) return;
//     socket.on("incoming_call", ({ from, signal, callType }) => {
//       incomingSignalRef.current = signal;
//       setCallState({ isCallActive: false, isIncomingCall: true, callType, callerId: from });
      
//       // ■ PLAY INCOMING RINGTONE (What the RECEIVER hears)
//       playIncoming();
//     });

//     socket.on("call_accepted", async ({ signal }) => {
//       if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
      
//       // ■ STOP RINGBACK TONE (Because the CALLER sees the call connected)
//       stopRingback();

//       await peerConnection.current?.setRemoteDescription(
//         new RTCSessionDescription(signal)
//       );
//       processQueue();
//       setCallState((prev) => ({ ...prev, isCallActive: true }));
//     });

//     socket.on("ice_candidate", ({ candidate }) => {
//       iceCandidatesQueue.current.push(candidate);
//       processQueue();
//     });
    
//     socket.on("call_ended", () => {
//       cleanupCall();
//     });
    
//     socket.on("call_rejected", () => {
//       cleanupCall();
//     });

//     return () => {
//       socket.off("incoming_call");
//       socket.off("call_accepted");
//       socket.off("ice_candidate");
//       socket.off("call_ended");
//       socket.off("call_rejected");
//     };
//   }, [socket]);

//   const toggleMic = () => {
//     if (localStream.current) {
//       localStream.current.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
//       return !localStream.current.getAudioTracks()[0]?.enabled;
//     }
//   };
//   const toggleCamera = () => {
//     if (localStream.current) {
//       localStream.current.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
//       return !localStream.current.getVideoTracks()[0]?.enabled;
//     }
//   };

//   return {
//     callState,
//     localStream: localStreamState,
//     remoteStream: remoteStreamState,
//     initiateCall,
//     answerCall,
//     rejectCall,
//     endCall,
//     toggleMic,
//     toggleCamera,
//   };
// };
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
  const currentCallerIdRef = useRef(null);
  const currentCallTypeRef = useRef(null);

  // REFS FOR CALL RECORDS
  const callStartTime = useRef(null);
  const wasConnected = useRef(false);

  // REFS FOR RINGING TIMEOUT
  const ringTimeoutRef = useRef(null);
  const disconnectTimeoutRef = useRef(null);

  // AUDIO REFS FOR RINGTONES
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

  // ==========================================
  // ICE SERVERS WITH TURN (CRITICAL FOR PRODUCTION)
  // ==========================================
  const iceServers = {
    iceServers: [
      // Multiple STUN servers for reliability
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun3.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:19302" },
      // TURN servers (REQUIRED for NAT traversal in production)
      // Free TURN from Metered Open Relay Project
      {
        urls: "turn:openrelay.metered.ca:80",
        username: "openrelayproject",
        credential: "openrelayproject",
      },
      {
        urls: "turn:openrelay.metered.ca:443",
        username: "openrelayproject",
        credential: "openrelayproject",
      },
      {
        urls: "turn:openrelay.metered.ca:443?transport=tcp",
        username: "openrelayproject",
        credential: "openrelayproject",
      },
    ],
  };

  // ==========================================
  // AUDIO HELPER FUNCTIONS
  // ==========================================
  const playRingback = () => {
    try {
      if (!ringbackToneRef.current) {
        ringbackToneRef.current = new Audio('/ringback.mp3');
        ringbackToneRef.current.loop = true;
      }
      ringbackToneRef.current.play().catch(() => {});
    } catch (e) {
      // Ringtone file might not exist, that's OK
    }
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
        incomingRingtoneRef.current = new Audio('/incoming.mp3');
        incomingRingtoneRef.current.loop = true;
      }
      incomingRingtoneRef.current.play().catch(() => {});
    } catch (e) {
      // Ringtone file might not exist, that's OK
    }
  };

  const stopIncoming = () => {
    if (incomingRingtoneRef.current) {
      incomingRingtoneRef.current.pause();
      incomingRingtoneRef.current.currentTime = 0;
    }
  };

  // ==========================================
  // ICE CANDIDATE QUEUE PROCESSING
  // ==========================================
  const processQueue = () => {
    if (peerConnection.current && peerConnection.current.remoteDescription) {
      while (iceCandidatesQueue.current.length > 0) {
        const candidate = iceCandidatesQueue.current.shift();
        peerConnection.current
          .addIceCandidate(new RTCIceCandidate(candidate))
          .catch((e) => console.error("ICE Candidate Error:", e));
      }
    }
  };

  // ==========================================
  // CREATE PEER CONNECTION
  // ==========================================
  const createPeerConnection = () => {
    // Close any existing connection first
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    peerConnection.current = new RTCPeerConnection(iceServers);

    // Handle remote tracks
    peerConnection.current.ontrack = (event) => {
      console.log("■ ontrack fired:", event.track.kind);
      // Create a fresh MediaStream with all remote tracks
      const newRemoteStream = new MediaStream();
      event.streams[0].getTracks().forEach((track) => {
        newRemoteStream.addTrack(track);
      });
      remoteStreamRef.current = newRemoteStream;
      setRemoteStreamState(new MediaStream(newRemoteStream.getTracks()));
    };

    // Handle ICE candidates
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        const targetId = currentCallerIdRef.current || currentTargetRef.current;
        if (targetId && socket) {
          socket.emit("ice_candidate", { to: targetId, candidate: event.candidate });
        }
      }
    };

    // Handle connection state changes (WITH TIMEOUT - NOT IMMEDIATE CLEANUP)
    peerConnection.current.onconnectionstatechange = () => {
      const state = peerConnection.current?.connectionState;
      console.log("■ Connection state:", state);

      if (state === "connected") {
        // Clear any disconnect timeout since we reconnected
        if (disconnectTimeoutRef.current) {
          clearTimeout(disconnectTimeoutRef.current);
          disconnectTimeoutRef.current = null;
        }
        wasConnected.current = true;
        callStartTime.current = Date.now();
      }

      if (state === "disconnected") {
        // DON'T immediately clean up! Give it 10 seconds to reconnect
        console.log("■ Disconnected - waiting 10s before cleanup...");
        disconnectTimeoutRef.current = setTimeout(() => {
          console.log("■ Still disconnected after 10s - cleaning up");
          cleanupCall();
        }, 10000);
      }

      if (state === "failed") {
        console.log("■ Connection failed - cleaning up");
        cleanupCall();
      }
    };

    // Log ICE connection state for debugging
    peerConnection.current.oniceconnectionstatechange = () => {
      console.log("■ ICE Connection State:", peerConnection.current?.iceConnectionState);
    };
  };

  // ==========================================
  // INITIATE CALL (CALLER)
  // ==========================================
  const initiateCall = async (targetUserId, callType) => {
    try {
      currentTargetRef.current = targetUserId;
      currentCallerIdRef.current = null;
      currentCallTypeRef.current = callType;
      iceCandidatesQueue.current = [];
      callStartTime.current = null;
      wasConnected.current = false;

      setCallState({
        isCallActive: true,
        isIncomingCall: false,
        callType,
        callerId: null,
      });

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

      // PLAY RINGBACK TONE
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
          callDuration: 0,
        });
        cleanupCall();
      }, 60000);
    } catch (error) {
      console.error("Error getting media:", error);
      alert("Could not access camera/microphone. Please allow permissions and try again.");
      cleanupCall();
    }
  };

  // ==========================================
  // ANSWER CALL (RECEIVER)
  // ==========================================
  const answerCall = async () => {
    try {
      if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);

      // STOP INCOMING RINGTONE
      stopIncoming();

      iceCandidatesQueue.current = [];
      callStartTime.current = null;
      wasConnected.current = false;

      const currentCallType = currentCallTypeRef.current || callState.callType;
      const currentCallerId = currentCallerIdRef.current || callState.callerId;

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

      // Set remote description (the offer from the caller)
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(incomingSignalRef.current)
      );

      // Process any queued ICE candidates
      processQueue();

      // Create and set local description (the answer)
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      // Update the caller ID ref for ICE candidate routing
      currentCallerIdRef.current = currentCallerId;

      socket.emit("answer_call", {
        to: currentCallerId,
        signal: answer,
      });

      setCallState((prev) => ({
        ...prev,
        isIncomingCall: false,
        isCallActive: true,
      }));
    } catch (error) {
      console.error("Error answering call:", error);
      rejectCall();
    }
  };

  // ==========================================
  // REJECT CALL (RECEIVER)
  // ==========================================
  const rejectCall = () => {
    const callerId = currentCallerIdRef.current || callState.callerId;
    if (callerId && socket) {
      socket.emit("reject_call", { to: callerId });
    }

    // STOP INCOMING RINGTONE
    stopIncoming();

    saveCallToDB({
      senderId: callerId,
      receiverId: authUser._id,
      callType: currentCallTypeRef.current || callState.callType,
      callStatus: "missed",
      callDuration: 0,
    });

    cleanupCall();
  };

  // ==========================================
  // END CALL (EITHER USER)
  // ==========================================
  const endCall = () => {
    if (ringTimeoutRef.current) {
      clearTimeout(ringTimeoutRef.current);
      ringTimeoutRef.current = null;
    }

    // STOP RINGBACK (In case caller hangs up before answer)
    stopRingback();

    const targetId = currentCallerIdRef.current || currentTargetRef.current;
    if (targetId && socket) {
      socket.emit("end_call", { to: targetId });
    }

    let duration = 0;
    let status = "missed";

    if (wasConnected.current && callStartTime.current) {
      duration = Math.floor((Date.now() - callStartTime.current) / 1000);
      status = "completed";
    }

    const isCaller = !callState.callerId && !currentCallerIdRef.current;

    saveCallToDB({
      senderId: isCaller ? authUser._id : (currentCallerIdRef.current || callState.callerId),
      receiverId: isCaller ? currentTargetRef.current : authUser._id,
      callType: currentCallTypeRef.current || callState.callType,
      callStatus: status,
      callDuration: duration,
    });

    cleanupCall();
  };

  // ==========================================
  // SAVE CALL TO DATABASE
  // ==========================================
  const saveCallToDB = async (payload) => {
    try {
      await axios.post(`${API_URL}/test/save-call`, payload, {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Failed to save call record", err);
    }
  };

  // ==========================================
  // CLEANUP CALL
  // ==========================================
  const cleanupCall = () => {
    if (ringTimeoutRef.current) {
      clearTimeout(ringTimeoutRef.current);
      ringTimeoutRef.current = null;
    }

    if (disconnectTimeoutRef.current) {
      clearTimeout(disconnectTimeoutRef.current);
      disconnectTimeoutRef.current = null;
    }

    // STOP ALL SOUNDS
    stopRingback();
    stopIncoming();

    // Stop local media tracks
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
    }

    // Close peer connection
    if (peerConnection.current) {
      peerConnection.current.ontrack = null;
      peerConnection.current.onicecandidate = null;
      peerConnection.current.onconnectionstatechange = null;
      peerConnection.current.oniceconnectionstatechange = null;
      peerConnection.current.close();
      peerConnection.current = null;
    }

    // Reset all refs
    remoteStreamRef.current = new MediaStream();
    incomingSignalRef.current = null;
    currentTargetRef.current = null;
    currentCallerIdRef.current = null;
    currentCallTypeRef.current = null;
    iceCandidatesQueue.current = [];
    callStartTime.current = null;
    wasConnected.current = false;

    // Reset all state
    setLocalStreamState(null);
    setRemoteStreamState(null);
    setCallState({
      isCallActive: false,
      isIncomingCall: false,
      callType: null,
      callerId: null,
    });
  };

  // ==========================================
  // SOCKET EVENT LISTENERS
  // ==========================================
  useEffect(() => {
    if (!socket) return;

    const handleIncomingCall = ({ from, signal, callType }) => {
      console.log("■ Incoming call from:", from, "type:", callType);
      incomingSignalRef.current = signal;
      currentCallerIdRef.current = from;
      currentCallTypeRef.current = callType;

      setCallState({
        isCallActive: false,
        isIncomingCall: true,
        callType,
        callerId: from,
      });

      // PLAY INCOMING RINGTONE
      playIncoming();
    };

    const handleCallAccepted = async ({ signal }) => {
      console.log("■ Call accepted");

      if (ringTimeoutRef.current) {
        clearTimeout(ringTimeoutRef.current);
        ringTimeoutRef.current = null;
      }

      // STOP RINGBACK TONE
      stopRingback();

      if (peerConnection.current) {
        try {
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(signal)
          );
          processQueue();
        } catch (err) {
          console.error("Error setting remote description on call accepted:", err);
        }
      }

      setCallState((prev) => ({ ...prev, isCallActive: true }));
    };

    const handleIceCandidate = ({ candidate }) => {
      console.log("■ ICE candidate received");
      iceCandidatesQueue.current.push(candidate);
      processQueue();
    };

    const handleCallEnded = () => {
      console.log("■ Call ended by other user");
      cleanupCall();
    };

    const handleCallRejected = () => {
      console.log("■ Call rejected by other user");
      cleanupCall();
    };

    socket.on("incoming_call", handleIncomingCall);
    socket.on("call_accepted", handleCallAccepted);
    socket.on("ice_candidate", handleIceCandidate);
    socket.on("call_ended", handleCallEnded);
    socket.on("call_rejected", handleCallRejected);

    return () => {
      socket.off("incoming_call", handleIncomingCall);
      socket.off("call_accepted", handleCallAccepted);
      socket.off("ice_candidate", handleIceCandidate);
      socket.off("call_ended", handleCallEnded);
      socket.off("call_rejected", handleCallRejected);
    };
  }, [socket]);

  // ==========================================
  // CLEANUP ON UNMOUNT
  // ==========================================
  useEffect(() => {
    return () => {
      cleanupCall();
    };
  }, []);

  // ==========================================
  // TOGGLE FUNCTIONS
  // ==========================================
  const toggleMic = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
      return !localStream.current.getAudioTracks()[0]?.enabled;
    }
    return false;
  };

  const toggleCamera = () => {
    if (localStream.current) {
      localStream.current.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
      return !localStream.current.getVideoTracks()[0]?.enabled;
    }
    return false;
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