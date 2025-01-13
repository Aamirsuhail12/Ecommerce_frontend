
import React from "react";
import Slider from "react-slick";

const Slider_ = ()=>{

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows : true,
        autoplay : false,
        autoplaySpeed: 2000, 
      };
    return (
        <div className="home_banner">
        <Slider {...settings}>
          <div>
          <img className="w-full" src='https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?t=st=1736409899~exp=1736413499~hmac=b6404a35423c44fe803a26471fdefbc37e873271051fbf335be71aa3bb0210e1&w=1060' alt="Image not Found"/>
          </div>
          <div>
          <img className="w-full" src='https://img.freepik.com/free-psd/banner-template-big-sale-with-woman-shopping-bags_23-2148786756.jpg?t=st=1736409980~exp=1736413580~hmac=9fc25eb3a524300e2265e20d266ae2c9b2082f98a96b1afed2b35808c8a462db&w=1060' alt="Image not Found"/>
          </div>
          <div>
          <img className="w-full" src='https://img.freepik.com/free-psd/sales-horizontal-banner-template_23-2148912912.jpg?t=st=1736410019~exp=1736413619~hmac=a4ba63bf7b80499c3ee585373190c63a5bc3d9effc6087e442ec5620750d2f11&w=1060' alt="Image not Found"/>
           </div>
        </Slider>
        </div>
    )
}

export default Slider_;