
import { useEffect, useCallback } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { setInitialMessages, prependMessages, setLoading, resetMessages } from '../redux/messageSlice'
import { useSelector, useDispatch } from 'react-redux'
import API_URL from '../utils/apiUrl';
const useGetMessages = (selectedUser) => {
  const dispatch = useDispatch();
  const { nextCursor, hasMore, loading } = useSelector(store => store.message);

  // 1. INITIAL LOAD (Fetch newest 20)
  useEffect(() => {
    if (!selectedUser?._id) return;
    
    const fetchInitial = async () => {
      dispatch(resetMessages());
      dispatch(setLoading(true));
      try {
        const res = await axios.get(`${API_URL}/test/getMessage/${selectedUser._id}`, { withCredentials: true });
        
        if (res.data.success) {
          // Backend sends [100, 99, 98]. We reverse to [98, 99, 100] (chronological)
          const reversed = [...res.data.messages].reverse();
          
          dispatch(setInitialMessages({
            messages: reversed, 
            nextCursor: res.data.nextCursor,
            hasMore: res.data.hasMore
          }));
          
          axios.post(`${API_URL}/test/mark-read/${selectedUser._id}`, {}, { withCredentials: true }).catch(()=>{});
        }
      } catch (err) {
        toast.error("Failed to load messages");
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchInitial();
  }, [selectedUser?._id, dispatch]);

  // 2. PAGINATION LOAD (Fetch older messages)
  const loadMoreMessages = useCallback(async () => {
    if (!hasMore || !nextCursor || !selectedUser?._id || loading) return;
    
    dispatch(setLoading(true));
    try {
      const res = await axios.get(`${API_URL}/test/getMessage/${selectedUser._id}?cursor=${nextCursor}`, { withCredentials: true });
      
      if (res.data.success) {
        // Backend sends [80, 79, 78]. We reverse to [78, 79, 80] (chronological)
        const reversed = [...res.data.messages].reverse();
        
        dispatch(prependMessages({
          messages: reversed, 
          nextCursor: res.data.nextCursor,
          hasMore: res.data.hasMore
        }));
      }
    } catch (err) {
      toast.error("Failed to load older messages");
    } finally {
      dispatch(setLoading(false));
    }
  }, [hasMore, nextCursor, selectedUser?._id, loading, dispatch]);

  return { loadMoreMessages };
};

export default useGetMessages;