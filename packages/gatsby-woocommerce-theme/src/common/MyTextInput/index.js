import React from 'react';
import { useField } from 'formik';

function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className='text-input ' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div
          className='error small text-danger

'
        >
          {meta.error}
        </div>
      ) : null}
    </>
  );
}

export default MyTextInput;
