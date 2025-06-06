import Sidebar from "../Sidebar";
import Cart from '../Cart'
import { FaBars } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


import React from "react";
import Droplist from "../droplist";
import { Mycontext } from "../../App";
import { getAll } from "../../RestApi";

const Listing = () => {

    const [productview, setProductview] = useState('three');
    const [open, setopen] = useState(false);
    const [products, setProducts] = useState([]);

    const mycontext = useContext(Mycontext);

    console.log('listing filter in frontend', mycontext.listingfilter)
    const GetProducts = async () => {

        try {
            const response = await getAll(`http://localhost:5000/products?page=-1&filter=${encodeURIComponent(JSON.stringify(mycontext.listingfilter))}`);
            setProducts(response.data.products);
        } catch (error) {
            console.log('Error occur in getting Products', error);
        }
    }

    useEffect(() => {

        GetProducts();
    }, [mycontext.listingfilter])

    return (
        <div className="body_ flex relative">
            <div className="md:w-3/12  sticky top-0">
                <Sidebar></Sidebar>
            </div>
            <div className="md:w-9/12 flex flex-col flex-wrap ml-10">
                <img className="w-full h-[300px]" src='https://t4.ftcdn.net/jpg/02/49/50/15/240_F_249501541_XmWdfAfUbWAvGxBwAM0ba2aYT36ntlpH.jpg' />
                <div className="bg-gray-200 flex h-[80px] w-full justify-between items-center p-2">
                    <div className="flex  items-center">
                        <Button className={`btn_ ${productview === 'one' ? 'act' : ''}`} onClick={() => {
                            setProductview('one');
                        }}> <FaBars /></Button>
                        <Button className={`btn_ ${productview === 'two' ? 'act' : ''}`} onClick={() => {
                            setProductview('two');

                        }}> <BsFillGridFill /></Button>
                        <Button className={`btn_ ${productview === 'three' ? 'act' : ''}`} onClick={() => {
                            setProductview('three');

                        }}> <BsGrid3X3Gap /></Button>
                        <Button className={`btn_ ${productview === 'four' ? 'act' : ''}`} onClick={() => {
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
                    {
                        products && products.map((p) => {
                            return <Cart productview={productview} product={p} />
                        })
                    }

                </div>

                <div className="flex  my-5">
                    <Pagination count={10} color="primary" size="large" />
                </div>
            </div>
        </div>
    )
}

export default Listing;