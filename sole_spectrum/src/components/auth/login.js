import React, { useContext, useState } from "react";
import { IoLogIn } from "react-icons/io5";
import appLogo from "/full-stack-react/sole-spectrum-react/sole_spectrum/src/assets/solegif.gif";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import Signup from "./signup";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {login} = useContext(AuthContext);
  // const [error, setError] = useState('');
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };





  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", formData,
        {
          headers:{
              'Content-Type':'application/json'
          },
          withCredentials:true
      }
      );

     
      
      if(res.data.success){
        toast.success(res.data.message,{
          duration:3000
        });
      }
     login( res.data.token);
      setTimeout(()=>{
        navigate("/");
      },1000);
      

    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="h-screen ">
      <div className="  flex justify-center items-center h-24 w-50 shadow-lg">
        <IoLogIn className="size-10" />

        <h1 className="px-2 font-bold text-2xl text-black ">Login</h1>
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
          className="m-2 flex flex-col justify-center items-center"
        >
          <div>
          <div className="flex items-center ">
          <MdEmail className="text-white"/>
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
          <div className="flex itesm-center">
          <TbPasswordFingerprint className="text-white size-5"/>
          <label className="font-bold px-2">Password:</label>
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
              Login
            </button>
            
            
          </div>
          <div className="m-3">
        <p className='text-gray-200 text-sm'>New to the Platform? 
         <Link
         className='font-bold text-blue-200 px-2'
         to='/signup'element={<Signup/>}
         >
         Signup
         </Link></p>
       </div>
        </form>
        <Toaster/>
 
      </div>
    </div>
  );
};

export default Login;
