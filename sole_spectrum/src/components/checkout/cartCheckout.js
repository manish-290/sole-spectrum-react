import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLocation } from 'react-router-dom';
import StripeForm from './stripeForm';


const stripePromise = loadStripe('pk_test_51PlWrgE0Twqnzy68LwGTq5PcopoOXnckUKcVkURL1lMkdUXPofNZaYF4RdeGDm1YNevs0YmltMOynAvKwA7PhzVw004XKT2FLc'); // Replace with your Stripe publishable key

const CartCheckout = () => {
  const location = useLocation();
  const cart = location.state.cart;
  const product = location.state ||'';

  if (!cart) {
    return <p>No cart data found.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <ul  className=' grid sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2'>
        {cart.map((item) => (
          <li key={item.id}>
            <div>
              <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
              <div className='flex'>
                <p className='font-bold text-red-500 line-through'>{`$${item.price}  `}</p>
                <p className='font-bold text-green-700 ml-4'>{`$${item.price -3} to pay `}</p>

                </div>
                <img src={item.image} alt={item.title} className="w-32 mt-3 h-32 mb-4" />

            </div>
          </li>
        ))}
      </ul>
      
      <p className='text-xl font-bold text-blue-600'>Total: ${cart.reduce((total, item) => total + item.price-3, 0).toFixed(2)}</p>
    
      <div className=" w-full md:w-1/2 bg-gradient-to-r from-green-700 via-green-500 rounded-lg mt- shadow-lg">
          <Elements stripe={stripePromise}>
            <StripeForm  product={product} cart={cart} />
          </Elements>
        </div>
    </div>
  );
};

export default CartCheckout;