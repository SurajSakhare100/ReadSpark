// src/pages/About.js
import React from "react";

function About() {
  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-lg text-gray-700">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        <p className="text-lg leading-relaxed text-gray-600">
          Our goal is to make it easy for developers to create professional README files that enhance
          the clarity and appeal of their projects. This README Generator tool provides users with
          customizable templates and tips to help make their projects stand out.
        </p>
      </div>
    </div>
  );
}

export default About;
