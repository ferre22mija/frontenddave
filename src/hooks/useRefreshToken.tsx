import axios from "../api/axios"
import { AuthModel } from "../model/authModel"
import useAuth from "./useAuth"

function useRefreshToken() {
  const {SetAuth} = useAuth();
  const refresh = async ()=>{
    const response = await axios.get('refresh',{
      withCredentials: true
    })
    if(SetAuth){
      SetAuth((prev:AuthModel)=>{
        console.log(JSON.stringify(prev))
        console.log(response.data.accessToken)
        return {...prev,accesToken:response.data.accessToken}
      })
    }
    
  }
  
  return refresh
}
export default useRefreshToken