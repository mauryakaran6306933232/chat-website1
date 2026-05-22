// import { createSlice } from "@reduxjs/toolkit";
// const userSlice = createSlice({
//     name : "user",
//     initialState : {
//         authUser : null,
//         otherUsers : null,
//         selectedUser : null,
//         onlineUsers : null,
//     },
//     reducers :{
//         setAuthUser : (state , action)=>{
//             state.authUser  = action.payload;
//         },
//         setOtherUsers : (state , action)=>{
//             state.otherUsers = action.payload;
//         },
//         setSelectedUser : (state , action)=>{
//             state.selectedUser = action.payload;

//         },
//           setOnlineUsers : (state , action)=>{
//             state.onlineUsers  = action.payload;
//         },
//     }
// });
// export const {setAuthUser , setOtherUsers , setSelectedUser , setOnlineUsers}= userSlice.actions;
// export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        authUser : null,
        otherUsers : null,
        selectedUser : null,
        onlineUsers : null,
        unreadCounts : {}, // <--- ADDED THIS
    },
    reducers :{
        setAuthUser : (state , action)=>{
            state.authUser  = action.payload;
        },
        setOtherUsers : (state , action)=>{
            state.otherUsers = action.payload;
        },
        setSelectedUser : (state , action)=>{
            state.selectedUser = action.payload;
        },
        setOnlineUsers : (state , action)=>{
            state.onlineUsers  = action.payload;
        },
        // <--- ADDED THESE TWO:
        incrementUnread: (state, action) => {
            const senderId = action.payload;
            if (state.unreadCounts[senderId]) {
                state.unreadCounts[senderId]++;
            } else {
                state.unreadCounts[senderId] = 1;
            }
        },
        resetUnread: (state, action) => {
            const senderId = action.payload;
            // 🔥 SAFETY CHECK: Only delete if unreadCounts actually exists
            if (state.unreadCounts && state.unreadCounts[senderId]) {
                delete state.unreadCounts[senderId];
            }
        },
         setInitialUnreadCounts: (state, action) => {
            state.unreadCounts = action.payload;
        }
    }
});

export const {setAuthUser , setOtherUsers , setSelectedUser , setOnlineUsers, incrementUnread, resetUnread, setInitialUnreadCounts} = userSlice.actions;
export default userSlice.reducer;