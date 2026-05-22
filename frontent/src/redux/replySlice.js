import { createSlice } from '@reduxjs/toolkit';

const replySlice = createSlice({
    name: 'reply',
    initialState: {
        replyTo: null // { messageId, text, username }
    },
    reducers: {
        setReplySlice: (state, action) => {
            state.replyTo = action.payload;
        },
        clearReplySlice: (state) => {
            state.replyTo = null;
        }
    }
});

// CHANGE THIS FROM .exports TO .actions:
export const { setReplySlice, clearReplySlice } = replySlice.actions; 
export default replySlice.reducer;