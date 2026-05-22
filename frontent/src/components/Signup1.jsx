
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux' // Added for redirect logic
import { persistor } from '../redux/store'; 
export default function Signup1() {
  const navigate = useNavigate();
  const { authUser } = useSelector(store => store.user); // Check if logged in
  
  const [user, setUser] = useState({
    username: "",
    password: "",
    fullPassword: "",
    gender: ""
  })

  // Redirect to homepage if already logged in
  useEffect(() => {
    if (authUser) {
      navigate('/homepage');
    }
  }, [authUser, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8001/test/register', user, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      })
      // if (res?.data?.success) {
      //   toast.success(res.data.message)
      // }
      if (res?.data?.success) {
    toast.success(res.data.message);
    persistor.flush(); // Force save if you auto-login them
    navigate("/login");
}
      setUser({
        username: "",
        password: "",
        fullPassword: "",
        gender: ""
      })
      navigate("/login");
    }
    catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error, 'in the onSubmit handeler')
    }
  }

  // Prevent form flash if already authenticated
  if (authUser) return null;

  return (
    // ==========================================
    // MAIN CONTAINER (Holds the background)
    // ==========================================
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-8 px-4">
      
      {/* 1. BACKGROUND IMAGE (Same as login) */}
      <img 
        src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1974&auto=format&fit=crop" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover" 
      />

      {/* 2. BLUR OVERLAY (Blurs the background image) */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

      {/* 3. WATERCOLOR SIGNUP CARD */}
      <div 
        className="relative z-10 w-full max-w-md rounded-3xl p-6 sm:p-8 md:p-10 text-white my-4"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(24px) saturate(180%)', // THE WATERCOLOR MAGIC
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}
      >
        <div className="mb-5 sm:mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Signup</h1>
          <p className="mt-2 text-sm sm:text-base text-white/80">Create your account with a glassy responsive layout.</p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4 sm:space-y-5">
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90">Confirm Password</label>
            <input
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/20 text-sm sm:text-base"
              type="password"
              placeholder="Confirm Password"
              value={user.fullPassword}
              onChange={(e) => setUser({ ...user, fullPassword: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90">Gender</label>
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-4">
              <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={user.gender === 'male'}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  className="h-4 w-4 accent-cyan-400"
                />
                Male
              </label>
              <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={user.gender === 'female'}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  className="h-4 w-4 accent-pink-400"
                />
                Female
              </label>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <button className="w-full rounded-2xl bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-cyan-400 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-300/50">
              Signup
            </button>

            <p className="text-center text-sm text-white/70">
              Have an account?{' '}
              <Link to="/login" className="font-medium text-cyan-200 hover:text-cyan-100 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}