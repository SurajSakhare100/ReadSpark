import { useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import ReadmeGenerator from './pages/ReadmeGenerator';
import Navbar from './components/navigation/navbar/Navbar';
import Footer from './components/navigation/footer/Footer';

import "preline/preline";
import { IStaticMethods } from "preline/preline";
function App() {
  const location = useLocation();
  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, [location.pathname]);
  return (
    <div>
      <Navbar />
      <div className="pb-[20px] px-2 sm:px-[50px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/readme-generator" element={<ReadmeGenerator />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
