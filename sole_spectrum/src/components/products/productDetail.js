import React, {  useContext, useEffect, useState } from 'react';
// import {useParams} from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
// import { CartContext } from '../../context/cartContext';
const ProductDetail = () => {

const {id} = useParams();
const navigate = useNavigate();

const [product,setProduct]= useState(null);
const {isAuth} = useContext(AuthContext);

// const {addToCart} = useContext(CartContext);

useEffect(()=>{
    fetch(`http://localhost:8000/api/products/external/${id}`)
    .then((res)=>res.json())
    .then((data)=>setProduct(data))
    .catch((error)=>console.error('Error fetching the product', error));
},[id]);

if(!product){
    return <div>Loading...</div>
}

function handleBuy(){
  // addToCart(product);
navigate('/checkout',{state:{product}});
}

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='flex flex-col md:flex-row items-center'>
        <img src={product.image} alt={product.title} className='w-64 h-70 object-cover'/>
        <div className='md:ml-8 mt-4 md:mt-0'>
        <h2 className='font-bold text-3xl'>{product.title}</h2>
        <p className='mt-4 mb-6 text-lg'>{product.description}</p>
        <p className='font-bold text-green-600 text-2xl '>{`$${product.price} only/-`}</p>
        {
          isAuth ?(
            <button 
        onClick={()=>handleBuy(product)}
        className='font-bold bg-green-700 mt-2 hover:bg-green-900 text-white p-3'>Buy now</button>

          ):''
        }
      </div>
      </div>
     
    </div>
  );
}

export default ProductDetail;