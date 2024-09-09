

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeForm from './stripeForm';


const stripePromise = loadStripe('pk_test_51PlWrgE0Twqnzy68LwGTq5PcopoOXnckUKcVkURL1lMkdUXPofNZaYF4RdeGDm1YNevs0YmltMOynAvKwA7PhzVw004XKT2FLc'); // Replace with your Stripe publishable key


const CheckoutProduct = () => {
    const location =useLocation();
    const {product}= location.state || {};

   
  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
    {product ? (
      <div className="flex flex-col  md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">{product.title?product.title:product.name}</h2>
          {/* <img src={product.image?product.image:product.images} alt={product.title} className='w-40 h-30 object-cover rounded-full'/> */}
          <div className='flex'>
                <p className='font-bold text-red-500 line-through'>{`$${product.price}  `}</p>
                <p className='font-bold text-green-700 ml-4'>{`$${product.price -3} to pay `}</p>
                </div>
          <img src={product.image} alt={product.title} className="w-32 mt-3 h-32 mb-4" />
        </div>
        <div className="w-full md:w-1/2 bg-gradient-to-r from-green-700 via-green-500 rounded-lg mt-5">
          <Elements stripe={stripePromise}>
            <StripeForm product={product} />
          </Elements>
        </div>
      </div>
    ) : (
      <p>No product selected.</p>
    )}
  </div>
 
  );
}

export default CheckoutProduct;