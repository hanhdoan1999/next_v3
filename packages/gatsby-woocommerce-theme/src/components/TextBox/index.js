import React from 'react';
import './TextBox.scss';
function TextBox({ heading = 'Text', bg = '#97a955', textColor, marginBottom=0 }) {
  return (
    <div className='text-box' style={{ backgroundColor: bg, color: textColor, marginBottom: marginBottom}}>
      <span className='text-box_heading' style={{ color: textColor }} dangerouslySetInnerHTML={{__html:heading}}/>
    </div>
  );
}
export default TextBox;
