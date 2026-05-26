
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
import API_URL from "../utils/apiUrl";

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

  // Track if we are in an active call (ref, not state, so socket handlers always see latest value)
  const isInActiveCallRef = useRef(false);

  const callStartTime = useRef(null);
  const wasConnected = useRef(false);

  const ringTimeoutRef = useRef(null);
  const disconnectTimeoutRef = useRef(null);
  const iceRestartCount = useRef(0);

  const ringbackToneRef = useRef(null);
  const incomingRingtoneRef = useRef(null);

  const [localStreamState, setLocalStreamState] = useState(null);
  const [remoteStreamState, setRemoteStreamState] = useState(null);
  const [callState, setCallState] = useState({
    isCallActive: false,
    isIncomingCall: false,
    callType: null,
    callerId: null,
    connectionStatus: "idle",
  });

  // ==========================================
  // ICE SERVERS - MULTIPLE TURN PROVIDERS
  // ==========================================
  const getIceServers = () => ({
    iceServers: [
      // Google STUN servers
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun3.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:19302" },

      // Twilio STUN
      { urls: "stun:global.stun.twilio.com:3478" },

      // =============================================
      // TURN SERVER 1: Open Relay Project (Metered)
      // =============================================
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

      // =============================================
      // TURN SERVER 2: Metered Relay (different endpoint)
      // =============================================
      {
        urls: "turn:a.relay.metered.ca:80",
        username: "openrelayproject",
        credential: "openrelayproject",
      },
      {
        urls: "turn:a.relay.metered.ca:443",
        username: "openrelayproject",
        credential: "openrelayproject",
      },
      {
        urls: "turn:a.relay.metered.ca:443?transport=tcp",
        username: "openrelayproject",
        credential: "openrelayproject",
      },

      // =============================================
      // TURN SERVER 3: Another free relay
      // =============================================
      {
        urls: "turn:global.relay.metered.ca:80",
        username: "e8dd65b92f7a292a0a0f7f3e",
        credential: "fSkYeRbxNTUku5YV",
      },
      {
        urls: "turn:global.relay.metered.ca:443",
        username: "e8dd65b92f7a292a0a0f7f3e",
        credential: "fSkYeRbxNTUku5YV",
      },
      {
        urls: "turn:global.relay.metered.ca:443?transport=tcp",
        username: "e8dd65b92f7a292a0a0f7f3e",
        credential: "fSkYeRbxNTUku5YV",
      },
    ],
    iceTransportPolicy: "all",
  });

  // ==========================================
  // AUDIO HELPERS
  // ==========================================
  const playRingback = () => {
    try {
      if (!ringbackToneRef.current) {
        ringbackToneRef.current = new Audio("/ringback.mp3");
        ringbackToneRef.current.loop = true;
      }
      ringbackToneRef.current.play().catch(() => {});
    } catch (e) {}
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
        incomingRingtoneRef.current = new Audio("/incoming.mp3");
        incomingRingtoneRef.current.loop = true;
      }
      incomingRingtoneRef.current.play().catch(() => {});
    } catch (e) {}
  };

  const stopIncoming = () => {
    if (incomingRingtoneRef.current) {
      incomingRingtoneRef.current.pause();
      incomingRingtoneRef.current.currentTime = 0;
    }
  };

  // ==========================================
  // UPDATE CONNECTION STATUS
  // ==========================================
  const updateConnectionStatus = (status) => {
    console.log("■ Connection Status:", status);
    setCallState((prev) => ({
      ...prev,
      connectionStatus: status,
    }));
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
    if (peerConnection.current) {
      peerConnection.current.ontrack = null;
      peerConnection.current.onicecandidate = null;
      peerConnection.current.onconnectionstatechange = null;
      peerConnection.current.oniceconnectionstatechange = null;
      peerConnection.current.close();
      peerConnection.current = null;
    }

    const config = getIceServers();
    peerConnection.current = new RTCPeerConnection(config);

    // Handle remote tracks
    peerConnection.current.ontrack = (event) => {
      console.log(
        "■ ontrack fired:",
        event.track.kind,
        "streams:",
        event.streams.length
      );

      // IMPORTANT: Build a fresh MediaStream from ALL tracks in event.streams[0]
      // This prevents the "stream removed from document" issue
      if (event.streams && event.streams[0]) {
        remoteStreamRef.current = event.streams[0];
      } else {
        const newStream = new MediaStream();
        newStream.addTrack(event.track);
        remoteStreamRef.current = newStream;
      }

      // Create a NEW MediaStream object reference so React detects the change
      const tracks = remoteStreamRef.current.getTracks();
      setRemoteStreamState(new MediaStream(tracks));
    };

    // Handle ICE candidates
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        const targetId = currentCallerIdRef.current || currentTargetRef.current;
        if (targetId && socket) {
          socket.emit("ice_candidate", {
            to: targetId,
            candidate: event.candidate,
          });
        }
      } else {
        console.log("■ ICE gathering complete");
      }
    };

    // Handle ICE gathering state
    peerConnection.current.onicegatheringstatechange = () => {
      console.log(
        "■ ICE Gathering State:",
        peerConnection.current?.iceGatheringState
      );
    };

    // Handle connection state changes
    peerConnection.current.onconnectionstatechange = () => {
      const state = peerConnection.current?.connectionState;
      console.log("■ Connection State:", state);

      if (state === "connected") {
        if (disconnectTimeoutRef.current) {
          clearTimeout(disconnectTimeoutRef.current);
          disconnectTimeoutRef.current = null;
        }
        wasConnected.current = true;
        callStartTime.current = Date.now();
        iceRestartCount.current = 0;
        updateConnectionStatus("connected");
      }

      if (state === "disconnected") {
        updateConnectionStatus("reconnecting");
        console.log("■ Disconnected - waiting 5s then trying ICE restart...");

        disconnectTimeoutRef.current = setTimeout(() => {
          if (
            peerConnection.current &&
            peerConnection.current.connectionState === "disconnected"
          ) {
            if (iceRestartCount.current < 3) {
              console.log(
                "■ Attempting ICE restart, attempt:",
                iceRestartCount.current + 1
              );
              attemptIceRestart();
            } else {
              console.log("■ Max ICE restart attempts reached - cleaning up");
              cleanupCall();
            }
          }
        }, 5000);
      }

      if (state === "failed") {
        console.log("■ Connection failed - attempting ICE restart");
        if (iceRestartCount.current < 3) {
          attemptIceRestart();
        } else {
          updateConnectionStatus("failed");
        }
      }
    };

    // Handle ICE connection state
    peerConnection.current.oniceconnectionstatechange = () => {
      const iceState = peerConnection.current?.iceConnectionState;
      console.log("■ ICE Connection State:", iceState);

      if (iceState === "checking") {
        updateConnectionStatus("connecting");
      }

      if (iceState === "connected" || iceState === "completed") {
        updateConnectionStatus("connected");
      }

      if (iceState === "failed") {
        if (iceRestartCount.current < 3) {
          console.log("■ ICE failed - attempting restart");
          attemptIceRestart();
        } else {
          updateConnectionStatus("failed");
        }
      }
    };
  };

  // ==========================================
  // ICE RESTART - USES A SEPARATE SOCKET EVENT
  // ==========================================
  const attemptIceRestart = async () => {
    try {
      iceRestartCount.current += 1;

      if (!peerConnection.current) return;

      // Get fresh ICE servers
      const config = getIceServers();
      peerConnection.current.setConfiguration(config);

      // Create new offer with ICE restart flag
      const offer = await peerConnection.current.createOffer({
        iceRestart: true,
      });
      await peerConnection.current.setLocalDescription(offer);

      const targetId =
        currentCallerIdRef.current || currentTargetRef.current;

      if (targetId && socket) {
        // =============================================
        // FIX: Use "ice_restart_offer" instead of "call_user"
        // This prevents the receiver from showing a new
        // incoming call popup and destroying the video elements
        // =============================================
        socket.emit("ice_restart_offer", {
          to: targetId,
          signal: offer,
          callType: currentCallTypeRef.current || callState.callType,
        });
      }

      updateConnectionStatus("reconnecting");
      console.log(
        "■ ICE restart offer sent, attempt:",
        iceRestartCount.current
      );
    } catch (error) {
      console.error("ICE restart failed:", error);
      if (iceRestartCount.current >= 3) {
        updateConnectionStatus("failed");
      }
    }
  };

  // ==========================================
  // INITIATE CALL (CALLER)
  // ==========================================
  const initiateCall = async (targetUserId, callType) => {
    try {
      console.log("■ Initiating call to:", targetUserId, "type:", callType);

      currentTargetRef.current = targetUserId;
      currentCallerIdRef.current = null;
      currentCallTypeRef.current = callType;
      iceCandidatesQueue.current = [];
      callStartTime.current = null;
      wasConnected.current = false;
      iceRestartCount.current = 0;
      isInActiveCallRef.current = true;

      setCallState({
        isCallActive: true,
        isIncomingCall: false,
        callType,
        callerId: null,
        connectionStatus: "connecting",
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
      alert(
        "Could not access camera/microphone. Please allow permissions and try again."
      );
      cleanupCall();
    }
  };

  // ==========================================
  // ANSWER CALL (RECEIVER)
  // ==========================================
  const answerCall = async () => {
    try {
      if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);

      stopIncoming();

      iceCandidatesQueue.current = [];
      callStartTime.current = null;
      wasConnected.current = false;
      iceRestartCount.current = 0;
      isInActiveCallRef.current = true;

      const currentCallType =
        currentCallTypeRef.current || callState.callType;
      const currentCallerId =
        currentCallerIdRef.current || callState.callerId;

      console.log("■ Answering call from:", currentCallerId);

      updateConnectionStatus("connecting");

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

      currentCallerIdRef.current = currentCallerId;

      socket.emit("answer_call", {
        to: currentCallerId,
        signal: answer,
      });

      // FIX: Update state - set isCallActive FIRST, then clear isIncomingCall
      // This ensures video elements exist BEFORE we try to attach streams
      setCallState((prev) => ({
        ...prev,
        isCallActive: true,
        isIncomingCall: false,
        connectionStatus: "connecting",
      }));
    } catch (error) {
      console.error("Error answering call:", error);
      alert("Failed to answer call: " + error.message);
      rejectCall();
    }
  };

  // ==========================================
  // REJECT CALL
  // ==========================================
  const rejectCall = () => {
    const callerId = currentCallerIdRef.current || callState.callerId;
    if (callerId && socket) {
      socket.emit("reject_call", { to: callerId });
    }

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
  // END CALL
  // ==========================================
  const endCall = () => {
    if (ringTimeoutRef.current) {
      clearTimeout(ringTimeoutRef.current);
      ringTimeoutRef.current = null;
    }

    stopRingback();

    const targetId =
      currentCallerIdRef.current || currentTargetRef.current;
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
      senderId: isCaller
        ? authUser._id
        : currentCallerIdRef.current || callState.callerId,
      receiverId: isCaller ? currentTargetRef.current : authUser._id,
      callType: currentCallTypeRef.current || callState.callType,
      callStatus: status,
      callDuration: duration,
    });

    cleanupCall();
  };

  // ==========================================
  // RETRY CONNECTION
  // ==========================================
  const retryConnection = () => {
    console.log("■ User requested connection retry");
    iceRestartCount.current = 0;

    if (peerConnection.current) {
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
      }

      if (peerConnection.current) {
        peerConnection.current.ontrack = null;
        peerConnection.current.onicecandidate = null;
        peerConnection.current.onconnectionstatechange = null;
        peerConnection.current.oniceconnectionstatechange = null;
        peerConnection.current.close();
        peerConnection.current = null;
      }

      remoteStreamRef.current = new MediaStream();
      iceCandidatesQueue.current = [];

      const targetId =
        currentCallerIdRef.current || currentTargetRef.current;
      const callType = currentCallTypeRef.current || callState.callType;

      if (targetId && callType) {
        const wasCaller = !currentCallerIdRef.current;
        if (wasCaller) {
          initiateCall(targetId, callType);
        } else {
          answerCall();
        }
      }
    }
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

    stopRingback();
    stopIncoming();

    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
    }

    if (peerConnection.current) {
      peerConnection.current.ontrack = null;
      peerConnection.current.onicecandidate = null;
      peerConnection.current.onconnectionstatechange = null;
      peerConnection.current.oniceconnectionstatechange = null;
      peerConnection.current.close();
      peerConnection.current = null;
    }

    remoteStreamRef.current = new MediaStream();
    incomingSignalRef.current = null;
    currentTargetRef.current = null;
    currentCallerIdRef.current = null;
    currentCallTypeRef.current = null;
    iceCandidatesQueue.current = [];
    callStartTime.current = null;
    wasConnected.current = false;
    iceRestartCount.current = 0;
    isInActiveCallRef.current = false;

    setLocalStreamState(null);
    setRemoteStreamState(null);
    setCallState({
      isCallActive: false,
      isIncomingCall: false,
      callType: null,
      callerId: null,
      connectionStatus: "idle",
    });
  };

  // ==========================================
  // SOCKET EVENT LISTENERS
  // ==========================================
  useEffect(() => {
    if (!socket) return;

    // =============================================
    // FIX 1: incoming_call handler checks if already
    // in an active call. If yes, it's an ICE restart
    // from the old code - ignore it.
    // =============================================
    const handleIncomingCall = ({ from, signal, callType }) => {
      console.log(
        "■ Incoming call from:",
        from,
        "type:",
        callType,
        "| Already in call:",
        isInActiveCallRef.current
      );

      // If we're already in an active call, this is a stale/duplicate
      // signal - DO NOT reset to incoming call state
      if (isInActiveCallRef.current) {
        console.log(
          "■ Already in active call - treating as ICE restart offer"
        );
        // Handle as ICE restart: just update the remote description
        if (peerConnection.current) {
          peerConnection.current
            .setRemoteDescription(new RTCSessionDescription(signal))
            .then(() => {
              processQueue();
              // If we were the receiver, send a new answer back
              return peerConnection.current.createAnswer();
            })
            .then((answer) => {
              return peerConnection.current.setLocalDescription(answer);
            })
            .then(() => {
              socket.emit("answer_call", {
                to: from,
                signal: peerConnection.current.localDescription,
              });
            })
            .catch((err) => {
              console.error("ICE restart renegotiation error:", err);
            });
        }
        return;
      }

      // This is a genuinely new incoming call
      incomingSignalRef.current = signal;
      currentCallerIdRef.current = from;
      currentCallTypeRef.current = callType;

      setCallState({
        isCallActive: false,
        isIncomingCall: true,
        callType,
        callerId: from,
        connectionStatus: "ringing",
      });

      playIncoming();
    };

    // =============================================
    // FIX 2: Handle the new "ice_restart_offer" event
    // This is the PROPER way to handle ICE restarts
    // without triggering the incoming call popup
    // =============================================
    const handleIceRestartOffer = ({ from, signal }) => {
      console.log("■ ICE restart offer received from:", from);

      if (!peerConnection.current) return;

      peerConnection.current
        .setRemoteDescription(new RTCSessionDescription(signal))
        .then(() => {
          processQueue();
          return peerConnection.current.createAnswer();
        })
        .then((answer) => {
          return peerConnection.current.setLocalDescription(answer);
        })
        .then(() => {
          socket.emit("answer_call", {
            to: from,
            signal: peerConnection.current.localDescription,
          });
          console.log("■ ICE restart answer sent");
        })
        .catch((err) => {
          console.error("ICE restart offer handling error:", err);
        });
    };

    const handleCallAccepted = async ({ signal }) => {
      console.log("■ Call accepted by other user");

      if (ringTimeoutRef.current) {
        clearTimeout(ringTimeoutRef.current);
        ringTimeoutRef.current = null;
      }

      stopRingback();

      if (peerConnection.current) {
        try {
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(signal)
          );
          processQueue();
        } catch (err) {
          console.error(
            "Error setting remote description on call accepted:",
            err
          );
        }
      }

      setCallState((prev) => ({
        ...prev,
        isCallActive: true,
        connectionStatus: "connecting",
      }));
    };

    const handleIceCandidate = ({ candidate }) => {
      if (candidate) {
        iceCandidatesQueue.current.push(candidate);
        processQueue();
      }
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
    socket.on("ice_restart_offer", handleIceRestartOffer);
    socket.on("call_accepted", handleCallAccepted);
    socket.on("ice_candidate", handleIceCandidate);
    socket.on("call_ended", handleCallEnded);
    socket.on("call_rejected", handleCallRejected);

    return () => {
      socket.off("incoming_call", handleIncomingCall);
      socket.off("ice_restart_offer", handleIceRestartOffer);
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
      localStream.current
        .getAudioTracks()
        .forEach((t) => (t.enabled = !t.enabled));
      return !localStream.current.getAudioTracks()[0]?.enabled;
    }
    return false;
  };

  const toggleCamera = () => {
    if (localStream.current) {
      localStream.current
        .getVideoTracks()
        .forEach((t) => (t.enabled = !t.enabled));
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
    retryConnection,
  };
};