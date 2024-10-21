import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { message } from "antd";
import axios from "axios";

function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [auth, setAuth] = useAuth();

  //get user data
  useEffect(() => {
    if (auth?.user) {
      setName(auth.user.name);
      setEmail(auth.user.email);
      setPhone(auth.user.phone);
      setAddress(auth.user.address);
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/update-profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (data?.error) {
        message.error(data.error);
      } else {
        setAuth({
          ...auth,
          user: data?.updatedUser,
        });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        message.success("PROFILE UPDATED SUCCESSFULLY");
      }
    } catch (error) {
      console.log(error);
      message.error("FAILED TO REGISTER");
    }
  };
  return (
    <Layout title={"ResidentProfile-Waste Management"}>
      <div className="p-3 max-w-2xl mx-auto">
        <h1 className="font-medium text-3xl text-gray-700 text-center my-2 tracking-tight">
          PROFILE
        </h1>
        <form
          action=""
          className="flex flex-col gap-1 bg-white p-8 rounded-2xl shadow-lg mb-12"
          onSubmit={handleSubmit}
        >
          <span className="font-medium">Resident Name</span>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="font-medium">Email</span>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
          <span className="font-medium">Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="font-medium">Phone</span>
          <input
            type="text"
            placeholder="Enter your phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <span className="font-medium">Address</span>
          <input
            type="text"
            placeholder="Enter your address"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            type="submit"
            className="w-full mb-8 bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-xl transition-colors duration-300 mt-2"
          >
            UPDATE PROFILE
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default UserProfile;
