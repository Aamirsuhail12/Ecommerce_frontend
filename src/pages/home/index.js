import Slider_ from "../../components/slider";
import { Mycontext } from "../../App";
import { useContext, useEffect, useState } from "react";
import Banner from '../../components/Banner';
import NewBanner from '../../components/NewBanner'
import FeatureCat from '../../components/FeatureCat';
import { getAll } from "../../RestApi";
const Home = () => {

  const context = useContext(Mycontext);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);

  const GetCategories = async () => {
    try {

      const response = await getAll('http://localhost:5000/categories?page=-1')
      setCategoryList(response.data.categories)
    } catch (error) {
      console.log('Error in getting categories', error);
    }
  }

  const GetProducts = async () => {
    try {

      const response = await getAll('http://localhost:5000/products?page=-1')
      setProductList(response.data.products)
    } catch (error) {

      console.log('Error in getting products.', error);
    }
  }
  useEffect(() => {
    context.setisheaderfooterShow(true);
    GetCategories();
    GetProducts();
  }, [])
  return (
    <div className="home_">
      <Slider_></Slider_>
      <FeatureCat categoryList={categoryList}></FeatureCat>
      <Banner productList={productList}></Banner>
      <NewBanner productList={productList}></NewBanner>
    </div>
  )
}

export default Home;