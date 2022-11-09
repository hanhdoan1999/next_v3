import React from "react";
import CustomCalendlyPopupButton from "../../../common/CustomCalendlyPopupButton";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import "./styles.scss";
function FooterMainContentCol({
  city,
  state,
  googleUrl,
  address,
  email,
  phone,
  calendlyUrl,
  calendlyTitle,
  calendlyContent,
  calendlyOneLine,
  isCalendlyOneLine = false,
  img_contact,
  name_contact,
  phone_contact,
  email_contact,
  showListContact
}) {
  const { width } = useWindowDimensions();
  return (
    <div className='col-12 col-sm-12 col-md-4 col-lg-4 main-content-col'>
      <div className='main-content__item'>
        <div className='info-col-title'>
          <p className='city'>{city}</p>
          <p className='sub-title'>{state}</p>
        </div>
        <div className='info-footer-col'>
          <div className='one-el mb-23 d-flex'>
            <a
              href={googleUrl}
              target='_blank'
              rel='noreferrer'
              className='d-flex'
            >
              <span className='icon icon-address'>
                <i className='fas fa-map-marker-alt'></i>
              </span>

              <div className='one-el-content'>
                <p className='one-el-content__title'>Address</p>
                <span className='one-el-content__desc'>{address}</span>
              </div>
            </a>
          </div>

          <div className='one-el mb-23 d-flex'>
            <a href={`mailto:${email}`} className='d-flex'>
              <span className='icon icon-email'>
                <i className='fas fa-comments-alt'></i>
              </span>

              <div className='one-el-content'>
                <p className='one-el-content__title'>Email</p>
                <span className='one-el-content__desc'>{email}</span>
              </div>
            </a>
          </div>

          <div className='one-el mb-23 d-flex'>
            <a href={`tel:+${phone}`} className='d-flex'>
              <span className='icon icon-phone'>
                <i className='fas fa-phone-alt'></i>
              </span>

              <div className='one-el-content'>
                <p className='one-el-content__title'>Phone</p>
                <span className='one-el-content__desc'>{phone}</span>
              </div>
            </a>
          </div>
          <CustomCalendlyPopupButton
            url={calendlyUrl}
            title={calendlyTitle}
            content={calendlyContent}
            isCalendlyOneLine={isCalendlyOneLine}
            calendlyOneLine={calendlyOneLine}
            width={width}
          />
          {showListContact && 
          <>
          <hr/>
           <div className='one-el mb-23 d-flex'>
            {/* <a href="#" className='d-flex'> */}
              <img src={img_contact} alt="contact-info" className="img-contact"/>
              <div className='d-flex flex-column flex-1 pl-1 mt-auto'>
                <p className='one-el-content__desc font-weight-bold'>{name_contact}</p>
                <a href={`tel:+${phone_contact}`}><p className='one-el-content__desc'>{phone_contact}</p></a>
                <a href={`mailto:${email_contact}`}><p className='one-el-content__desc small'>{email_contact}</p></a>
              </div>
            {/* </a> */}
          </div>
          </>
          }
        </div>
      </div>
    </div>
  );
}

export default FooterMainContentCol;
