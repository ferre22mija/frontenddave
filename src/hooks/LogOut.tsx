import axios from "../api/axios";
import useAuth from "./useAuth";

function LogOut() {
    const { SetAuth } = useAuth();
    const logout = async()=>{
        if(SetAuth) SetAuth({});
        try{
            const response = await axios('logout',{
                withCredentials: true
            })
        }catch(err){
            console.log(err);
        }

    }
  return logout;
}
export default LogOut