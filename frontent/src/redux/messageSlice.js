// import { createSlice } from "@reduxjs/toolkit";

// const messageSlice = createSlice({
//   name: "message",
//   initialState: {
//     message: [],
//     nextCursor: null, // Replaces 'page'
//     hasMore: true,
//     loading: false
//   },
//   reducers: {
//     resetMessages: (state) => {
//       state.message = [];
//       state.nextCursor = null;
//       state.hasMore = true;
//       state.loading = false;
//     },
//     // Initial load (newest 20 messages)
//     setInitialMessages: (state, action) => {
//       // API returns newest first [100, 99, 98...]. Reverse for UI [81, 82... 100]
//       state.message = [...action.payload.messages].reverse();
//       state.nextCursor = action.payload.nextCursor;
//       state.hasMore = action.payload.hasMore;
//     },
//     // Prepend older messages on scroll up
//     prependMessages: (state, action) => {
//       // API returns newest first [80, 79...]. Reverse to [61... 80]. Put at TOP of array.
//       state.message = [...action.payload.messages.reverse(), ...state.message];
//       state.nextCursor = action.payload.nextCursor;
//       state.hasMore = action.payload.hasMore;
//     },
//     // Real-time incoming message (add to bottom)
//     addMessage: (state, action) => {
//       state.message.push(action.payload);
//     },
//     // Delete / Update messages
//     updateMessages: (state, action) => {
//       state.message = action.payload;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     }
//   }
// });

// export const { setInitialMessages, addMessage, prependMessages, updateMessages, setLoading, resetMessages } = messageSlice.actions;
// export default messageSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: [],
    nextCursor: null, 
    hasMore: true,
    loading: false
  },
  reducers: {
    resetMessages: (state) => {
      state.message = [];
      state.nextCursor = null;
      state.hasMore = true;
      state.loading = false;
    },
    // Initial load (hook sends it already reversed: oldest at top, youngest at bottom)
    setInitialMessages: (state, action) => {
      state.message = action.payload.messages; // ■ FIX: Removed .reverse()
      state.nextCursor = action.payload.nextCursor;
      state.hasMore = action.payload.hasMore;
    },
    // Prepend older messages (hook sends it already reversed)
    prependMessages: (state, action) => {
      state.message = [...action.payload.messages, ...state.message]; // ■ FIX: Removed .reverse()
      state.nextCursor = action.payload.nextCursor;
      state.hasMore = action.payload.hasMore;
    },
    addMessage: (state, action) => {
      state.message.push(action.payload);
    },
    updateMessages: (state, action) => {
      state.message = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setInitialMessages, addMessage, prependMessages, updateMessages, setLoading, resetMessages } = messageSlice.actions;
export default messageSlice.reducer;