
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Search from '../Search';
import { useState, useEffect } from 'react';
import { getAll } from '../../RestApi';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { setBrand, setPrice, setSubcategory } from '../../features/filter/filterSlice';


export default function TemporaryDrawer({ open, toggleDrawer }) {

    const dispatch = useDispatch();
    const filter = useSelector((state) => state?.filter);
    const [subcategorylist, setsubcategorylist] = useState([]);
    const [brands, setbrands] = useState([]);

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

    const GetSubCategoryList = async (category) => {
        try {
            const response = await getAll(`http://localhost:5000/subcategory?page=-1&category=${JSON.stringify(category)}`)
            setsubcategorylist(response?.data?.subcategory)
        } catch (error) {

            console.log('Error in getting subcategory', error);
        }
    }

    const GetProductsBrands = async () => {

        try {
            const response = await getAll('http://localhost:5000/products?page=-1')
            const brands = response?.data?.products && [...new Set(response?.data?.products?.map(p => p?.brand))]
            console.log('bra', brands);
            setbrands(brands);
        } catch (error) {
            console.log('Error in getting product brands', error);
        }
    }

    useEffect(() => {

        GetSubCategoryList(filter?.category);
        GetProductsBrands();

    }, [filter])

    return (
        <div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 300 }} role="presentation">
                    <List>
                        {
                            <ListItem>
                                <Search />
                            </ListItem>
                        }
                    </List>
                    <Divider />
                    <List>
                        {
                            <ListItem>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label" style={{ fontWeight: 600, color: 'black' }}>PRODUCT SUBCATEGORIES</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        value={filter?.subcategory}
                                        onChange={(e) => {
                                            selectedVal('subcategory', e.target.value);
                                        }}
                                    >
                                        <ul className='overflow-x-hidden max-h-[250px]'>

                                            {
                                                subcategorylist?.map((scat, index) => {
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
                            </ListItem>
                        }
                    </List>
                    <List>
                        {
                            <ListItem>
                                <div>
                                    <h3 className='font-semibold mb-4'>FILTER BY PRICE</h3>
                                    <RangeSlider value={filter.price} onInput={(v) => {
                                        filterbyprice(v)
                                    }} min={10} max={100000} />
                                    <div className='flex justify-between mt-2'>
                                        <span>From Rs : <strong className='text-green-800'>{filter.price[0]}</strong></span>
                                        <span>To Rs : <strong className='text-green-800'>{filter.price[1]}</strong></span>
                                    </div>
                                </div>

                            </ListItem>
                        }
                    </List>
                    <Divider />
                    <List>
                        {
                            <ListItem>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label" style={{ fontWeight: 600, color: 'black' }}>Product Brands</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        value={filter.brand}
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
                            </ListItem>
                        }
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}
