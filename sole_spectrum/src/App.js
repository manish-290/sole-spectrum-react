
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import ProductList from './components/products/product_list';
import ProductDetail from './components/products/productDetail';
import Cart from './components/cart';
import ContactUs from './components/contact';
import CheckoutProduct from './components/checkout/checkout';
import Signup from './components/auth/signup';
import Login from './components/auth/login';


function App() {

  return (
   <Router>
     <div className='min-h-screen flex flex-col'>
      <Header/>
      <main className='flex-grow container mx-auto px-6 py-6'>
        
        <Routes>
          <Route path='/' element={
            <>
                <h1 className='text-3xl font-bold text-gray-800 mb-6'>Welcome to Sole Spectrum</h1>
                <ProductList/>
            </>
          }/>
          <Route path='/products/:id' element={<ProductDetail />}/>
          <Route path='/productReview' element={<ProductList />}/>
          <Route path='/cart' element={<Cart/>} />
          <Route path='contact' element={<ContactUs/>} />
          <Route path='/checkout' element={<CheckoutProduct />} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        
      </main>
      <Footer/>
    </div>
   </Router>
  );
}

export default App;
