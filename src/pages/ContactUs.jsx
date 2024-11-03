// src/pages/Contact.js
import React from "react";

function Contact() {
  const handleEmailClick = () => {
    window.location.href = "mailto:sakharesuraj07@gmail.com";
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md  text-gray-700">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p>If you have any questions or feedback, feel free to reach out to us:</p>

        <h2 className="text-xl font-semibold mt-4">Contact Information</h2>
        <div className="mt-6 space-y-2">
          <p className="text-gray-800">
            <strong>Author:</strong> Suraj Sakhare
          </p>
          <p className="text-gray-800">
            <strong>Address:</strong> Pune, India
          </p>
          
        </div>

        <button
          onClick={handleEmailClick}
          className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default Contact;
