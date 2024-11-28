import React, { useEffect } from 'react'
import HeroSection from '../components/sections/herosection/HeroSection'
import Features from '../components/sections/features/Features'
import Testimonial from '../components/sections/testimonial/Testimonial'
import Faq from '../components/sections/faq/Faq'
import { Helmet } from 'react-helmet'

function Home() {
  return (
    <div className='relative'
    >
      <Helmet>
        <title>ReadSpark: Focus on your Projects, not the ReadMe</title>
        <meta name="description" content="Welcome to ReadSpark, your go-to solution for effortless README creation. Create stunning documentation with customizable templates!" />
        <meta name="keywords" content="README generator, documentation tool, markdown editor, open source, developer tools" />
        <link rel="canonical" href="https://readspark.vercel.app/" />
      </Helmet>
      <HeroSection />
      <Features />
      <Testimonial />
      <Faq />
      <a href="https://buymeacoffee.com/sakharesuraj10" target="_blank" className='fixed left-4 top-[88%] z-50'><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className='h-12 w-48' /></a>
    </div>
  )
}

export default Home
