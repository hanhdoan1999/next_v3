import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import "./faqs.scss";

function Faqs({faqItem,heading,button}) {
  const [show, setShow] = useState(-1);
  let url = typeof window !== "undefined" ? window?.location?.href : ""
  const handleClick = (index,questionLink)=>{
    if(questionLink ===null || (questionLink !==null && questionLink.includes("faq-item"))) {
      if(index === show) {
        setShow(-1)
      } else {
        setShow(index);
      }
    } else {
      navigate(questionLink);
      setShow(-1)
    }
  }
  const toSlug = (title) => {
    const tempTitle = title.replace(" ","-").toLowerCase()
    return tempTitle
  }

  useEffect(() => {
    if(faqItem && url.includes("faq-item")) {
      let c = url.split('?faq-item=')[1];
      let index = parseInt(c);
      setShow(index-1);
      if (document.getElementById(`faqs${index-1}`) !== null ){
        document.getElementById(`faqs${index-1}`).scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  }, [])
  useEffect(() => {
    if(toSlug(heading) && url.includes(toSlug(heading))){
      document.getElementById(toSlug(heading)).scrollIntoView({
        behavior:'smooth',
        block:'start',
        inline:'center',
      })
    }
  },[]) 
  return (
    <div className="toggle-custom">
    <h3 id={toSlug(heading)}>{heading}</h3>
    {faqItem?.map((el,index)=>(
      <div className="fqa-item" key={index} id={`faqs${index}`} onClick={()=>handleClick(index,el.questionLink)} >
        <div className={`fqa-item-top ${show === index ? "borderNone" : "borderDisplay"}`}>
        <div className="fqa-item-question" dangerouslySetInnerHTML={{ __html: el.question }}></div>
        <div>{show === index ? <BsChevronUp/> : <BsChevronDown/>}</div>
        </div>
       {show === index &&  <div className="fqa-item-answer" dangerouslySetInnerHTML={{ __html: el.answer }}></div>}
      </div>
    ))}
    {button.text && button.url && 
     <div className="link-page-button">
            <button type="button" onClick={() => navigate(`${button.url}`)}>
            {button.text}
            </button>
      </div>
    }
  </div>
  )
}

export default Faqs