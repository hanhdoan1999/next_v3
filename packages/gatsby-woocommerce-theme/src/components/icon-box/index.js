import React from 'react'
import "./IconBox.scss";
import { navigate } from 'gatsby';
function IconBox({iconBox,heading}) {
  return (
    <>
    <h2 className='icon-box_heading' dangerouslySetInnerHTML={{__html:heading}}/>
    <div className='icon-box'>
      {iconBox?.map((item,index) => {
        return (
          <div key={index} className="icon-box_item" onClick={() => navigate(item.link)}>
            <img src={item.icon.sourceUrl} alt=""/>
            <h3>{item.text}</h3>
            <p>{item.description}</p>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default IconBox