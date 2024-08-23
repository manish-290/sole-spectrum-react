
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import React, { useState } from 'react';
import axios from 'axios';
const StripeForm = ({product}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error,setError]= useState(null);
    const [success,setSuccess] = useState(false);

    const handleSubmit = async (event) => {
  

      //next portion 



        event.preventDefault();

        const cardElement = elements.getElement(CardElement);
    
        if (!stripe || !elements|| !cardElement) {
          return;
        }
    

        //extra
    //     const stripeResponse = await stripe.createPaymentMethod({
    //       type: 'card',
    //       card: cardElement
    //   });

    //   const { error, paymentMethod } = stripeResponse;

    //   if (error || !paymentMethod) {
    //     return;
    // }

    // const paymentMethodId = paymentMethod.id;
        
    try{
      const {data:{clientSecret}}= await axios.post('http://localhost:8000/api/stripe/create-payment-intent',{
        amount: product.price,
        currency: 'usd',
        credentials:'include',
        headers:{
          'Content-Type':'application/json'
        }
      });

  


      const paymentResult = await stripe.confirmCardPayment(clientSecret,{
        
        payment_method:{
          type:'card',
          card:cardElement,
          billing_details:{
            name:product.name,
          }
        }
      });

      if(paymentResult.error){
        setError(paymentResult.error.message);
      }else{
        if(paymentResult.paymentIntent.status === 'succeeded'){
          setSuccess(true);
        }
      }
      if(paymentResult){
        console.log(paymentResult)
      }

    }catch(error){
      setError(error.message);
      console.error('Payment error:', error);
    }
       
      };
      const cardElementOptions = {
        style: {
          base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
          },
        },
      };
    
  return (
    <form onSubmit={handleSubmit}className="max-w-md mx-auto">
         <label className="block text-gray-700 text-sm font-bold mb-2">
        Card Details
      </label>
      <div className="mb-4">
        <CardElement options={cardElementOptions} className="p-3 border rounded-md shadow-sm" />
      </div>
       <div className='flex justify-center items-center'>
       <button
        type='submit'
        disabled={!stripe}
        className='bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4'
        >
            Pay ${product.price-3}
        </button>
        {error && <div>{error}</div>}
        {success && <div>Payment successful!</div>}
       </div>
    </form>
  );
}

export default StripeForm;