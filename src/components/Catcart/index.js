

import apple_img from '../../assets/apple.jpg';
const Catcart = ({clr})=>{
    
    return (
        <div className=' h-52 w-32 flex flex-col p-5 gap-5' style={{backgroundColor : clr}}>
            <img className="h-28" src={apple_img}/>
            <h3 >Red Apple</h3>
        </div>
    )
}

export default Catcart;