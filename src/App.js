
import './App.css';
import Header from './components/header';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
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


const Mycontext = createContext();
function App() {

  const [countryList, setcountryList] = useState();
  const [isheaderfooterShow, setisheaderfooterShow] = useState(true);
  const [filter, setfilter] = useState('Electronics');
  const [listingfilter, setlistingfilter] = useState();
  const [totalCart, setTotalCart] = useState(0);
  const [alertBox, setalertBox] = useState({
    open: false,
    color: '',
    msg: ''
  })



  async function fetchCountryList() {
    try {
      const response = await axios.get('http://localhost:5000/coutrylist');
      setcountryList(Object.values(response?.data?.data));
    } catch (error) {
      console.log(error);
    }
  }

  const values = {
    countryList,
    isheaderfooterShow,
    setisheaderfooterShow,
    filter,
    setfilter,
    listingfilter,
    setlistingfilter,
    alertBox,
    setalertBox,
    totalCart,
    setTotalCart
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setalertBox({
      open: false,
      color: '',
      msg: ''
    })
  };

  useEffect(() => {
    fetchCountryList();
  }, [])

  return (
    <Mycontext.Provider value={values}>

      <Snackbar open={alertBox?.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertBox.color}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertBox.msg}
        </Alert>
      </Snackbar>

      {
        isheaderfooterShow === true && <Header />
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
        isheaderfooterShow === true && <Footerlist />
      }
      {
        isheaderfooterShow === true && <Footer />
      }
    </Mycontext.Provider>
  );
}

export default App;

export { Mycontext };
