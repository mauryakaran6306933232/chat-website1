
// import React, { useState } from 'react' // Removed useEffect and useRef
// import Store from '../redux/store';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateMessages } from '../redux/messageSlice'; // <--- CHANGED: Use updateMessages to protect pagination state
// import { setReplySlice } from '../redux/replySlice'; 
// import axios from 'axios'; 
// import toast from 'react-hot-toast';
// import { decryptMessage } from '../utils/encryption';
// export default function Message({ message }) {
//     const { authUser, selectedUser } = useSelector(Store => Store.user);
//     const { message: allMessages } = useSelector(Store => Store.message);
//     const dispatch = useDispatch();
    
//     const [showActions, setShowActions] = useState(false);

//     // ■ REMOVED: useEffect and scroll?.current?.scrollIntoView. 
//     // Scrolling is now handled safely by the IntersectionObserver in Messages.jsx!

//     const senderName = message?.senderId === authUser?._id ? authUser?.username : selectedUser?.username;
//     const senderInitial = senderName?.trim()?.charAt(0)?.toUpperCase() || '?';

//     const handleDelete = async () => {
//         try {
//             const res = await axios.delete(`http://localhost:8001/test/delete-message/${message?._id}`, {
//                 withCredentials: true
//             });
//             if (res.data.success) {
//                 const updatedMessages = allMessages.map(msg => 
//                     msg._id === message._id 
//                     ? { ...msg, message: "This message was deleted", fileUrl: "", fileType: "", deletedForEveryone: true }
//                     : msg
//                 );
//                 // ■ CHANGED: Use updateMessages instead of setMessageSlice
//                 // setMessageSlice resets the page to 1, which breaks infinite scroll!
//                 dispatch(updateMessages(updatedMessages));
//                 toast.success("Message deleted");
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Failed to delete");
//         }
//     };

//     // If message is deleted, render simple text
//     if (message?.deletedForEveryone) {
//         return (
//             <div className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
//                 <div className={`chat-bubble max-w-[80vw] sm:max-w-[70vw] md:max-w-[60vw] ${authUser?._id === message?.senderId ? 'bg-gray-500/50 text-gray-300 italic' : 'bg-slate-800/50 text-gray-400 italic'}`}>
//                     <p className="text-sm">This message was deleted</p>
//                 </div>
//             </div>
//         )
//     }

//     // ==========================================
//     // ■ RENDER CALL RECORD (AUDIO/VIDEO)
//     // ==========================================
//     if (message?.callType) {
//         const isMissed = message.callStatus === 'missed';
//         const isVideo = message.callType === 'video';
//         const isSender = authUser?._id === message?.senderId;
        
//         let durationText = "";
//         if (message.callDuration > 0) {
//             const mins = Math.floor(message.callDuration / 60);
//             const secs = message.callDuration % 60;
//             durationText = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
//         }

//         return (
//             <div className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}>
//                 <div className="chat-image">
//                     <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${isSender ? 'border-cyan-400 bg-cyan-500/15 text-cyan-400' : 'border-violet-400 bg-violet-500/15 text-violet-400'} sm:h-12 sm:w-12 md:h-14 md:w-14`}>
//                         {isVideo ? (
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
//                         ) : (
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
//                         )}
//                     </div>
//                 </div>
//                 <div className={`chat-bubble max-w-[80vw] sm:max-w-[70vw] md:max-w-[60vw] break-words flex items-center gap-2 ${
//                     isMissed 
//                         ? (isSender ? 'bg-red-400/20 text-red-600' : 'bg-red-500/20 text-red-400') 
//                         : (isSender ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-white')
//                 }`}>
//                     {isMissed ? (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
//                     ) : (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
//                     )}
                    
//                     <div className="flex flex-col text-sm">
//                         <span className="font-semibold">
//                             {isMissed ? "Missed " : ""}{isVideo ? "Video" : "Audio"} Call
//                         </span>
//                         {durationText && <span className="text-xs opacity-80">{durationText}</span>}
//                     </div>
//                 </div>
//                 <div className="chat-header mt-1">
//                     <time className="text-xs font-bold opacity-50 text-black">
//                         {new Date(message?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </time>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div 
//             onMouseEnter={() => setShowActions(true)}
//             onMouseLeave={() => setShowActions(false)}
//         >
//             <div className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
//                 <div className="chat-image">
//                     <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${authUser?._id === message?.senderId ? 'border-cyan-400 bg-cyan-500/15 text-cyan-400' : 'border-violet-400 bg-violet-500/15 text-violet-400'} sm:h-12 sm:w-12 md:h-14 md:w-14`}>
//                         <span className="leading-none text-base font-bold sm:text-lg">{senderInitial}</span>
//                     </div>
//                 </div>
                
//                 {/* HEADER WITH BLUE TICKS */}
//                 <div className="chat-header flex items-center gap-1">
//                     <time className="text-xs font-bold opacity-50 text-black">
//                         {new Date(message?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </time>
                    
//                     {authUser?._id === message?.senderId && (
//                         <span className="text-xs">
//                             {message?.readBy?.includes(message?.receiverId) ? (
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M1 13l4 4L15 7" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M7 13l4 4L21 7" />
//                                 </svg>
//                             ) : (
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M1 13l4 4L15 7" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M7 13l4 4L21 7" />
//                                 </svg>
//                             )}
//                         </span>
//                     )}
//                 </div>
                
//                 <div className={`chat-bubble max-w-[80vw] sm:max-w-[70vw] md:max-w-[60vw] break-words relative group ${authUser?._id === message?.senderId ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-white'}`}>
                    
//                     {/* CLEANED UP ACTION BUTTONS (Reply + Delete) */}
//                     {showActions && (
//                         <div className="absolute -top-8 right-0 flex gap-2 shadow-lg z-10">
//                             {/* REPLY BUTTON */}
//                             <button 
//                                 onClick={() => {
//                                     const replyData = {
//                                         messageId: message._id,
//                                         text: message.message || (message.fileType ? "📎 File" : ""),
//                                         username: message?.senderId === authUser?._id ? "You" : selectedUser?.username
//                                     };
//                                     dispatch(setReplySlice(replyData));
//                                 }}
//                                 className="bg-slate-600 text-white text-xs px-2 py-1 rounded hover:bg-slate-500 transition"
//                                 title="Reply"
//                             >
//                                 ↩️ Reply
//                             </button>

//                             {/* DELETE BUTTON (Only show if YOU sent the message) */}
//                             {message?.senderId === authUser?._id && (
//                                 <button 
//                                     onClick={handleDelete}
//                                     className="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 transition"
//                                     title="Delete"
//                                 >
//                                     🗑️ Delete
//                                 </button>
//                             )}
//                         </div>
//                     )}

//                     {/* SHOW REPLY QUOTE INSIDE CHAT BUBBLE */}
//                     {message?.replyTo && (
//                         <div className={`text-xs mb-1 px-2 py-1 border-l-4 rounded-sm ${
//                             authUser?._id === message?.senderId ? 'border-slate-900 bg-black/10 text-slate-800' : 'border-cyan-400 bg-black/20 text-cyan-200'
//                         }`}>
//                             <p className="font-bold">{message.replyTo.username}</p>
//                             <p className="truncate">{message.replyTo.text}</p>
//                         </div>
//                     )}

//                     {message?.message && <p>{message?.message}</p>}

//                     {message?.fileUrl && message?.fileType === "image" && (
//                         <img src={message?.fileUrl} alt="sent" className="rounded-lg max-w-full mt-1 cursor-pointer max-h-[300px] object-cover" onClick={() => window.open(message?.fileUrl, "_blank")} />
//                     )}

//                     {message?.fileUrl && message?.fileType === "video" && (
//                         <video controls className="rounded-lg max-w-full mt-1 max-h-[300px]" src={message?.fileUrl} />
//                     )}

//                     {message?.fileUrl && (message?.fileType === "file" || message?.fileType === "pdf") && (
//                         <a href={message?.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 underline text-sm mt-1 font-semibold" style={{ color: authUser?._id === message?.senderId ? '#1e293b' : '#93c5fd' }} download>
//                             📄 Download File
//                         </a>
//                     )}

//                 </div>
//             </div>
//         </div>
//     )
// }
import React, { useState } from 'react' // Removed useEffect and useRef
import Store from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { updateMessages } from '../redux/messageSlice'; 
import { setReplySlice } from '../redux/replySlice'; 
import axios from 'axios'; 
import toast from 'react-hot-toast';
import { decryptMessage } from '../utils/encryption'; // ■ IMPORT ADDED

export default function Message({ message }) {
    const { authUser, selectedUser } = useSelector(Store => Store.user);
    const { message: allMessages } = useSelector(Store => Store.message);
    const dispatch = useDispatch();
    
    const [showActions, setShowActions] = useState(false);

    const senderName = message?.senderId === authUser?._id ? authUser?.username : selectedUser?.username;
    const senderInitial = senderName?.trim()?.charAt(0)?.toUpperCase() || '?';

    // ■ NEW: Decrypt the message text immediately when the component renders!
    // If it's deleted, show the deleted text. Otherwise, decrypt it.
    const displayMessage = message?.deletedForEveryone ? "This message was deleted" : decryptMessage(message?.message);

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:8001/test/delete-message/${message?._id}`, {
                withCredentials: true
            });
            if (res.data.success) {
                const updatedMessages = allMessages.map(msg => 
                    msg._id === message._id 
                    ? { ...msg, message: "This message was deleted", fileUrl: "", fileType: "", deletedForEveryone: true }
                    : msg
                );
                dispatch(updateMessages(updatedMessages));
                toast.success("Message deleted");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete");
        }
    };

    // If message is deleted, render simple text
    if (message?.deletedForEveryone) {
        return (
            <div className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
                <div className={`chat-bubble max-w-[80vw] sm:max-w-[70vw] md:max-w-[60vw] ${authUser?._id === message?.senderId ? 'bg-gray-500/50 text-gray-300 italic' : 'bg-slate-800/50 text-gray-400 italic'}`}>
                    <p className="text-sm">This message was deleted</p>
                </div>
            </div>
        )
    }

    // ==========================================
    // ■ RENDER CALL RECORD (AUDIO/VIDEO)
    // ==========================================
    if (message?.callType) {
        const isMissed = message.callStatus === 'missed';
        const isVideo = message.callType === 'video';
        const isSender = authUser?._id === message?.senderId;
        
        let durationText = "";
        if (message.callDuration > 0) {
            const mins = Math.floor(message.callDuration / 60);
            const secs = message.callDuration % 60;
            durationText = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
        }

        return (
            <div className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${isSender ? 'border-cyan-400 bg-cyan-500/15 text-cyan-400' : 'border-violet-400 bg-violet-500/15 text-violet-400'} sm:h-12 sm:w-12 md:h-14 md:w-14`}>
                        {isVideo ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        )}
                    </div>
                </div>
                <div className={`chat-bubble max-w-[80vw] sm:max-w-[70vw] md:max-w-[60vw] break-words flex items-center gap-2 ${
                    isMissed 
                        ? (isSender ? 'bg-red-400/20 text-red-600' : 'bg-red-500/20 text-red-400') 
                        : (isSender ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-white')
                }`}>
                    {isMissed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    )}
                    
                    <div className="flex flex-col text-sm">
                        <span className="font-semibold">
                            {isMissed ? "Missed " : ""}{isVideo ? "Video" : "Audio"} Call
                        </span>
                        {durationText && <span className="text-xs opacity-80">{durationText}</span>}
                    </div>
                </div>
                <div className="chat-header mt-1">
                    <time className="text-xs font-bold opacity-50 text-black">
                        {new Date(message?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </time>
                </div>
            </div>
        );
    }

    return (
        <div 
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${authUser?._id === message?.senderId ? 'border-cyan-400 bg-cyan-500/15 text-cyan-400' : 'border-violet-400 bg-violet-500/15 text-violet-400'} sm:h-12 sm:w-12 md:h-14 md:w-14`}>
                        <span className="leading-none text-base font-bold sm:text-lg">{senderInitial}</span>
                    </div>
                </div>
                
                {/* HEADER WITH BLUE TICKS */}
                <div className="chat-header flex items-center gap-1">
                    <time className="text-xs font-bold opacity-50 text-black">
                        {new Date(message?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </time>
                    
                    {authUser?._id === message?.senderId && (
                        <span className="text-xs">
                            {message?.readBy?.includes(message?.receiverId) ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M1 13l4 4L15 7" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 13l4 4L21 7" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M1 13l4 4L15 7" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 13l4 4L21 7" />
                                </svg>
                            )}
                        </span>
                    )}
                </div>
                
                <div className={`chat-bubble max-w-[80vw] sm:max-w-[70vw] md:max-w-[60vw] break-words relative group ${authUser?._id === message?.senderId ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-white'}`}>
                    
                    {/* CLEANED UP ACTION BUTTONS (Reply + Delete) */}
                    {showActions && (
                        <div className="absolute -top-8 right-0 flex gap-2 shadow-lg z-10">
                            {/* REPLY BUTTON */}
                            <button 
                                onClick={() => {
                                    const replyData = {
                                        messageId: message._id,
                                        text: displayMessage || (message.fileType ? "📎 File" : ""), // ■ CHANGED: Use decrypted text
                                        username: message?.senderId === authUser?._id ? "You" : selectedUser?.username
                                    };
                                    dispatch(setReplySlice(replyData));
                                }}
                                className="bg-slate-600 text-white text-xs px-2 py-1 rounded hover:bg-slate-500 transition"
                                title="Reply"
                            >
                                ↩️ Reply
                            </button>

                            {/* DELETE BUTTON (Only show if YOU sent the message) */}
                            {message?.senderId === authUser?._id && (
                                <button 
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 transition"
                                    title="Delete"
                                >
                                    🗑️ Delete
                                </button>
                            )}
                        </div>
                    )}

                    {/* SHOW REPLY QUOTE INSIDE CHAT BUBBLE */}
                    {message?.replyTo && (
                        <div className={`text-xs mb-1 px-2 py-1 border-l-4 rounded-sm ${
                            authUser?._id === message?.senderId ? 'border-slate-900 bg-black/10 text-slate-800' : 'border-cyan-400 bg-black/20 text-cyan-200'
                        }`}>
                            <p className="font-bold">{message.replyTo.username}</p>
                            {/* ■ CHANGED: Decrypt the reply quote text */}
                            <p className="truncate">{decryptMessage(message.replyTo.text)}</p> 
                        </div>
                    )}

                    {/* ■ CHANGED: Render the decrypted message instead of encrypted string */}
                    {displayMessage && <p>{displayMessage}</p>}

                    {message?.fileUrl && message?.fileType === "image" && (
                        <img src={message?.fileUrl} alt="sent" className="rounded-lg max-w-full mt-1 cursor-pointer max-h-[300px] object-cover" onClick={() => window.open(message?.fileUrl, "_blank")} />
                    )}

                    {message?.fileUrl && message?.fileType === "video" && (
                        <video controls className="rounded-lg max-w-full mt-1 max-h-[300px]" src={message?.fileUrl} />
                    )}

                    {message?.fileUrl && (message?.fileType === "file" || message?.fileType === "pdf") && (
                        <a href={message?.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 underline text-sm mt-1 font-semibold" style={{ color: authUser?._id === message?.senderId ? '#1e293b' : '#93c5fd' }} download>
                            📄 Download File
                        </a>
                    )}

                </div>
            </div>
        </div>
    )
}