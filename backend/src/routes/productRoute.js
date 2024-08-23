import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();


//get all products from fakestore api
productRouter.get('/external',async(req,res)=>{
    try{
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        res.json(products);
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
});

//get a single product from fakestore API
productRouter.get('/external/:id',async(req,res)=>{
    try{
        const response = await fetch(`http://fakestoreapi.com/products/${req.params.id}`);
        const product = await response.json();
        res.json(product);
    }catch(error){
        res.status(500).json({message:error.message});
    }
})



//get all products
productRouter.get('/', async(req,res)=>{
    try{
        const products = await Product.find();
        res.json(products);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

//get a single product
productRouter.get('/:id', async(req,res)=>{
    try{

        const product = await Product.findById(req.params.id);
        res.json(product);
    }catch(error){
        res.status(500).json({message:error.message})
    }
});

//create new product
productRouter.post('/',async(req,res)=>{
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        category: req.body.title,
        description: req.body.description,
        
    })
    try{
       const newProduct = await product.save();
       res.status(201).json(newProduct);
    }catch(error){
        res.status(400).json({message:error.message})
    }
});

//update the product
productRouter.put('/:id',async(req,res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(updatedProduct);
    }catch(error){
        res.status(400).json({message: error.message})
    }

});

//delete a product
productRouter.delete('/:id', async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.json({message: 'Product deleted '});
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

export default productRouter;

