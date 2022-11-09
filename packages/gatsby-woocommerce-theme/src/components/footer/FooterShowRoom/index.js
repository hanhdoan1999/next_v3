import { Link } from "gatsby";
import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import YoutubeIcon from "../../icons/YoutubeIcon";
import CustomCalendlyPopupButton from "../../../common/CustomCalendlyPopupButton";
import { FOOTER_MAIN_CONTENT } from "../stories/footer-data";
import "./styles.scss";
import { reverse } from "lodash";

function FooterSubMenu({ showroom_list }) {
  const data = [...showroom_list?.showroomFooter?.nodes]?.reverse();
  return (
    <div className="footer__showr__list">
      <span id="title">Showrooms:</span>
      <div className="wrap__list__showroom">
        {data.map((e, index) => (
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
  );
}

export default FooterSubMenu;
