import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import MySelect from '../../../common/MySelect';
import './styles.scss';
import { navigate } from 'gatsby';
import { valuesIn } from 'lodash';
import {GlobalDispatchContext} from "../../contexts/AppContext"
/* eslint-disable */
function ProjectFilter({
  listOfIndustry,
  listOfLocation,
  currentIndustry,
  currentLocation,
  handleSubmit,
  value2,
  projectLocation,
  projectIndustry
}) {
  const dispatch = useContext(GlobalDispatchContext);
  const handleChange = (e,type) => {
    if(e.target.value === "Default") {
      dispatch({type:"CHANGE_DEFAULT"})
    }else if(e.target.value !== "Default" && type === "location") {
      dispatch({type:"CHANGE_LOCATION", payload:e.target.value})
    }else if(e.target.value !== "Default" && type === "industry") {
      dispatch({type:"CHANGE_INDUSTRY", payload:e.target.value})
    }
  }
  useEffect(() => {
    if(projectLocation) {
      dispatch({type:"CHANGE_LOCATION", payload:projectLocation})
    }else if(projectIndustry) {
      dispatch({type:"CHANGE_INDUSTRY", payload:projectIndustry})
    }
  },[projectLocation,projectIndustry])
  return (
    <div className=' project-filter justify-content-center'>
      <Formik
        initialValues={{
          industry: currentIndustry ? currentIndustry : '',
          location: currentLocation ? currentLocation : '',
        }}
        onSubmit={handleSubmit}
      >
        <Form className='d-flex align-items-center project-filter-form'>
          <MySelect name='location' className='select-item' onChange={(e) => handleChange(e,"location")} >
            <option value={value2.location ? value2.location : " "} className='industry-option' style={{ textAlign: "center" }}>{value2.location && value2.location !== "Default" ? value2.location : projectLocation ? projectLocation?.split('-').join(' ') : 'Sort by location'}</option>
            <option className='industry-option' value={"Default"}   >
              Clear select
            </option>
            {listOfLocation?.map((location, index) => (
              <option className='industry-option' value={location} key={index}>
                {location?.split('-').join(' ')}
              </option>
            ))}
          </MySelect>
          <MySelect name='industry' className='select-item' onChange={(e) => handleChange(e,"industry")} >
            <option value={value2.industry && value2.industry !== "Default" ? value2.industry : ''}>{value2.industry ? value2.industry :projectIndustry ? projectIndustry?.split('-').join(' ') : 'Sort by industry'}</option>
            <option className='industry-option' value={"Default"}   >
              Clear select
            </option>
            {listOfIndustry?.map((industry, index) => (
              <option className='industry-option' value={industry} key={index}   >
                {industry?.split('-').join(' ')}
              </option>
            ))}
          </MySelect>
        </Form>
      </Formik>
    </div >
  );
}
export default ProjectFilter;
