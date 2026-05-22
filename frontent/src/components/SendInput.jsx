import React, { useState, useRef, useEffect } from 'react' 
import { IoSend } from 'react-icons/io5'
import { IoAttach } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import axios from 'axios'
import Store from '../redux/store'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { addMessage } from '../redux/messageSlice'
import { clearReplySlice } from '../redux/replySlice';
import { encryptMessage } from '../utils/encryption';
export default function SendInput() {
  const dispatch = useDispatch();
  const { message } = useSelector(Store => Store.message);
  const { selectedUser, authUser } = useSelector(Store => Store.user);
  const { socket } = useSelector(Store => Store.socket);
  const { replyTo } = useSelector(Store => Store.reply);
  
  const [message1, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // <--- NEW: Loading State
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    }
  }, []);

  const handleTyping = () => {
    if (!selectedUser || !socket) return;
    socket.emit("typing", { to: selectedUser._id, from: authUser._id });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {}, 1500);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!selectedUser) return toast.error("Select a user first");
    if (isLoading) return; // <--- NEW: Prevent double clicks while loading

    // ==========================================
    // FILE UPLOAD LOGIC
    // ==========================================
    if (selectedFile) {
      setIsLoading(true); // <--- START LOADING
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const res = await axios.post(
          `http://localhost:8001/test/upload-file/${selectedUser._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
        );

        if (res.data.success) {
          dispatch(addMessage(res?.data?.newMessage));
          toast.success("File sent!");
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          dispatch(clearReplySlice());
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to upload file");
      } finally {
        setIsLoading(false); // <--- STOP LOADING (Runs whether it succeeds or fails)
      }
      return;
    }

    // ==========================================
    // TEXT MESSAGE LOGIC
    // ==========================================
    if (message1.trim() === "") return;

    setIsLoading(true); // <--- START LOADING

    try {
      const res = await axios.post(
        `http://localhost:8001/test/sendMessage/${selectedUser._id}`,
        { 
          message: encryptMessage(message1),
          replyTo: replyTo
        },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );

      if (res?.data?.success) {
        dispatch(addMessage(res.data.newMessage));
        toast.success('Message sent');
        setMessage("");
        dispatch(clearReplySlice());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false); // <--- STOP LOADING
    }
  }

  return (
    <div className='px-4 my-3'>
      {/* REPLY PREVIEW BOX */}
      {replyTo && (
        <div className="mx-0 mb-2 flex items-center justify-between bg-slate-700 text-white text-sm p-2 rounded-t-lg border-l-4 border-cyan-400">
          <div className="truncate pr-4 flex-1">
            <span className="font-bold text-cyan-400">{replyTo.username}: </span>
            <span className="text-gray-300">{replyTo.text}</span>
          </div>
          <button type="button" onClick={() => dispatch(clearReplySlice())} className="text-gray-400 hover:text-white font-bold p-1">
            <IoClose size={20} />
          </button>
        </div>
      )}

      {/* MAIN INPUT FORM */}
      <form onSubmit={(e) => { onSubmitHandler(e) }} className='flex items-center relative'>
        
        <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} />

        {/* Attach Button */}
        <button 
          type="button" 
          onClick={() => fileInputRef.current.click()}
          className='absolute left-3 text-zinc-400 hover:text-white transition-colors text-xl z-10'
          title="Attach file"
          disabled={isLoading} // Disable while sending
        >
          <IoAttach />
        </button>

        {/* Text Input */}
        <input
          type='text'
          placeholder={replyTo ? "Reply..." : 'send a message....'}
          className={`border p-3 pl-10 border-zinc-500 text-sm block w-full bg-gray-600 text-white focus:outline-none focus:border-cyan-500 ${replyTo ? 'rounded-b-lg rounded-t-none' : 'rounded-lg'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          value={selectedFile ? selectedFile.name : message1}
          onChange={(e) => { setMessage(e.target.value); handleTyping(); }}
          readOnly={!!selectedFile || isLoading} // Disable typing while sending
        />

        {/* SEND BUTTON / LOADING SPINNER */}
        <button 
          type="submit" 
          disabled={isLoading} // Disable clicks while loading
          className={`absolute flex items-center inset-y-0 end-0 pr-3 transition-colors z-10 ${isLoading ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'}`}
        >
          {isLoading ? (
            // 🔥 TAILWIND CSS SPINNER (Replaces the send icon while loading)
            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <IoSend className="text-xl" />
          )}
        </button>
      </form>
    </div>
  )
}