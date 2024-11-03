import React from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 ">
          Sign-In Currently Not Available
        </h1>
        <p className="mt-4 text-lg text-gray-600 ">
          We're sorry, but the sign-in feature is not available at this time. Please check back later.
        </p>
          <Link
          to={"/"}
        >
        <button className='text-md mt-2 bg-blue-600 text-white hover:bg-blue-700  py-2 px-4 rounded-md'>
        Go back to home  </button>
          
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
