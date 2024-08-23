
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import { AuthContext } from '../../context/authContext';

const ProductCard = ({product}) => {

  const {addToCart}= useContext(CartContext);
  const {isAuth} = useContext(AuthContext);
    
  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden my-10 transition-shadow duration-300'>
      <Link to={`/products/${product.id}`}>
      <img src={product.image} alt={product.name} className='w-lg h-48 object-cover mx-auto '/>
      <div className='m-6'>
        <h2 className='text-gray-500 font-bold text-lg'>{product.title}</h2>
        <p className='font-bold text-green-500 my-2 mt-0 '>{`$${product.price.toFixed(2)}`}</p>
   {
    isAuth ?(
      <button 
      onClick={()=>addToCart(product)}
      className=' w-40 font-bold bg-blue-800 p-2 text-white rounded-full px-4 py-2 hover:bg-blue-600'>Add to cart</button>
    ):''
   }
      </div>
      </Link>
    </div>
  );
}

export default ProductCard;