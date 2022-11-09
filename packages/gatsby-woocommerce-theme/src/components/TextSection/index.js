import React from 'react'
import "./TextSection.scss";
function TextSection({content}) {
  return (
    <>
    {(content && content !=="") &&
    <div className="TextSectionWrapper">
      <div className="TextSection" dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
    }
    </>
  )
}

export default TextSection