import axios from "../api/axios";
import { AuthModel } from "../model/authModel";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { auth,SetAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    if (SetAuth) {
      console.log("auth actual",auth)
      SetAuth((prev: AuthModel) => {
        console.log("respuesta refresh", prev);
        console.log("respuesta refresh 2", response.data.accessToken);
        return {
          ...prev,
          roles: response.data.roles,
          accessToken: response.data.accessToken,
        };
      });
    }
    return response.data.accessToken;
  };

  return refresh;
}
export default useRefreshToken;
