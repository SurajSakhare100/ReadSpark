import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { emailValidator, nameValidator } from "../../utils/emailValidator"; // Assuming you have a custom emailValidator

const FeedbackForm = ({isModalOpen,toggleModal}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [nameValid, setNameValid] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const recaptchKey = import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY;
  const backendurl = import.meta.env.VITE_BACKEND_URL;


 

  useEffect(() => {
    if (formData.email) {
      const validateEmail = async () => {
        const result = await emailValidator(formData.email);
        setEmailValid(result);
      };
      validateEmail();
    }

    if (formData.name) {
      const validateName = async () => {
        const result = await nameValidator(formData.name);
        setNameValid(result);
      };
      validateName();
    }
  }, [formData.email, formData.name]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailValid) {
      alert("Please provide a valid email address.");
      return;
    }
    if (!nameValid) {
        alert("Please provide a valid name (at least 3 alphabetic characters).");
        return;
      }
  

    // Backend validation for reCAPTCHA
    const recaptchaResponse = await fetch(`${backendurl}/api/verify-recaptcha`, {
      method: 'POST',
      body: JSON.stringify({ recaptchaValue }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const recaptchaData = await recaptchaResponse.json();
    if (!recaptchaData.success) {
      alert("reCAPTCHA validation failed. Please try again.");
      return;
    }

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(
        serviceID,
        templateID,
        {
          name: formData.name,
          email: formData.email,
          rating: formData.rating,
          feedback: formData.feedback,
        },
        publicKey
      )
      .then(
        (response) => {
          console.log("Feedback sent successfully!", response.status, response.text);
          setSubmitted(true);
          setFormData({
            name: "",
            email: "",
            rating: "",
            feedback: "",
          });
          toggleModal(); 
        },
        (error) => {
          console.error("Failed to send feedback.", error);
        }
      );
  };

  return (
    <div className="w-full">
      

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg px-6 py-4 w-[400px] md:w-[500px]">
            <h2 className="text-3xl font-semibold mb-4 text-center"> Your Feedback Matters ❤️</h2>
            {submitted && <p className="text-green-500 mb-4">Thank you for your feedback!</p>}
            <form onSubmit={handleSubmit}>
                <label className="block text-sm font-medium mb-1">Name</label>
            <div className="mb-4 flex items-center">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    nameValid === null
                      ? "border-gray-300"
                      : nameValid
                      ? "border-green-500"
                      : "border-red-500"
                  } rounded focus:outline-none`}
                  placeholder="Your Name"
                  required
                />
                 {nameValid === null ? (
                  ""
                ) : nameValid ? (
                  <span className="text-green-500 ml-2">✔️</span>
                ) : (
                  <span className="text-red-500 ml-2">❌</span>
                )}
              </div>
                <label className="block text-sm font-medium mb-1">Email</label>
              <div className="mb-4 flex items-center">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    emailValid === null
                      ? "border-gray-300"
                      : emailValid
                      ? "border-green-500"
                      : "border-red-500"
                  } rounded focus:outline-none`}
                  placeholder="Your Email"
                  required
                />
                {emailValid === null ? (
                  ""
                ) : emailValid ? (
                  <span className="text-green-500 ml-2">✔️</span>
                ) : (
                  <span className="text-red-500 ml-2">❌</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                <div className="flex justify-between w-32">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span
                      key={value}
                      onClick={() => setFormData({ ...formData, rating: value })}
                      className={`cursor-pointer text-3xl ${formData.rating >= value ? "text-yellow-500" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Feedback</label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Suggestions"
                  required
                />
              </div>
              <div className="mb-4">
                <ReCAPTCHA sitekey={recaptchKey} onChange={setRecaptchaValue} />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
              >
                Submit Feedback
              </button>
            </form>
            <button onClick={toggleModal} className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
