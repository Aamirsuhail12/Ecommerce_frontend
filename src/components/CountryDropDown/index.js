import Button from '@mui/material/Button';

import { FaAngleDown } from "react-icons/fa6";
const CountryDropDown = () => {

    return (
        <>
            <Button className="countrydrop"
                style={{
                    border: '2px solid gray',
                    borderRadius: '6px',
                    width: '200px',
                    height: '64px',
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
            }}>
            <div className="flex flex-col items-start">
                <span className="text-gray-400">Your Location</span>
                <span className="font-bold">India</span>
            </div>
            <span><FaAngleDown /></span>
        </Button >
        </>
    )
}

export default CountryDropDown;