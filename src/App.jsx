import { useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import ReadmeGenerator from './pages/ReadmeGenerator';
import Navbar from './components/navigation/navbar/Navbar';
import Footer from './components/navigation/footer/Footer';
import { Analytics } from "@vercel/analytics/react"
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { SpeedInsights } from '@vercel/speed-insights/react';
function App() {
  const location = useLocation();
  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, [location.pathname]);
  return (
    <div>
      <Analytics/>
      <Navbar />
      <div className="pb-[20px] px-2 sm:px-[50px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/readme-generator" element={<ReadmeGenerator />} />
        </Routes>
      </div>

      <Footer />
      <SpeedInsights />
    </div>
  );
}

export default App;
