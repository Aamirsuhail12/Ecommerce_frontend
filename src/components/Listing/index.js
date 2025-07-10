import Sidebar from "../Sidebar";
import Card from '../Card'
import { FaBars } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { useContext, useEffect, useRef, useState } from "react";
import Pagination from '@mui/material/Pagination';
import { Mycontext } from "../../App";
import { getAll } from "../../RestApi";

const Listing = () => {

    const targetElement = useRef(null);//scroll to this element.
    const [productview, setProductview] = useState('two');
    const [products, setProducts] = useState([]);

    const mycontext = useContext(Mycontext);

    console.log('listing filter in frontend', mycontext.listingfilter)
    const GetProducts = async () => {

        try {
            const response = await getAll(`http://localhost:5000/products?page=-1&filter=${encodeURIComponent(JSON.stringify(mycontext.listingfilter))}`);
            setProducts(response?.data?.products);
        } catch (error) {
            console.log('Error occur in getting Products', error);
        }
    }

    useEffect(() => {
        targetElement?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [products])

    useEffect(() => {
        GetProducts();
    }, [mycontext?.listingfilter])

    return (
        <div className="flex relative space">
            <div className="hidden  md:block lg:w-3/12  sticky top-0">
                <Sidebar></Sidebar>
            </div>
            <div className="w-full md:w-9/12 flex justify-start items-start flex-wrap h-[100%] md:ml-10">
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
                        products && products?.map((p, index) => {
                            return <Card key={index} productview={productview} product={p} />
                        })
                    }

                </div>
                <Pagination count={10} color="primary" size="large" />

            </div>
        </div>
    )
}

export default Listing;