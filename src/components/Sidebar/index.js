
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useEffect, useState } from 'react';
import banner_img from '../../assets/banner1.jpg';
import { Link } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { getAll } from '../../RestApi';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { setBrand, setPrice, setSubcategory } from '../../features/filter/filterSlice';

const Sidebar = () => {

    const filter_ = useSelector((state) => state?.filter);

    const dispatch = useDispatch();
    const [subcategorylist, setsubcategorylist] = useState([]);
    const [brands, setbrands] = useState([]);

    const GetSubCategoryList = async (category) => {
        
        try {
            const response = await getAll(`${process.env.REACT_APP_SERVER_URL}/subcategory?page=-1&category=${encodeURIComponent(category)}`)
            setsubcategorylist(response?.data?.subcategory)
            console.log('res',response?.data?.subcategory)
        } catch (error) {

            console.log('Error in getting subcategory', error);
        }
    }

    const GetProductsBrands = async () => {

        try {
            const response = await getAll(`${process.env.REACT_APP_SERVER_URL}/products?page=-1`)
            // const brands = response?.data?.products && [...new Set(response?.data?.products?.map(p => p?.brand))]
            const brands = [...new Set([...response?.data?.products?.filter(p =>  p?.category?.name === filter_?.category )].map((p)=> p?.brand))]
            setbrands(brands);
        } catch (error) {
            console.log('Error in getting product brands', error);
        }
    }

    const selectedVal = (key, value) => {
        if (key === 'subcategory') {
            dispatch(setSubcategory(value));
        }
        else if (key === 'brand') {
            dispatch(setBrand(value));
        }
    }

    const filterbyprice = (val) => {
        dispatch(setPrice(val));
    }

    useEffect(() => {

        GetSubCategoryList(filter_?.category);
        GetProductsBrands();

    }, [filter_])


    return (
        <div className='sticky flex flex-col gap-5'>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label" style={{ fontWeight: 600, color: 'black' }}>PRODUCT SUBCATEGORIES</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    // value={radionFilter.selectedSubcategory}
                    value={filter_.subcategory}
                    onChange={(e) => {
                        selectedVal('subcategory', e.target.value);
                    }}
                >
                    <ul className='overflow-x-hidden max-h-[250px]'>

                        {
                            subcategorylist && subcategorylist?.map((scat, index) => {
                                return (
                                    <li key={index} className="listitem flex justify-start items-center">
                                        <FormControlLabel value={scat?.subcategory} control={<Radio />} label={scat?.subcategory} />
                                    </li>
                                )
                            })
                        }
                    </ul>

                </RadioGroup>
            </FormControl>

            <div>
                <h3 className='font-semibold mb-4'>FILTER BY PRICE</h3>
                {/* <RangeSlider value={val} onInput={setval} min={10} max={100000} /> */}
                <RangeSlider value={filter_.price} onInput={(v) => {
                    filterbyprice(v)
                }} min={10} max={200000} />
                <div className='flex justify-between mt-2'>
                    <span>From Rs : <strong className='text-green-800'>{filter_.price[0]}</strong></span>
                    <span>To Rs : <strong className='text-green-800'>{filter_.price[1]}</strong></span>
                </div>
            </div>

            <div >
                <h3 className='font-semibold'>PRODUCT STATUS</h3>
                <ul className='overflow-x-hidden max-h-[250px]'>
                    <li className="flex justify-start items-center">

                        <FormControlLabel control={<Checkbox />} label="In Stock" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Out of Stock" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="On Sale" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Regular Price" />
                    </li>
                </ul>
            </div>

            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label" style={{ fontWeight: 600, color: 'black' }}>Product Brands</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={filter_.brand}
                    onChange={(e) => {
                        selectedVal('brand', e.target.value);
                    }}
                >
                    <ul className='overflow-x-hidden max-h-[250px]'>

                        {
                            brands?.map((b, index) => {
                                return (
                                    <li key={index} className="listitem flex justify-start items-center">
                                        <FormControlLabel value={b} control={<Radio />} label={b} />
                                    </li>
                                )
                            })
                        }

                    </ul>

                </RadioGroup>
            </FormControl>

            <Link to='#'><img src={banner_img} className='h-[350px] w-full' alt="Image not fount" /></Link>

        </div>
    )
}

export default Sidebar;