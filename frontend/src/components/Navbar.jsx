import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { logout } from '../app/features/authSlice';

const Navbar = () => {
    const {user} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutUser=()=>{
        navigate('/')
        dispatch(logout());
    }
  return (
    <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
            <div className='flex items-center gap-3'>
                <Link to='/'>
                    <img src="/logo.svg" alt="" />
                </Link>
                <div className='hidden md:flex flex-col leading-tight'>
                    <p className='text-sm font-semibold text-slate-700'>Government Polytechnic College</p>
                    <div className='flex items-center gap-2 mt-0.5'>
                        <span className='text-[11px] text-slate-500'>Official Portal</span>
                        <span className='text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 border border-green-200'>GPC</span>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between gap-3'>
                <p className='max'>Hi, {user?.name}</p>
                <button onClick={logoutUser} className='bg-green-500 text-slate-50 hover:bg-slate-50 hover:text-green-500 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar;
