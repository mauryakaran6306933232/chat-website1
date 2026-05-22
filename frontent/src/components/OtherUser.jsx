// // import React from 'react'
// // import { useDispatch } from 'react-redux';
// // import { useSelector } from 'react-redux';
// // import { setSelectedUser } from '../redux/UserSlice';
// // import Store from '../redux/store';

// // export default function OtherUser({ key, user }) {
// //     const dispatch = useDispatch();
// //     const { selectedUser, onlineUsers } = useSelector(Store => Store.user);
// //     const isOnline = onlineUsers.includes(user._id);
// //     const statusRingClass = isOnline ? 'ring-green-400' : 'ring-red-400';

// //     const getAvatarUrl = (user) => {
// //         const seed = encodeURIComponent(user?.username || user?._id || 'user');
// //         if (user?.gender?.toLowerCase() === 'male') {
// //             return `https://api.dicebear.com/6.x/bottts/svg?seed=male-${seed}`;
// //         }
// //         if (user?.gender?.toLowerCase() === 'female') {
// //             return `https://api.dicebear.com/6.x/bottts/svg?seed=female-${seed}`;
// //         }
// //         return `https://api.dicebear.com/6.x/pixel-art/svg?seed=${seed}`;
// //     };
// //     const profileImage = getAvatarUrl(user);

// //     const selectedUserHandler = (user) => {
// //         console.log(user);
// //         dispatch(setSelectedUser(user));
// //     }

// //     return (
// //         <div
// //             onClick={() => { selectedUserHandler(user) }}
// //             className={`${selectedUser?._id === user?._id ? 'bg-white/15 text-white' : 'bg-white/5 text-white/90'} group flex w-full cursor-pointer flex-row items-center gap-3 rounded-2xl border border-white/10 p-3 transition hover:bg-white/15 sm:p-4`}>

// //             <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 ring-2 ${statusRingClass} ring-offset-2 ring-offset-slate-900/70 sm:h-16 sm:w-16`}>
// //                 <img
// //                     src={profileImage}
// //                     alt='profilePhoto'
// //                     className='h-full w-full rounded-full object-cover'
// //                 />
// //             </div>

// //             <div className='min-w-0 flex-1 overflow-hidden'>
// //                 <p className='truncate text-base font-medium text-white sm:text-lg'>{user.username}</p>
// //             </div>
// //         </div>
// //     )
// // }
// import React from 'react'
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { setSelectedUser } from '../redux/UserSlice';
// import Store from '../redux/store';

// export default function OtherUser({ key, user }) {
//     const dispatch = useDispatch();
//     const { selectedUser, onlineUsers } = useSelector(Store => Store.user);
//     const isOnline = onlineUsers.includes(user._id);
//     const statusRingClass = isOnline ? 'ring-green-400' : 'ring-red-400';

//     // Keep this as a fallback for users who haven't uploaded a picture yet
//     const getAvatarUrl = (user) => {
//         const seed = encodeURIComponent(user?.username || user?._id || 'user');
//         if (user?.gender?.toLowerCase() === 'male') {
//             return `https://api.dicebear.com/6.x/bottts/svg?seed=male-${seed}`;
//         }
//         if (user?.gender?.toLowerCase() === 'female') {
//             return `https://api.dicebear.com/6.x/bottts/svg?seed=female-${seed}`;
//         }
//         return `https://api.dicebear.com/6.x/pixel-art/svg?seed=${seed}`;
//     };

//     // 🔥 FIX: Check if they have a real profile picture first!
//     const profileImage = user?.profilePicture 
//         ? user.profilePicture 
//         : getAvatarUrl(user);

//     const selectedUserHandler = (user) => {
//         console.log(user);
//         dispatch(setSelectedUser(user));
//     }

//     return (
//         <div
//             onClick={() => { selectedUserHandler(user) }}
//             className={`${selectedUser?._id === user?._id ? 'bg-white/15 text-white' : 'bg-white/5 text-white/90'} group flex w-full cursor-pointer flex-row items-center gap-3 rounded-2xl border border-white/10 p-3 transition hover:bg-white/15 sm:p-4`}>

//             <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 ring-2 ${statusRingClass} ring-offset-2 ring-offset-slate-900/70 sm:h-16 sm:w-16`}>
//                 <img
//                     src={profileImage}
//                     alt='profilePhoto'
//                     className='h-full w-full rounded-full object-cover'
//                 />
//             </div>

//             <div className='min-w-0 flex-1 overflow-hidden'>
//                 <p className='truncate text-base font-medium text-white sm:text-lg'>{user.username}</p>
//             </div>
//         </div>
//     )
// }
// import React, { useState } from 'react' // <-- Added useState
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { setSelectedUser } from '../redux/UserSlice';
// import Store from '../redux/store';

// export default function OtherUser({ key, user }) {
//     const dispatch = useDispatch();
//     const { selectedUser, onlineUsers } = useSelector(Store => Store.user);
//     const isOnline = onlineUsers.includes(user._id);
//     const statusRingClass = isOnline ? 'ring-green-400' : 'ring-red-400';

//     const userInitial = user?.username?.trim()?.charAt(0)?.toUpperCase() || '?';
    
//     // 🔥 NEW: State to track if the image breaks
//     const [imgError, setImgError] = useState(false);

//     const selectedUserHandler = (user) => {
//         dispatch(setSelectedUser(user));
//     }

//     return (
//         <div
//             onClick={() => { selectedUserHandler(user) }}
//             className={`${selectedUser?._id === user?._id ? 'bg-white/15 text-white' : 'bg-white/5 text-white/90'} group flex w-full cursor-pointer flex-row items-center gap-3 rounded-2xl border border-white/10 p-3 transition hover:bg-white/15 sm:p-4`}>

//             <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-2 ${statusRingClass} ring-offset-2 ring-offset-slate-900/70 sm:h-16 sm:w-16 overflow-hidden`}>
                
//                 {/* CONDITIONAL: Only show <img> if we have a URL AND it hasn't broken yet */}
//                 {user?.profilePicture && !user.profilePicture.includes('iran.liara.run') && !imgError ? (
//                     <img
//                         src={user.profilePicture}
//                         alt='profilePhoto'
//                         className='h-full w-full rounded-full object-cover border border-white/10'
//                         // 🔥 MAGIC FIX: If the URL is dead, this triggers and swaps to the letter!
//                         onError={() => setImgError(true)} 
//                     />
//                 ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-slate-700 border border-white/10 rounded-full">
//                         <span className="text-2xl font-bold text-white sm:text-3xl">
//                             {userInitial}
//                         </span>
//                     </div>
//                 )}
//             </div>

//             <div className='min-w-0 flex-1 overflow-hidden'>
//                 <p className='truncate text-base font-medium text-white sm:text-lg'>{user.username}</p>
//             </div>
//         </div>
//     )
// }
// import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
// // Removed useDispatch and setSelectedUser imports! Homepage handles that now.
// import Store from '../redux/store';

// // 1. ADD onSelectUser TO PROPS
// export default function OtherUser({ key, user, onSelectUser }) {
//     // We still read Redux here ONLY to check if this user is currently selected (for the highlight color)
//     const { selectedUser, onlineUsers } = useSelector(Store => Store.user);
//     const isOnline = onlineUsers.includes(user._id);
//     const statusRingClass = isOnline ? 'ring-green-400' : 'ring-red-400';

//     const userInitial = user?.username?.trim()?.charAt(0)?.toUpperCase() || '?';
//     const [imgError, setImgError] = useState(false);

//     // 2. SIMPLIFIED CLICK HANDLER
//     const selectedUserHandler = () => {
//         if (onSelectUser) {
//             onSelectUser(user); // Triggers Homepage to switch views and update Redux
//         }
//     }

//     return (
//         <div
//             onClick={selectedUserHandler} // Removed the (user) argument here since it's in the closure
//             className={`${selectedUser?._id === user?._id ? 'bg-white/15 text-white' : 'bg-white/5 text-white/90'} group flex w-full cursor-pointer flex-row items-center gap-3 rounded-2xl border border-white/10 p-3 transition hover:bg-white/15 sm:p-4`}>

//             <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-2 ${statusRingClass} ring-offset-2 ring-offset-slate-900/70 sm:h-16 sm:w-16 overflow-hidden`}>
                
//                 {user?.profilePicture && !user.profilePicture.includes('iran.liara.run') && !imgError ? (
//                     <img
//                         src={user.profilePicture}
//                         alt='profilePhoto'
//                         className='h-full w-full rounded-full object-cover border border-white/10'
//                         onError={() => setImgError(true)} 
//                     />
//                 ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-slate-700 border border-white/10 rounded-full">
//                         <span className="text-2xl font-bold text-white sm:text-3xl">
//                             {userInitial}
//                         </span>
//                     </div>
//                 )}
//             </div>

//             <div className='min-w-0 flex-1 overflow-hidden'>
//                 <p className='truncate text-base font-medium text-white sm:text-lg'>{user.username}</p>
//             </div>
//         </div>
//     )
// }
// import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
// import Store from '../redux/store';

// export default function OtherUser({ key, user, onSelectUser }) {
//     const { selectedUser, onlineUsers } = useSelector(Store => Store.user);
    
//     // ✅ FIX 1: Added ?. to prevent crash if onlineUsers is null
//     const isOnline = onlineUsers?.includes(user._id);
//     const statusRingClass = isOnline ? 'ring-green-400' : 'ring-red-400';

//     const userInitial = user?.username?.trim()?.charAt(0)?.toUpperCase() || '?';
//     const [imgError, setImgError] = useState(false);

//     const selectedUserHandler = () => {
//         if (onSelectUser) {
//             onSelectUser(user);
//         }
//     }

//     return (
//         <div
//             onClick={selectedUserHandler}
//             className={`${selectedUser?._id === user?._id ? 'bg-white/15 text-white' : 'bg-white/5 text-white/90'} group flex w-full cursor-pointer flex-row items-center gap-3 rounded-2xl border border-white/10 p-3 transition hover:bg-white/15 sm:p-4`}>

//             <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-2 ${statusRingClass} ring-offset-2 ring-offset-slate-900/70 sm:h-16 sm:w-16 overflow-hidden`}>
                
//                 {/* ✅ FIX 2: Added ?. to user.profilePicture.includes to prevent crash if profile picture is null */}
//                 {user?.profilePicture && !user.profilePicture?.includes('iran.liara.run') && !imgError ? (
//                     <img
//                         src={user.profilePicture}
//                         alt='profilePhoto'
//                         className='h-full w-full rounded-full object-cover border border-white/10'
//                         onError={() => setImgError(true)} 
//                     />
//                 ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-slate-700 border border-white/10 rounded-full">
//                         <span className="text-2xl font-bold text-white sm:text-3xl">
//                             {userInitial}
//                         </span>
//                     </div>
//                 )}
//             </div>

//             <div className='min-w-0 flex-1 overflow-hidden'>
//                 <p className='truncate text-base font-medium text-white sm:text-lg'>{user.username}</p>
//             </div>
//         </div>
//     )
// }
// import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
// import Store from '../redux/store';

// export default function OtherUser({ key, user, onSelectUser }) {
//     const { selectedUser, onlineUsers } = useSelector(Store => Store.user);
    
//     // 🔥 NEW: Get unread counts from Redux
//     const unreadCounts = useSelector(Store => Store.notifications.unreadCounts);
//     const unreadCount = unreadCounts[user._id] || 0; // Get count for THIS specific user (defaults to 0)
//     console.log("Rendering", user.username, "| Unread Count:", unreadCount);
//     const isOnline = onlineUsers?.includes(user._id);
//     const statusRingClass = isOnline ? 'ring-green-400' : 'ring-red-400';

//     const userInitial = user?.username?.trim()?.charAt(0)?.toUpperCase() || '?';
//     const [imgError, setImgError] = useState(false);

//     const selectedUserHandler = () => {
//         if (onSelectUser) {
//             onSelectUser(user);
//         }
//     }

//     return (
//         <div
//             onClick={selectedUserHandler}
//             className={`${selectedUser?._id === user?._id ? 'bg-white/15 text-white' : 'bg-white/5 text-white/90'} group flex w-full cursor-pointer flex-row items-center gap-3 rounded-2xl border border-white/10 p-3 transition hover:bg-white/15 sm:p-4`}>

//             {/* Avatar Container - relative is already here, which is perfect for the badge */}
//             <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-2 ${statusRingClass} ring-offset-2 ring-offset-slate-900/70 sm:h-16 sm:w-16 overflow-hidden`}>
                
//                 {user?.profilePicture && !user.profilePicture?.includes('iran.liara.run') && !imgError ? (
//                     <img
//                         src={user.profilePicture}
//                         alt='profilePhoto'
//                         className='h-full w-full rounded-full object-cover border border-white/10'
//                         onError={() => setImgError(true)} 
//                     />
//                 ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-slate-700 border border-white/10 rounded-full">
//                         <span className="text-2xl font-bold text-white sm:text-3xl">
//                             {userInitial}
//                         </span>
//                     </div>
//                 )}

//                 {/* 🔥 NEW: UNREAD BADGE UI */}
//                 {unreadCount > 0 && (
//                     <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 min-w-[20px] flex items-center justify-center px-1 shadow-lg border-2 border-slate-900">
//                         {unreadCount > 9 ? '9+' : unreadCount}
//                     </div>
//                 )}
//             </div>

//             <div className='min-w-0 flex-1 overflow-hidden'>
//                 <p className='truncate text-base font-medium text-white sm:text-lg'>{user.username}</p>
//             </div>
//         </div>
//     )
// }
// import React, { useState } from 'react'
// import { useSelector } from 'react-redux';

// export default function OtherUser({ key, user, onSelectUser }) {
//     const { selectedUser, onlineUsers } = useSelector(state => state.user);
    
//     // 🔥 ULTRA-SAFE REDUX READ:
//     const unreadCounts = useSelector(state => state?.user?.unreadCounts) || {};
//     const unreadCount = unreadCounts[user._id] || 0; 
    
//     const isOnline = onlineUsers?.includes(user._id);
//     const statusRingClass = isOnline ? 'ring-green-400' : 'ring-red-400';

//     const userInitial = user?.username?.trim()?.charAt(0)?.toUpperCase() || '?';
//     const [imgError, setImgError] = useState(false);

//     const selectedUserHandler = () => {
//         if (onSelectUser) {
//             onSelectUser(user);
//         }
//     }

//     return (
//         <div
//             onClick={selectedUserHandler}
//             className={`${selectedUser?._id === user?._id ? 'bg-white/15 text-white' : 'bg-white/5 text-white/90'} group flex w-full cursor-pointer flex-row items-center gap-3 rounded-2xl border border-white/10 p-3 transition hover:bg-white/15 sm:p-4`}>

//             <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-2 ${statusRingClass} ring-offset-2 ring-offset-slate-900/70 sm:h-16 sm:w-16 overflow-hidden`}>
                
//                 {user?.profilePicture && !user.profilePicture?.includes('iran.liara.run') && !imgError ? (
//                     <img
//                         src={user.profilePicture}
//                         alt='profilePhoto'
//                         className='h-full w-full rounded-full object-cover border border-white/10'
//                         onError={() => setImgError(true)} 
//                     />
//                 ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-slate-700 border border-white/10 rounded-full">
//                         <span className="text-2xl font-bold text-white sm:text-3xl">
//                             {userInitial}
//                         </span>
//                     </div>
//                 )}

//                 {unreadCount > 0 && (
//                     <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 min-w-[20px] flex items-center justify-center px-1 shadow-lg border-2 border-slate-900">
//                         {unreadCount > 9 ? '9+' : unreadCount}
//                     </div>
//                 )}
//             </div>

//             <div className='min-w-0 flex-1 overflow-hidden'>
//                 <p className='truncate text-base font-medium text-white sm:text-lg'>{user.username}</p>
//             </div>
//         </div>
//     )
// }
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function OtherUser({ key, user, onSelectUser }) {
    const { selectedUser, onlineUsers } = useSelector(state => state.user);
    
    // Get unread counts from UserSlice
    const unreadCounts = useSelector(state => state?.user?.unreadCounts) || {};
    const unreadCount = unreadCounts[user._id] || 0; 

    const isOnline = onlineUsers?.includes(user._id);
    const statusRingClass = isOnline ? 'ring-green-400' : 'ring-red-400';

    const userInitial = user?.username?.trim()?.charAt(0)?.toUpperCase() || '?';
    const [imgError, setImgError] = useState(false);

    const selectedUserHandler = () => {
        if (onSelectUser) {
            onSelectUser(user);
        }
    }

    return (
        <div
            onClick={selectedUserHandler}
            className={`${selectedUser?._id === user?._id ? 'bg-white/15 text-white' : 'bg-white/5 text-white/90'} group flex w-full cursor-pointer flex-row items-center gap-3 rounded-2xl border border-white/10 p-3 transition hover:bg-white/15 sm:p-4`}>

            <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-2 ${statusRingClass} ring-offset-2 ring-offset-slate-900/70 sm:h-16 sm:w-16 overflow-hidden`}>
                
                {user?.profilePicture && !user.profilePicture?.includes('iran.liara.run') && !imgError ? (
                    <img
                        src={user.profilePicture}
                        alt='profilePhoto'
                        className='h-full w-full rounded-full object-cover border border-white/10'
                        onError={() => setImgError(true)} 
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-700 border border-white/10 rounded-full">
                        <span className="text-2xl font-bold text-white sm:text-3xl">
                            {userInitial}
                        </span>
                    </div>
                )}
            </div>

            <div className='min-w-0 flex-1 overflow-hidden'>
                <p className='truncate text-base font-medium text-white sm:text-lg'>{user.username}</p>
            </div>

            {/* 🔥 GREEN DOT AT THE FAR RIGHT */}
            {unreadCount > 0 && (
                <div className="ml-auto bg-green-500 text-white text-xs font-bold rounded-full h-6 min-w-[24px] flex items-center justify-center px-1 shadow-lg">
                    {unreadCount > 9 ? '9+' : unreadCount}
                </div>
            )}

        </div>
    )
}