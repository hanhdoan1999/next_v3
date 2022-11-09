import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { MdClose } from 'react-icons/md';
import ReactModal from 'react-modal';
import './styles.scss';

function PopupQuote({ name, image, isOpen, handleCloseModal }) {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel='onRequestClose Example'
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={true}
      className='Modal popup-quote-container '
      overlayClassName='Overlay'
      ariaHideApp={false}
    >
      <button className='close-btn' onClick={handleCloseModal}>
        <MdClose />
      </button>
      <h2 className='title'>Quick Quote</h2>
      <h4 className='product-name text-center'>{name}</h4>
      <div className='product-img text-center'>
        <img src={image} alt={name} className='quote-img text-center' />
      </div>

      <Formik
        initialValues={{
          name: '',
          email: '',
          company: '',
          phone: '',
          state: '',
          suburb: '',
          quantity: '',
          postcode: '',
        }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
        validate={(values) => {
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          const errors = {};
          if (!values.name) {
            errors.name = 'Name Required';
          }
          if (!values.email || !emailRegex.test(values.email)) {
            errors.email = 'Valid Email Required';
          }
          if (!values.phone) {
            errors.phone = 'Phone Required';
          }
          if (!values.company) {
            errors.company = 'Company Required';
          }
          if (!values.postcode) {
            errors.postcode = 'Postcode Required';
          }
          if (!values.suburb) {
            errors.suburb = 'Suburb Required';
          }
          if (!values.quantity) {
            errors.quantity = 'Quantity Required';
          }
          if (!values.state) {
            errors.state = 'State Required';
          }

          return errors;
        }}
      >
        {() => (
          <Form className='popup-quote-form'>
            <div className='form-field'>
              <Field
                name='name'
                placeholder='Name'
                className='form-field-input'
              />

              <ErrorMessage name='name'>
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className='form-field'>
              <Field
                name='company'
                className='form-field-input'
                placeholder='Company'
              />

              <ErrorMessage name='company'>
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>
            </div>

            <div className='form-field'>
              <Field
                name='email'
                className='form-field-input'
                placeholder='Email'
              />

              <ErrorMessage name='email'>
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className='form-field'>
              <Field
                name='phone'
                component='input'
                className='form-field-input'
                placeholder='Phone'
              />

              <ErrorMessage name='phone'>
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className='form-field'>
              <Field
                name='suburb'
                component='input'
                className='form-field-input'
                placeholder='Suburb'
              />

              <ErrorMessage name='suburb'>
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className='form-field'>
              <Field
                name='state'
                component='input'
                className='form-field-input'
                placeholder='State'
              />

              <ErrorMessage name='state'>
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className='form-field'>
              <Field
                name='postcode'
                component='input'
                className='form-field-input'
                placeholder='Postcode'
              />

              <ErrorMessage name='postcode'>
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className='form-field'>
              <Field
                name='quantity'
                component='input'
                className='form-field-input'
                placeholder='Quantity'
              />

              <ErrorMessage name='quantity'>
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>
            </div>

            <div className='text-center btn-submit'>
              <button
                className='submit-quick-quote btn btn-secondary'
                type='submit'
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </ReactModal>
  );
}

export default PopupQuote;
