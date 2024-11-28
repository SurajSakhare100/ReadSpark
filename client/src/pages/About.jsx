// src/pages/About.js
import React from "react";

function About() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg text-gray-700">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">About Us</h1>
        <p className="text-lg leading-relaxed text-gray-600 mb-6">
          Our goal is to make it easy for developers to create professional README files that enhance
          the clarity and appeal of their projects. This README Generator tool provides users with
          customizable templates and tips to help make their projects stand out.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Why Choose Us?</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Easy-to-use templates for quick project documentation.</li>
          <li>Customizable sections to fit different project types.</li>
          <li>Tips and guidelines to improve your README quality.</li>
          <li>Save time and focus on what matters most: coding!</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Our Mission</h2>
        <p className="text-lg leading-relaxed text-gray-600">
          Our mission is to help developers build better project documentation that not only looks
          professional but also helps others understand their code more easily. We believe clear,
          well-structured README files are essential to every successful project.
        </p>
      </div>
    </div>
  );
}

export default About;
