

import { FaBars } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slider from "react-slick";

import { useContext, useEffect, useState, useRef } from "react";
import { getAll } from "../../RestApi";
import { Mycontext } from "../../App";
const NavBar = () => {

  const [categorylist, setcategorylist] = useState([]);
  const sliderRef = useRef(null);

  const mycontext = useContext(Mycontext);

  //menu start
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //menu end

  //slick-slider
  var settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToScroll: 1,
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

  const selectedfilter = (key, value) => {

    mycontext.setlistingfilter({ [key]: value });
  }

  const GetCategory = async () => {
    try {

      const response = await getAll('http://localhost:5000/categories?page=-1')
      setcategorylist(response?.data?.categories)
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.slickGoTo(0); // force refresh to 1st slide
        }
      }, 1000);
    } catch (error) {

      console.log('Error in getting categories', error);
    }
  }
  useEffect(() => {
    GetCategory();
  }, [])
  return (
    <>
      <div className='flex justify-between items-center gap-5'>
        <div className="hidden lg:block">
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              width: '250px',
              padding: '15px',
              borderRadius: '30px',
              backgroundColor: '#00BFFF',
              color: 'white',
              justifyContent: 'space-between'
            }}
          >
            <span><FaBars /></span>
            <span>ALL CATEGORIES</span>
            <span><FaAngleDown /></span>
          </Button>
          <Menu

            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
              },
            }}
          >
            {
              categorylist?.map((item, index) => {
                return (
                  <Link to='/productListing'>
                    <MenuItem key={index} onClick={() => {
                      handleClose();
                      selectedfilter('category', item?.name);
                    }
                    }
                      sx={{
                        display: 'flex',
                        justifyContent: "space-between",
                        alignItems: 'center',
                        width: '200px'
                      }}>{item?.name}<FaAngleRight /></MenuItem>
                  </Link>
                )
              })
            }

          </Menu>
        </div>


        <div className="max-w-[100vw] w-full lg:w-3/4 ">

          <Slider ref={sliderRef} {...settings} className="navbar ">
            {
              categorylist?.map((cat, index) => {
                return (
                  <div key={index} className="px-2">
                    <Link to='/productListing'>
                      <Button sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: {
                          xs: '110px',  // 0px and up
                          md: '120px',  // 900px and up
                        },
                        color: 'black',
                        fontWeight: 'bold',
                        backgroundColor: cat?.color,
                        transition: 'transform 0.2s ease-in-out',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // subtle default shadow
                        '&:hover': {
                          transform: ' scale(1.05)',  // slight pop-out
                          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',  // stronger shadow
                        },
                      }}
                        onClick={() => { selectedfilter('category', cat?.name) }}>{cat?.name?.length > 10 ? cat?.name?.substr(0, 10) + '...' : cat?.name}</Button>

                    </Link>
                  </div>
                )
              })
            }
          </Slider>
        </div>
      </div>
    </>
  )
}

export default NavBar;