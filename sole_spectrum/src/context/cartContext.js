import { createContext, useEffect, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({children}) => {

    const [cart, setCart] = useState(()=>{
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart):[];
    });

    // const [cart,setCart]= useState([]);

    useEffect(()=>{
      localStorage.setItem('cart',JSON.stringify(cart));
    },[cart]);
    //add to cart function
    const addToCart = (product)=>{
        setCart((prevCart)=>[...prevCart,product]);
    };

    //remove from teh cart
    const removeFromCart = (productId)=>{
        setCart((prevCart)=>prevCart.filter((item)=>item.id !== productId))
    }

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
        {children}
    </CartContext.Provider>
  );
}

export  {CartContext,CartProvider};