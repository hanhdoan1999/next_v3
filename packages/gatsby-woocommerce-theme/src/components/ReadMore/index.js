import React, { useState } from 'react';
import '../../components/ReadMore/styles.scss'

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className='text'>
      {isReadMore ? text?.slice(0, 72) : (text)}
      {text?.length > 72 ?
        <span onClick={toggleReadMore} className='read-or-hide'>
          {isReadMore ? ' MORE' : ' LESS'}
        </span>
        : ' '
      }
    </p>
  );
};

export default ReadMore;
