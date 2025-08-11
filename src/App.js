
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import Footer from './components/Footer';
import Footerlist from './components/Footerlist';
import Listing from './components/Listing';
import ProductDetails from './pages/ProductDetails';
import YourCarts from './components/YourCarts';
import SignIn from './pages/SignIn';
import { Route, Routes } from 'react-router';
import SignUp from './pages/SignUp';
import ViewAllProducts from './components/ViewAllProducts';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert } from './features/alert/alertSlice';
import WishList from './pages/WishList';
import CheckOut from './pages/checkout/CheckOut';
import OrderConfirmed from './pages/orderconfirm';
import Orders from './pages/orders';
import Searching from './pages/Searched';
import { createContext, useState } from 'react';
import MyAccount from './pages/myaccount';
import ForgetPassword from './pages/forgetpassword';
import OtpField from './pages/otpfield';
import ResetPassword from './pages/resetpassword';


const Mycontext = createContext();
function App() {


  const ui = useSelector((state) => state.ui);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  console.log('App');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeAlert());
  };

  const value = {
    query,
    setQuery
  }


  return (
    <Mycontext.Provider value={value}>
      <>
        <Snackbar open={alert?.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alert.color}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alert.msg}
          </Alert>
        </Snackbar>

        {
          ui.isHeaderFooterShow === true && <Header />
        }

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/productListing' element={<Listing />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<YourCarts />} />
          <Route path='/viewall' element={<ViewAllProducts />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/wishlist' element={<WishList />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/order/confirm' element={<OrderConfirmed />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/search' element={<Searching />} />
          <Route path='/my-account' element={<MyAccount />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/otp-field' element={<OtpField />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Routes>
        {
          ui.isHeaderFooterShow === true && <Footerlist />
        }
        {
          ui.isHeaderFooterShow === true && <Footer />
        }
      </>
    </Mycontext.Provider>
  );
}

export { Mycontext };
export default App;
