import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../configs/api';
import toast from 'react-hot-toast';
import ResumePriview from '../components/ResumePriview';

const PublicResumes = () => {
  const [publicResumes, setPublicResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const loadPublicResumes = async () => {
    try {
      const { data } = await api.get('/api/resumes/public');
      setPublicResumes(data.resumes || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPublicResumes();
  }, []);

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <Link to='/app' className='inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-all mb-6'>
        <ArrowLeftIcon className='size-4' />
        Back to Dashboard
      </Link>

      <div className='flex items-center justify-between mb-4'>
        <p className='text-xl font-semibold text-slate-700'>Public Resumes</p>
        <p className='text-xs text-slate-400'>Preview only | Government Polytechnic College (GPC)</p>
      </div>

      {isLoading ? (
        <p className='text-sm text-slate-500'>Loading public resumes...</p>
      ) : publicResumes.length === 0 ? (
        <p className='text-sm text-slate-500'>No public resumes available yet.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {publicResumes.map((resume) => (
            <button
              key={resume._id}
              onClick={() => navigate(`/view/${resume._id}`)}
              className='text-left bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden'
            >
              <div className='h-40 overflow-hidden bg-slate-100 border-b border-slate-200'>
                <div className='w-[210%] pointer-events-none origin-top-left scale-[0.47]'>
                  <ResumePriview
                    data={resume}
                    template={resume.template}
                    accentColor={resume.accent_color}
                    classes='bg-white'
                  />
                </div>
              </div>
              <div className='p-3'>
                <p className='font-medium text-slate-700 truncate'>{resume.title || 'Untitled Resume'}</p>
                <p className='text-xs text-slate-500 mt-1 truncate'>by {resume.author_name || 'Anonymous'}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicResumes;
