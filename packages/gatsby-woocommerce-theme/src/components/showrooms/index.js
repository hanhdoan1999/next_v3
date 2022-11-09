import React from "react";
import CustomCalendlyPopupButton from "../../common/CustomCalendlyPopupButton";
import { FOOTER_MAIN_CONTENT } from "../footer/stories/footer-data";
import TextBox from "../TextBox";
import "./Showrooms.scss";
function Showrooms({ heading, showroomItems }) {
  return (
    <div className="show-rooms in-page">
      <TextBox heading={heading} bg={"#e1d7ca"} textColor={"#000000"} />
      <div className="footer__showr__list">
        <div className="wrap__list__showroom">
          {showroomItems?.map((e, index) => (
            <div className="list_showroom" key={index}>
              <p>{e.name}</p>
              <a
                href={FOOTER_MAIN_CONTENT[index].googleUrl}
                target="_blank"
                rel="noreferrer"
                className="list_showroom-address"
              >
                <p>{e.address}</p>
              </a>
              <span>
                <i>Ph: </i>
                <a href={`tel:${e.phone}`} className="list_showroom-phone">
                  {e.phone}
                </a>
              </span>
              <CustomCalendlyPopupButton
                url={FOOTER_MAIN_CONTENT[index].calendlyUrl}
                title={e.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Showrooms;
