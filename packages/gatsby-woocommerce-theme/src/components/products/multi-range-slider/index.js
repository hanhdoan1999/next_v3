import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles.scss";

const MultiRangeSlider = ({ min, max }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const handleChange = (e) => {
    let value;
    if (e.target.name === "minVal") {
      value = Math.min(Number(e.target.value), maxVal - 1);
      setMinVal(value);
      minValRef.current = value;
    } else {
      value = Math.max(Number(e.target.value), minVal + 1);
      setMaxVal(value);
      maxValRef.current = value;
    }
  };

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
      // let timer = setTimeout(
      //   () =>
      //     filterProduct({
      //       name: 'min',
      //       value: minVal,
      //     }),
      //   1000
      // );
      // return () => {
      //   clearTimeout(timer);
      // };
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
      // let timer = setTimeout(
      //   () =>
      //     filterProduct({
      //       name: 'max',
      //       value: maxVal,
      //     }),
      //   1000
      // );
      // return () => {
      //   clearTimeout(timer);
      // };
    }
  }, [maxVal, getPercent]);

  return (
    <div className='price-filter-container'>
      <div className=' multi-range-slider-container'>
        <input
          type='range'
          name='minVal'
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            handleChange(event);
          }}
          className='thumb thumb--left'
          style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
          type='range'
          name='maxVal'
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            handleChange(event);
          }}
          className='thumb thumb--right'
        />

        <div className='slider'>
          <div className='slider__track' />
          <div ref={range} className='slider__range' />
          <div className='slider__left-value'>$ {minVal}</div>
          <div className='slider__right-value'>$ {maxVal}</div>
        </div>
      </div>
      <div className='btn-price'>
        <span className='slider__left-value'>$ {minVal}</span>-
        <span className='slider__right-value'>$ {maxVal}</span>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default MultiRangeSlider;
