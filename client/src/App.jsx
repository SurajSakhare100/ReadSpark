import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import ReadmeGenerator from './pages/ReadmeGenerator';
import Navbar from './components/navigation/navbar/Navbar';
import { Analytics } from "@vercel/analytics/react"
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import Blog from './pages/Blog';
import Contact from './pages/ContactUs';
import About from './pages/About';
import Footer from './components/navigation/footer/Footer';
function App() {
  return (
    <div className=''>
      <Analytics/>
      <Navbar />
      <div className="pb-[20px] px-2 sm:px-[50px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<Contact/>} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/readme-generator" element={<ReadmeGenerator />} />
        </Routes>
      </div>
      <Footer/>
      {/* <SpeedInsights /> */}
    </div>
  );
}

export default App;
