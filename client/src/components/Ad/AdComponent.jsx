import React, { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    // Create a new script element for Google AdSense
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7623182087547549";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // Create the ins element for the ad
    const ins = document.createElement('ins');
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", "ca-pub-7623182087547549");
    ins.setAttribute("data-ad-slot", "8470935898");
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");

    // Append the ins element to the body or a specific container
    document.body.appendChild(ins);

    // Push the ad into the adsbygoogle array
    (window.adsbygoogle = window.adsbygoogle || []).push({});

    // Cleanup function to remove the ad on component unmount
    return () => {
      document.body.removeChild(ins);
    };
  }, []);

  return null; // No need to return anything from the render function
};

export default AdComponent;
