
import React, { useEffect } from 'react'
import Homepage from './components/Homepage'
import Signup1 from './components/Signup1'
import Login from './components/Login'
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { setSocket } from './redux/socketSlice';
import { setInitialUnreadCounts ,setOnlineUsers, setSelectedUser } from './redux/UserSlice';

// <--- IMPORT THE NEW PROTECTED ROUTE
import ProtectedRoute from './components/ProtectedRoute'; 

const router = createBrowserRouter([
  {
    path: '/homepage',
    // <--- WRAP HOMEPAGE INSIDE THE PROTECTED ROUTE
    element: <ProtectedRoute><Homepage /></ProtectedRoute> 
  },
   {
    path: '/signup',
    element: <Signup1 />
  },
   {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Login />
  }
])

export default function App() {
  const { socket } = useSelector(store => store.socket);
  const dispatch = useDispatch();
  const { authUser } = useSelector(store => store.user);

  // Inside your App.js socket useEffect:
useEffect(() => {
  if (authUser) {
    const socket = io('http://localhost:8001', {
      query: { userId: authUser._id }
    });

    dispatch(setSocket(socket));

    socket.on('getOnlineUsers', (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on('initial_unread_counts', (countsMap) => {
      dispatch(setInitialUnreadCounts(countsMap));
    });
    
    // ■ CRITICAL: This forces the app to go back to the sidebar on refresh!
    dispatch(setSelectedUser(null)); 

    return () => socket.close();
  } else {
    if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }
}, [authUser, dispatch])

  return (
    <div className='flex h-screen items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  )
}