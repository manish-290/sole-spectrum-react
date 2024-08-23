import express from 'express';
import Stripe from 'stripe';
const stripeRouter = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

stripeRouter.post('/create-payment-intent',async(req,res)=>{
    const {amount} = req.body;
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency:"usd",
            payment_method_types: ['card']
        });
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            success:true
        })
    }catch(error){
        res.status(500).json({
            error:"payment processing failed"
        })
    }
})

export default stripeRouter;
