import React from 'react';

function ArrowRight({ color = '#2D2D2D' }) {
  return (
    <svg
      width='72'
      height='24'
      viewBox='0 0 72 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M71.0607 13.0607C71.6464 12.4749 71.6464 11.5251 71.0607 10.9393L61.5147 1.3934C60.9289 0.807612 59.9792 0.807612 59.3934 1.3934C58.8076 1.97918 58.8076 2.92893 59.3934 3.51472L67.8787 12L59.3934 20.4853C58.8076 21.0711 58.8076 22.0208 59.3934 22.6066C59.9792 23.1924 60.9289 23.1924 61.5147 22.6066L71.0607 13.0607ZM0 13.5H70V10.5H0V13.5Z'
        fill='#BCBCBC'
      />
    </svg>
  );
}

export default ArrowRight;
