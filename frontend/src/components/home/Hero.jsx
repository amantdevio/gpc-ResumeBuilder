import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = () => {

    const {user}=useSelector(state=>state.auth);
    const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
        <div className="pb-16 sm:pb-20">
                {/* Navbar */}
                <nav className="z-50 flex items-center justify-between w-full py-4 px-4 sm:px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                    <a href="https://prebuiltui.com">
                       <img src="/logo.svg" alt="logo" className='h-11 w-auto' />
                    </a>

                    <div className="flex gap-2">
                        <Link to='/app?state=register' className="hidden md:block px-6 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white" hidden={user}>
                            Get started
                        </Link>
                        <Link to='/app?state=login' className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900" hidden={user}>
                            Login
                        </Link>

                        <Link to='/app' className='hidden md:block px-8 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white' hidden={!user}>Dashboard</Link>
                    </div>

                </nav>

                {/* Hero Section */}
                <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
                    <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-green-300 blur-[100px] opacity-30"></div>

                    {/* Headline + CTA */}
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold max-w-5xl text-center mt-14 sm:mt-20 md:mt-24 leading-tight md:leading-[70px]">
                        Land your dream job with <span className="bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">AI-powered </span> resumes.
                    </h1>

                    <p className="max-w-md px-2 text-center text-sm sm:text-base my-5 sm:my-7">Create, edit and download professional resumes with AI-powered assistance.</p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none">
                        <Link to='/app' className="w-full sm:w-auto justify-center bg-green-500 hover:bg-green-600 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-green-400 flex items-center transition-colors">
                            Get started
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1 size-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </Link>
                        <a
                            href="https://gpcsidhi.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open Government Polytechnic College (GPC) website"
                            aria-label="Visit Government Polytechnic College website"
                            className="w-full sm:w-auto justify-center flex items-center gap-2 border border-blue-400 hover:bg-blue-50 hover:text-blue-700 active:scale-95 transition rounded-full px-7 h-12 text-slate-700 font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
                                <path d="M22 10L12 5 2 10l10 5 10-5Z"></path>
                                <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"></path>
                                <path d="M22 10v6"></path>
                            </svg>
                            <span>Visit GPC Website</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 opacity-80" aria-hidden="true">
                                <path d="M7 17L17 7"></path>
                                <path d="M7 7h10v10"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                    * {
                        font-family: 'Poppins', sans-serif;
                    }
                `}
            </style>
        </>
  )
}

export default Hero
