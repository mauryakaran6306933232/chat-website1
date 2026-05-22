
// import React, { useState, useEffect } from 'react'
// import SendInput from './SendInput'
// import Messages from './Messages'
// import { useSelector, useDispatch } from 'react-redux'
// import { setSelectedUser } from '../redux/UserSlice'
// import CallModal from './CallModal'
// import { useWebRTC } from '../hooks/useWebRTC'

// export default function MesssageContainer({ onBack }) {
//     const dispatch = useDispatch();
//     const { selectedUser, authUser } = useSelector(State => State.user);
//     const { message } = useSelector(State => State.message);
    
//     // 🔥 SAFELY check if socket exists before trying to use it
//     const socket = useSelector(State => State.socket);

//     // 🔥 DESTRUCTURE WEBRTC PROPS HERE
//     const { 
//         callState, 
//         localStream, 
//         remoteStream, 
//         initiateCall, 
//         answerCall, 
//         toggleMic, 
//         toggleCamera 
//     } = useWebRTC();

//     const [isTyping, setIsTyping] = useState(false);
//     const [imgError, setImgError] = useState(false);
//     const selectedUserInitial = selectedUser?.username?.trim()?.charAt(0)?.toUpperCase() || '?';

//     useEffect(() => {
//         // Only run typing logic if socket actually exists
//         if (!socket) return;

//         socket.on("typing", ({ from }) => {
//             if (from === selectedUser?._id) {
//                 setIsTyping(true);
//                 setTimeout(() => setIsTyping(void 0), 2000);
//             }
//         });

//         return () => socket.off("typing");
//     }, [socket, selectedUser?._id]);

//     useEffect(() => {
//         return () => dispatch(setSelectedUser(null))
//     }, [])

//     return (
//         <>
//             {
//                 selectedUser ? (
//                     <div className='min-w-0 w-full max-w-full xl:min-w-[550px] flex flex-col h-full overflow-hidden relative'>
                        
//                         {/* HEADER */}
//                         <div className='flex flex-row flex-wrap items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/90 p-3 text-white shadow-lg shadow-slate-950/30 mx-2 my-2'>
                            
//                             {/* BACK BUTTON */}
//                             <button 
//                                 onClick={onBack} 
//                                 className="p-2 rounded-full hover:bg-white/10 transition-colors md:hidden" 
//                                 title="Go back"
//                             >
//                                 <svg xmlns="http://www.wrapped-view" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//                                 </svg>
//                             </button>

//                             {/* AVATAR */}
//                             <div className='relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-slate-800/80 overflow-hidden sm:h-16 sm:w-16'>
//                                 {selectedUser?.profilePicture && !selectedUser.profilePicture.includes('iran.liara.run') && !imgError ? (
//                                     <img 
//                                         src={selectedUser?.profilePicture} 
//                                         alt='profilePhoto' 
//                                         className='h-full w-full rounded-full object-cover' 
//                                         onError={() => setImgError(true)} 
//                                     />
//                                 ) : (
//                                     <div className="w-full h-full flex items-center justify-center bg-slate-700 rounded-full">
//                                         <span className="text-2xl font-bold text-white sm:text-3xl">{selectedUserInitial}</span>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* NAME & TYPING */}
//                             <div className='min-w-0 flex-1 overflow-hidden'>
//                                 <p className='truncate text-base font-bold text-white sm:text-lg'>{selectedUser?.username}</p>
//                                 <p className='text-xs text-green-400 h-4'>
//                                     {isTyping ? "typing..." : ""}
//                                 </p>
//                             </div>

//                             {/* CALL ICONS */}
//                             <div className="flex items-center gap-2 ml-auto pr-1">
//                                 <button onClick={() => initiateCall(selectedUser._id, 'audio')} className="p-2.5 rounded-full hover:bg-white/10 transition-colors duration-200 group" title="Audio Call">
//                                     <svg xmlns="http://www.wrapped-view" className="w-6 h-6 text-slate-300 group-hover:text-green-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
//                                 </button>
//                                 <button onClick={() => initiateCall(selectedUser._id, 'video')} className="p-2.5 rounded-full hover:bg-white/10 transition-colors duration-200 group" title="Video Call">
//                                     <svg xmlns="http://www.wrapped-view" className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
//                                 </button>
//                             </div>
//                         </div>
                        
//                         {/* CONDITIONALLY RENDER CHAT OR WELCOME SCREEN */}
//                         {message && message.length > 0 ? (
//                             <>
//                                 <Messages />
//                                 <SendInput 
//                                   toggleMic={toggleMic} 
//                                   toggleCamera={toggleCamera} 
//                                 />
//                                 <CallModal 
//                                     callState={callState} 
//                                     localStream={localStream} 
//                                     remoteStream={remoteStream} 
//                                     onAnswer={() => {}}
//                                     onReject={() => {}}
//                                     onEnd={() => {}}
//                                     onToggleMic={() => {}}
//                                     onToggleCamera={() => {}}
//                                 />
//                             </>
//                         ) : (
//                             <div className='min-w-0 w-full h-full flex flex-col items-center justify-center px-4 py-6 text-center bg-slate-800/50 rounded-lg mx-2'>
//                                 <div className="text-6xl mb-4">💬</div>
//                                 <div>
//                                     <h1 className='text-3xl font-bold text-white sm:text-4xl'>Let&apos;s start the conversation.</h1>
//                                 </div>
//                                 <h1 className='mt-3 text-xl text-white/80 sm:text-2xl'>Select a user to start chatting.</h1>
//                             </div>
//                         )}
//                     </div>
//                 )
//                 :
//                 (
//                     <div className='min-w-0 w-full flex flex-col items-center justify-center px-4 py-6 text-center'>
//                         <div><h1 className='text-3xl font-bold text-white sm:text-4xl'>Hi, {authUser?.username}</h1></div>
//                         <h1 className='mt-3 text-xl text-white/80 sm:text-2xl'>Let&apos;s start the conversation.</h1>
//                     </div>
//                 )
//             }
//         </>
//     )
// }
// import React, { useEffect, useRef } from "react";

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

//   return (
//     <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
//       <div className="w-full h-full max-w-5xl flex flex-col p-2 sm:p-4">
        
//         {/* ==================== INCOMING CALL SCREEN ==================== */}
//         {callState.isIncomingCall && (
//           <div className="flex flex-col items-center justify-center h-full gap-4">
            
//             {/* 🔥 BULLETPROOF PULSING ICON (No Tailwind config needed) */}
//             <div style={{
//               width: '120px',
//               height: '120px',
//               borderRadius: '50%',
//               backgroundColor: 'rgba(34, 197, 94, 0.2)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               animation: 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
//               position: 'relative'
//             }}>
//               <span style={{ fontSize: '60px', zIndex: 2 }}>
//                 {callState.callType === 'video' ? '📹' : '宣传部'}
//               </span>
//             </div>

//             <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
//               Incoming {callState.callType} Call
//             </h2>
//             <p className="text-gray-400 text-sm sm:text-base">Tap to answer</p>

//             {/* 🔥 FIXED BUTTONS (No overlapping text/icons) */}
//             <div className="flex gap-10 mt-16">
//               {/* REJECT BUTTON */}
//               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
//                 <button 
//                   onClick={onReject} 
//                   style={{
//                     width: '80px',
//                     height: '80px',
//                     borderRadius: '50%',
//                     backgroundColor: '#ef4444',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)',
//                     border: 'none',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.71-.29C15.15 21 3 14.284 3 6V5z"/></svg>
//                 </button>
//                 <p style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Decline</p>
//               </div>

//               {/* ACCEPT BUTTON */}
//               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
//                 <button 
//                   onClick={onAnswer} 
//                   style={{
//                     width: '80px',
//                     height: '80px',
//                     borderRadius: '50%',
//                     backgroundColor: '#22c55e',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     boxShadow: '0 10px 30px rgba(34, 197, 94, 0.4)',
//                     border: 'none',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 1-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.49-1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
//                 </button>
//                 <p style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Accept</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ==================== ACTIVE CALL SCREEN ==================== */}
//         {callState.isCallActive && (
//           <>
//             <div className="flex-1 relative bg-slate-950 rounded-xl overflow-hidden">
              
//               {/* Remote Video (Full Screen Background) */}
//               <video 
//                 ref={remoteVideoRef} 
//                 autoPlay 
//                 playsInline 
//                 className="w-full h-full object-cover" 
//               />
              
//               {/* Local Video (Responsive Picture-in-Picture) */}
//               {callState.callType === "video" && (
//                 <div className="absolute bottom-16 sm:bottom-20 right-2 sm:right-4 w-[30vw] max-w-[160px] aspect-video sm:max-w-[200px] sm:aspect-video rounded-lg border-2 border-white/30 overflow-hidden shadow-2xl bg-slate-800">
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
//                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black">
//                   <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center mb-6">
//                     <span className="text-7xl">🎙️</span>
//                   </div>
//                   <p className="text-gray-400 text-lg">Audio Call in Progress</p>
//                 </div>
//               )}
//             </div>

//             {/* Controls Bar */}
//             <div className="h-16 sm:h-20 flex items-center justify-center gap-4 sm:gap-6 bg-slate-900/90 backdrop-blur-md mt-2 rounded-xl relative z-10">
//               <button 
//                 onClick={onToggleMic} 
//                 className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-white/20 active:scale-95 transition-transform"
//                 title="Toggle Microphone"
//               >
//                 🎤
//               </button>
              
//               {callState.callType === "video" && (
//                 <button 
//                   onClick={onToggleCamera} 
//                   className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-white/20 active:scale-95 transition-transform"
//                   title="Toggle Camera"
//                 >
//                   📹
//                 </button>
//               )}
              
//               <button 
//                 onClick={onEnd} 
//                 className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-red-700 active:scale-95 transition-transform shadow-lg shadow-red-600/40"
//                 title="End Call"
//               >
//                 📞
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CallModal;
// import React, { useEffect, useRef } from "react";

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

//   // Standard, clean Phone SVG Path
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

//   return (
//     <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
//       <div className="w-full h-full max-w-5xl flex flex-col p-2 sm:p-4">
        
//         {/* ==================== INCOMING CALL SCREEN ==================== */}
//         {callState.isIncomingCall && (
//           <div className="flex flex-col items-center justify-center h-full gap-4">
            
//             {/* PULSING ICON */}
//             <div className="relative w-32 h-32 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
//               <span className="text-6xl z-10">
//                 {callState.callType === 'video' ? '📹' : '📞'}
//               </span>
//             </div>

//             <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
//               Incoming {callState.callType === 'video' ? 'Video' : 'Audio'} Call
//             </h2>
//             <p className="text-gray-400 text-sm sm:text-base">Tap to answer</p>

//             {/* FIXED BUTTONS */}
//             <div className="flex gap-16 mt-16">
              
//               {/* REJECT BUTTON (Rotated Phone pointing down) */}
//               <div className="flex flex-col items-center gap-3">
//                 <button 
//                   onClick={onReject} 
//                   className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/40 border-none cursor-pointer hover:bg-red-600 active:scale-95 transition-all"
//                 >
//                   <div className="rotate-[135deg]">
//                     <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
//                       <path d={phoneIconPath}/>
//                     </svg>
//                   </div>
//                 </button>
//                 <p className="text-white text-sm font-medium">Decline</p>
//               </div>

//               {/* ACCEPT BUTTON (Rotated Phone pointing up) */}
//               <div className="flex flex-col items-center gap-3">
//                 <button 
//                   onClick={onAnswer} 
//                   className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/40 border-none cursor-pointer hover:bg-green-600 active:scale-95 transition-all"
//                 >
//                   <div className="-rotate-[135deg]">
//                     <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
//                       <path d={phoneIconPath}/>
//                     </svg>
//                   </div>
//                 </button>
//                 <p className="text-white text-sm font-medium">Accept</p>
//               </div>

//             </div>
//           </div>
//         )}

//         {/* ==================== ACTIVE CALL SCREEN ==================== */}
//         {callState.isCallActive && (
//           <>
//             <div className="flex-1 relative bg-slate-950 rounded-xl overflow-hidden">
              
//               {/* Remote Video (Full Screen Background) */}
//               <video 
//                 ref={remoteVideoRef} 
//                 autoPlay 
//                 playsInline 
//                 className="w-full h-full object-cover" 
//               />
              
//               {/* Local Video (Responsive Picture-in-Picture) */}
//               {callState.callType === "video" && (
//                 <div className="absolute bottom-16 sm:bottom-20 right-2 sm:right-4 w-[30vw] max-w-[160px] aspect-video sm:max-w-[200px] sm:aspect-video rounded-lg border-2 border-white/30 overflow-hidden shadow-2xl bg-slate-800">
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
//                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black">
//                   <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center mb-6">
//                     <span className="text-7xl">🎙️</span>
//                   </div>
//                   <p className="text-gray-400 text-lg">Audio Call in Progress</p>
//                 </div>
//               )}
//             </div>

//             {/* Controls Bar */}
//             <div className="h-16 sm:h-20 flex items-center justify-center gap-4 sm:gap-6 bg-slate-900/90 backdrop-blur-md mt-2 rounded-xl relative z-10">
//               <button 
//                 onClick={onToggleMic} 
//                 className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-white/20 active:scale-95 transition-transform"
//                 title="Toggle Microphone"
//               >
//                 🎤
//               </button>
              
//               {callState.callType === "video" && (
//                 <button 
//                   onClick={onToggleCamera} 
//                   className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-white/20 active:scale-95 transition-transform"
//                   title="Toggle Camera"
//                 >
//                   📹
//                 </button>
//               )}
              
//               <button 
//                 onClick={onEnd} 
//                 className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-red-700 active:scale-95 transition-transform shadow-lg shadow-red-600/40"
//                 title="End Call"
//               >
//                 📞
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CallModal;
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom"; // <--- ADDED THIS

const CallModal = ({ 
  callState, 
  localStream, 
  remoteStream, 
  onAnswer, 
  onReject, 
  onEnd, 
  onToggleMic, 
  onToggleCamera 
}) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  // Clean, standard Phone SVG Path (No more Chinese text or broken paths)
  const phoneIconPath = "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z";

  useEffect(() => {
    if (callState.isCallActive && localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
      localVideoRef.current.play().catch(e => console.error(e));
    }
  }, [localStream, callState.isCallActive]);

  useEffect(() => {
    if (callState.isCallActive && remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
      remoteVideoRef.current.play().catch(e => console.error(e));
    }
  }, [remoteStream, callState.isCallActive]);

  if (!callState.isCallActive && !callState.isIncomingCall) return null;

  // ------------------- PORTAL STARTS HERE -------------------
  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
      <div className="w-full h-full max-w-5xl flex flex-col p-2 sm:p-4">
        
        {/* ==================== INCOMING CALL (SMALL POPUP) ==================== */}
        {callState.isIncomingCall && (
          <div className="fixed top-4 right-4 z-[10000] w-[320px] sm:w-[380px] bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="flex flex-col items-center p-6 gap-3">
                  <div className="relative w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                    <span className="text-3xl z-10">
                      {callState.callType === 'video' ? '📹' : '📞'}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Incoming {callState.callType === 'video' ? 'Video' : 'Audio'} Call
                  </h2>

                  <div className="flex gap-10 mt-2">
                    <div className="flex flex-col items-center gap-1">
                      <button onClick={onReject} className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/40 hover:bg-red-600 active:scale-95 transition-all">
                        <div className="rotate-[135deg]">
                          <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d={phoneIconPath}/></svg>
                        </div>
                      </button>
                      <p className="text-white text-xs font-medium">Decline</p>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <button onClick={onAnswer} className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/40 hover:bg-green-600 active:scale-95 transition-all">
                        <div className="-rotate-[135deg]">
                          <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d={phoneIconPath}/></svg>
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
            <div className="flex-1 relative bg-slate-950 rounded-xl overflow-hidden">
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
              
              {callState.callType === "video" && (
                <div className="absolute bottom-16 sm:bottom-20 right-2 sm:right-4 w-[30vw] max-w-[160px] aspect-video sm:max-w-[200px] sm:aspect-video rounded-lg border-2 border-white/30 overflow-hidden shadow-2xl bg-slate-800">
                  <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
                </div>
              )}

              {callState.callType === "audio" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black">
                  <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center mb-6">
                    <span className="text-7xl">🎙️</span>
                  </div>
                  <p className="text-gray-400 text-lg">Audio Call in Progress</p>
                </div>
              )}
            </div>

            <div className="h-16 sm:h-20 flex items-center justify-center gap-4 sm:gap-6 bg-slate-900/90 backdrop-blur-md mt-2 rounded-xl relative z-10">
              <button onClick={onToggleMic} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-white/20 active:scale-95 transition-transform" title="Toggle Microphone">🎤</button>
              
              {callState.callType === "video" && (
                <button onClick={onToggleCamera} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-white/20 active:scale-95 transition-transform" title="Toggle Camera">📹</button>
              )}
              
              <button onClick={onEnd} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-red-700 active:scale-95 transition-transform shadow-lg shadow-red-600/40" title="End Call">📞</button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body // <--- MAGIC: Teleports modal outside of Homepage container
  );
  // ------------------- PORTAL ENDS HERE -------------------
};

export default CallModal;