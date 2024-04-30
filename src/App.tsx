import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Layout from "./components/Layout";
import UnAuthorised from "./components/UnAuthorised";
import Home from "./components/protected/Home";
import Editor from "./components/protected/Editor";
import Admin from "./components/protected/Admin";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
const ROLES = {
  admin: 5150,
  editor: 1984,
  user: 2001,
};
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/** public */}
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<UnAuthorised />} />
          {/**protected */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
              <Route path="/" element={<Home />} />
              <Route path="admin" element={<Admin />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
              <Route path="editor" element={<Editor />} />
            </Route>
          </Route>

          {/**catch all */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
