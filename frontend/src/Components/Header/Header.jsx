import React from 'react'
import './Header.css'
import { CiLight } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";


export default function Header() {
  return (
    <div className='header'>
        <div className="profile">
            <div>
                <img src="./images/1.jpeg" alt="1" className='profile-img' />
            </div>
            <div className='profile-title'>
                <span className='userName'>اصغر شرک زاده</span>
                <span className='side'>مدیر فروش</span>
            </div>
        </div>

        <div className='wrapper'>
            <div className="search">
                <input type="text" className='search-input' placeholder='جست و جو کنید ...' />
                <button className='search-btn'>جست و جو</button>
            </div>

            <div className='option'>
                <button className='option-btn'>
                    <IoMdNotificationsOutline className='option-icon' /> 
                </button>
                <button className='option-btn'>
                    <CiLight className='option-icon' /> 
                </button>
            </div>
        </div>
    </div>
  )
}
