import Slider_ from "../slider";
import { Mycontext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { getAll } from "../../RestApi";
import Cart from "../Cart";
import Pagination from '@mui/material/Pagination';

const ViewAllProducts = () => {

    const [products, setProducts] = useState([]);
    const context = useContext(Mycontext);

    const GetProducts = async () => {
        try {

            const response = await getAll('http://localhost:5000/products?page=-1');

            const pro = response.data.products && response.data.products.filter((p) => p.isFeatured === true)
            setProducts(pro);
        } catch (error) {
            console.log('Error in getting Products', error);
        }
    }
    useEffect(() => {
        context.setisheaderfooterShow(true);
        GetProducts();
    }, [])
    return (
        <div className="body_">
            <div className="font-bold text-[30px]"> Special Products</div>
            <div className="home_ flex flex-wrap gap-3">
                {
                    products.map((p) => {
                        return <Cart productview={'four'} product={p} />
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