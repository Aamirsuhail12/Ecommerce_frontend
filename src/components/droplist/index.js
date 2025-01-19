
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


const Droplist = ()=>{
    return (
        <div  className="absolute right-0 bg-white border-2 top-10 z-50 text-black show" >
        <MenuList
            id="composition-menu"
            aria-labelledby="composition-button"
         
        >
            <MenuItem >Profile</MenuItem>
            <MenuItem >My account</MenuItem>
            <MenuItem >Logout</MenuItem>
            <MenuItem >Logout</MenuItem>
            <MenuItem >Logout</MenuItem>
            <MenuItem >Logout</MenuItem>
            <MenuItem >Logout</MenuItem>
        </MenuList>
    </div>
    )
}

export default Droplist;