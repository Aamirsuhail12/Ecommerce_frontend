
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useEffect } from 'react';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getWishList, deleteWishList, addCart } from "../../features/user/userAPI";
import { useNavigate } from "react-router";
import { showAlert } from "../../features/alert/alertSlice";
import { useState } from "react";
import { Button, Box } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';

const WishList = () => {

    const dispatch = useDispatch();
    const products = useSelector((state) => state?.user?.item?.wishList);
    const navigate = useNavigate();
    const [ramSelected, setRamSelected] = useState(null);
    const [weightSelected, setWeightSelected] = useState(null);
    const [sizeSelected, setSizeSelected] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [product, setProduct] = useState(null);
    const [id, setId] = useState(null);

    const [cart, setCart] = useState({
        product: '',
        quantity: 1,
        size: '',
        weight: '',
        RAM: ''
    })

    //dialog 

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setSizeSelected(null);
        setWeightSelected(null);
        setRamSelected(null);
        setOpen(false);
    };


    const getProducts = async () => {
        dispatch(getWishList());
    }

    const gotoProductDetail = async (id) => {
        navigate(`/product/${id}`);
    }

    const handleDeleteWishList = async (id) => {
        try {
            await dispatch(deleteWishList(id)).unwrap();
            dispatch(showAlert({
                color: 'success',
                msg: 'Product remove from the wishlist successfully!'
            }))
        } catch (error) {
            dispatch(showAlert({
                color: 'error',
                msg: error
            }))
        }
    }


    const handleMoveToCart = async () => {

        if (!cart?.product) {
            dispatch(showAlert({
                color: 'error',
                msg: 'Product id is required'
            }))
            return;
        }

        if (!cart?.RAM && product?.RAM?.length !== 0) {
            dispatch(showAlert({
                color: 'error',
                msg: 'RAM is required'
            }))
            return;
        }
        
        if (!cart?.size && product?.size?.length !== 0) {
            dispatch(showAlert({
                color: 'error',
                msg: 'Size is required'
            }))
            return;
        }

        if (!cart?.weight && product?.weight?.length !== 0) {
            dispatch(showAlert({
                color: 'error',
                msg: 'Weight is requied'
            }))
            return;
        }


        try {
            await dispatch(addCart(cart)).unwrap();
            await dispatch(deleteWishList(id)).unwrap();

            dispatch(showAlert({
                color: 'success',
                msg: 'Product move to cart successfully!'
            }))

            setCart({
                product: '',
                quantity: 1,
                size: '',
                weight: '',
                RAM: ''
            })
        } catch (error) {
            dispatch(showAlert({
                color: 'error',
                msg: error
            }))
        }
    }

    const AddRAM = async (idx, val) => {

        setRamSelected(idx);
        setCart({
            ...cart,
            RAM: val
        })
    }

    const AddWeight = async (idx, val) => {
        setWeightSelected(idx)
        setCart({
            ...cart,
            weight: val
        })
    }
    const AddSize = async (idx, val) => {
        setSizeSelected(idx)
        setCart({
            ...cart,
            size: val
        })
    }
    useEffect(() => {
        getProducts();
    }, [])
    return (
        <div className="space">
            <h2 className='font-bold text-[25px] md:text-[35] lg:text-[50px]'>Your WishList</h2>
            {
                products?.length === 0 ? <div className='m-[20px] gap-5 flex justify-center items-center flex-col'>
                    <h1 className='text-[25px] md:text-[35] lg:text-[50px] font-bold text-red-700'>Your WishList is Empty</h1>
                    <MdAddShoppingCart className='text-[#b91c1c] text-[70px] md:text-[100px]' />
                </div> :
                    <div >
                        <p>There are {products?.length} products in your wishList.</p>
                        <div className="w-full flex justify-center items-center">
                            <div className="w-full p-5">
                                <div className='overflow-x-auto w-full'>
                                    <table >
                                        <thead>
                                            <tr className='bg-gray-200 h-10'>
                                                <th className='text-left w-2/5 p-2'>Product</th>
                                                <th className='text-center w-1/5 p-2'>Unit Price</th>
                                                <th className='text-center w-1/5 p-2'>Move to Cart</th>
                                                <th className='text-center w-1/5 p-2'>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products?.map((p, index) => {
                                                    return (
                                                        <tr key={index} className='border'>
                                                            <td className='text-left w-2/5'>
                                                                <div onClick={() => gotoProductDetail(p._id)} className='flex items-center gap-3 p-2'>
                                                                    <div className="hidden md:block w-[200px] h-[120px] p-5">
                                                                        <img src={p?.images?.[0]} className="w-full h-full" alt="Image not found"></img>
                                                                    </div>
                                                                    <div>
                                                                        <span className='font-semibold hover:text-red-800 cursor-pointer'>{p?.name?.length > 50 ? p?.name?.substr(0, 50) + '...' : p?.name}</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className=' w-1/5 text-center'><span className='flex justify-center items-center'><LiaRupeeSignSolid />{p?.price}</span></td>
                                                            <td className=' w-1/5 text-center'><span onClick={() => {
                                                                handleClickOpen(true)
                                                                setProduct(p);
                                                                setCart({ ...cart, product: p?._id });
                                                                setId(p?._id);
                                                            }} className='flex justify-center items-center hover:text-blue-600 md:font-bold cursor-pointer'>Move to Cart</span></td>
                                                            <td className=' w-1/5'><div onClick={() => handleDeleteWishList(p?._id)} className=' flex justify-center '><RiDeleteBinLine /></div></td>
                                                        </tr>

                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            }

            <React.Fragment>
                <Dialog maxWidth={false} PaperProps={{
                    className: 'w-full max-w-full md:w-1/2 md:max-w-1/2  p-4 relative'
                }}
                    open={open} onClose={handleClose}>
                    <Box className="absolute top-[10px] right-[10px]">
                        <Button
                            onClick={handleClose}
                            sx={{
                                color: 'black',
                                fontSize: '20px',
                                borderRadius: '20px',
                                minWidth: '40px',
                                minHeight: '40px',
                                height: '40px',
                                width: '40px',
                            }}>X</Button>
                    </Box>
                    <DialogTitle sx={{ fontWeight: 'bold' }}>Move to Cart</DialogTitle>
                    <DialogContent sx={{ paddingBottom: 0 }}>
                        <div className="flex  items-center gap-3 md:gap-5">
                            <div>RAM</div>
                            <div className="flex items-center gap-3 md:gap-5">
                                {
                                    product?.RAM?.map((r, index) => {
                                        return <div key={index} onClick={() => {
                                            AddRAM(index, r);
                                        }} className={`${index === ramSelected ? 'active' : ''}  border-2 border-solid py-[2px] px-4 rounded-[15px] cursor-pointer`}>{r}</div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex  items-center gap-3 md:gap-5">
                            <div>Size</div>
                            <div className="flex items-center gap-3 md:gap-5">
                                {
                                    product?.size?.map((s, index) => {
                                        return <div key={index} onClick={() => {
                                            AddSize(index, s);
                                        }} className={`${index === sizeSelected ? 'active' : ''} border-2 border-solid py-[2px] px-4 rounded-[15px] cursor-pointer`}>{s}</div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex  items-center gap-3 md:gap-5">
                            <div>Weight</div>
                            <div className="flex items-center gap-3 md:gap-5">
                                {
                                    product?.weight?.map((w, index) => {
                                        return <div key={index} onClick={() => {
                                            AddWeight(index, w);
                                        }} className={`${index === weightSelected ? 'active' : ''} border-2 border-solid py-[2px] px-4 rounded-[15px] cursor-pointer`}>{w}</div>
                                    })
                                }
                            </div>
                        </div>
                    </DialogContent>
                    <Button
                        onClick={handleMoveToCart}
                        sx={{
                            backgroundColor: 'blue',
                            color: 'white',
                            marginY: '10px'
                        }}>Move</Button>
                </Dialog>
            </React.Fragment>

        </div>
    )
}

export default WishList;