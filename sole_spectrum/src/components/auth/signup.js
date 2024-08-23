import React, { useState } from "react";
import { SiGnuprivacyguard } from "react-icons/si";
import appLogo from "/full-stack-react/sole-spectrum-react/sole_spectrum/src/assets/solegif.gif";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import Login from "./login";
const Signup = () => {
  //usestate hooks
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //password validation function
  const isPasswordStrong = (password) => {
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPassword.test(password);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordStrong(password)) {
      return toast.error(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-screen">
      <div className="  flex justify-center items-center h-24 w-50 shadow-lg">
        <SiGnuprivacyguard className="size-10 " />
        <h1 className="px-2 font-bold text-2xl text-black ">Signup</h1>
      </div>
      <div className="w-100 m-2 h-100 rounded-lg bg-gradient-to-r from-blue-600 via-purple-400 to-pink-400">
        <div className="flex justify-center py-8">
          <img
            className="w-40 h-50 rounded-full "
            src={appLogo}
            alt="sole spectrum"
          />
        </div>
        <form
          onSubmit={onSubmit}
          className="m-2 flex flex-col justify-center items-center p-4"
        >
          <div>
            <div className="flex">
              <CiUser className="size-5 text-white " />
              <label className="font-bold px-2 ">Username:</label>
            </div>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              className="w-80 p-2 border-2 rounded text-sm focus:ring-2 focus:ring-blue-400  transition-all"
              required
            />
          </div><br></br>
          <div>
            <div className="flex items-center">
            <MdOutlineAlternateEmail className="size-5 text-white"/>

           <label className="font-bold px-2">Email:</label>
            </div>
           
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-80 p-2 border-2 rounded text-sm focus:ring-2 focus:ring-blue-400 transition-all"
              required
            />
          </div>
          <br></br>
          <div>
            <div className="flex">
            <TbPasswordFingerprint className="text-white size-5"/>
                <label className="font-bold  px-2">Password:</label>
            </div>
            
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-80 p-2 border-2 rounded text-sm focus:ring-2 focus:ring-blue-400 transition-all"
              required
            />
          </div>

          <div className="flex justify-center mt-2 ">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-400  font-bold text-white animate-bounce px-6 shadow-lg py-2  mt-3 rounded-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105"
            >
              Sign-up
            </button>
            <br></br>
          </div>
          <div>
            <p className="text-gray-200 text-sm">
              Already have an account?
              <Link
                className="font-bold text-blue-200 px-2"
                to="/login"
                element={<Login />}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default Signup;
