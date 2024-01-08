import React from 'react'
import './SideBar.css'
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineFolder } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { IoBagOutline } from "react-icons/io5";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';


export default function SideBar() {
  return (
    <div className='sidebar'>
        <h1 className='sidebar-title'>به داشبورد خود خوش آمدید</h1>

        <ul className="sidebar-link">
            <NavLink to={'/'}>
                <IoHomeOutline className='sidebar-icon' />
                صفحه اصلی
            </NavLink>
            <NavLink to={'/products'}>
                <MdOutlineFolder className='sidebar-icon' />
                محصولات
            </NavLink>
            <NavLink to={'/comments'}>
                <MdOutlineEmail className='sidebar-icon' />
                کامنت ها
            </NavLink>
            <NavLink to={'/users'}>
                <LuUsers className='sidebar-icon' />
                کاربران
            </NavLink>
            <NavLink to={'/orders'}>
                <IoBagOutline className='sidebar-icon' />
                سفارشات
            </NavLink>
            <NavLink to={'/offers'}>
                <MdOutlineLocalOffer className='sidebar-icon' />
                تخفیفات
            </NavLink>
        </ul>
    </div>
  )
}
