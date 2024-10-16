import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/Product-list/components/ProductList";

function Home() {
    return ( 
        <>
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
        </>
     );
}

export default Home;