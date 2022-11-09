import { useField } from "formik";
import React from "react";
import '../../common/MySelect/style.scss'

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='my-select'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error small text-danger'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MySelect;
