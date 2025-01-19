
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useState } from 'react';
import banner_img from '../../assets/banner1.jpg';
import { Link } from '@mui/material';


const Sidebar = () => {

    const [val,setval] = useState([500,5000]);
    return (
        <div className='sticky flex flex-col gap-5'>
            <div>
                <h3 className='font-semibold'>PRODUCT CATEGORIES</h3>
                <ul className='overflow-x-hidden max-h-[250px]'>
                    <li className="listitem flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Label" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Label" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Label" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Label" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Label" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Label" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Label" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Label" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Label" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Label" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Label" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Label" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Label" />
                    </li>
                </ul>
            </div>

            <div>
                <h3 className='font-semibold mb-4'>FILTER BY PRICE</h3>
                <RangeSlider value={val} onInput={setval} min={100} max={10000}/>
                <div className='flex justify-between mt-2'>
                    <span>From Rs : <strong className='text-green-800'>{val[0]}</strong></span>
                    <span>From Rs : <strong className='text-green-800'>{val[1]}</strong></span>
                </div>
            </div>

            <div >
                <h3 className='font-semibold'>PRODUCT STATUS</h3>
                <ul className='overflow-x-hidden max-h-[250px]'>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="In Stock" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="On Sale" />
                    </li>
                </ul>
            </div>

            <div>
                <h3 className='font-semibold'>BRANDS</h3>
                <ul className='overflow-x-hidden max-h-[250px]'>
                    <li className="listitem flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Welch's" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Frito Lay" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Oreo" />
                    </li>
                    <li className="flex justify-start items-center">
                        <FormControlLabel control={<Checkbox />} label="Quaker" />
                    </li>
                    
                </ul>
            </div>

            <Link to='#'><img src={banner_img} className='h-[350px] w-full' alt="Image not fount"/></Link>

        </div>
    )
}

export default Sidebar;