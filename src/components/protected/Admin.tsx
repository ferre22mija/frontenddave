import { Link } from "react-router-dom"
import User from "./User"

function Admin() {
  return (
    <>
    <div>Admin</div>
    <p>página del admin</p>
    <br/>
    <User/>
    <Link to="/">Home</Link>
    </>
    
  )
}
export default Admin