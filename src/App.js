
import './App.css';
import Header from './components/header';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Home from './pages/home';
import Banner from './components/Banner';
import Cart from './components/Cart';
import NewBanner from './components/NewBanner'
import FeatureCat from './components/FeatureCat';
import Footer from './components/Footer';
import Footerlist from './components/Footerlist';

const Mycontext = createContext();
function App() {

  const [countryList,setcountryList] = useState();

  useEffect(()=>{
    fetchCountryList();
  },[])

  async function fetchCountryList(){
       try {
        const response = await axios.get('http://localhost:5000/coutrylist');
        setcountryList(Object.values(response.data.data));
        // console.log(Object.values(response.data.data))
       } catch (error) {
        console.log(error);
       }
  }
  const values = {
    countryList,
  }
  return (
    <Mycontext.Provider value={values}>
    <Header></Header>
    <Home></Home>
    <Banner></Banner>
    <NewBanner></NewBanner>
    <FeatureCat></FeatureCat>
    <Footerlist></Footerlist>
    <Footer></Footer>
    </Mycontext.Provider>
  );
}

export default App;

export {Mycontext};
