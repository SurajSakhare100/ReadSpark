import React from 'react';

function Badge({ key,BadgeName, className , onClick}) {
  return (
    <div key={key}>
      <span
        onClick={onClick}
        className={`text-sm font-bold me-2 px-3 py-1.5 cursor-pointer bg-green-300 text-green-900 rounded ${className}`}
      >
        {BadgeName}
      </span>
    </div>
  );
}

export default Badge;
