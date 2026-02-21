import React from 'react'
import Title from './Title'
import { BookUserIcon } from 'lucide-react'

const Testimonial = () => {
     const cardsData = [
        {
            title: 'AI Writing Assist',
            description: 'Generate professional summary, project, and experience content with one click.'
        },
        {
            title: 'Easy Resume Editing',
            description: 'Update sections instantly and keep your resume content organized in one place.'
        },
        {
            title: 'Public / Private Control',
            description: 'Choose resume visibility and share only when you want to.'
        },
        {
            title: 'Preview Before Export',
            description: 'Check layout in preview and then download a polished resume.'
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="p-5 rounded-lg shadow hover:shadow-lg transition-all duration-200 border border-slate-100 bg-white">
            <p className="text-base font-semibold text-slate-800">{card.title}</p>
            <p className="text-sm py-3 text-slate-600">{card.description}</p>
        </div>
    );
  return (
    <>
        <div id='testimonials' className='flex flex-col items-center my-10 scroll-mt-12'>
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5">
            <BookUserIcon className='size-4.5 stroke-green-600'/>
            <span>Platform Highlights</span>
            </div>
            <Title title="Built for students and freshers" description="No personal reviews or profile photos are used here. These are core features available in the platform."/>
        </div>

            <div className="w-full mx-auto max-w-5xl px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 pb-5">
                {cardsData.map((card, index) => (
                    <CreateCard key={index} card={card} />
                ))}
            </div>
                    
        </>

  )
}

export default Testimonial
