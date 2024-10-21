import Layout from "../components/Layout/Layout";
import { Link , useNavigate , useLocation} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Auth";
import {message} from "antd";


function LogIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth , setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/login`, {
        email,
        password,
      });
      if(res && res.data.success){
        message.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        }) // set the auth context
        localStorage.setItem("auth" , JSON.stringify(res.data));
        navigate(location.state || "/");
      }else{
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      message.error("FAILED TO LOGIN")
    }
  };
  return (
    <Layout title={"LoginPage-Waste Management"}>
      <div className="p-3 max-w-2xl mx-auto">
        <h1 className="font-bold text-3xl  text-green-600 text-center my-7 tracking-tight">
          SIGN IN
        </h1>
        <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5 text-center">
            Login
          </button>
        </form>
        <div className="flex gap-2 mt-5 text-sm text-gray-800 font-medium">
          <p>If You donnot have an accounnt?</p>
          <Link to="/register">
            <span className="text-green-600">Register</span>
          </Link>
          <p>please</p>
        </div>
      </div>
    </Layout>
  );
}

export default LogIn;
