import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
 

 const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [isAuth, setIsAuth] = useState(false);

    useEffect(()=>{
        //check if the user is authenticated
        //checking a token in local storaGE
        const token = localStorage.getItem('token');
        // if(token){
        //     setIsAuth(true);
        // }
        setIsAuth(!token);
    },[]);

    const login =  (token)=>{
        setIsAuth(true);
        localStorage.setItem('token', token);
       
    }

    const logout =()=>{
        localStorage.removeItem('token');
        setIsAuth(false);
        toast.success("Logout successful",{
            duration:3000
        });

        

    }


    return (
        <AuthContext.Provider
          value={{isAuth, login, logout}}
        >
            {children}
        </AuthContext.Provider>
    );
}
export  {AuthContext,AuthProvider};