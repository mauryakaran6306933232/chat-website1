
// import React, { useState, useEffect, useRef } from 'react'
// import MesssageContainer from './MesssageContainer'
// import SiedeBar from './SiedeBar'
// import CallModal from './CallModal' 
// import { useWebRTC } from '../hooks/useWebRTC' 
// import useGetRealTimeMessage from '../hooks/usesGetRealTimeMessage' // <--- ADD THIS IMPORT
// import { useSelector, useDispatch } from 'react-redux'
// import { setSelectedUser, resetUnread } from '../redux/UserSlice'

// export default function Homepage() {
//   const dispatch = useDispatch();
//   const { selectedUser, authUser, otherUsers } = useSelector(store => store.user);
  
//   const [mobileView, setMobileView] = useState('sidebar');
//   const hasAutoSelected = useRef(false);

//   const {
//     callState,
//     localStream,
//     remoteStream,
//     initiateCall,
//     answerCall,
//     rejectCall,
//     endCall,
//     toggleMic,
//     toggleCamera
//   } = useWebRTC();

//   // <--- ADD THIS HOOK CALL HERE!
//   // Now it runs 24/7 as long as Homepage is mounted, even if MesssageContainer is hidden
//   useGetRealTimeMessage(selectedUser);

//   // ==========================================
//   // AUTO-SELECT FIRST USER (SAFE FOR MOBILE)
//   // ==========================================
//   useEffect(() => {
//     if (!hasAutoSelected.current && otherUsers?.length > 0 && !selectedUser) {
//       const firstUser = otherUsers[0];
//       dispatch(resetUnread(firstUser._id)); 
//       dispatch(setSelectedUser(firstUser)); 
//       setMobileView('chat'); 
//       hasAutoSelected.current = true;
//     }
//   }, [otherUsers, selectedUser, dispatch]); 

//   const handleSelectUser = (user) => {
//     dispatch(resetUnread(user._id));
//     dispatch(setSelectedUser(user));
//     setMobileView('chat');
//   };

//   const handleBack = () => {
//     setMobileView('sidebar');
//     dispatch(setSelectedUser(null));
//   };

//   return (
//     <div className='flex w-full md:h-[450px] rounded-lg overflow-clip bg-white/30 backdrop-blur-lg relative h-full'>
      
//       {/* SIDEBAR */}
//       <div className={`${mobileView === 'chat' ? 'hidden' : 'flex'} w-full md:w-[350px] md:flex flex-col border-r border-white/10 overflow-clip`}>
//         <SiedeBar onSelectUser={handleSelectUser} />
//       </div>

//             {/* RIGHT SIDE CONTAINER */}
//       {/* ■ FIX: Added min-h-0 and overflow-hidden to prevent layout breaking on refresh */}
//       <div className={`${mobileView !== 'chat' ? 'hidden md:flex' : 'flex'} flex-1 min-h-0 flex-col overflow-hidden`}>
//         {selectedUser ? (
//           <MesssageContainer
//             onBack={handleBack}
//             onInitiateCall={initiateCall}
//           />
//         ) : (
//           <div className='min-w-0 w-full h-full flex flex-col items-center justify-center px-4 py-6 text-center bg-slate-700 rounded-lg mx-2'>
//             <div className="text-6xl mb-4">💬</div>
//             <div>
//               <h1 className='text-3xl font-bold text-white sm:text-4xl'>Hi, {authUser?.username}</h1>
//             </div>
//             <h1 className='mt-3 text-xl text-white/80 sm:text-2xl'>Let&apos;s start the conversation.</h1>
//           </div>
//         )}
//       </div>

//       <CallModal 
//         callState={callState}
//         localStream={localStream}
//         remoteStream={remoteStream}
//         onAnswer={answerCall}
//         onReject={rejectCall}
//         onEnd={endCall}
//         onToggleMic={toggleMic}
//         onToggleCamera={toggleCamera}
//       />

//     </div>
//   )
// }
import React, { useState, useEffect } from 'react'
import MesssageContainer from './MesssageContainer'
import SiedeBar from './SiedeBar'
import CallModal from './CallModal'
import { useWebRTC } from '../hooks/useWebRTC'
import useGetRealTimeMessage from '../hooks/usesGetRealTimeMessage'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedUser, resetUnread } from '../redux/UserSlice'

export default function Homepage() {
  const dispatch = useDispatch();
  const { selectedUser, authUser, otherUsers } = useSelector(store => store.user);

  // ■ FIX: Always start on the sidebar (perfect for mobile refresh)
  const [mobileView, setMobileView] = useState('sidebar');

  const {
    callState,
    localStream,
    remoteStream,
    initiateCall,
    answerCall,
    rejectCall,
    endCall,
    toggleMic,
    toggleCamera
  } = useWebRTC();

  // Keep real-time messages hook running in the background
  useGetRealTimeMessage(selectedUser);

  // ■ REMOVED: The auto-select useEffect that was forcing the chat open on load!

  const handleSelectUser = (user) => {
    dispatch(resetUnread(user._id));
    dispatch(setSelectedUser(user));
    setMobileView('chat'); // Switch to chat view on mobile
  };

  const handleBack = () => {
    setMobileView('sidebar'); // Switch back to sidebar on mobile
    dispatch(setSelectedUser(null));
  };

  return (
    <div className='flex w-full md:h-[450px] rounded-lg overflow-clip bg-white/30 backdrop-blur-lg relative h-full'>

      {/* SIDEBAR */}
      <div className={`${mobileView === 'chat' ? 'hidden' : 'flex'} w-full md:w-[350px] md:flex flex-col border-r border-white/10 overflow-clip`}>
        <SiedeBar onSelectUser={handleSelectUser} />
      </div>
      
      {/* RIGHT SIDE CONTAINER */}
      <div className={`${mobileView !== 'chat' ? 'hidden md:flex' : 'flex'} flex-1 min-h-0 flex-col overflow-hidden`}>
        {selectedUser ? (
          <MesssageContainer
            onBack={handleBack}
            onInitiateCall={initiateCall}
          />
        ) : (
          // Desktop Welcome Screen (Hidden on mobile because mobile requires selecting a user first)
          <div className='min-w-0 w-full h-full flex flex-col items-center justify-center px-4 py-6 text-center bg-slate-700 rounded-lg mx-2'>
            <div className="text-6xl mb-4">💬</div>
            <div>
              <h1 className='text-3xl font-bold text-white sm:text-4xl'>Hi, {authUser?.username}</h1>
            </div>
            <h1 className='mt-3 text-xl text-white/80 sm:text-2xl'>Let&apos;s start the conversation.</h1>
          </div>
        )}
      </div>

      <CallModal
        callState={callState}
        localStream={localStream}
        remoteStream={remoteStream}
        onAnswer={answerCall}
        onReject={rejectCall}
        onEnd={endCall}
        onToggleMic={toggleMic}
        onToggleCamera={toggleCamera}
      />
    </div>
  )
}