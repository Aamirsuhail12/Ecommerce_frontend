
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useState } from "react";
const CountHandle = ()=>{
    const [count, setCount] = useState(1);
    return (
        <div className='flex justify-center items-center gap-5'>
        <button className='w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300'
            onClick={() => {
                if (count > 1)
                    setCount(count - 1);
            }}
        ><FaMinus /></button>
        <span>{count}</span>
        <button
            onClick={() => {
                setCount(count + 1);
            }}
            className='w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300'>
                <FaPlus /></button>
    </div>
    )
}

export default CountHandle;