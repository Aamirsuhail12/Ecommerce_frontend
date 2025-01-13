import Catcart from "../Catcart";
import React from "react";
import Slider from "react-slick";


const FeatureCat = ()=>{

    const backgroundColors = [
        "#FF5733", // Red-Orange
        "#33FF57", // Green
        "#3357FF", // Blue
        "#FF33A1", // Pink
        "#FFFF33", // Yellow
        "#A133FF", // Purple
        "#33FFF5", // Cyan
        "#FF8C33", // Orange
        "#8C33FF", // Violet
        "#33FF8C"  // Light Green
    ];

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
      };
    return (
        <div className="body_ pt-4">
        <h1 className="font-semibold text-[25px]">FEATURED CATEGORIES</h1>
        <Slider {...settings} className="flex justify-between items-center">
        <div>
            <Catcart clr={ "#FF5733"}></Catcart>
        </div>
        <div>
            <Catcart clr={ "#33FF57"}></Catcart>
        </div>
        <div>
            <Catcart clr={"#3357FF"}></Catcart>
        </div>
        <div>
            <Catcart clr={ "#FF33A1"}></Catcart>
        </div>
        <div>
            <Catcart clr={ "#FFFF33"}></Catcart>
        </div>
        <div>
            <Catcart clr={ "#A133FF"}></Catcart>
        </div>
        <div>
            <Catcart clr={ "#33FFF5"}></Catcart>
        </div>
        <div>
            <Catcart clr={ "#FF8C33"}></Catcart>
        </div>
        <div>
            <Catcart clr={ "#8C33FF"}></Catcart>
        </div>
        <div>
            <Catcart clr={  "#33FF8C"}></Catcart>
        </div>
        </Slider>
        </div>
    )
}

export default FeatureCat;