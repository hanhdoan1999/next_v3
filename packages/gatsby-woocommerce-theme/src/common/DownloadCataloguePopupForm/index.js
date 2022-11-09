import { Field, Form, Formik } from 'formik';
import React, { memo } from 'react';
import { MdClose } from 'react-icons/md';
import ReactModal from 'react-modal';
import * as Yup from 'yup';
import MyTextInput from '../MyTextInput';
import './styles.scss';
/* eslint-disable */

function DownloadCataloguePopupForm({
  isOpen,
  handleCloseModal,
  title = 'request a quote',
  subTitle = 'Commercial enquiries only',
  popUpImage,
}) {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel='onRequestClose Example'
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={true}
      className='Modal download-catalogue-form'
      overlayClassName='Overlay'
      ariaHideApp={false}
    >
      <button className='close-btn' onClick={handleCloseModal}>
        <MdClose />
      </button>
      <div className='container'>
        <div className='row'>
          <div className='left-part col-lg-6 col-6'>
            <h2 className='title'>{title}</h2>
            <span className='note'>{subTitle}</span>
            <Formik
              initialValues={{
                name: '',
                email: '',
                company: '',
              }}
              onSubmit={(values, actions) => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }}
              validationSchema={Yup.object({
                name: Yup.string().required('Name Required'),
                company: Yup.string().required('Company Required'),
                email: Yup.string()
                  .email('Invalid email address')
                  .required('Valid Email Required'),
                phone: Yup.number().required('Phone Required'),
                state: Yup.string().required('State Required'),
              })}
            >
              {() => (
                <Form className='popup-quote-form'>
                  <MyTextInput name='name' placeholder='Your Name *' />
                  <MyTextInput name='company' placeholder='Company *' />
                  <MyTextInput name='email' placeholder='Email *' />

                  <label className='stay-in-contact d-flex align-items-center'>
                    <Field type='checkbox' name='checked' value='One' />
                    Let’s stay in contact!
                  </label>

                  <div className='text-center btn-submit d-flex'>
                    <button
                      className='submit-quick-quote btn btn-secondary'
                      type='submit'
                    >
                      DOWNLOAD NOW
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className='right-part col-6'>
            {popUpImage && (
              <img src={popUpImage.mediaItemUrl} alt={popUpImage.altText} />
            )}
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default memo(DownloadCataloguePopupForm);
