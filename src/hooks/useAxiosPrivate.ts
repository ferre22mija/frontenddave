import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken"

function useAxiosPrivate() {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config =>{
                if(!config.headers['Authorization']){
                    
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config;
            },(error)=> Promise.reject(error)
            
        )
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                console.log("error interceptor",error)
                console.log("context auth",auth)
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    console.log("encontró error 403 jiji")
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }else{
                    console.log("mana ingresamunchu")
                }
                return Promise.reject(error);
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}
export default useAxiosPrivate