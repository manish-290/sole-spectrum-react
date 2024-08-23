//this is the product schema 

import mongoose from "mongoose";

//first we create schema and then model
const productSchema = new mongoose.Schema({
    title:{type:String, required:true},
    price:{type:Number, required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true}
});

const Product = mongoose.model('Product',productSchema);
export default Product;