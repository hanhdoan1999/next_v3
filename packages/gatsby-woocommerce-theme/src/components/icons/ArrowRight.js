import React from 'react';

function ArrowRight({ color = '#2D2D2D' }) {
  return (
    <svg
      width='15'
      height='16'
      viewBox='0 0 15 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.5 7.99988L9.5 3.99988M13.5 7.99988L9.5 11.9999M13.5 7.99988H1'
        stroke={color}
      />
    </svg>
  );
}

export default ArrowRight;
