// import Swiper core and required modules
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef, useState } from 'react';

const _Swiper = ({ product }) => {

    const [index, setIndex] = useState(0);
    const bigSlider = useRef(null);
    const smallSlider = useRef(null);
    const handleClick = (idx) => {
        setIndex(idx);
        bigSlider?.current?.slideTo(idx)
        smallSlider?.current?.slideTo(idx)
    }
    return (
        <div className='h-auto max-h-[300px] '>
            <Swiper
                ref={bigSlider}
                // install Swiper modules
                spaceBetween={30}
                slidesPerView={1}
                onSwiper={(swiper) => bigSlider.current = swiper}
                onSlideChange={() => console.log('slide change')}
            >
                {
                    product?.images?.map((url, index) => {
                        return (
                            <SwiperSlide key={index} onClick={() => handleClick(index)} className='flex justify-center items-center !h-[200px] sm:!h-[270px]  md:!h-[300px] w-full'>
                                <img className='h-full w-full' src={url} alt="Image Not Found" />
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>

            <Swiper
                ref={smallSlider}
                className='mt-[50px] '
                // install Swiper modules
                modules={[Navigation, A11y]}
                spaceBetween={30}
                slidesPerView={3}
                navigation
                onSwiper={(swiper) => smallSlider.current = swiper}
                onSlideChange={() => console.log('slide change')}
            >
                {
                    product?.images?.map((url, idx) => {
                        return (
                            <SwiperSlide
                                key={idx}
                                onClick={() => handleClick(idx)}
                                className={`${index === idx ? 'opacity-100 border-2 border-dashed border-black' : 'opacity-60'} flex justify-center items-center !h-[60px] sm:!h-[80px] md:!h-[100px]`}>
                                <img className='h-full w-full' src={url} alt="Image Not Found" />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    );
};

export default _Swiper;