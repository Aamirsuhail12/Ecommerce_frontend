import Slider_ from "../../components/slider";
import { Mycontext } from "../../App";
import { useContext, useEffect, useState } from "react";
import SelectedProducts from '../../components/SelectedProducts';
import FeatureCat from '../../components/FeatureCat';
import { getAll } from "../../RestApi";
import FeaturedProducts from "../../components/FeaturedProducts";
const Home = () => {

  const context = useContext(Mycontext);
  const [categoryList, setCategoryList] = useState([]);
  const GetCategories = async () => {
    try {

      const response = await getAll('http://localhost:5000/categories?page=-1')
      setCategoryList(response?.data?.categories)
    } catch (error) {
      console.log('Error in getting categories', error);
    }
  }

  useEffect(() => {
    context.setisheaderfooterShow(true);
    GetCategories();
  }, [])
  return (
    <div className="max-w-screen-2xl w-full m-auto">

      <div className="w-full">
        <Slider_></Slider_>
      </div>
      <div className="space">
        <FeatureCat categoryList={categoryList}></FeatureCat>
      </div>
      <div className="space">
        <SelectedProducts ></SelectedProducts>
      </div>
      <div className="space">
        <FeaturedProducts></FeaturedProducts>
      </div>
    </div>
  )
}

export default Home;