import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    unreadCounts: {} // This will look like: { "user_id_1": 3, "user_id_2": 1 }
  },
  reducers: {
    // Call this when a new message arrives from someone we are NOT currently chatting with
    incrementUnread: (state, action) => {
      const senderId = action.payload;
      if (state.unreadCounts[senderId]) {
        state.unreadCounts[senderId]++;
      } else {
        state.unreadCounts[senderId] = 1;
      }
    },
    // Call this when the user CLICKS on a chat to clear the badge
    resetUnread: (state, action) => {
      const senderId = action.payload;
      delete state.unreadCounts[senderId];
    }
  }
});

export const { incrementUnread, resetUnread } = notificationSlice.actions;
export default notificationSlice.reducer;