import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import logo from '../assets/solegif.gif'
import { AuthContext } from '../context/authContext';
// import axios from 'axios';
// import toast from 'react-hot-toast';

const Header = () => {
  const {isAuth,logout} = useContext(AuthContext);
    const {cart} =  useContext(CartContext)|| {cart:[]};
    const navigate = useNavigate();
    const location = useLocation();

    function cartItemCount(){
      return cart.length;
    }

     // Use useEffect to listen to changes in isAuth
  useEffect(() => {
 
    // When isAuth changes, this will re-render the component
  }, [isAuth]);

  

  const logoutHandler = ()=>{
    logout();
    setTimeout(()=>{
      navigate('/login');
    },1000);
    
  }

  const isActive = (path)=>location.pathname ===path;

  return (
    <header className='bg-white shadow'>
        <div className='constainer mx-auto px-6 py-3 flex items-center justify-between p-4'>
           <Link to='/'>
           <div>
                <a  href="/">
                  <img src={logo} alt='Sole Spectrum' className='  h-20 w-20 rounded-full hover:animate-pulse'/>
                </a>
            </div>
           
           </Link>
           <div flex items-center>

           {
            isAuth ? (
              <>
                 <Link to='/' className={`p-4  font-bold hover:bg-blue-100 rounded-full ${isActive('/')?`text-blue-800`:`text-gray-400`}`}>
            Shop
            </Link>

                <Link to='/contact' className={`p-4  font-bold hover:bg-blue-100 rounded-full ${isActive('/contact')?`text-blue-800`:`text-gray-400`}`}>
                    Contact
                </Link>
                <Link to='/cart' className={`p-4  font-bold hover:bg-blue-100 rounded-full ${isActive('/cart')?`text-blue-800`:`text-gray-400`}`}>
                Cart {
                  cartItemCount() >0 && (
                    <span className={`absolute -top-1 text-xs text-white bg-red-500 px-2 py-1 rounded-full mt-2 `}>
                      {cartItemCount()}
                    </span>
                  )
                }
                </Link>
                <button
                onClick={logoutHandler}
                className={`p-4  font-bold hover:bg-blue-100 rounded-full ${isActive('/logout')?`text-blue-800`:`text-gray-400`}`}
              >
                Logout
              </button>
              </>
            ):(
              <>
               <Link to='/productReview' className={`p-4  font-bold hover:bg-blue-100 rounded-full ${isActive('/productReview')?`text-blue-800`:`text-gray-400`}`}>
            Shop
            </Link>
                <Link 
                to='/signup'
                 className={`p-4   font-bold hover:bg-blue-100 rounded-full ${isActive('/signup')?`text-blue-800`:`text-gray-400`}`}
                >
                  Sign-up
                </Link>
                <Link 
                to='/login'
                 className={`p-4  font-bold hover:bg-blue-100 rounded-full ${isActive('/login')?`text-blue-800`:`text-gray-400`}`}
                >
                  Login
                </Link>
              </>
            )
           }
            </div>
        </div>
    </header>
  );
}

export default Header;