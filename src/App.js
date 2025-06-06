
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
import Cart from './components/Cart';
import ViewAllProducts from './components/ViewAllProducts';

const Mycontext = createContext();
function App() {

  const [countryList, setcountryList] = useState();
  const [isheaderfooterShow, setisheaderfooterShow] = useState(true);
  const [filter, setfilter] = useState('Electronics');
  const [listingfilter, setlistingfilter] = useState();

  useEffect(() => {
    fetchCountryList();
  }, [])

  async function fetchCountryList() {
    try {
      const response = await axios.get('http://localhost:5000/coutrylist');
      setcountryList(Object.values(response.data.data));
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
    setlistingfilter
  }
  return (
    <Mycontext.Provider value={values}>
      {
        isheaderfooterShow === true && <Header />
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/productListing' element={<Listing />} />
        <Route path='/product' element={<ProductDetails />} />
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
