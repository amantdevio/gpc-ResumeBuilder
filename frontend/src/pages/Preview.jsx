import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets';
import ResumePriview from '../components/ResumePriview';
import Loader from '../components/Loader';
import { ArrowLeftIcon, FilePlus2, HomeIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../configs/api';

const Preview = () => {
  const {resumeId} = useParams();
  const [isLoading, setIsLoading]=useState(true)
  const [resumeData,setResumeData]=useState(null);

  const loadResume=async () => {
    try {
      const token= localStorage.getItem('token');
      let response;
      if(token){
        try {
          response = await api.get('/api/resumes/get/'+resumeId,{headers:{Authorization:token}});
        } catch (error) {
          if (error?.response?.status === 404) {
            response = await api.get('/api/resumes/public/'+resumeId);
          } else {
            throw error;
          }
        }
      } else {
        response = await api.get('/api/resumes/public/'+resumeId);
      }
      setResumeData(response.data.resume);
    } catch (error) {
      console.log(error?.response?.data?.message||error.message);
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    loadResume()
  },[])
  return resumeData ? (
    <div className='bg-slate-100'>
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePriview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes='py-4 bg-white'/>
      </div>
        
    </div>
  ) : (
    <div>
      {isLoading ? (<Loader/>):(
        <div>
          <Navbar/>
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-center text-6xl text-slate-400 font-medium'>Resume not found</p>
          <div className=' flex w-fit justify-center items-center gap-10'>
          <a href="/" className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors'>
            <HomeIcon className='mr-2 size-4'/> Home page
          </a>
          <a href="/app" className='mt-6 bg-slate-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors'>
            <FilePlus2 className='mr-2 size-4'/>Let's create a resume
          </a>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default Preview
