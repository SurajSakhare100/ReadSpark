import React, { useEffect } from 'react'
import HeroSection from '../components/sections/herosection/HeroSection'
import Features from '../components/sections/features/Features'
import Testimonial from '../components/sections/testimonial/Testimonial'
import Faq from '../components/sections/faq/Faq'
import { Helmet } from 'react-helmet'

function Home() {
    return (
       <div>
        <Helmet>
        <title>ReadSpark: Effortless README Creation</title>
        <meta name="description" content="Welcome to ReadSpark, your go-to solution for effortless README creation. Create stunning documentation with customizable templates!" />
        <meta name="keywords" content="README generator, documentation tool, markdown editor, open source, developer tools" />
        <link rel="canonical" href="https://readspark.vercel.app/" />
      </Helmet>
        <HeroSection/>
        <Features/>
        {/* <Testimonial/> */}
        <Faq/>
       </div>
    )
}

export default Home
