import { Link, useNavigate } from "react-router-dom"
import LogOut from "../../hooks/LogOut";

function Home() {
  const navigate = useNavigate();
  const logout = LogOut();
  const out = async () => {
    await logout();
    navigate('/login');
  }
  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <div className="flexGrow">
        <button onClick={out}>Sign Out</button>
      </div>
    </section>
  )
}
export default Home