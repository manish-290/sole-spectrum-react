
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
const StripeForm = ({product,cart}) => {
 
    const stripe = useStripe();
    const elements = useElements();

    let totalAmount;
    if (cart && cart.length > 0) {
      totalAmount = cart.reduce((total, item) => total + item.price-3, 0);
    } else {
      totalAmount = product.price;
    }

    const handleSubmit = async (event) => {
  

        event.preventDefault();

        const cardElement = elements.getElement(CardElement);
    
        if (!stripe || !elements|| !cardElement) {
          return;
        }

      
        
    try{
      const {data:{clientSecret}}= await axios.post('http://localhost:8000/api/stripe/create-payment-intent',{
        amount: product.price|| totalAmount,
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
        toast.error(paymentResult.error.message);
      }else{
        if(paymentResult.paymentIntent.status === 'succeeded'){
          toast.success("Payment Successful");
        }
      }
      if(paymentResult){
        console.log(paymentResult)
      }

    }catch(error){
      toast.error(error.message);
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
   
     
     <form onSubmit={handleSubmit}className="max-w-md mx-auto py-4 ">
         <label className="block  text-white text-sm font-bold mb-2">
        Card Details
      </label>
      <div className="mb-4">
        <CardElement options={cardElementOptions} className="p-3 border rounded-md shadow-sm bg-white" />
      </div>
       <div className='flex justify-center items-center'>
       <button
        type='submit'
        disabled={!stripe}
        className='bg-white text-blue-900 font-bold py-1 px-2 rounded-md shadow-xl hover:shadow-green-800 hover:bg-gray-100 mt-4'
        >
            Pay ${product.price? product.price-3:totalAmount.toFixed(2)}
        </button>
       
       </div>
       <ToastContainer/>
    </form>
  );
}

export default StripeForm;