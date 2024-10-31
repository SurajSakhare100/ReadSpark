import React, { useEffect } from 'react'
import HeroSection from '../components/sections/herosection/HeroSection'
import Features from '../components/sections/features/Features'
import Testimonial from '../components/sections/testimonial/Testimonial'
import Faq from '../components/sections/faq/Faq'

function Home() {
    useEffect(() => {
        document.title = 'ReadSpark | Create project not Readme';
      }, []);
    return (
       <div>
        <HeroSection/>
        <Features/>
        <Testimonial/>
        <Faq/>
       </div>
    )
}

export default Home
