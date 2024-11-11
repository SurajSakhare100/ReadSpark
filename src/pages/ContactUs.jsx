// src/pages/Contact.js
import React from "react";

function Contact() {
  const handleEmailClick = () => {
    window.location.href = "mailto:sakharesuraj07@gmail.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+919876543210"; // Update with your actual phone number
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-700">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p>If you have any questions or feedback, feel free to reach out to us:</p>

        <h2 className="text-xl font-semibold mt-6">Contact Information</h2>
        <div className="mt-4 space-y-2">
          <p className="text-gray-800">
            <strong>Author:</strong> Suraj Sakhare
          </p>
          <p className="text-gray-800">
            <strong>Address:</strong> Pune, India
          </p>
          <p className="text-gray-800">
            <strong>Phone:</strong>{" "}
            <button
              onClick={handlePhoneClick}
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              +91 9876543210 {/* Replace with your phone number */}
            </button>
          </p>
        </div>

        <h2 className="text-xl font-semibold mt-6">Follow Us</h2>
        <div className="mt-4 space-y-2">
          <p className="text-gray-800">
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/surajsakhare"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              linkedin.com/in/surajsakhare
            </a>
          </p>
          <p className="text-gray-800">
            <strong>Twitter:</strong>{" "}
            <a
              href="https://twitter.com/surajsakhare"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              twitter.com/surajsakhare
            </a>
          </p>
        </div>

        <button
          onClick={handleEmailClick}
          className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Contact Us via Email
        </button>
      </div>
    </div>
  );
}

export default Contact;
