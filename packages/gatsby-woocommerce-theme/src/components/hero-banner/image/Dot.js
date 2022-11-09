import React from "react";

function Dot({color}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10.1335" cy="10.8523" r="9.99289" fill={color} />
    </svg>
  );
}

export default Dot;
