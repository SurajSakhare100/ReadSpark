import React from 'react';

function Testimonial() {
    return (
        <section className='w-full'>
            <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10'>
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
                    What Our Users Are Saying About ReadSpark
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-gray-200 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                    <TestimonialItem
                        text="ReadSpark's README is incredibly comprehensive and easy to follow. It made onboarding a breeze and helped me understand the project quickly!"
                        name="Vaibhav More"
                        role="Data Analyst"
                        imageSrc="https://avatars.githubusercontent.com/u/144354322?v=4"
                    />
                    <TestimonialItem
                        text="I found the README for ReadSpark to be an excellent resource. It provided clear installation steps and detailed usage examples that really helped me get started."
                        name="Aditya pawase"
                        role="Software Developer"
                        imageSrc="https://avatars.githubusercontent.com/u/143414991?v=4"
                    />
                </div>
            </div>
        </section>
    );
}

function TestimonialItem({ text, name, role, imageSrc }) {
    return (
        <div className="py-6 sm:px-4 flex flex-col h-full">
            <blockquote className='flex flex-col justify-between h-full'>
                <p className="text-sm text-gray-800">"{text}"</p>
                <footer className="mt-4 flex items-center">
                    <img
                        className="w-10 h-10 rounded-full"
                        src={imageSrc}
                        alt={`${name}, ${role}`}
                        loading="lazy"
                        aria-hidden="true"
                    />
                    <div className="ml-3">
                        <div className="text-xs text-gray-500">{name}</div>
                        <div className="text-xs text-gray-400">{role}</div>
                    </div>
                </footer>
            </blockquote>
        </div>
    );
}

export default Testimonial;
