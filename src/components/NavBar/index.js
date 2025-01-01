

import { FaBars } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
const NavBar = ()=>{

    return (
        <>
         <div className='food flex justify-between items-center'>
                  <div>
                    <Button
                    style={{
                    backgroundColor : '#00BFFF',
                    color : 'white',
                    padding : '15px',
                    borderRadius : '30px',
                    width : '250px',
                    display : 'flex',
                    justifyContent : 'space-between',
                    }}
                    >
                    <span><FaBars /></span>
                    <span>ALL CATEGORIES</span>
                    <span><FaAngleDown /></span>
                    </Button>
                    </div>
                  <div className='w-3/5'>
                    <ul className='flex justify-between nav_bar'>
                        <li><Link to='/'><Button>HOME</Button></Link></li>
                        <li><Link to='/'><Button>SHOP</Button></Link></li>
                        <li><Link to='/'><Button>MEAT & SEAFOOD</Button></Link></li>
                        <li><Link to='/'><Button>BAKERY</Button></Link></li>
                        <li><Link to='/'><Button>BEVERAGES</Button></Link></li>
                        <li><Link to='/'><Button>BLOG</Button></Link></li>
                        <li><Link to='/'><Button>CONTACT</Button></Link></li>
                    </ul>
                  </div>
                </div>
        </>
    )
}

export default NavBar;