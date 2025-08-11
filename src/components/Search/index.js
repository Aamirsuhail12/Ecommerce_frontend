

import Button from '@mui/material/Button';
import { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux'
import { SearchProduct } from '../../features/product/productAPI';
import { useNavigate } from 'react-router';

const Search = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [q, setQ] = useState('');

    const handleChange = (e) => {

        setQ(e.target.value);
    }

    const handleClick = async () => {
        try {
            await dispatch(SearchProduct(q)).unwrap();
            setQ('');
            navigate(`/search?q=${q}`);
        } catch (error) {
            console.log('Error in getting searched products', error);
        }
    }

    return (
        <>
            <div className='flex justify-between   items-center w-full h-full  border-2  px-3 rounded-xl bg-gray-100  relative'>
                <input
                    onKeyDown={(e) => {
                        if (e.key === 'Enter')
                            handleClick();
                    }}
                    onChange={handleChange}
                    value={q} type='text'
                    className='outline-none border-none h-[50px] w-4/5 md:h-full bg-transparent text-black '
                    placeholder='Search for products...'
                />
                <Button
                    onClick={handleClick}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '48px',
                        minWidth: '48px',
                        height: '48px',
                        width: '48px',
                        borderRadius: '50%',
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        top: '10%',
                        right: '8px',
                        '&:hover': {
                            backgroundColor: '#e5e7eb'
                        }
                    }}

                >
                    <IoSearchOutline className=' h-8 w-8 text-black' />
                </Button>
            </div>
        </>
    )

}


export default Search;