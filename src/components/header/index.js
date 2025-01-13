
import eCommerceImage from '../../assets/e-commerce.png';
import CountryDropDown from '../CountryDropDown';
import User from '../User'
import Search from '../Search';
import NavBar from '../NavBar';


const Header = ()=>{

    return (
        <>
        <div className="container">
            <div className="header flex justify-center h-16 items-center text-white">
               <p>Due to the <b>COVID 19</b> epidemic, orders may be processed with a slight delay.</p>
            </div>

            <div className='body_'>
            <div className="search_bar w-full h-24 flex justify-evenly items-center">
               <div className="h-full">
                   <img src={eCommerceImage} alt="eCommerceImage" className="h-fit w-52"/>
               </div>

               <div className="countrydropdown">
                   <CountryDropDown></CountryDropDown>
               </div>
               
               <Search></Search>
               <User></User>
            </div>

             <NavBar></NavBar>
            </div>
        </div>
        </>
    )
}

export default Header;