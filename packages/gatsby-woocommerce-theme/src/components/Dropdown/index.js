import React, { useEffect, useRef, useState } from 'react'
import Polygon from "./Images/Polygon 1"
import ArrowUp from "./Images/ArrowUp"
import "./Dropdown.css";
import Loading from "./Images/200.gif";
import useWindowDimensions from '../../hooks/useWindowDimensions';
export default function Dropdown({ data, setValueChosen, className, widthDesktop, widthMobile, valueChosen, value = "", label = "", title = ""}) {
  const { width } = useWindowDimensions();
  const [show, setShow] = useState(false)
  const handleChange = (el) => {
    setValueChosen(el)
    setShow(false)
  }
  const wrapperRef = useRef(null);
  const [choosedData, setChoosedData] = useState();
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShow(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  useEffect(() => {
    if (valueChosen && data) {
      setChoosedData(data.filter(e => e[value] === valueChosen)[0])
    }
  }, [valueChosen, data])

  return (
    <div className={`wrapper__dropdown ${className}`} style={{width:width> 576 ? widthDesktop : widthMobile}}>
      <div className="dropdown__inner">
        <div className="dropdown__inner__wrap" >
          <div onClick={(e) => setShow(true)} className={`${show === true ? "showDropDownComponent" : ""} `}>
            <span>
            {choosedData ? choosedData[label] : title}
            </span>
            {show === true ? <i><ArrowUp /></i> : <i><Polygon /></i>}
          </div >
          {show === true && <div className="list__data__dropdown"  id="dropdownCustom" ref={wrapperRef}>
            {!data || data?.length === 0 ? 
            <div className="loading">
              <img src={Loading} alt="load-icon"/>
            </div>
            : 
            data?.map((el, index) =>
                <p key={index} onClick={(e) => handleChange(el)} className={el[value] === valueChosen && valueChosen}>{el[label]}</p>
              )
            }
          </div>}
        </div>
      </div>
    </div>
  )
}
