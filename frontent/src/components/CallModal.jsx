
// import React, { useEffect, useRef } from "react";
// import { createPortal } from "react-dom";

// const CallModal = ({
//   callState,
//   localStream,
//   remoteStream,
//   onAnswer,
//   onReject,
//   onEnd,
//   onToggleMic,
//   onToggleCamera,
// }) => {
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();

//   // Full, correct phone SVG path
//   const phoneIconPath =
//     "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.49.57.55 0 1 .45 1 1v3.49c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.49z";

//   useEffect(() => {
//     if (callState.isCallActive && localVideoRef.current && localStream) {
//       localVideoRef.current.srcObject = localStream;
//       localVideoRef.current.play().catch((e) => console.error("Local video play error:", e));
//     }
//   }, [localStream, callState.isCallActive]);

//   useEffect(() => {
//     if (callState.isCallActive && remoteVideoRef.current && remoteStream) {
//       remoteVideoRef.current.srcObject = remoteStream;
//       remoteVideoRef.current.play().catch((e) => console.error("Remote video play error:", e));
//     }
//   }, [remoteStream, callState.isCallActive]);

//   if (!callState.isCallActive && !callState.isIncomingCall) return null;

//   return createPortal(
//     <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
//       <div className="w-full h-full max-w-5xl flex flex-col p-2 sm:p-4">
//         {/* ==================== INCOMING CALL (POPUP) ==================== */}
//         {callState.isIncomingCall && (
//           <div className="fixed top-4 right-4 z-[10000] w-[320px] sm:w-[380px] bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
//             <div className="flex flex-col items-center p-6 gap-3">
//               {/* Pulsing Icon */}
//               <div className="relative w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
//                 <span className="text-3xl z-10">
//                   {callState.callType === "video" ? "📹" : "📞"}
//                 </span>
//               </div>

//               <h2 className="text-xl font-bold text-white">
//                 Incoming {callState.callType === "video" ? "Video" : "Audio"} Call
//               </h2>

//               <div className="flex gap-10 mt-2">
//                 {/* REJECT BUTTON */}
//                 <div className="flex flex-col items-center gap-1">
//                   <button
//                     onClick={onReject}
//                     className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30"
//                   >
//                     <div className="rotate-[135deg]">
//                       <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
//                         <path d={phoneIconPath} />
//                       </svg>
//                     </div>
//                   </button>
//                   <p className="text-white text-xs font-medium">Decline</p>
//                 </div>

//                 {/* ACCEPT BUTTON */}
//                 <div className="flex flex-col items-center gap-1">
//                   <button
//                     onClick={onAnswer}
//                     className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30"
//                   >
//                     <div className="-rotate-[135deg]">
//                       <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
//                         <path d={phoneIconPath} />
//                       </svg>
//                     </div>
//                   </button>
//                   <p className="text-white text-xs font-medium">Accept</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ==================== ACTIVE CALL (FULL SCREEN) ==================== */}
//         {callState.isCallActive && (
//           <>
//             {/* Video Area */}
//             <div className="flex-1 relative bg-slate-950 rounded-xl overflow-hidden">
//               {/* Remote Video (Full Screen) */}
//               <video
//                 ref={remoteVideoRef}
//                 autoPlay
//                 playsInline
//                 className="w-full h-full object-cover"
//               />

//               {/* Local Video (Picture-in-Picture) */}
//               {callState.callType === "video" && (
//                 <div className="absolute bottom-16 sm:bottom-20 right-2 sm:right-4 w-[30vw] max-w-[160px] aspect-video rounded-xl overflow-hidden border-2 border-white/20 shadow-xl z-10">
//                   <video
//                     ref={localVideoRef}
//                     autoPlay
//                     playsInline
//                     muted
//                     className="w-full h-full object-cover transform scale-x-[-1]"
//                   />
//                 </div>
//               )}

//               {/* Audio Only Placeholder */}
//               {callState.callType === "audio" && (
//                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
//                   <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center mb-6 animate-pulse">
//                     <span className="text-7xl">📞</span>
//                   </div>
//                   <p className="text-gray-400 text-lg">Audio Call in Progress</p>
//                 </div>
//               )}
//             </div>

//             {/* Controls Bar */}
//             <div className="h-16 sm:h-20 flex items-center justify-center gap-4 sm:gap-6 bg-slate-900/90 backdrop-blur-sm rounded-b-xl">
//               {/* Toggle Mic */}
//               <button
//                 onClick={onToggleMic}
//                 className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-white/20 transition-colors"
//                 title="Toggle Microphone"
//               >
//                 🎤
//               </button>

//               {/* Toggle Camera (Video calls only) */}
//               {callState.callType === "video" && (
//                 <button
//                   onClick={onToggleCamera}
//                   className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-white/20 transition-colors"
//                   title="Toggle Camera"
//                 >
//                   📷
//                 </button>
//               )}

//               {/* End Call */}
//               <button
//                 onClick={onEnd}
//                 className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30"
//                 title="End Call"
//               >
//                 <div className="rotate-[135deg]">
//                   <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
//                     <path d={phoneIconPath} />
//                   </svg>
//                 </div>
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default CallModal;
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const CallModal = ({
  callState,
  localStream,
  remoteStream,
  onAnswer,
  onReject,
  onEnd,
  onToggleMic,
  onToggleCamera,
  onRetryConnection,
}) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  // Track previous stream to avoid unnecessary updates
  const prevLocalStreamRef = useRef(null);
  const prevRemoteStreamRef = useRef(null);

  const phoneIconPath =
    "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.49.57.55 0 1 .45 1 1v3.49c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.49z";

  // =============================================
  // FIX: Attach streams to video elements using
  // srcObject ONLY when the element actually exists
  // in the DOM. Use autoPlay instead of manual play().
  // =============================================
  useEffect(() => {
    const videoEl = localVideoRef.current;
    if (!videoEl) return;
    if (localStream === prevLocalStreamRef.current) return;
    prevLocalStreamRef.current = localStream;

    if (localStream) {
      videoEl.srcObject = localStream;
      // Don't call .play() manually - autoPlay handles it
      // If we must play, catch all errors including AbortError
      videoEl.play().catch((e) => {
        // AbortError is normal when React re-renders mid-play
        if (e.name !== "AbortError") {
          console.error("Local video play error:", e);
        }
      });
    } else {
      videoEl.srcObject = null;
    }
  }, [localStream]);

  useEffect(() => {
    const videoEl = remoteVideoRef.current;
    if (!videoEl) return;
    if (remoteStream === prevRemoteStreamRef.current) return;
    prevRemoteStreamRef.current = remoteStream;

    if (remoteStream) {
      videoEl.srcObject = remoteStream;
      videoEl.play().catch((e) => {
        // AbortError is normal when React re-renders mid-play
        if (e.name !== "AbortError") {
          console.error("Remote video play error:", e);
        }
      });
    } else {
      videoEl.srcObject = null;
    }
  }, [remoteStream]);

  // =============================================
  // FIX: Also re-attach streams when call becomes
  // active (video elements mount at this point)
  // =============================================
  useEffect(() => {
    if (callState.isCallActive) {
      // Small delay to ensure video elements are in DOM after render
      const timer = setTimeout(() => {
        if (localStream && localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
          localVideoRef.current.play().catch((e) => {
            if (e.name !== "AbortError") {
              console.error("Local video re-attach play error:", e);
            }
          });
        }
        if (remoteStream && remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play().catch((e) => {
            if (e.name !== "AbortError") {
              console.error("Remote video re-attach play error:", e);
            }
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [callState.isCallActive, localStream, remoteStream]);

  if (!callState.isCallActive && !callState.isIncomingCall) return null;

  // ==========================================
  // CONNECTION STATUS DISPLAY
  // ==========================================
  const getConnectionStatusUI = () => {
    const status = callState.connectionStatus;

    if (status === "connecting") {
      return (
        <div className="flex items-center gap-2 text-yellow-400 text-sm animate-pulse">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Connecting...</span>
        </div>
      );
    }

    if (status === "reconnecting") {
      return (
        <div className="flex items-center gap-2 text-orange-400 text-sm animate-pulse">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Reconnecting...</span>
        </div>
      );
    }

    if (status === "failed") {
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <span>Connection failed</span>
          </div>
          <p className="text-gray-400 text-xs text-center max-w-[280px]">
            This usually happens when the WiFi router blocks direct connections
            between devices.
          </p>
          {onRetryConnection && (
            <button
              onClick={onRetryConnection}
              className="mt-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded-lg transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      );
    }

    if (status === "connected") {
      return (
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span>Connected</span>
        </div>
      );
    }

    return null;
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
      <div className="w-full h-full max-w-5xl flex flex-col p-2 sm:p-4">
        {/* ==================== INCOMING CALL (POPUP) ==================== */}
        {callState.isIncomingCall && (
          <div className="fixed top-4 right-4 z-[10000] w-[320px] sm:w-[380px] bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
            <div className="flex flex-col items-center p-6 gap-3">
              <div className="relative w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                <span className="text-3xl z-10">
                  {callState.callType === "video" ? "📹" : "📞"}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white">
                Incoming {callState.callType === "video" ? "Video" : "Audio"}{" "}
                Call
              </h2>

              <div className="flex gap-10 mt-2">
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={onReject}
                    className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30"
                  >
                    <div className="rotate-[135deg]">
                      <svg
                        width="24"
                        height="24"
                        fill="white"
                        viewBox="0 0 24 24"
                      >
                        <path d={phoneIconPath} />
                      </svg>
                    </div>
                  </button>
                  <p className="text-white text-xs font-medium">Decline</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={onAnswer}
                    className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30"
                  >
                    <div className="-rotate-[135deg]">
                      <svg
                        width="24"
                        height="24"
                        fill="white"
                        viewBox="0 0 24 24"
                      >
                        <path d={phoneIconPath} />
                      </svg>
                    </div>
                  </button>
                  <p className="text-white text-xs font-medium">Accept</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== ACTIVE CALL (FULL SCREEN) ==================== */}
        {callState.isCallActive && (
          <>
            {/* Video Area */}
            <div className="flex-1 relative bg-slate-950 rounded-xl overflow-hidden">
              {/* Remote Video */}
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Local Video (PiP) */}
              {callState.callType === "video" && (
                <div className="absolute bottom-16 sm:bottom-20 right-2 sm:right-4 w-[30vw] max-w-[160px] aspect-video rounded-xl overflow-hidden border-2 border-white/20 shadow-xl z-10">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform scale-x-[-1]"
                  />
                </div>
              )}

              {/* Audio Only Placeholder */}
              {callState.callType === "audio" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
                  <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center mb-6 animate-pulse">
                    <span className="text-7xl">📞</span>
                  </div>
                  <p className="text-gray-400 text-lg">
                    Audio Call in Progress
                  </p>
                </div>
              )}

              {/* Connection Status Overlay */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                  {getConnectionStatusUI()}
                </div>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="h-16 sm:h-20 flex items-center justify-center gap-4 sm:gap-6 bg-slate-900/90 backdrop-blur-sm rounded-b-xl">
              <button
                onClick={onToggleMic}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-white/20 transition-colors"
                title="Toggle Microphone"
              >
                🎤
              </button>

              {callState.callType === "video" && (
                <button
                  onClick={onToggleCamera}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-white/20 transition-colors"
                  title="Toggle Camera"
                >
                  📷
                </button>
              )}

              {callState.connectionStatus === "failed" &&
                onRetryConnection && (
                  <button
                    onClick={onRetryConnection}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-600 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-cyan-700 transition-colors"
                    title="Retry Connection"
                  >
                    🔄
                  </button>
                )}

              <button
                onClick={onEnd}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30"
                title="End Call"
              >
                <div className="rotate-[135deg]">
                  <svg
                    width="24"
                    height="24"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d={phoneIconPath} />
                  </svg>
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default CallModal;