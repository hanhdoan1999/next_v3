import React from 'react';
import { useField } from 'formik';

function MyTextArea({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea
        className='text-area form-control'
        {...field}
        {...props}
        rows='3'
      />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
}

export default MyTextArea;
