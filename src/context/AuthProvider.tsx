import { createContext, useState } from "react";
import { AuthModel } from "../model/authModel";
interface AuthContextInter { 
    auth?:AuthModel,
    SetAuth?:React.Dispatch<React.SetStateAction<AuthModel>>
}
const AuthContext = createContext<AuthContextInter>({});
//provee el auth a todo la aplicación por medio de authprovider
// que se consumirá con el useContext() en otro archivo
export const AuthProvider = ({children}:{children:JSX.Element}) =>{
    const [auth, SetAuth] = useState<AuthModel>({});
    return (
        <AuthContext.Provider value={{auth,SetAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;