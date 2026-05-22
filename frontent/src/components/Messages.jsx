
// import React, { useEffect, useRef, useState } from 'react'
// import Message from './Message'
// import { useSelector } from 'react-redux'
// import useGetMessages from '../hooks/useGetMessages'
// import { formatDateDivider } from '../utils/dateUtils'

// export default function Messages() {
//   const { selectedUser, authUser } = useSelector(Store => Store?.user);
//   const { message, hasMore, loading } = useSelector(Store => Store?.message);
  
//   const messagesContainerRef = useRef(null);
//   const scrollHeightBeforeFetch = useRef(0);
  
//   const [initialLoadDone, setInitialLoadDone] = useState(false);

//   const { loadMoreMessages } = useGetMessages(selectedUser);

//   // 1. Reset when chat changes
//   useEffect(() => {
//     setInitialLoadDone(false);
//   }, [selectedUser?._id]);

//   // 2. Initial Scroll to Bottom
//   useEffect(() => {
//     if (message.length > 0 && !loading && !initialLoadDone) {
//       setTimeout(() => {
//         const container = messagesContainerRef.current;
//         if (container) {
//           container.scrollTop = container.scrollHeight;
//           setInitialLoadDone(true);
//         }
//       }, 50);
//     }
//   }, [message, loading, initialLoadDone]);

//   // 3. Restore scroll position after loading older messages
//   useEffect(() => {
//     if (initialLoadDone && scrollHeightBeforeFetch.current > 0 && messagesContainerRef.current) {
//       const newScrollHeight = messagesContainerRef.current.scrollHeight;
//       messagesContainerRef.current.scrollTop = newScrollHeight - scrollHeightBeforeFetch.current;
//       scrollHeightBeforeFetch.current = 0;
//     }
//   }, [message, initialLoadDone]);

//   // 4. onScroll Handler
//   const handleScroll = () => {
//     const container = messagesContainerRef.current;
//     if (!container || !initialLoadDone || !hasMore || loading) return;

//     // If user scrolls to the top 150 pixels, fetch more!
//     if (container.scrollTop < 150) {
//       scrollHeightBeforeFetch.current = container.scrollHeight;
//       loadMoreMessages();
//     }
//   };

//   // 5. Auto-scroll for real-time incoming messages
//   const prevMessageLength = useRef(0);
//   useEffect(() => {
//     if (initialLoadDone && message.length > prevMessageLength.current) {
//       const container = messagesContainerRef.current;
//       if (container) {
//         const { scrollTop, clientHeight, scrollHeight } = container;
//         if (scrollHeight - (scrollTop + clientHeight) < 150) {
//           container.scrollTop = container.scrollHeight;
//         }
//       }
//     }
//     prevMessageLength.current = message.length;
//   }, [message, initialLoadDone]);

//   const isSameDay = (date1, date2) => {
//     if (!date1 || !date2) return false;
//     const d1 = new Date(date1);
//     const d2 = new Date(date2);
//     return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
//   };

//   if (!message || message.length === 0) {
//     return (
//       // This also needs min-h-0 to behave properly inside the flex container
//       <div className='min-w-0 w-full flex-1 min-h-0 flex flex-col items-center justify-center px-4 py-6 text-center bg-slate-700 rounded-lg mx-2'>
//         <div className="text-6xl mb-4">💬</div>
//         <h1 className='text-3xl font-bold text-white sm:text-4xl'>Hi, {authUser?.username}</h1>
//         <h1 className='mt-3 text-xl text-white/80 sm:text-2xl'>Let&apos;s start the conversation.</h1>
//       </div>
//     )
//   }

//   return (
//     // ■ THE MAGIC CSS: flex-1 min-h-0 overflow-y-auto
//     // flex-1: Take up remaining space
//     // min-h-0: Allow the container to shrink smaller than its content (CRITICAL FOR SCROLL)
//     // overflow-y-auto: Create the scrollbar
//     <div ref={messagesContainerRef} onScroll={handleScroll} className='flex-1 min-h-0 overflow-y-auto px-4 py-2'>
      
//       <div className="flex justify-center py-2">
//         {loading && <span className="text-sm text-gray-400 loading loading-spinner loading-sm"></span>}
//         {!hasMore && message.length > 0 && <span className="text-xs text-gray-600">Start of conversation</span>}
//       </div>

//       {
//         message?.map((msg, index) => {
//           const showDateDivider = index === 0 || !isSameDay(msg.createdAt, message[index - 1].createdAt);

//           return (
//             <React.Fragment key={msg._id}>
//               {showDateDivider && (
//                 <div className="flex justify-center my-4">
//                   <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-lg text-xs shadow-sm font-medium tracking-wide">
//                     {formatDateDivider(msg.createdAt)}
//                   </span>
//                 </div>
//               )}
//               <Message message={msg} />
//             </React.Fragment>
//           );
//         })
//       }
//     </div>
//   )
// }
import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import { useSelector } from 'react-redux'
import useGetMessages from '../hooks/useGetMessages'
import { formatDateDivider } from '../utils/dateUtils'

export default function Messages() {
  const { selectedUser, authUser } = useSelector(Store => Store?.user);
  const { message, hasMore, loading } = useSelector(Store => Store?.message);
  
  const messagesContainerRef = useRef(null);
  const scrollHeightBeforeFetch = useRef(0);
  
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  
  // ■ NEW: This lock prevents the infinite loop!
  const isFetchingRef = useRef(false);

  const { loadMoreMessages } = useGetMessages(selectedUser);

  // 1. Reset when chat changes
  useEffect(() => {
    setInitialLoadDone(false);
    isFetchingRef.current = false; // Reset lock on chat change
  }, [selectedUser?._id]);

  // 2. Initial Scroll to Bottom
  useEffect(() => {
    if (message.length > 0 && !loading && !initialLoadDone) {
      setTimeout(() => {
        const container = messagesContainerRef.current;
        if (container) {
          container.scrollTop = container.scrollHeight;
          setInitialLoadDone(true);
        }
      }, 50);
    }
  }, [message, loading, initialLoadDone]);

  // 3. Restore scroll position after loading older messages & UNLOCK
  useEffect(() => {
    if (isFetchingRef.current && scrollHeightBeforeFetch.current > 0 && messagesContainerRef.current) {
      const newScrollHeight = messagesContainerRef.current.scrollHeight;
      messagesContainerRef.current.scrollTop = newScrollHeight - scrollHeightBeforeFetch.current;
      
      scrollHeightBeforeFetch.current = 0; 
      isFetchingRef.current = false; // ■ UNLOCK: We are done fetching, allow next scroll up
    }
  }, [message]);

  // 4. onScroll Handler (Now protected by the Lock)
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container || !initialLoadDone || !hasMore || loading) return;

    // If user scrolls to the absolute top (0) AND we aren't already fetching
    if (container.scrollTop < 50 && !isFetchingRef.current) {
      isFetchingRef.current = true; // ■ LOCK: Stop it from fetching again
      scrollHeightBeforeFetch.current = container.scrollHeight;
      loadMoreMessages();
    }
  };

  // 5. Auto-scroll for real-time incoming messages
  const prevMessageLength = useRef(0);
  useEffect(() => {
    if (initialLoadDone && message.length > prevMessageLength.current) {
      const container = messagesContainerRef.current;
      if (container) {
        const { scrollTop, clientHeight, scrollHeight } = container;
        if (scrollHeight - (scrollTop + clientHeight) < 150) {
          container.scrollTop = container.scrollHeight;
        }
      }
    }
    prevMessageLength.current = message.length;
  }, [message, initialLoadDone]);

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  };

  if (!message || message.length === 0) {
    return (
      <div className='min-w-0 w-full flex-1 min-h-0 flex flex-col items-center justify-center px-4 py-6 text-center bg-slate-700 rounded-lg mx-2'>
        <div className="text-6xl mb-4">💬</div>
        <h1 className='text-3xl font-bold text-white sm:text-4xl'>Hi, {authUser?.username}</h1>
        <h1 className='mt-3 text-xl text-white/80 sm:text-2xl'>Let&apos;s start the conversation.</h1>
      </div>
    )
  }

  return (
    <div ref={messagesContainerRef} onScroll={handleScroll} className='flex-1 min-h-0 overflow-y-auto px-4 py-2'>
      
      <div className="flex justify-center py-2">
        {loading && <span className="text-sm text-gray-400 loading loading-spinner loading-sm"></span>}
        {!hasMore && message.length > 0 && <span className="text-xs text-gray-600">Start of conversation</span>}
      </div>

      {
        message?.map((msg, index) => {
          const showDateDivider = index === 0 || !isSameDay(msg.createdAt, message[index - 1].createdAt);

          return (
            <React.Fragment key={msg._id}>
              {showDateDivider && (
                <div className="flex justify-center my-4">
                  <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-lg text-xs shadow-sm font-medium tracking-wide">
                    {formatDateDivider(msg.createdAt)}
                  </span>
                </div>
              )}
              <Message message={msg} />
            </React.Fragment>
          );
        })
      }
    </div>
  )
}