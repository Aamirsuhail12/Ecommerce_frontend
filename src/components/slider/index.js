
import Slider from "react-slick";
import sliderbanner1 from '../../assets/sliderbanner1.jpeg'
import sliderbanner2 from '../../assets/sliderbanner2.jpeg'
import sliderbanner3 from '../../assets/sliderbanner3.jpeg'
const Slider_ = () => {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  return (
    <div className=" max-w-screen-2xl w-full m-auto relative">
      <Slider {...settings}>
        <div >
          <img className="w-full" src={sliderbanner1} alt="Image not Found" />
        </div>
        <div >
          <img className="w-full" src={sliderbanner2} alt="Image not Found" />
        </div>
        <div >
          <img className="w-full" src={sliderbanner3} alt="Image not Found" />
        </div>
      </Slider>
    </div>
  )
}

export default Slider_;