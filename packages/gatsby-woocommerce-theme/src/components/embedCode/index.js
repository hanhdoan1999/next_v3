import React, { useEffect, useState } from 'react'
import InnerHTML from 'dangerously-set-html-content'
function EmbedCode({code}) {
  return (
    <div className='embed-code'>
      <InnerHTML html={code}/>
    </div>
    
  )
}

export default EmbedCode