// import React, { useState, useEffect } from 'react';
// import { BiSearchAlt2 } from 'react-icons/bi';
// import axios from 'axios';
// import UpdateProfilePic from './UpdateProfilePic';
// import toast from 'react-hot-toast';
// import OtherUsers from './OtherUsers';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { setAuthUser, setOtherUsers } from '../redux/UserSlice';
// export default function SiedeBar() {
//     const dispatch = useDispatch();
//     const { otherUsers } = useSelector(Store => Store.user);
//     const { authUser } = useSelector(Store => Store.user);
//     const [localUsers, setLocalUsers] = useState([]);
//     console.log('other user for search is ', otherUsers);
//     const [search, setSearch] = useState("")
//     const navigate = useNavigate();
//     const logoutHandler = async () => {
//         try {
//             const res = await axios.get('http://localhost:8001/test/logout', {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 withCredentials: true
//             });
//             if (res?.data?.success) {
//                 dispatch(setAuthUser(null));
//                 toast.success(res?.data?.message);
//                 navigate("/login");
//             }
//         }
//         catch (error) {
//             toast.error(error?.response?.data?.message);
//             console.log("backend error in the logout handler function");
//         }
//     }

//     useEffect(() => {
//         setLocalUsers(otherUsers || []);
//     }, [otherUsers])

//     const handleSearchChange = (e) => {
//         const value = e?.target?.value || "";
//         setSearch(value);

//         if (!value.trim()) {
//             setLocalUsers(otherUsers || []);
//             return;
//         }

//         const filteredUsers = (otherUsers || []).filter((user) =>
//             user.username?.toLowerCase().includes(value.toLowerCase())
//         );
//         setLocalUsers(filteredUsers);
//     };

//     const searchSubmitHandler = (e) => {
//         e.preventDefault();
//     }
//     return (
//         <div className='border-r border-slate-500 p-4 flex flex-col'>
//             <form onSubmit={searchSubmitHandler} action='' className='flex flex-row' >
//                 <input
//                     value={search}
//                     onChange={handleSearchChange}
//                     className='input input-bordered rounded-md' type='text' placeholder='Search...'></input>
//                 {/* <button type='submit' className='btn btn-circle bg-zinc-500 ml-[5px]'><BiSearchAlt2 /></button> */}
//                 <UpdateProfilePic />
//             </form>
//             <div className="divider text-gray-900 flex-1 overflow-auto"></div>
//             <OtherUsers users={localUsers} />
//             <div className='m-2'>
//                 <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
//             </div>
            
//         </div>
//     )
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateProfilePic from './UpdateProfilePic';
import toast from 'react-hot-toast';
import OtherUsers from './OtherUsers';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/UserSlice';

// 1. ADD onSelectUser TO PROPS
export default function SiedeBar({ onSelectUser }) {
    const dispatch = useDispatch();
    const { otherUsers } = useSelector(Store => Store.user);
    const { authUser } = useSelector(Store => Store.user);
    const [localUsers, setLocalUsers] = useState([]);
    
    const [search, setSearch] = useState("")
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8001/test/logout', {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setAuthUser(null));
                toast.success(res?.data?.message);
                navigate("/login");
            }
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            console.log("backend error in the logout handler function");
        }
    }

    useEffect(() => {
        setLocalUsers(otherUsers || []);
    }, [otherUsers])

    const handleSearchChange = (e) => {
        const value = e?.target?.value || "";
        setSearch(value);

        if (!value.trim()) {
            setLocalUsers(otherUsers || []);
            return;
        }

        const filteredUsers = (otherUsers || []).filter((user) =>
            user.username?.toLowerCase().includes(value.toLowerCase())
        );
        setLocalUsers(filteredUsers);
    };

    const searchSubmitHandler = (e) => {
        e.preventDefault();
    }

    return (
        // Added h-full so it stretches to the bottom on mobile
        <div className='h-full flex flex-col'>
            
            <form onSubmit={searchSubmitHandler} action='' className='flex flex-row p-4 pb-2' >
                <input
                    value={search}
                    onChange={handleSearchChange}
                    className='input input-bordered rounded-md flex-1' 
                    type='text' 
                    placeholder='Search...'
                />
                <UpdateProfilePic />
            </form>
            
            <div className="flex flex-col flex-1 overflow-auto px-2">
                {/* 2. PASS onSelectUser TO OTHERUSERS */}
                <OtherUsers users={localUsers} onSelectUser={onSelectUser} />
            </div>
            
            <div className='m-4'>
                <button onClick={logoutHandler} className='btn btn-sm w-full'>Logout</button>
            </div>
        </div>
    )
}