import axios from "../api/axios"
import { AuthModel } from "../model/authModel"
import useAuth from "./useAuth"

function useRefreshToken() {
  const {SetAuth} = useAuth();
  const refresh = async ()=>{
    const response = await axios.get('/refresh',{
      withCredentials: true
    })
    if(SetAuth){
      SetAuth((prev:AuthModel)=>{
        console.log("espuesta refresh",JSON.stringify(prev))
        console.log("espuesta refresh 2",response.data.accessToken)
        return {...prev,accessToken:response.data.accessToken}
      })
    }else{
      console.log("nel pastel")
    }
    
  }
  
  return refresh
}
export default useRefreshToken