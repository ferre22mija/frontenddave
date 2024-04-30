import { useEffect, useState } from "react"
import { AuthModel } from "../../model/authModel";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

function User() {
  const [users,SetUsers] = useState<Array<AuthModel>>();
  const refresh = useRefreshToken();
  const axiosPrivate =useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () =>{
      try{
        const response = await axiosPrivate.get('/employee',{
          signal:controller.signal
        }) 
        console.log(response.data)
        isMounted && SetUsers(response.data);
      }catch(err){
        console.log(err)
        navigate('/login',{state:{from:location},replace:true})
      }
    }
    getUsers();
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    }
  }, [])
  
  return (
    <article>
      <h2>Users</h2>
      {users?.length
      ? (<ul>{users.map((user,i)=> <li key={i}>{user?.username}</li>)}</ul>): <h3>not found users</h3>

      }
      <button onClick={()=>{refresh()}}>refresh</button>
    </article>
  )
}
export default User