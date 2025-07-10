import { useEffect, useRef } from "react";
import CatCard from "../CatCard";
import Slider from "react-slick";


const FeatureCat = (props) => {

    const featuredCatRef = useRef(null);
    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1534, // 2xl:	Large screens
                settings: {
                    slidesToShow: 7
                }
            },
            {
                breakpoint: 1280, //xl: Desktops
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 1024, //lg: laptops
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 768, // md:  tablets / large phones
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 640, // sm :	Small (mobiles)
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    };

    useEffect(() => {
        setTimeout(() => {
            featuredCatRef?.current?.slickGoTo(0);
        }, 1000)
    }, [])
    return (
        <div>
            <h1 className="font-semibold text-[25px] m-[10px]">FEATURED CATEGORIES</h1>
            <div>
                <Slider ref={featuredCatRef} {...settings} className="featuredcat">
                    {
                        props?.categoryList?.map((item, index) => {

                            return (<div key={index} className="-translate-y-1 shadow-lg !flex !justify-center !items-center !h-[120px] w-[120px] md:!h-[150px] md:!w-[150px] ">
                                <CatCard color={item?.color} name={item?.name} url={item?.images[0]}></CatCard>
                            </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}

export default FeatureCat;