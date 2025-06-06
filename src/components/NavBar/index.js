

import { FaBars } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";

import { useContext, useEffect, useState } from "react";
import { getAll } from "../../RestApi";
import { Mycontext } from "../../App";
const NavBar = () => {

  const [isopen, setisopen] = useState(false);
  const [categorylist, setcategorylist] = useState([]);
  const [subcategorylist, setsubcategorylist] = useState([]);

  const mycontext = useContext(Mycontext);

  const selectedfilter = (key, value) => {

    console.log('val', value)
    mycontext.setlistingfilter({ [key]: value });
  }

  const selectedfilterforNav = async (cname) => {

    try {

      const response = await getAll(`http://localhost:5000/subcategory?filtercategory=${cname}&page=-1`)
      console.log(response.data.subcategory)
      setsubcategorylist(response.data.subcategory)
    } catch (error) {

      console.log('Error in getting categories', error);
    }
  }

  const GetCategory = async () => {
    try {

      const response = await getAll('http://localhost:5000/categories?page=-1')
      setcategorylist(response.data.categories)
    } catch (error) {

      console.log('Error in getting categories', error);
    }
  }
  useEffect(() => {
    GetCategory();
  }, [])
  return (
    <>
      <div className='food flex justify-between items-start'>
        <div>
          <Button
            style={{
              backgroundColor: '#00BFFF',
              color: 'white',
              padding: '15px',
              borderRadius: '30px',
              width: '250px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
            onClick={() => {
              setisopen(!isopen);
            }}

            
          >
            <span><FaBars /></span>
            <span>ALL CATEGORIES</span>
            <span><FaAngleDown /></span>
          </Button>
          <div className={`ct_list shadow ${isopen === true ? 'open' : ''}`}>
            <ul className="relative" onMouseLeave={()=>{setisopen(false)}}>
              {
                categorylist && categorylist.map((cat, index) => {
                  return (

                    <Link to="/productListing"><li onMouseEnter={() => { selectedfilterforNav(cat.name) }}>

                      <div className="flex  justify-between items-center" onClick={() => { 
                        selectedfilter('category', cat.name) 
                        setisopen(false)
                        }}>
                        <Button className="btn w-full " style={{
                          justifyContent: 'start',
                          fontWeight: 'bold',
                          color: 'black'
                        }}>{cat.name}</Button>
                        <FaAngleRight />
                      </div>
                      <div className="sub">
                        {
                          subcategorylist && subcategorylist.map((item) => {
                            return (
                              <Button style={{
                                justifyContent: 'start',
                                fontWeight: 'bold',
                                color: 'black'
                              }} onClick={() => {
                                setisopen(false)
                                selectedfilter('subcategory', item.subcategory)
                              }}>{item.subcategory}</Button>
                            )
                          })
                        }
                      </div>

                    </li>
                    </Link>
                  )
                }
                  , [])
              }

            </ul>
          </div>
        </div>
        <div className='w-3/5'>
          <ul className='flex justify-between nav_bar'>

            {
              categorylist && categorylist.map((cat) => {
                return (
                  <Link to='/productListing'><li className="relative">
                    <Button onMouseEnter={() => { selectedfilterforNav(cat.name) }} onClick={() => { selectedfilter('category', cat.name) }}>{cat.name}</Button>
                    <div className="dropdown flex shadow w-36 h-auto absolute">
                      {
                        subcategorylist && subcategorylist.map((item) => {
                          return <Button style={{
                            justifyContent: 'flex-start',
                            color: 'black'
                          }} onClick={() => {
                            selectedfilter('subcategory', item.subcategory)
                          }}>{item.subcategory}</Button>

                        })
                      }

                    </div>
                  </li></Link>
                )
              })
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default NavBar;