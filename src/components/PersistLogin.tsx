import { useEffect, useState } from "react"
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

function PersistLogin() {
    const [isLoading, SetIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log(err)
            } finally {
                SetIsLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : SetIsLoading(false);

    }, [])
    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
        
    }, [isLoading])


    return (
        <div>
            {isLoading ? <p>loading...</p>: <Outlet/>}
        </div>
    )
}
export default PersistLogin