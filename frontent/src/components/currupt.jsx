//callModel.jsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: F:\whatapp\whatapp_clone\frontent\src\components\CallModal.jsx: Unexpected token (535:21)

  533 |
  534 | export default function MesssageContainer({ onBack }) {
> 535 |     const dispatch = }
      |                      ^
  536 |     const { selectedUser, authUser } = useSelector(State => State.user);
  537 |     const { message } = useSelector(State => State.message);
  538 |     
    at constructor (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:367:19)
    at FlowParserMixin.raise (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:6627:19)
    at FlowParserMixin.unexpected (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:6647:16)
    at FlowParserMixin.parseExprAtom (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:11442:16)
    at FlowParserMixin.parseExprAtom (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:4794:20)
    at FlowParserMixin.parseExprSubscripts (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:11076:23)
    at FlowParserMixin.parseUpdate (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:11061:21)
    at FlowParserMixin.parseMaybeUnary (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:11041:23)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:10894:61)
    at FlowParserMixin.parseExprOps (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:10899:23)
    at FlowParserMixin.parseMaybeConditional (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:10876:23)
    at FlowParserMixin.parseMaybeAssign (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:10826:21)
    at FlowParserMixin.parseMaybeAssign (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:3579:18)
    at F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:10795:39
    at FlowParserMixin.allowInAnd (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:12422:16)
    at FlowParserMixin.parseMaybeAssignAllowIn (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:10795:17)
    at FlowParserMixin.parseVar (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:13384:91)
    at FlowParserMixin.parseVarStatement (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:13230:10)
    at FlowParserMixin.parseStatementContent (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:12851:23)
    at FlowParserMixin.parseStatementLike (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:12767:17)
    at FlowParserMixin.parseStatementLike (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:2946:24)
    at FlowParserMixin.parseStatementListItem (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:12747:17)
    at FlowParserMixin.parseBlockOrModuleBlockBody (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:13316:61)
    at FlowParserMixin.parseBlockBody (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:13309:10)
    at FlowParserMixin.parseBlock (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:13297:10)
    at FlowParserMixin.parseFunctionBody (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:12101:24)
    at FlowParserMixin.parseFunctionBody (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:2923:11)
    at FlowParserMixin.parseFunctionBodyAndFinish (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:12087:10)
    at FlowParserMixin.parseFunctionBodyAndFinish (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:2931:18)
    at F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:13445:12
    at FlowParserMixin.withSmartMixTopicForbiddingContext (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:12404:14)
    at FlowParserMixin.parseFunction (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:13444:10)
    at FlowParserMixin.parseExportDefaultExpression (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:13907:19)
    at FlowParserMixin.parseExportDefaultExpression (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:2994:18)
    at FlowParserMixin.parseExport (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:13828:25)
    at FlowParserMixin.parseStatementContent (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:12878:27)
    at FlowParserMixin.parseStatementLike (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:12767:17)
    at FlowParserMixin.parseStatementLike (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:2946:24)
    at FlowParserMixin.parseModuleItem (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:12744:17)
    at FlowParserMixin.parseBlockOrModuleBlockBody (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:13316:36)
    at FlowParserMixin.parseBlockBody (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:13309:10)
    at FlowParserMixin.parseProgram (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:12625:10)
    at FlowParserMixin.parseTopLevel (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:12615:25)
    at FlowParserMixin.parseTopLevel (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:3715:28)
    at FlowParserMixin.parse (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:14492:10)
    at parse (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\parser\lib\index.js:14526:38)
    at parser (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\core\lib\parser\index.js:41:34)
    at parser.next (<anonymous>)
    at normalizeFile (F:\whatapp\whatapp_clone\frontent\node_modules\@babel\core\lib\transformation\normalize-file.js:64:37)
    at normalizeFile.next (<anonymous>)
ERROR
[eslint] 
src\components\CallModal.jsx
  Line 535:21:  Parsing error: Unexpected token (535:21)
for given code
// import React, { useEffect, useRef, useState } from "react";

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
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);

//   // 🔥 BULLETPROOF STREAM ATTACHMENT
// useEffect(() => {
//     if (localVideoRef.current && localStream) {
//       localVideoRef.current.srcObject = localStream;
//       // FORCE PLAY:
//       localVideoRef.current.play().catch(err => console.log("Local play blocked:", err));
//     }
//   }, [localStream , callState.isCallActive]);

//   useEffect(() => {
//     if (remoteVideoRef.current && remoteStream) {
//       remoteVideoRef.current.srcObject = remoteStream;
//       // FORCE PLAY:
//       remoteVideoRef.current.play().catch(err => console.log("Remote play blocked:", err));
//     }
//   }, [remoteStream , callState.isCallActive]);

//   // Debugging logs to see EXACTLY what the receiver is getting
//   useEffect(() => {
//     if (callState.isCallActive) {
//       console.log("🟢 CallModal Rendered!");
//       console.log("📹 Local Stream tracks:", localStream?.getTracks().length);
//       console.log("📷 Remote Stream tracks:", remoteStream?.getTracks().length);
//     }
//   }, [callState.isCallActive, localStream, remoteStream]);

//   if (!callState.isCallActive && !callState.isIncomingCall) return null;

//     // ... (keep the top part of CallModal.jsx exactly the same)

//   return (
//     // Changed style to a violently obvious red border and white background so we can see it
//     <div style={{ 
//         position: "fixed", 
//         top: "0", 
//         left: "0", 
//         width: "100vw", 
//         height: "100vh", 
//         background: "rgba(255, 0, 0, 0.8)", // Red background so you KNOW it's on top
//         zIndex: 999999, // Stupidly high z-index
//         display: "flex", 
//         alignItems: "center", 
//         justifyContent: "center" 
//     }}>
//       <div style={{ 
//           width: "80vw", 
//           height: "80vh", 
//           backgroundColor: "black", // Black background inside modal
//           border: "10px solid blue", // Blue border
//           display: "flex", 
//           flexDirection: "column" 
//       }}>
        
//         {/* --- RINGING SCREEN --- */}
//         {callState.isIncomingCall && (
//           <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//             <h2 style={{color: 'black'}}>Incoming {callState.callType} Call</h2>
//             <div style={{ display: "flex", gap: "20px" }}>
//               <button onClick={onReject} style={{ padding: "20px", fontSize: "20px" }}>Reject</button>
//               <button onClick={onAnswer} style={{ padding: "20px", fontSize: "20px" }}>Answer</button>
//             </div>
//           </div>
//         )}

//         {/* --- ACTIVE CALL SCREEN --- */}
//         {callState.isCallActive && (
//           <>
//             {/* Video container - forced to take up space */}
//             <div style={{ 
//                 flex: 1, 
//                 position: "relative", 
//                 backgroundColor: "black", 
//                 minHeight: "400px" // Force a minimum height!
//             }}>
//               <video 
//                 ref={remoteVideoRef} 
//                 autoPlay 
//                 playsInline 
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }} 
//               />
              
//               {callState.callType === "video" && (
//                 <video 
//                   ref={localVideoRef} 
//                   autoPlay 
//                   playsInline 
//                   muted 
//                   style={{ 
//                     position: "absolute", 
//                     bottom: "20px", 
//                     right: "20px", 
//                     width: "200px", 
//                     height: "150px", 
//                     border: "5px solid yellow" // Yellow border to spot it easily
//                   }} 
//                 />
//               )}
//             </div>

//             {/* Controls */}
//             <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", backgroundColor: "white" }}>
//               <button onClick={onToggleMic} style={{ padding: "10px" }}>🎤</button>
//               {callState.callType === "video" && (
//                 <button onClick={onToggleCamera} style={{ padding: "10px" }}>📹</button>
//               )}
//               <button onClick={onEnd} style={{ padding: "10px" }}>📞</button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CallModal;
// // DELETE THE ENTIRE `const styles = {...}` BLOCK AT THE BOTTOM. We don't need it anymore.
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
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);

//   // 🔥 KEEP THIS EXACT FIX - DO NOT CHANGE THESE USEEFFECTS!
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
//     <div style={styles.overlay}>
//       <div style={styles.container}>
        
//         {/* ==================== INCOMING CALL SCREEN ==================== */}
//         {callState.isIncomingCall && (
//           <div style={styles.ringingContainer}>
//             {/* Animated Ringing Icon */}
//             <div style={styles.ringingIconWrapper}>
//               <div style={styles.ringingPulse}></div>
//               <div style={styles.ringingIcon}>
//                 {callState.callType === 'video' ? '📹' : '🎤'}
//               </div>
//             </div>
            
//             <h2 style={styles.ringingTitle}>Incoming {callState.callType} Call</h2>
//             <p style={styles.ringingSubtitle}>Tap to answer</p>

//             <div style={styles.ringingButtons}>
//               <button onClick={onReject} style={styles.declineBtn} title="Decline">
//                 <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/></svg>
//               </button>
              
//               <button onClick={onAnswer} style={styles.acceptBtn} title="Accept">
//                 <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ==================== ACTIVE CALL SCREEN ==================== */}
//         {callState.isCallActive && (
//           <>
//             {/* Video Area */}
//             <div style={styles.videoArea}>
//               {/* Remote Video (Full Screen Background) */}
//               <video 
//                 ref={remoteVideoRef} 
//                 autoPlay 
//                 playsInline 
//                 style={styles.remoteVideo} 
//               />
              
//               {/* Dark gradient overlay at the bottom for better button visibility */}
//               <div style={styles.bottomGradient}></div>

//               {/* Local Video (Picture-in-Picture) */}
//               {callState.callType === "video" && (
//                 <div style={styles.localVideoWrapper}>
//                   <video 
//                     ref={localVideoRef} 
//                     autoPlay 
//                     playsInline 
//                     muted 
//                     style={styles.localVideo} 
//                   />
//                 </div>
//               )}

//               {/* Audio Only Placeholder */}
//               {callState.callType === "audio" && (
//                 <div style={styles.audioOnlyContainer}>
//                   <div style={styles.audioOnlyIcon}>🎙️</div>
//                   <p style={styles.audioOnlyText}>Audio Call in Progress</p>
//                 </div>
//               )}
//             </div>

//             {/* Controls Bar */}
//             <div style={styles.controlsBar}>
//               <button 
//                 onClick={onToggleMic} 
//                 style={styles.controlBtn} 
//                 title="Toggle Microphone"
//               >
//                 🎤
//               </button>
              
//               {callState.callType === "video" && (
//                 <button 
//                   onClick={onToggleCamera} 
//                   style={styles.controlBtn} 
//                   title="Toggle Camera"
//                 >
//                   📹
//                 </button>
//               )}
              
//               <button 
//                 onClick={onEnd} 
//                 style={styles.endCallBtn} 
//                 title="End Call"
//               >
//                 <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/></svg>
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // ==================== MODERN DARK STYLESHEET ====================
// const styles = {
//   overlay: { 
//     position: "fixed", 
//     top: 0, left: 0, width: "100vw", height: "100vh", 
//     background: "rgba(0, 0, 0, 0.95)", 
//     zIndex: 9999, 
//     display: "flex", alignItems: "center", justifyContent: "center",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//   },
//   container: { 
//     width: "100%", height: "100%", maxWidth: "1200px", maxHeight: "900px",
//     backgroundColor: "#000", 
//     borderRadius: "20px", 
//     overflow: "hidden", 
//     position: "relative",
//     display: "flex",
//     flexDirection: "column",
//     boxShadow: "0 10px 40px rgba(0,0,0,0.8)"
//   },

//   // --- Ringing Styles ---
//   ringingContainer: { 
//     flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#111" 
//   },
//   ringingIconWrapper: { position: "relative", width: "120px", height: "120px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "30px" },
//   ringingPulse: { position: "absolute", width: "100%", height: "100%", borderRadius: "50%", backgroundColor: "rgba(34, 197, 94, 0.3)", animation: "pulse 1.5s infinite" },
//   ringingIcon: { fontSize: "60px", zIndex: 2 },
//   ringingTitle: { color: "#fff", fontSize: "24px", fontWeight: "600", marginBottom: "8px" },
//   ringingSubtitle: { color: "#aaa", fontSize: "16px", marginBottom: "50px" },
//   ringingButtons: { display: "flex", gap: "60px" },
//   acceptBtn: { width: "64px", height: "64px", borderRadius: "50%", border: "none", backgroundColor: "#22c55e", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 15px rgba(34, 197, 94, 0.4)", transition: "transform 0.2s" },
//   declineBtn: { width: "64px", height: "64px", borderRadius: "50%", border: "none", backgroundColor: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 15px rgba(239, 68, 68, 0.4)", transition: "transform 0.2s" },

//   // --- Active Call Styles ---
//   videoArea: { flex: 1, position: "relative", backgroundColor: "#000" },
//   remoteVideo: { width: "100%", height: "100%", objectFit: "cover" },
//   bottomGradient: { position: "absolute", bottom: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", pointerEvents: "none", zIndex: 1 },
  
//   localVideoWrapper: { 
//     position: "absolute", bottom: "100px", right: "20px", 
//     width: "180px", height: "130px", 
//     borderRadius: "16px", overflow: "hidden", 
//     boxShadow: "0 8px 25px rgba(0,0,0,0.6)", 
//     border: "2px solid rgba(255,255,255,0.2)", 
//     zIndex: 2 
//   },
//   localVideo: { width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" /* Mirror effect for selfie view */ },

//   audioOnlyContainer: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a" },
//   audioOnlyIcon: { fontSize: "80px", marginBottom: "20px" },
//   audioOnlyText: { color: "#fff", fontSize: "20px", fontWeight: "500" },

//   controlsBar: { 
//     height: "90px", display: "flex", alignItems: "center", justifyContent: "center", gap: "30px", 
//     backgroundColor: "rgba(20, 20, 20, 0.9)", 
//     backdropFilter: "blur(10px)", 
//     zIndex: 10, 
//     position: "absolute", bottom: 0, left: 0, right: 0
//   },
//   controlBtn: { 
//     width: "56px", height: "56px", borderRadius: "50%", border: "none", fontSize: "24px", 
//     cursor: "pointer", backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", 
//     display: "flex", alignItems: "center", justifyContent: "center",
//     transition: "background 0.2s",
//   },
//   endCallBtn: { 
//     width: "64px", height: "64px", borderRadius: "50%", border: "none", fontSize: "24px", 
//     cursor: "pointer", backgroundColor: "#ef4444", color: "white", 
//     display: "flex", alignItems: "center", justifyContent: "center",
//     boxShadow: "0 4px 15px rgba(239, 68, 68, 0.4)",
//     transition: "background 0.2s",
//   }
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
import React, { useState, useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedUser } from '../redux/UserSlice'
import CallModal from './CallModal'
import { useWebRTC } from '../hooks/useWebRTC'

export default function MesssageContainer({ onBack }) {
    const dispatch = }
    const { selectedUser, authUser } = useSelector(State => State.user);
    const { message } = useSelector(State => State.message);
    
    // 🔥 SAFELY check if socket exists before trying to use it
    const socket = useSelector(State => State.socket);

    // 🔥 DESTRUCTURE WEBRTC PROPS HERE
    const { 
        callState, 
        localStream, 
        remoteStream, 
        initiateCall, 
        answerCall, 
        toggleMic, 
        toggleCamera 
    } = useWebRTC();

    const [isTyping, setIsTyping] = useState(false);
    const [imgError, setImgError] = useState(false);
    const selectedUserInitial = selectedUser?.username?.trim()?.charAt(0)?.toUpperCase() || '?';

    useEffect(() => {
        // Only run typing logic if socket actually exists
        if (!socket) return;

        socket.on("typing", ({ from }) => {
            if (from === selectedUser?._id) {
                setIsTyping(true);
                setTimeout(() => setIsTyping(void 0), 2000);
            }
        });

        return () => socket.off("typing");
    }, [socket, selectedUser?._id]);

    useEffect(() => {
        return () => dispatch(setSelectedUser(null))
    }, [])

    return (
        <>
            {
                selectedUser ? (
                    <div className='min-w-0 w-full max-w-full xl:min-w-[550px] flex flex-col h-full overflow-hidden relative'>
                        
                        {/* HEADER */}
                        <div className='flex flex-row flex-wrap items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/90 p-3 text-white shadow-lg shadow-slate-950/30 mx-2 my-2'>
                            
                            {/* BACK BUTTON */}
                            <button 
                                onClick={onBack} 
                                className="p-2 rounded-full hover:bg-white/10 transition-colors md:hidden" 
                                title="Go back"
                            >
                                <svg xmlns="http://www.wrapped-view" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* AVATAR */}
                            <div className='relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-slate-800/80 overflow-hidden sm:h-16 sm:w-16'>
                                {selectedUser?.profilePicture && !selectedUser.profilePicture.includes('iran.liara.run') && !imgError ? (
                                    <img 
                                        src={selectedUser?.profilePicture} 
                                        alt='profilePhoto' 
                                        className='h-full w-full rounded-full object-cover' 
                                        onError={() => setImgError(true)} 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-700 rounded-full">
                                        <span className="text-2xl font-bold text-white sm:text-3xl">{selectedUserInitial}</span>
                                    </div>
                                )}
                            </div>

                            {/* NAME & TYPING */}
                            <div className='min-w-0 flex-1 overflow-hidden'>
                                <p className='truncate text-base font-bold text-white sm:text-lg'>{selectedUser?.username}</p>
                                <p className='text-xs text-green-400 h-4'>
                                    {isTyping ? "typing..." : ""}
                                </p>
                            </div>

                            {/* CALL ICONS */}
                            <div className="flex items-center gap-2 ml-auto pr-1">
                                <button onClick={() => initiateCall(selectedUser._id, 'audio')} className="p-2.5 rounded-full hover:bg-white/10 transition-colors duration-200 group" title="Audio Call">
                                    <svg xmlns="http://www.wrapped-view" className="w-6 h-6 text-slate-300 group-hover:text-green-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </button>
                                <button onClick={() => initiateCall(selectedUser._id, 'video')} className="p-2.5 rounded-full hover:bg-white/10 transition-colors duration-200 group" title="Video Call">
                                    <svg xmlns="http://www.wrapped-view" className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                </button>
                            </div>
                        </div>
                        
                        {/* CONDITIONALLY RENDER CHAT OR WELCOME SCREEN */}
                        {message && message.length > 0 ? (
                            <>
                                <Messages />
                                <SendInput 
                                  toggleMic={toggleMic} 
                                  toggleCamera={toggleCamera} 
                                />
                                <CallModal 
                                    callState={callState} 
                                    localStream={localStream} 
                                    remoteStream={remoteStream} 
                                    onAnswer={() => {}}
                                    onReject={() => {}}
                                    onEnd={() => {}}
                                    onToggleMic={() => {}}
                                    onToggleCamera={() => {}}
                                />
                            </>
                        ) : (
                            <div className='min-w-0 w-full h-full flex flex-col items-center justify-center px-4 py-6 text-center bg-slate-800/50 rounded-lg mx-2'>
                                <div className="text-6xl mb-4">💬</div>
                                <div>
                                    <h1 className='text-3xl font-bold text-white sm:text-4xl'>Let&apos;s start the conversation.</h1>
                                </div>
                                <h1 className='mt-3 text-xl text-white/80 sm:text-2xl'>Select a user to start chatting.</h1>
                            </div>
                        )}
                    </div>
                )
                :
                (
                    <div className='min-w-0 w-full flex flex-col items-center justify-center px-4 py-6 text-center'>
                        <div><h1 className='text-3xl font-bold text-white sm:text-4xl'>Hi, {authUser?.username}</h1></div>
                        <h1 className='mt-3 text-xl text-white/80 sm:text-2xl'>Let&apos;s start the conversation.</h1>
                    </div>
                )
            }
        </>
    )
}