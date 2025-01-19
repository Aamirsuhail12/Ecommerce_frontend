import Slider_ from "../../components/slider";
import { Mycontext } from "../../App";
import { useContext, useEffect } from "react";
import Banner from '../../components/Banner';
import NewBanner from '../../components/NewBanner'
import FeatureCat from '../../components/FeatureCat';
const Home = ()=>{

    const context = useContext(Mycontext);

    useEffect(()=>{
      context.setisheaderfooterShow(true);
    },[])
    return (
        <div className="home_">
          <Slider_></Slider_>
          <Banner></Banner>
          <NewBanner></NewBanner>
          <FeatureCat></FeatureCat>
        </div>
    )
}

export default Home;