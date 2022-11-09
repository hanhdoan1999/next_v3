import React, { Fragment } from "react";
import { useGetForm } from "./useGetForm";
import { Formik, useFormik } from "formik";
import FormComponent from "./FormComponent/FormComponent";
import Loading from "../../common/Loader";
import { v4 } from "uuid";
import "./styles.scss";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { values, valuesIn } from "lodash";
function WarrantyForm(props) {
  const { formData, handleSubmitForm } = useGetForm(props.formId);
  const { width } = useWindowDimensions();

  const formFields = formData?.gfForm?.formFields?.nodes;
  const submitFields = formData?.gfForm?.submitButton;
  const title = formData?.gfForm?.title;
  // console.log(formFields);
  const formik = useFormik({
    initialValues: {
      first: "",
      last: "",
      company: "",
      phone: "",
      email: "",
      city: "",
      country: "",
      lineTwo: "",
      state: "",
      zip: "",
      street: "",
      invoiceNum: "",
      productDetailAndQty: "",
      productFaultDetail: "",
      enviroment: "",
      productFaultImage: [],
      productLocationImage: [],
      other: "",
      consent: "",
    },
    onSubmit: (value) => {
      handleSubmitForm({
        variables: {
          input: {
            id: `${props.formId}`,
            clientMutationId: v4(),
            fieldValues: [
              {
                id: 3,
                nameValues: {
                  first: value.first,
                  last: value.last,
                },
              },
              {
                id: 4,
                value: value.company,
              },
              {
                id: 5,
                value: value.phone,
              },
              {
                id: 6,
                emailValues: { value: value.email }
              },
              {
                id: 7,
                addressValues: {
                  city: value.city,
                  country: value.country,
                  lineTwo: value.lineTwo,
                  state: value.state,
                  zip: value.zip,
                  street: value.street,
                },
              },
              {
                id: 9,
                value: value.invoiceNum,
              },
              {
                id: 10,
                value: value.productDetailAndQty,
              },
              {
                id: 11,
                value: value.productFaultDetail,
              },
              {
                id: 12,
                value: value.enviroment,
              },
              // {
              //   id: 14,
              //   fileUploadValues: [...value.productFaultImage],
              // },
              // {
              //   id: 15,
              //   fileUploadValues: [...value.productLocationImage],
              // },
              {
                id: 17,
                value: value.other,
              },
              {
                id: 18,
                value: value.consent,
              },
            ],
          },
        },
      });
    },
  });
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  // console.log("nghia", formik.values);
  return (
    <div className="warranty-form">
      {!formData ? (
        <Loading />
      ) : (
        <Fragment>
          <h1 className="warranty-form-title">{title}</h1>
          <form className="warranty-form-form-wrapper">
            {formFields?.map((item, index) => {
              return (
                <Fragment key={index}>
                  <FormComponent
                    item={item}
                    handleChange={handleChange}
                    formik={formik}
                  />
                </Fragment>
              );
            })}
          </form>
          <button
            type="button"
            className="submit-button"
            onClick={formik.handleSubmit}
          >
            {submitFields?.text}
          </button>
        </Fragment>
      )}
    </div>
  );
}

export default WarrantyForm;
