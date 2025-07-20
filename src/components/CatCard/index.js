
import { useDispatch, useSelector } from "react-redux";
import { resetFilter ,setCategory} from "../../features/filter/filterSlice";

const CatCard = ({ color, name, url }) => {

    const dispatch = useDispatch();
    const filter = useSelector((state)=> state.filter);

    return (
        <div onClick={() => {
            dispatch(resetFilter())
            dispatch(setCategory(name ))
        }} className={`flex flex-col justify-center items-center h-[100px] w-[100px] md:h-[120px] md:w-[120px]  p-5 gap-5 rounded-[50%] hover:scale-110 transition-transform duration-200`} style={{ backgroundColor: color }}>
            <img className="h-[40px] w-[40px] m-auto hover:scale-110 transition-transform duration-200" src={url} />
            <h3 className="m-auto">{name?.length > 8 ? name.substr(0, 8) + '...' : name}</h3>
        </div>
    )
}

export default CatCard;