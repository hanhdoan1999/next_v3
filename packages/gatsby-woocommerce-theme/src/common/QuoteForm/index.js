import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { navigate } from 'gatsby';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { GlobalDispatchContext } from '../../components/contexts/AppContext';
import ButtonViewMore from '../ButtonViewMore';
import MySelect from '../MySelect';
import MyTextArea from '../MyTextArea';
import MyTextInput from '../MyTextInput';
import '../RequestAQuoteFormPopUp/styles.scss';
import './styles.scss';

function QuoteForm({ cartItems, subtextTop, title, subtextBottom, linkTo }) {
  const dispatch = useContext(GlobalDispatchContext);
  const url = `${process.env.WORDPRESS_SITE_URL}/wp-json/custom-quote/v1/posts`;
  // const url = "https://new.nextrend.com.au/graphql/wp-json/custom-quote/v1/posts"
  const listEnquiryType = ["Commercial","Residential"]
  const [selected, setSelected] = useState("");
  const handleChange = (e) => {
    setSelected(e);
  }
  return (
    <Formik
      initialValues={{
        your_name: '',
        company: '',
        email: '',
        phone: '',
        suburb:'',
        postcode:'',
        message: '',
        enquiryType:''
      }}
      validationSchema={Yup.object({
        your_name: Yup.string().required('Name Required'),
        company: selected === "Commercial" && Yup.string().required('Company Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Valid Email Required'),
        phone: Yup.number().required('Phone Required'),
        suburb: Yup.string().required('Suburb Required'), 
        postcode: Yup.string().required('Postcode Required'), 
        enquiryType: selected === "" && Yup.string().required('Enquiry Type Required'), 
      })}
      onSubmit={(values, actions) => {
        let data = {...values, "enquiry_type" : selected, "company":selected ==="Residential" ? "" : values.company}
        const handleServerResponse = (ok, msg) => {
          if (ok) {
            navigate(linkTo);
            dispatch({ type: 'CLEAR_CART' });
          } else {
            dispatch({ type: 'CLEAR_CART' });
          }
        };
        const submitData = {
          'customer-info': data,
          'cart-item': cartItems,
        };
        axios
          .post(url, submitData, {
            auth: {
              username: process.env.USER_NAME,
              password: process.env.PASSWORD,
            },
          })
          .then((response) => {
            actions.resetForm();
            handleServerResponse(true, 'Thanks!');
          })
          .catch((error) => {
            handleServerResponse(false, error.response?.data?.error);
          });
        actions.setSubmitting(false);
      }}
    >
      {() => (
        <Form className={`popup-quote-form section`} action='submit'>
          {subtextTop && (
            <>
              <p className='sub-text'>{subtextTop}</p>
              <h2 className='title'>{title}</h2>
              <p className='sub-text-bottom'>{subtextBottom}</p>
            </>
          )}

          <MyTextInput name='your_name' placeholder='Your Name *' />
          <MySelect name='enquiryType' className='select-item minimal' value = {selected} onChange={(e) => handleChange(e.target.value)}  >
          <option value='' disabled selected>-- Select Enquiry Type --</option>
            {listEnquiryType?.map((tag,index) => (
              <option className='tag-option' value={tag} key={tag}>
                {tag}
              </option>
            ))}
          </MySelect>
          {selected === "Commercial" &&
            <MyTextInput name='company' placeholder='Company *' />
          }
          <MyTextInput name='email' placeholder='Email *' />
          <MyTextInput name='phone' placeholder='Phone *' />
          <MyTextInput name='suburb' placeholder='Suburb *' />
          <MyTextInput name='postcode' placeholder='Postcode *' />
          <MyTextArea
            name='message'
            placeholder='Message'
          />
          <div className='text-center btn-submit d-flex'>
            <button
              className='submit-quick-quote btn btn-primary'
              type='submit'
            >
              Submit Message
            </button>
            <ButtonViewMore slug='products' text='Continue browsing' />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default QuoteForm;
