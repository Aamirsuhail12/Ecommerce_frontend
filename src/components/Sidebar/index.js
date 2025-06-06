
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useContext, useEffect, useState } from 'react';
import banner_img from '../../assets/banner1.jpg';
import { Link } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { getAll } from '../../RestApi';
import Checkbox from '@mui/material/Checkbox';
import { Mycontext } from '../../App';

const Sidebar = () => {

    const [val, setval] = useState([500, 50000]);
    const [subcategorylist, setsubcategorylist] = useState([]);
    const [brands, setbrands] = useState([]);

    const mycontext = useContext(Mycontext);

    const GetSubCategoryList = async () => {

        try {

            const response = await getAll('http://localhost:5000/subcategory?page=-1')
            setsubcategorylist(response.data.subcategory)
        } catch (error) {

            console.log('Error in getting subcategory', error);
        }
    }

    const GetProductsBrands = async () => {

        try {
            const response = await getAll('http://localhost:5000/products?page=-1')

            const brands = response.data.products && [...new Set(response.data.products.map(p => p.brand))]
            setbrands(brands);
        } catch (error) {
            console.log('Error in getting product brands', error);
        }
    }

    const selectedVal = (key, value) => {

        mycontext.setlistingfilter({ ...mycontext.listingfilter, [key]: value })
    }

    const filterbyprice = (val) => {
        mycontext.setlistingfilter({ ...mycontext.listingfilter, 'min': val[0], 'max': val[1] })
    }
    useEffect(() => {
        GetSubCategoryList();
        GetProductsBrands();
    }, [mycontext.listingfilter])

    // console.log('listfil', mycontext.listingfilter)
    return (
        <div className='sticky flex flex-col gap-5'>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label" style={{ fontWeight: 600, color: 'black' }}>PRODUCT SUBCATEGORIES</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <ul className='overflow-x-hidden max-h-[250px]'>

                        {
                            subcategorylist && subcategorylist.map((scat) => {
                                return (
                                    <li className="listitem flex justify-start items-center">
                                        <FormControlLabel onChange={() => { selectedVal('subcategory', scat.subcategory) }} value={scat.subcategory} control={<Radio />} label={scat.subcategory} />
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
                <RangeSlider value={val} onInput={(v) => {
                    setval(v);
                    filterbyprice(v)
                }} min={10} max={100000} />
                <div className='flex justify-between mt-2'>
                    <span>From Rs : <strong className='text-green-800'>{val[0]}</strong></span>
                    <span>To Rs : <strong className='text-green-800'>{val[1]}</strong></span>
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
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <ul className='overflow-x-hidden max-h-[250px]'>

                        {
                            brands && brands.map((b) => {
                                return (
                                    <li className="listitem flex justify-start items-center">
                                        <FormControlLabel onChange={() => selectedVal('brand', b)} value={b} control={<Radio />} label={b} />
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