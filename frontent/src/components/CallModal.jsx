
// import React, { useEffect, useRef } from "react";
// import { createPortal } from "react-dom"; // <--- ADDED THIS

// const CallModal = ({ 
//   callState, 
//   localStream, 
//   remoteStream, 
//   onAnswer, 
//   onReject, 
//   onEnd, 
//   onToggleMic, 
//   onToggleCamera 
// }) => {
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();

//   // Clean, standard Phone SVG Path (No more Chinese text or broken paths)
//   const phoneIconPath = "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z";

//   useEffect(() => {
//     if (callState.isCallActive && localVideoRef.current && localStream) {
//       localVideoRef.current.srcObject = localStream;
//       localVideoRef.current.play().catch(e => console.error(e));
//     }
//   }, [localStream, callState.isCallActive]);

//   useEffect(() => {
//     if (callState.isCallActive && remoteVideoRef.current && remoteStream) {
//       remoteVideoRef.current.srcObject = remoteStream;
//       remoteVideoRef.current.play().catch(e => console.error(e));
//     }
//   }, [remoteStream, callState.isCallActive]);

//   if (!callState.isCallActive && !callState.isIncomingCall) return null;

//   // ------------------- PORTAL STARTS HERE -------------------
//   return createPortal(
//     <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
//       <div className="w-full h-full max-w-5xl flex flex-col p-2 sm:p-4">
        
//         {/* ==================== INCOMING CALL (SMALL POPUP) ==================== */}
//         {callState.isIncomingCall && (
//           <div className="fixed top-4 right-4 z-[10000] w-[320px] sm:w-[380px] bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
//               <div className="flex flex-col items-center p-6 gap-3">
//                   <div className="relative w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
//                     <span className="text-3xl z-10">
//                       {callState.callType === 'video' ? '📹' : '📞'}
//                     </span>
//                   </div>
//                   <h2 className="text-xl font-bold text-white">
//                     Incoming {callState.callType === 'video' ? 'Video' : 'Audio'} Call
//                   </h2>

//                   <div className="flex gap-10 mt-2">
//                     <div className="flex flex-col items-center gap-1">
//                       <button onClick={onReject} className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/40 hover:bg-red-600 active:scale-95 transition-all">
//                         <div className="rotate-[135deg]">
//                           <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d={phoneIconPath}/></svg>
//                         </div>
//                       </button>
//                       <p className="text-white text-xs font-medium">Decline</p>
//                     </div>

//                     <div className="flex flex-col items-center gap-1">
//                       <button onClick={onAnswer} className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/40 hover:bg-green-600 active:scale-95 transition-all">
//                         <div className="-rotate-[135deg]">
//                           <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d={phoneIconPath}/></svg>
//                         </div>
//                       </button>
//                       <p className="text-white text-xs font-medium">Accept</p>
//                     </div>
//                   </div>
//               </div>
//           </div>
//         )}

//         {/* ==================== ACTIVE CALL (FULL SCREEN) ==================== */}
//         {callState.isCallActive && (
//           <>
//             <div className="flex-1 relative bg-slate-950 rounded-xl overflow-hidden">
//               <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
              
//               {callState.callType === "video" && (
//                 <div className="absolute bottom-16 sm:bottom-20 right-2 sm:right-4 w-[30vw] max-w-[160px] aspect-video sm:max-w-[200px] sm:aspect-video rounded-lg border-2 border-white/30 overflow-hidden shadow-2xl bg-slate-800">
//                   <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
//                 </div>
//               )}

//               {callState.callType === "audio" && (
//                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black">
//                   <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center mb-6">
//                     <span className="text-7xl">🎙️</span>
//                   </div>
//                   <p className="text-gray-400 text-lg">Audio Call in Progress</p>
//                 </div>
//               )}
//             </div>

//             <div className="h-16 sm:h-20 flex items-center justify-center gap-4 sm:gap-6 bg-slate-900/90 backdrop-blur-md mt-2 rounded-xl relative z-10">
//               <button onClick={onToggleMic} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-white/20 active:scale-95 transition-transform" title="Toggle Microphone">🎤</button>
              
//               {callState.callType === "video" && (
//                 <button onClick={onToggleCamera} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-white/20 active:scale-95 transition-transform" title="Toggle Camera">📹</button>
//               )}
              
//               <button onClick={onEnd} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-red-700 active:scale-95 transition-transform shadow-lg shadow-red-600/40" title="End Call">📞</button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>,
//     document.body // <--- MAGIC: Teleports modal outside of Homepage container
//   );
//   // ------------------- PORTAL ENDS HERE -------------------
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
}) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  // Full, correct phone SVG path
  const phoneIconPath =
    "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.49.57.55 0 1 .45 1 1v3.49c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.49z";

  useEffect(() => {
    if (callState.isCallActive && localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
      localVideoRef.current.play().catch((e) => console.error("Local video play error:", e));
    }
  }, [localStream, callState.isCallActive]);

  useEffect(() => {
    if (callState.isCallActive && remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
      remoteVideoRef.current.play().catch((e) => console.error("Remote video play error:", e));
    }
  }, [remoteStream, callState.isCallActive]);

  if (!callState.isCallActive && !callState.isIncomingCall) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
      <div className="w-full h-full max-w-5xl flex flex-col p-2 sm:p-4">
        {/* ==================== INCOMING CALL (POPUP) ==================== */}
        {callState.isIncomingCall && (
          <div className="fixed top-4 right-4 z-[10000] w-[320px] sm:w-[380px] bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
            <div className="flex flex-col items-center p-6 gap-3">
              {/* Pulsing Icon */}
              <div className="relative w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                <span className="text-3xl z-10">
                  {callState.callType === "video" ? "📹" : "📞"}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white">
                Incoming {callState.callType === "video" ? "Video" : "Audio"} Call
              </h2>

              <div className="flex gap-10 mt-2">
                {/* REJECT BUTTON */}
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={onReject}
                    className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30"
                  >
                    <div className="rotate-[135deg]">
                      <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                        <path d={phoneIconPath} />
                      </svg>
                    </div>
                  </button>
                  <p className="text-white text-xs font-medium">Decline</p>
                </div>

                {/* ACCEPT BUTTON */}
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={onAnswer}
                    className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30"
                  >
                    <div className="-rotate-[135deg]">
                      <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
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
              {/* Remote Video (Full Screen) */}
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Local Video (Picture-in-Picture) */}
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
                  <p className="text-gray-400 text-lg">Audio Call in Progress</p>
                </div>
              )}
            </div>

            {/* Controls Bar */}
            <div className="h-16 sm:h-20 flex items-center justify-center gap-4 sm:gap-6 bg-slate-900/90 backdrop-blur-sm rounded-b-xl">
              {/* Toggle Mic */}
              <button
                onClick={onToggleMic}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-white/20 transition-colors"
                title="Toggle Microphone"
              >
                🎤
              </button>

              {/* Toggle Camera (Video calls only) */}
              {callState.callType === "video" && (
                <button
                  onClick={onToggleCamera}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-white/20 transition-colors"
                  title="Toggle Camera"
                >
                  📷
                </button>
              )}

              {/* End Call */}
              <button
                onClick={onEnd}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30"
                title="End Call"
              >
                <div className="rotate-[135deg]">
                  <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
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