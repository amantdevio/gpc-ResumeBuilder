import React from 'react'
import Navbar from './Navbar'

const Loader = () => {
  return (
    <>
    <Navbar/>
    <div className='flex flex-col items-center justify-center h-screen'>
        <div className='size-20 border-10 border-green-400 border-t-transparent rounded-full animate-spin'></div>
    </div>
    </>
  )
}

export default Loader
