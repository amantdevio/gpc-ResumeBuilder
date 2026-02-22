import React from 'react'

const Footer = () => {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <footer className="flex flex-col bg-slate-50 items-center justify-around w-full py-16 text-sm text-gray-800/70">
                <div className="flex items-center gap-8">
                    <a href="#" className="font-medium text-gray-500 hover:text-black transition-all">
                        Home
                    </a>
                    <a href="#" className="font-medium text-gray-500 hover:text-black transition-all">
                        About
                    </a>
                    <a href="#" className="font-medium text-gray-500 hover:text-black transition-all">
                        Contact
                    </a>
                </div>
                <div className="flex items-center gap-4 mt-8 text-green-500">
                    <a href="https://www.facebook.com/governmentpolytechniccollege123/" className="hover:-translate-y-0.5 transition-all duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/gpcsidhi_2009/" className="hover:-translate-y-0.5 transition-all duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    {/* <a href="" className="hover:-translate-y-0.5 transition-all duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a> */}
                    <a href="https://x.com/gpc_sidhi" className="hover:-translate-y-0.5 transition-all duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="https://gpcsidhi.in/" className="hover:-translate-y-0.5 transition-all duration-300">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Global Network" role="img">
  <circle
    cx="12"
    cy="12"
    r="9"
    stroke="currentColor"
    stroke-width="2"
  />
  <path
    d="M12 3c2.5 2.5 2.5 15.5 0 18"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
  />
  <path
    d="M3 12h18"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
  />
  <path
    d="M5 7c4 2 10 2 14 0"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
  />
  <path
    d="M5 17c4-2 10-2 14 0"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
  />
</svg>

                    </a>
                </div>
                <div className="mt-8 text-center text-sm text-gray-700">
                    <p className="font-medium">Government Polytechnic College, Sidhi (GPC)</p>
                    <p className="mt-1">Panwar, Balhaud - Beohari Rd, Sidhi, Basaudaha, Madhya Pradesh 486661</p>
                    <p className="mt-1">
                        Email: <a href="mailto:polytechnicsidhi@gmail.com" className="text-green-700 hover:underline">polytechnicsidhi@gmail.com</a>
                    </p>
                    <p className="mt-1">
                        Phone: <a href="tel:07822250257" className="text-green-700 hover:underline">07822-250257</a>
                    </p>
                    <p className="mt-1">
                        Website: <a href="https://gpcsidhi.in/" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">gpcsidhi.in</a>
                    </p>
                </div>
                <p className="mt-8 text-center">Copyright © 2026 Government Polytechnic College (GPC) | GPC Resume Builder. All rights reserved.</p>
            </footer>
        </>
    );
}

export default Footer
