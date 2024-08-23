
import React, { useEffect, useState } from 'react';
import ProductCard from './product_card';

const ProductList = () => {

    const [products,setProducts]= useState([]);

    useEffect(()=>{
      //https://fakestoreapi.com/products
        fetch('http://localhost:8000/api/products/external')
            .then(res=>res.json())
            .then((data)=>setProducts(data))
            .catch((error)=>console.error('Error fetching the products',error));
    },[]);
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-6'>
      {products.map((product)=>(
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;