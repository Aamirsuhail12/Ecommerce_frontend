import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import { FaBars } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { BiErrorCircle } from "react-icons/bi";
import { SearchProduct } from "../../features/product/productAPI";
import { useSearchParams } from "react-router";

const Searching = () => {


    const targetElement = useRef(null);//scroll to this element.
    const [productview, setProductview] = useState('two');
    const products = useSelector((state) => state.products?.items);
    const status = useSelector((state) => state?.products?.status);
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams()
    const q = searchParams.get('q');
    useEffect(() => {
        targetElement?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [products])

    useEffect(() => {
        console.log('q',q)
        if(q)
         dispatch(SearchProduct(q));
    }, [q])


    return (
        <div className="flex relative space">

            {
                status === 'loading' ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', width: '100%' }}>
                        <CircularProgress size={30} style={{ color: 'black' }} />
                    </Box>
                    :
                    <div className="w-full  flex justify-start items-start flex-wrap h-[100%] md:ml-10">
                        <div className="w-full h-[150px] md:h-[300px]">
                            <img className="w-full h-full" src='https://t4.ftcdn.net/jpg/02/49/50/15/240_F_249501541_XmWdfAfUbWAvGxBwAM0ba2aYT36ntlpH.jpg' alt="Image Not Found" />
                        </div>
                        <div className="bg-gray-200 flex h-[50px] md:h-[80px] w-full justify-between items-center p-2 my-4">
                            <div className="flex  items-center w-1/2 md:w-3/5">
                                <Button className={`btn_ ${productview === 'one' ? 'act' : ''} !block md:!hidden`} onClick={() => {
                                    setProductview('one');
                                }}> <FaBars /></Button>
                                <Button className={`btn_ ${productview === 'two' ? 'act' : ''}`} onClick={() => {
                                    setProductview('two');

                                }}> <BsFillGridFill /></Button>
                                <Button className={`btn_ ${productview === 'three' ? 'act' : ''} !hidden md:!block`} onClick={() => {
                                    setProductview('three');

                                }}> <BsGrid3X3Gap /></Button>
                                <Button className={`btn_ ${productview === 'four' ? 'act' : ''} !hidden lg:!block`} onClick={() => {
                                    setProductview('four');

                                }}> <BsGrid3X3GapFill /></Button>
                            </div>
                            <div className="flex gap-4 items-center justify-end w-1/2 md:w-2/5">
                                <Button sx={{
                                    color: 'black',
                                    backgroundColor: 'white',
                                }}>
                                    <span className="text-black mr-2 normal-case">Sort by latest</span>
                                    <FaAngleDown />
                                </Button>

                            </div>
                        </div>
                        <div ref={targetElement} className="flex flex-wrap justify-start gap-3 items-center">
                            {
                                products?.length === 0 && <div className="flex justify-center items-center flex-wrap m-auto text-red-500 font-bold text-[30px] md:text-[40px]">No product Found!<BiErrorCircle style={{ marginLeft: '15px' }} /></div>
                            }
                            {

                                products?.map((p, index) => {
                                    return <Card key={index} productview={productview} product={p} />
                                })
                            }

                        </div>

                    </div>
            }
        </div>

    )
}

export default Searching;