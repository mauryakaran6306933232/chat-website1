import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API_URL from '../utils/apiUrl'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/UserSlice'
import { persistor } from '../redux/store'; // Add this
export default function Login() {
  const dispatch = useDispatch();
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();

  const [user, setUser] = useState({
      username: "",
      password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (authUser) {
      navigate('/homepage');
    }
  }, [authUser, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/test/login`, user, {
        headers: { 'Content-Type': "application/json" },
        withCredentials: true
      });
      
      // if (res?.data?.success) {
      //   toast.success(res.data.message);
      //   dispatch(setAuthUser(res.data.user));
      // }
      
      // setUser({ username: "", password: "" });
      // navigate("/homepage");
      if (res?.data?.success) {
    toast.success(res.data.message);
    dispatch(setAuthUser(res.data.user));
    
    // ■ FIX: Force redux-persist to save IMMEDIATELY to localStorage!
    // This prevents the "logout on refresh" race condition.
    persistor.flush(); 
    
    setUser({ username: "", password: "" });
    navigate("/homepage");
}
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error, 'in the onSubmit handeler');
    }
  };

  // Prevent login form from flashing if user is already authenticated
  if (authUser) return null;
   
  return (
    // ==========================================
    // MAIN CONTAINER (Holds the background)
    // ==========================================
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* 1. BACKGROUND IMAGE */}
      {/* Replace this URL with your own image! */}
      <img 
        src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1974&auto=format&fit=crop" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover" 
      />

      {/* 2. BLUR OVERLAY (Blurs the background image) */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

      {/* 3. WATERCOLOR LOGIN CARD (Sits on top of the blur) */}
      <div 
        className="relative z-10 w-full max-w-md mx-4 rounded-3xl p-6 sm:p-8 md:p-10 text-white"
        style={{
          background: 'rgba(255, 255, 255, 0.1)', // Slightly milky background
          backdropFilter: 'blur(24px) saturate(180%)', // THE WATERCOLOR MAGIC
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.3)', // Soft glowing border
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' // Soft colored shadow
        }}
      >
        
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Login</h1>
          <p className="mt-2 text-sm sm:text-base text-white/80">
            Access your chat with a transparent responsive interface.
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90">Username</label>
            <input
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/20 text-sm sm:text-base"
              type="text"
              placeholder="Name"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90">Password</label>
            <input
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/20 text-sm sm:text-base"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button 
            className="w-full rounded-2xl bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-cyan-400 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
          >
            Login
          </button>

          <p className="text-center text-sm text-white/70">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-medium text-cyan-200 hover:text-cyan-100 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}