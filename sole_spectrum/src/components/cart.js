import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  function getTotalPrice(){
    
    return cart.reduce((total,item)=>total + item.price,0).toFixed(2);
  }

  return (
    <div className="container mx-auto ">
      <h1 className="font-bold text-4xl text-center mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg text-center ">Cart is Empty.</p>
      ) : (
        <div >
          {cart.map((item) => (
            <div className="flex justify-between items-center mb-4 p-4 rounded shadow-lg">
              <div className="flex items-center">
                <img src={item.image} className="h-30 w-20 object-cover mr-4" alt={item.title} />
                <div>
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="font-bold text-green-500">{`$${item.price}`}</p>
                </div>
              </div>
              <button 
              onClick={()=>removeFromCart(item.id)}
              className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-700 transition-colors duration-300">Remove</button>
            </div>
          ))}

          {/* //total price */}
          <div className="text-lg font-bold mt-5 text-gray-500">
            Total: ${getTotalPrice()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
