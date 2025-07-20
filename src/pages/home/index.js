import Slider_ from "../../components/slider";
import { useEffect, useState } from "react";
import SelectedProducts from '../../components/SelectedProducts';
import FeatureCat from '../../components/FeatureCat';
import FeaturedProducts from "../../components/FeaturedProducts";
import { useDispatch } from "react-redux";
import { setHeaderFooterVisibility } from "../../features/ui/uiSlice";

const Home = () => {

  console.log('Home');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderFooterVisibility(true));
  }, [])
  return (
    <div className="max-w-screen-2xl w-full m-auto">

      <div className="w-full">
        <Slider_></Slider_>
      </div>
      <div className="space">
        <FeatureCat></FeatureCat>
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