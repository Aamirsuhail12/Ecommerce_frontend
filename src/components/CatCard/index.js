

import { useContext } from "react";
import { Mycontext } from "../../App";
const CatCard = ({ color, name, url }) => {

    const mycontext = useContext(Mycontext);
    return (
        <div onClick={()=>{mycontext.setfilter(name)}} className={`flex flex-col justify-center items-center h-[100px] w-[100px] md:h-[120px] md:w-[120px]  p-5 gap-5 rounded-[50%] hover:scale-110 transition-transform duration-200`} style={{ backgroundColor: color }}>
            <img  className="h-[40px] w-[40px] m-auto hover:scale-110 transition-transform duration-200" src={url} />
            <h3 className="m-auto">{name?.length > 8 ? name.substr(0,8) + '...' : name}</h3>
        </div>
    )
}

export default CatCard;