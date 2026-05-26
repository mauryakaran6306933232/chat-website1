
// import React, { useEffect } from 'react';
// import Homepage from './components/Homepage';
// import Signup1 from './components/Signup1';
// import Login from './components/Login';
// import './App.css';

// import { useSelector, useDispatch } from 'react-redux';
// import io from 'socket.io-client';

// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import { setSocket } from './redux/socketSlice';

// import {
//   setInitialUnreadCounts,
//   setOnlineUsers,
//   setSelectedUser
// } from './redux/UserSlice';

// // Protected Route
// import ProtectedRoute from './components/ProtectedRoute';

// // ================= API URL =================
// const API_URL = process.env.REACT_APP_API_URL;

// // ================= ROUTER =================
// const router = createBrowserRouter([
//   {
//     path: '/homepage',
//     element: (
//       <ProtectedRoute>
//         <Homepage />
//       </ProtectedRoute>
//     )
//   },
//   {
//     path: '/signup',
//     element: <Signup1 />
//   },
//   {
//     path: '/login',
//     element: <Login />
//   },
//   {
//     path: '/',
//     element: <Login />
//   }
// ]);

// // ================= APP =================
// export default function App() {
//   const dispatch = useDispatch();

//   const { socket } = useSelector(store => store.socket);
//   const { authUser } = useSelector(store => store.user);

//   useEffect(() => {

//     // ================= CONNECT SOCKET =================
//     if (authUser) {

//       const socketInstance = io(API_URL, {
//         query: {
//           userId: authUser._id
//         },
//         transports: ['websocket']
//       });

//       // Save socket in redux
//       dispatch(setSocket(socketInstance));

//       // ================= ONLINE USERS =================
//       socketInstance.on('getOnlineUsers', (onlineUsers) => {
//         dispatch(setOnlineUsers(onlineUsers));
//       });

//       // ================= UNREAD COUNTS =================
//       socketInstance.on('initial_unread_counts', (countsMap) => {
//         dispatch(setInitialUnreadCounts(countsMap));
//       });

//       // ================= RESET SELECTED USER =================
//       dispatch(setSelectedUser(null));

//       // ================= CLEANUP =================
//       return () => {
//         socketInstance.close();
//       };

//     } else {

//       // Disconnect socket if user logout
//       if (socket) {
//         socket.close();
//         dispatch(setSocket(null));
//       }
//     }

//   }, [authUser, dispatch]);

//   return (
//     <div className='flex h-screen items-center justify-center'>
//       <RouterProvider router={router} />
//     </div>
//   );
// }
import React, { useEffect } from 'react';
import Homepage from './components/Homepage';
import Signup1 from './components/Signup1';
import Login from './components/Login';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { setSocket } from './redux/socketSlice';
import {
  setInitialUnreadCounts,
  setOnlineUsers,
  setSelectedUser
} from './redux/UserSlice';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute';

// ================= API URL =================
const API_URL = process.env.REACT_APP_API_URL;

// ================= ROUTER =================
const router = createBrowserRouter([
  {
    path: '/homepage',
    element: (
      <ProtectedRoute>
        <Homepage />
      </ProtectedRoute>
    )
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
]);

// ================= APP =================
export default function App() {
  const dispatch = useDispatch();
  const { socket } = useSelector(store => store.socket);
  const { authUser } = useSelector(store => store.user);

  useEffect(() => {
    // ================= CONNECT SOCKET =================
    if (authUser) {
      const socketInstance = io(API_URL, {
        query: {
          userId: authUser._id
        },
        // FIX: Add polling as fallback - some hosts block pure WebSocket initially
        transports: ['polling', 'websocket'],
        // FIX: Increase timeouts for slow networks
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
      });

      // Save socket in redux
      dispatch(setSocket(socketInstance));

      // ================= ONLINE USERS =================
      socketInstance.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      // ================= UNREAD COUNTS =================
      socketInstance.on('initial_unread_counts', (countsMap) => {
        dispatch(setInitialUnreadCounts(countsMap));
      });

      // ================= RESET SELECTED USER =================
      dispatch(setSelectedUser(null));

      // ================= CONNECTION DEBUG =================
      socketInstance.on('connect', () => {
        console.log('■ Socket connected:', socketInstance.id);
      });

      socketInstance.on('disconnect', (reason) => {
        console.log('■ Socket disconnected:', reason);
      });

      socketInstance.on('connect_error', (error) => {
        console.log('■ Socket connection error:', error.message);
      });

      // ================= CLEANUP =================
      return () => {
        console.log('■ Closing socket connection');
        socketInstance.close();
      };
    } else {
      // Disconnect socket if user logout
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser, dispatch]);

  return (
    <div className='flex h-screen items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  );
}