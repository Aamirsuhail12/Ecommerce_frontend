

import { FaBars } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { Link, useScrollTrigger } from '@mui/material';
import { FaAngleRight } from "react-icons/fa6";

import { useState } from "react";
const NavBar = ()=>{

    const [isopen,setisopen] = useState(false);
    return (
        <>
         <div className='food flex justify-between items-start'>
                  <div>
                    <Button
                    style={{
                    backgroundColor : '#00BFFF',
                    color : 'white',
                    padding : '15px',
                    borderRadius : '30px',
                    width : '250px',
                    display : 'flex',
                    justifyContent : 'space-between',
                    }}
                    onClick={()=>{
                        setisopen(!isopen);
                    }}
                    >
                    <span><FaBars /></span>
                    <span>ALL CATEGORIES</span>
                    <span><FaAngleDown /></span>
                    </Button>
                    <div className={`ct_list shadow ${isopen === true ? 'open' : ''}`}>
                      <ul>
                        <li className="relaive">
                          <Link className="submenu flex  justify-between items-center">
                          <Button className="btn">Aamir</Button>
                          <FaAngleRight />
                          </Link>
                          <div className="sub">
                              <Link to='#'><Button className="btn">Aamir</Button></Link>
                              <Link to='#'><Button className="btn">Aamir</Button></Link>
                              <Link to='#'><Button className="btn">Aamir</Button></Link>
                              <Link to='#'><Button className="btn">Aamir</Button></Link>
                              <Link to='#'><Button className="btn">Aamir</Button></Link>
                              <Link to='#'><Button className="btn">Aamir</Button></Link>
                              <Link to='#'><Button className="btn">Aamir</Button></Link>
                          </div>
                        </li>
                        <li className="relaive">
                          <Link className="submenu flex  justify-between items-center">
                          <Button className="btn">Aamir</Button>
                          <FaAngleRight />
                          </Link>
                          <div className="sub">
                              <Link to='#'><Button className="btn">Aamir</Button></Link>
                              <Link to='#'><Button className="btn">Aamir</Button></Link>
                              <Link to='#'><Button className="btn">Aamir</Button></Link>
                              <Link to='#'><Button className="btn">Aamir</Button></Link>
                              <Link to='#'><Button className="btn">Aamir</Button></Link>
                              <Link to='#'><Button className="btn">Aamir</Button></Link>
                              <Link to='#'><Button className="btn">Aamir</Button></Link>
                          </div>
                        </li>
                        <li><Link><Button className="btn">Aamir</Button></Link></li>
                        <li><Link><Button className="btn">Aamir</Button></Link></li>
                        <li><Link><Button className="btn">Aamir</Button></Link></li>
                        <li><Link><Button className="btn">Aamir</Button></Link></li>
                        <li><Link><Button className="btn">Aamir</Button></Link></li>
                        <li><Link><Button className="btn">Aamir</Button></Link></li>
                        <li><Link><Button className="btn">Aamir</Button></Link></li>
                        <li><Link><Button className="btn">Aamir</Button></Link></li>
                      </ul>
                    </div>
                    </div>
                  <div className='w-3/5'>
                    <ul className='flex justify-between nav_bar'>
                        <li className="relative">
                          <Link to='/'><Button>HOME</Button></Link>
                          <div className="dropdown flex flex-col shadow w-36 h-auto absolute">
                            <Link to='/'><Button className="custom-button">Clothing</Button></Link>
                            <Link to='/'><Button className="custom-button">Footwear</Button></Link>
                            <Link to='/'><Button className="custom-button">Watches</Button></Link>
                            <Link to='/'><Button className="custom-button">Pants</Button></Link>
                            <Link to='/'><Button className="custom-button">Shirts</Button></Link>
                            <Link to='/'><Button className="custom-button">Shoes</Button></Link>
                          </div>
                        </li>

                        <li className="relative">
                          <Link to='/'><Button>MEN</Button></Link>
                          <div className="dropdown flex flex-col shadow w-36 h-auto absolute">
                            <Link to='/'><Button className="custom-button">Clothing</Button></Link>
                            <Link to='/'><Button className="custom-button">Footwear</Button></Link>
                            <Link to='/'><Button className="custom-button">Watches</Button></Link>
                            <Link to='/'><Button className="custom-button">Pants</Button></Link>
                            <Link to='/'><Button className="custom-button">Shirts</Button></Link>
                            <Link to='/'><Button className="custom-button">Shoes</Button></Link>
                          </div>
                        </li>

                        <li className="relative">
                          <Link to='/'><Button>WOMEN</Button></Link>
                          <div className="dropdown flex flex-col shadow w-36 h-auto absolute">
                            <Link to='/'><Button className="custom-button">Clothing</Button></Link>
                            <Link to='/'><Button className="custom-button">Footwear</Button></Link>
                            <Link to='/'><Button className="custom-button">Watches</Button></Link>
                            <Link to='/'><Button className="custom-button">Pants</Button></Link>
                            <Link to='/'><Button className="custom-button">Shirts</Button></Link>
                            <Link to='/'><Button className="custom-button">Shoes</Button></Link>
                          </div>
                        </li>

                        <li className="relative">
                          <Link to='/'><Button>BEAUTY</Button></Link>
                          <div className="dropdown flex flex-col shadow w-36 h-auto absolute">
                            <Link to='/'><Button className="custom-button">Clothing</Button></Link>
                            <Link to='/'><Button className="custom-button">Footwear</Button></Link>
                            <Link to='/'><Button className="custom-button">Watches</Button></Link>
                            <Link to='/'><Button className="custom-button">Pants</Button></Link>
                            <Link to='/'><Button className="custom-button">Shirts</Button></Link>
                            <Link to='/'><Button className="custom-button">Shoes</Button></Link>
                          </div>
                        </li>

                        <li className="relative">
                          <Link to='/'><Button>WATCHES</Button></Link>
                          <div className="dropdown flex flex-col shadow w-36 h-auto absolute">
                            <Link to='/'><Button className="custom-button">Clothing</Button></Link>
                            <Link to='/'><Button className="custom-button">Footwear</Button></Link>
                            <Link to='/'><Button className="custom-button">Watches</Button></Link>
                            <Link to='/'><Button className="custom-button">Pants</Button></Link>
                            <Link to='/'><Button className="custom-button">Shirts</Button></Link>
                            <Link to='/'><Button className="custom-button">Shoes</Button></Link>
                          </div>
                        </li>

                        <li className="relative">
                          <Link to='/'><Button>KIDS</Button></Link>
                          <div className="dropdown flex flex-col shadow w-36 h-auto absolute">
                            <Link to='/'><Button className="custom-button">Clothing</Button></Link>
                            <Link to='/'><Button className="custom-button">Footwear</Button></Link>
                            <Link to='/'><Button className="custom-button">Watches</Button></Link>
                            <Link to='/'><Button className="custom-button">Pants</Button></Link>
                            <Link to='/'><Button className="custom-button">Shirts</Button></Link>
                            <Link to='/'><Button className="custom-button">Shoes</Button></Link>
                          </div>
                        </li>

                        <li className="relative">
                          <Link to='/'><Button>GIFT</Button></Link>
                          <div className="dropdown flex flex-col shadow w-36 h-auto absolute">
                            <Link to='/'><Button className="custom-button">Clothing</Button></Link>
                            <Link to='/'><Button className="custom-button">Footwear</Button></Link>
                            <Link to='/'><Button className="custom-button">Watches</Button></Link>
                            <Link to='/'><Button className="custom-button">Pants</Button></Link>
                            <Link to='/'><Button className="custom-button">Shirts</Button></Link>
                            <Link to='/'><Button className="custom-button">Shoes</Button></Link>
                          </div>
                        </li>

                        <li className="relative">
                          <Link to='/'><Button>BLOG</Button></Link>
                          <div className="dropdown flex flex-col shadow w-36 h-auto absolute">
                            <Link to='/'><Button className="custom-button">Clothing</Button></Link>
                            <Link to='/'><Button className="custom-button">Footwear</Button></Link>
                            <Link to='/'><Button className="custom-button">Watches</Button></Link>
                            <Link to='/'><Button className="custom-button">Pants</Button></Link>
                            <Link to='/'><Button className="custom-button">Shirts</Button></Link>
                            <Link to='/'><Button className="custom-button">Shoes</Button></Link>
                          </div>
                        </li>

                        <li className="relative">
                          <Link to='/'><Button>CONTACT</Button></Link>
                          <div className="dropdown flex flex-col shadow w-36 h-auto absolute">
                            <Link to='/'><Button className="custom-button">Clothing</Button></Link>
                            <Link to='/'><Button className="custom-button">Footwear</Button></Link>
                            <Link to='/'><Button className="custom-button">Watches</Button></Link>
                            <Link to='/'><Button className="custom-button">Pants</Button></Link>
                            <Link to='/'><Button className="custom-button">Shirts</Button></Link>
                            <Link to='/'><Button className="custom-button">Shoes</Button></Link>
                          </div>
                        </li>
                    </ul>
                  </div>
                </div>
        </>
    )
}

export default NavBar;