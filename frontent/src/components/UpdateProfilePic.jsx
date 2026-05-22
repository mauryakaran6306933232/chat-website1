
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { IoCamera } from 'react-icons/io5';
import API_URL from '../utils/apiUrl';
export default function UpdateProfilePic() {
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const userInitial = authUser?.username?.trim()?.charAt(0)?.toUpperCase() || '?';

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image must be under 2MB");
    }

    const formData = new FormData();
    formData.append("profilePic", file);

    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/test/update-profile-pic`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success("Profile updated!");
        setImgError(false);
        window.location.reload(); 
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // Calculate UI BEFORE the return statement
  // ==========================================
  let profileUI = null;

  if (isLoading) {
    // STATE 1: Loading Spinner
    profileUI = (
      <svg className="animate-spin text-cyan-400 p-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );
  } else if (authUser?.profilePicture && !imgError) {
    // STATE 2: Real Profile Picture + Camera Icon
    profileUI = (
      <>
        <img 
          src={authUser.profilePicture} 
          alt="Profile" 
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <IoCamera className="text-white text-xl" />
        </div>
      </>
    );
  } else {
    // STATE 3: First Letter Fallback + Camera Icon
    profileUI = (
      <>
        <div className="w-full h-full flex items-center justify-center bg-slate-700 rounded-full">
          <span className="text-2xl font-bold text-white">{userInitial}</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <IoCamera className="text-white text-xl" />
        </div>
      </>
    );
  }

  return (
    <div 
      className="btn btn-circle bg-zinc-500 relative group cursor-pointer ml-[5px] overflow-hidden" 
      onClick={() => {
        if (!isLoading) fileInputRef.current.click();
      }}
    >
      {/* Just render the calculated UI here */}
      {profileUI}

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleImageUpload} 
      />
    </div>
  );
}


