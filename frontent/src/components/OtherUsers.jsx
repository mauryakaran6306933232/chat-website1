// import React from 'react'
// import OtherUser from './OtherUser'
// import { useSelector } from 'react-redux';
// import useGetOtherUser from '../hooks/useGetOtherUser';
// import Store from '../redux/store';
// export default function OtherUsers({ users }) {
//     useGetOtherUser();
//     const { otherUsers } = useSelector(Store => Store.user)
//     const list = users ?? otherUsers;
//     console.log('new other usre', list)
//     if (!list) {
//         return null;
//     }

//     return (
//         <div className='h-[450px] overflow-auto'>
//             {
//                 list?.map((user) => {
//                     return (
//                         <OtherUser key={user._id} user={user} />
//                     )
//                 })
//             }

//         </div>
//     )
// }
import React from 'react'
import OtherUser from './OtherUser'
import { useSelector } from 'react-redux';
import useGetOtherUser from '../hooks/useGetOtherUser';
import Store from '../redux/store';

// 1. ADD onSelectUser TO PROPS
export default function OtherUsers({ users, onSelectUser }) {
    useGetOtherUser();
    const { otherUsers } = useSelector(Store => Store.user)
    const list = users ?? otherUsers;
    
    if (!list) {
        return null;
    }

        return (
        // Added flex-col here too!
        <div className='flex flex-col flex-1 overflow-auto'>
            {
                list?.map((user) => {
                    return (
                        <OtherUser 
                            key={user._id} 
                            user={user} 
                            onSelectUser={onSelectUser} 
                        />
                    )
                })
            }
        </div>
    )
}