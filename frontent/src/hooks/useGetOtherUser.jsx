import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast';
import { setOtherUsers } from '../redux/UserSlice';
const useGetOtherUser = () => {
      const dispatch = useDispatch();
    useEffect(() => {
        const fetchOtherUser = async () => {
            try {
                const res = await axios.get('http://localhost:8001/test/getOtherUsers', {
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    withCredentials: true
                })

                if (res?.data?.success) {
                    dispatch(setOtherUsers(res?.data?.otherUser))
                    console.log(res);
                    toast.success(res?.data?.message);
                }
            }
            catch (error) {
                toast.error(error?.response?.data?.message)
                console.log("something backend error  in the  useGetOtherUser function")
            }
        }
        fetchOtherUser();
    }, [])
}
export default useGetOtherUser;