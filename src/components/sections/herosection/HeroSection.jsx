import React from 'react';
import { Upload, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='scale-110'>
        <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
            <div className="mt-5 max-w-2xl text-center mx-auto">
              <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
                Focus on your Projects,
                not the <span className='text-blue-600'>ReadMe</span>
              </h1>
            </div>

            <div className="mt-5 max-w-3xl text-center mx-auto">
              <p className="text-lg text-gray-600 dark:text-neutral-400">
                Effortlessly craft stunning READMEs with our built-in templates
              </p>
            </div>

            <div className="mt-8 gap-3 flex justify-center">
              <Link to={'/readme-generator'} className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 focus:outline-none focus:from-violet-600 focus:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full py-2 px-4 transition-transform transform hover:scale-105">
                <span>Start Editing Your README.md now</span>
                <ArrowRight className="shrink-0 ml-1" />
              </Link>
            </div>
          </div>
        </div>
        
      </div>
        <div className='absolute top-[25%] sm:top-auto left-[50%] -translate-x-[50%] sm:translate-x-0 sm:bottom-8 sm:left-8'>
        <a href="https://www.producthunt.com/posts/readspark?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-readspark" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=561605&theme=light" alt="ReadSpark - Focus&#0032;on&#0032;your&#0032;Projects&#0044;&#0032;not&#0032;the&#0032;ReadMe | Product Hunt"   
        width="250" height="54" /></a>
        </div>
    </div>
  );
}

export default HeroSection;
