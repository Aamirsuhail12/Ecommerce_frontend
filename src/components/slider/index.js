
import Slider from "react-slick";
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'
import img4 from '../../assets/img4.jpg'
const Slider_ = () => {

  console.log('Slider');
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
          <img className="w-full" src={img1} alt="Image not Found" />
        </div>

        <div >
          <img className="w-full" src={img2} alt="Image not Found" />
        </div>
        <div >
          <img className="w-full" src={img3} alt="Image not Found" />
        </div>
        <div >
          <img className="w-full" src={img4} alt="Image not Found" />
        </div>
     
      </Slider>
    </div>
  )
}

export default Slider_;