import Catcart from "../Catcart";
import React from "react";
import Slider from "react-slick";


const FeatureCat = (props) => {

    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows : true
    };
    return (
        <div className="body_ pt-4">
            <h1 className="font-semibold text-[25px]">FEATURED CATEGORIES</h1>
            <Slider {...settings} className="category_slider">
                {
                    props?.categoryList.map((item) => {

                        return (<div>

                            <Catcart color={item.color} name={item.name} url={item.images[0]}></Catcart>
                        </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default FeatureCat;