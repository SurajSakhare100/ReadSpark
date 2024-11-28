import React from 'react';
import PropTypes from 'prop-types';

function Badge({ BadgeName, className, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`text-sm font-bold me-2 px-3 py-1.5 cursor-pointer rounded ${className}`}
        aria-label={`Badge: ${BadgeName}`} 
      >
        {BadgeName}
      </button>
    </div>
  );
}

Badge.propTypes = {
  BadgeName: PropTypes.string.isRequired, // Badge name should be a string and is required
  className: PropTypes.string, // className is optional
  onClick: PropTypes.func.isRequired, // onClick should be a function and is required
};

export default Badge;
