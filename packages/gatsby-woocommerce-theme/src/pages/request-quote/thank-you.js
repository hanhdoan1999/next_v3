import React from "react";
import Layout from "../../components/layout";


function ThankYouQuote() {
  const text = {
    color: "#666",
    lineHeight: "1.7em",
    fontWeight: "400",
  }
  const title ={
    color: "#333",
    lineHeight: "1.5em",
    fontWeight: "400",
    // letterSpacing: "1px",
  }

  return (
    <Layout>
    <div className="container d-flex justify-content-center align-items-center mt-5 mb-5">
       <div className="thanks-contact">
       <h3 className="mb-4" style={title}>Thank You</h3>
         <h4 style={title}>Thank you… for browsing Nextrend’s extensive range of quality furniture.</h4>
         <p>A quote will be emailed to you from our sales team on the products you have selected shortly.</p>
         <h4 className="my-3" style={title}>5 good reasons why to choose Nextrend for your purchase!</h4>
         <ol style={{marginLeft:"-20px"}}>
           <li style={text}>Our Sales Team will send a professional quote through to you within 24 hours* and offer you expert advice on all your furniture needs.</li>
           <li style={text}>We only sell high quality… Commercial grade furniture!</li>
           <li style={text}>All products have substantial 2 year commercial warranty!</li>
           <li style={text}>Our Sales Team can provide you with a competitive delivery price for your purchase right to your door!</li>
           <li style={text}>Need it fast… no problems… we hold large stocks.</li>
         </ol>
         <div className="mt-3 mb-2" style={text}>*Business days</div>
         <h4 style={title}>Please call us now on 1300 559 965 if you have any questions.</h4>
       </div>
    </div>
   </Layout>
  )
}

export default ThankYouQuote;
