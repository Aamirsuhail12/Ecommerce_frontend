
import { useEffect } from "react";
import Card from "../Card";
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from "react-redux";
import { setHeaderFooterVisibility } from "../../features/ui/uiSlice";
import { fetchProducts } from "../../features/product/productAPI";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ViewAllProducts = () => {

    console.log('ViewAllProducts');
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.products);
    const featuredProducts = items.filter((p) => p.isFeatured === true);

    useEffect(() => {
        dispatch(setHeaderFooterVisibility(true));
        dispatch(fetchProducts());
    }, [])
    return (
        <div className="space">
            <div className="font-bold text-[30px]"> Special Products</div>
            <div className="flex flex-wrap justify-center items-start gap-3 md:gap-5">
                {
                    status === 'loading' &&
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                }
                {
                    status === 'failed' &&
                    <div className="text-[25px] md:text-[50px] text-red-600 font-bold">{error}</div>
                }
                {
                    status === 'succeeded' &&
                    featuredProducts?.map((p, index) => {
                        return <Card key={index} product={p} />
                    })
                }
            </div>

            <div className="my-[20px]">
                <Pagination count={10} color='primary' showFirstButton showLastButton />
            </div>

        </div>
    )
}

export default ViewAllProducts;