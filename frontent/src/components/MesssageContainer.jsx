// import React from 'react';
// import { useSelector } from 'react-redux';
// import Messages from './Messages';
// import SendInput from './SendInput';

// const MesssageContainer = ({ onBack, onInitiateCall }) => {
//   const { selectedUser } = useSelector(store => store.user);

//   // If no user is selected, do not render the chat container at all!
//   // This prevents the freezing bug on refresh.
//   if (!selectedUser) return null;

//   return (
//     <div className='flex flex-col h-full w-full relative'>

//       {/* CHAT HEADER */}
//       <div className='flex items-center justify-between px-3 sm:px-4 py-3 bg-slate-800/50 border-b border-white/10 shrink-0'>
//         <div className='flex items-center gap-3 min-w-0 flex-1'>
//           <button onClick={onBack} className='md:hidden text-white text-2xl hover:bg-white/10 p-1 rounded-full active:scale-95 transition'>
//             <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
//           </button>
//           <div className='flex items-center gap-3 min-w-0'>
//             <span className='text-white font-semibold text-base sm:text-lg truncate'>{selectedUser?.username}</span>
//           </div>
//         </div>
        
//         <div className='flex items-center gap-1 sm:gap-2 shrink-0 ml-2'>
//           <button onClick={() => onInitiateCall(selectedUser?._id, 'audio')} className='w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white' title="Audio Call">
//              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.49-1.21-.75-2.51-.75-3.87 0-.54-.45-.99-.99-.99H4.19C3.65 3.66 3 4.02 3 4.66 3 14.28 9.72 21 19.34 21c.61 0 .99-.54.99-1.09V16.5c0-.54-.45-.99-.99-.99h-2.33z" /></svg>
//           </button>
//           <button onClick={() => onInitiateCall(selectedUser?._id, 'video')} className='w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white' title="Video Call">
//             <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" /></svg>
//           </button>
//         </div>
//       </div>
      
//       <Messages />
      
//       <div className='px-4 pb-4 pt-2 shrink-0'>
//         <SendInput />
//       </div>
//     </div>
//   );
// };

// export default MesssageContainer;
import React from 'react';
import { useSelector } from 'react-redux';
import Messages from './Messages';
import SendInput from './SendInput';

const MesssageContainer = ({ onBack, onInitiateCall }) => {
  const { selectedUser } = useSelector(store => store.user);

  // If no user is selected, do not render the chat container at all
  if (!selectedUser) return null;

  return (
    <div className='flex flex-col h-full w-full relative'>
      {/* CHAT HEADER */}
      <div className='flex items-center justify-between px-3 sm:px-4 py-3 bg-slate-800/50 border-b border-white/10'>
        <div className='flex items-center gap-3 min-w-0 flex-1'>
          {/* Back Button (Mobile Only) */}
          <button
            onClick={onBack}
            className='md:hidden text-white text-2xl hover:bg-white/10 p-1 rounded-full active:scale-95 transition-transform'
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className='flex items-center gap-3 min-w-0'>
            <span className='text-white font-semibold text-base sm:text-lg truncate'>
              {selectedUser?.username}
            </span>
          </div>
        </div>

        {/* CALL ICONS */}
        <div className='flex items-center gap-1 sm:gap-2 shrink-0 ml-2'>
          <button
            onClick={() => onInitiateCall(selectedUser?._id, 'audio')}
            className='w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors'
            title="Audio Call"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.34-.35.44-.85.25-1.29A11.54 11.54 0 0 1 8.65 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.63c0-.55-.45-1-1-1z" />
            </svg>
          </button>
          <button
            onClick={() => onInitiateCall(selectedUser?._id, 'video')}
            className='w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors'
            title="Video Call"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* MESSAGES AREA */}
      <Messages />

      {/* INPUT AREA */}
      <div className='px-4 pb-4 pt-2 shrink-0'>
        <SendInput />
      </div>
    </div>
  );
};

export default MesssageContainer;