import { useEffect, useState } from "react"
import { AuthModel } from "../../model/authModel";
import axios from "../../api/axios";

function User() {
  const [users,SetUsers] = useState<Array<AuthModel>>();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () =>{
      try{
        const response = await axios.get('/employee',{
          withCredentials: true,
          signal:controller.signal
        }) 
        console.log(response.data)
        isMounted && SetUsers(response.data);
      }catch(err){
        console.log(err)
      }
    }
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])
  
  return (
    <article>
      <h2>Users</h2>
      {users?.length
      ? (<ul>{users.map((user,i)=> <li key={i}>{user?.usuario}</li>)}</ul>): <h3>not found users</h3>

      }
    </article>
  )
}
export default User