import Layout from "../components/Layout/Layout";
import { Link , useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { message } from "antd";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address
      });
      if(res && res.data.success){
        message.success(res.data && res.data.message);
        navigate("/login");
      }else{
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      message.error("FAILED TO REGISTER")
    }
  };

  return (
    <Layout title={"RgisterPage-Waste Management"}>
      <div className="p-3 max-w-2xl mx-auto">
        <h1 className="font-bold text-3xl  text-green-600 text-center my-7 tracking-tight">
          SIGN UP
        </h1>
        <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            type="text"
            placeholder="Enter your phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button type="submit" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5 text-center">
            Register
          </button>
        </form>
        <div className="flex gap-2 mt-5 text-sm text-gray-800 font-medium">
          <p>If You already have an accounnt?</p>
          <Link to="/login">
            <span className="text-green-600">Login</span>
          </Link>
          <p>please</p>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
