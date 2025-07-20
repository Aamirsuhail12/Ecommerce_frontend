
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

function App() {


  const ui = useSelector((state) => state.ui);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  console.log('App');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeAlert());
  };


  return (
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
      </Routes>
      {
        ui.isHeaderFooterShow === true && <Footerlist />
      }
      {
        ui.isHeaderFooterShow === true && <Footer />
      }
    </>
  );
}

export default App;
