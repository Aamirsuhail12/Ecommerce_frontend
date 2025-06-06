

import { useContext } from "react";
import { Mycontext } from "../../App";
const Catcart = ({ color, name, url }) => {

    const mycontext = useContext(Mycontext);
    return (
        <div onClick={()=>{mycontext.setfilter(name)}} className=' h-[120px] w-[120px] flex flex-col p-5 gap-5 rounded-[50%] hover:scale-110 transition-transform duration-200' style={{ backgroundColor: color }}>
            <img  className="h-[40px] w-[50px] m-auto hover:scale-110 transition-transform duration-200" src={url} />
            <h3 className="m-auto">{name.length > 10 ? name.substr(0,10) + '...' : name}</h3>
        </div>
    )
}

export default Catcart;