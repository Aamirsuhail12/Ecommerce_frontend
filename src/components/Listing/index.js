import Sidebar from "../Sidebar";
import Cart from '../Cart'
import { FaBars } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


import React from "react";
import Droplist from "../droplist";

const Listing = () => {

    const [productview, setProductview] = useState('three');
    const [open, setopen] = useState(false);

    return (
        <div className="body_ flex relative">
            <div className="md:w-3/12  sticky top-0">
                <Sidebar></Sidebar>
            </div>
            <div className="md:w-9/12 flex flex-wrap ml-10">
                <img className="w-full" src='https://t4.ftcdn.net/jpg/02/49/50/15/240_F_249501541_XmWdfAfUbWAvGxBwAM0ba2aYT36ntlpH.jpg' />
                <div className="bg-gray-200 flex w-full justify-between items-center my-5 p-2">
                    <div className="flex  items-center">
                        <Button className={`btn_ ${productview === 'one' ? 'act' : ''}`} onClick={() => {
                            setProductview('one');
                        }}> <FaBars /></Button>
                        <Button className={`btn_ ${productview === 'two' ? 'act' : ''}`}  onClick={() => {
                            setProductview('two');

                        }}> <BsFillGridFill /></Button>
                        <Button className={`btn_ ${productview === 'three' ? 'act' : ''}`} onClick={() => {
                            setProductview('three');

                        }}> <BsGrid3X3Gap /></Button>
                        <Button className={`btn_ ${productview === 'four' ? 'act' : ''}`}  onClick={() => {
                            setProductview('four');

                        }}> <BsGrid3X3GapFill /></Button>
                    </div>
                    <div className="flex gap-4 items-center relative">
                        <Button className="btn"><span className="text-black mr-2">Sort by latest</span> <FaAngleDown /></Button>
                        <Button className="btn relative" onClick={() => {
                            setopen(!open);
                        }}><span className="text-black mr-2">Show by 12</span>
                            <FaAngleDown />
                            {
                                open && <Droplist />
                            }

                        </Button>

                    </div>

                </div>
                <div className="flex flex-wrap">
                    <Cart productview={productview} />
                    <Cart productview={productview} />
                    <Cart productview={productview} />
                    <Cart productview={productview} />
                    <Cart productview={productview} />
                    <Cart productview={productview} />
                </div>

                 <div className="flex justify-center items-center mx-auto my-5">
                 <Pagination count={10} color="primary"  size="large"/>
                 </div>
            </div>
        </div>
    )
}

export default Listing;