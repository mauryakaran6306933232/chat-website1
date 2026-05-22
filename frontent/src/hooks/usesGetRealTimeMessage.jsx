import { useEffect } from "react";
import store from "../redux/store";
import { useSelector, useDispatch } from 'react-redux'
import { addMessage, updateMessages } from "../redux/messageSlice";
import { incrementUnread } from "../redux/UserSlice"; // Points to UserSlice now
import axios from "axios";
import API_URL from '../utils/apiUrl';
const useGetRealTimeMessage = (selectedUser) => {
  const dispatch = useDispatch();
  const { socket } = useSelector(store => store.socket);
  const { authUser } = useSelector(store => store.user);

  useEffect(() => {
    if (!socket) return;

    const messageHandler = (p1) => {
      const isForActiveChat = selectedUser?._id === p1.senderId || selectedUser?._id === p1.receiverId;
      
      if (!isForActiveChat) {
        if (p1.receiverId === authUser?._id) {
          // Dispatches to UserSlice now!
          dispatch(incrementUnread(p1.senderId)); 
        }
        return; 
      }

      const currentMessages = store.getState().message.message;
     // addMessage automatically pushes to the array safely
dispatch(addMessage(p1));

      if (p1.senderId === selectedUser?._id) {
        axios.post(`${API_URL}/test/mark-read/${selectedUser._id}`, {}, { withCredentials: true })
          .catch(err => console.log("Realtime mark read error:", err));
      }
    };

    const deleteHandler = (messageId) => {
      const currentMessages = store.getState().message.message || [];
      const updatedMessages = currentMessages.map(msg =>
        msg._id === messageId
          ? { ...msg, message: "This message was deleted", fileUrl: "", fileType: "", deletedForEveryone: true }
          : msg
      );
      dispatch(updateMessages(updatedMessages));
    };

    const readHandler = ({ receiverId }) => {
      const currentMessages = store.getState().message.message || [];
      const updatedMessages = currentMessages.map(msg => {
        if (msg.senderId === authUser?._id && msg.receiverId === receiverId) {
          if (!msg.readBy?.includes(receiverId)) {
            return { ...msg, readBy: [...(msg.readBy || []), receiverId] };
          }
        }
        return msg;
      });
      dispatch(updateMessages(updatedMessages));
    };

    socket.on("newMessage", messageHandler);
    socket.on("messageDeleted", deleteHandler);
    socket.on("messageRead", readHandler);

    return () => {
      socket.off("newMessage", messageHandler);
      socket.off("messageDeleted", deleteHandler);
      socket.off("messageRead", readHandler);
    };
    
  }, [socket, authUser?._id, dispatch, selectedUser?._id]);
}

export default useGetRealTimeMessage;