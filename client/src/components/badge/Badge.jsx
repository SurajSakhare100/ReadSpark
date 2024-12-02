import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Badge({ BadgeName, fileName, className,downloadClassName, files, onClick }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    files?.map((file) => { 
      if(file.fileName === fileName){
        setCount(file.downloadCount)
      } 
     })
  }, [setCount,files])
  return (
    <div>
      <button
        onClick={onClick}
        className={`text-sm font-bold me-2 px-3 py-1.5 cursor-pointer rounded ${className}`}
        aria-label={`Badge: ${BadgeName}`}
      >
        {BadgeName}
        <span className={`text-sm font-bold px-2 py-0.5 mx-1 cursor-pointer rounded-full ${downloadClassName}`}>{count}</span>
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
