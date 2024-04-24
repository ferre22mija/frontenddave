import { useFormik } from "formik";
import { useState } from "react";
import axios from "../api/axios";
import { AxiosError } from "axios";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const LOGIN_URL = "/auth"; // ruta de logueo
function Login() {
  const { auth, SetAuth } = useAuth(); // jala datos del AuthProvider

  const [success, SetSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: { usuario: "", password: "" },
    onSubmit: async (values) => {
      const usuario = values.usuario;
      try {
        const response = await axios.post(
          LOGIN_URL,
          JSON.stringify({ user: usuario, pwd: values.password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response.data);
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        if (SetAuth) {
          SetAuth({ usuario, roles, accessToken });
        }

        SetSuccess(true);
        navigate(from,{replace:true})
        // alert(JSON.stringify(values, null, 2));
      } catch (error) {
        const err = error as AxiosError;
        if (!(err as AxiosError)?.response) {
          console.log("no server response");
        } else if (err.response?.status === 400) {
          console.log("missing username or password");
        } else if (err.response?.status === 401) {
          console.log("unauthorized");
        } else {
          console.log("login failed");
        }
      }
    },
  });
  return (
    <>
      {success ? (
        <section>
          {" "}
          <h1>estas logueado</h1> <br />{" "}
          <p>
            {auth?.accessToken} <a href="#">ve a casa</a>
          </p>
        </section>
      ) : (
        <div>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor=""> usuario</label>
            <input type="text" {...formik.getFieldProps("usuario")} />
            <hr />
            <label htmlFor="">contrasena</label>
            <input type="password" {...formik.getFieldProps("password")} />
            <hr />
            <button type="submit">ingresar</button>
          </form>
        </div>
      )}
    </>
  );
}
export default Login;
