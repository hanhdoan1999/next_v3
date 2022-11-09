import React, { Fragment } from "react";
import ImageUploading from "react-images-uploading";
import { checkName } from "../form.helper";
import "./styles.scss";
function FormComponent({ item, handleChange, formik }) {

  const handleImage = (imageList) => {
    const tempName = Object.keys(imageList[0]).find(el => Object.keys(formik.values).includes(el))
    formik.setFieldValue(tempName, imageList);
  }
  const handleFieldTextChange = (e) => {
    if(e.target.name === "consent") {
      if(e.target.checked) {
        formik.setFieldValue(e.target.name, "true");
      }else {
        formik.setFieldValue(e.target.name, "");
      }
    }else {
      formik.setFieldValue(e.target.name, e.target.value);
    }
  }
  const renderForm = (data) => {
    if (data.type === "SECTION") {
      return (
        <Fragment>
          <h2 className="section-title">{data.label}</h2>
        </Fragment>
      );
    } else if (data.type === "TEXT") {
      return (
        <Fragment>
          <div
            className={
              data.layoutGridColumnSpan === 6
                ? "form-group  col-lg-6 col-md-12"
                : "form-group col-12"
            }
          >
            <label>
              <div className="label">
                {data.label}{" "}
                {data.isRequired && <span className="require">*</span>}
              </div>
              <input
                id={data.id}
                name={checkName(data.id)}
                onChange={(e) => handleFieldTextChange(e)}
                placeholder={data.label}
              />
              {/* {formik.errors[checkErrorName(data.id)] ? (
                    <p className="error">
                      {formik.errors[checkErrorName(item.id)]}
                    </p>
                  ) : null} */}
            </label>
          </div>
        </Fragment>
      );
    } else if (data.type === "NAME") {
      return (
        <Fragment>
          <div
            className={
              data.layoutGridColumnSpan === 6
                ? "form-group  col-lg-6 col-md-12"
                : "form-group col-12"
            }
          >
            <label>
              <div className="label">
                {data.label}{" "}
                {data.isRequired && <span className="require">*</span>}
              </div>
              <div className="row">
                {data?.inputs?.map((el) => {
                  return (
                    <Fragment key={el.id}>
                      {!el.isHidden && (
                        <div className="sub-input">
                          <span>{el.label}</span>
                          <input
                            type="text"
                            name={checkName(el.id)}
                            placeholder={el.label}
                            onChange={(e) => handleFieldTextChange(e)}
                          />
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
              {/* {formik.errors[checkErrorName(data.id)] ? (
                    <p className="error">
                      {formik.errors[checkErrorName(item.id)]}
                    </p>
                  ) : null} */}
            </label>
          </div>
        </Fragment>
      );
    } else if (data.type === "PHONE") {
      return (
        <Fragment>
          <div
            className={
              data.layoutGridColumnSpan === 6
                ? "form-group  col-lg-6 col-md-12"
                : "form-group col-12"
            }
          >
            <label>
              <div className="label">
                {data.label}{" "}
                {data.isRequired && <span className="require">*</span>}
              </div>
              <input
                type="number"
                name={checkName(data.id)}
                placeholder="Phone"
                onChange={(e) => handleFieldTextChange(e)}
              />
              {/* {formik.errors[checkErrorName(data.id)] ? (
                    <p className="error">
                      {formik.errors[checkErrorName(item.id)]}
                    </p>
                  ) : null} */}
            </label>
          </div>
        </Fragment>
      );
    } else if (data.type === "ADDRESS") {
      return (
        <Fragment>
          <div
            className={
              data.layoutGridColumnSpan === 6
                ? "form-group  col-lg-6 col-md-12"
                : "form-group col-12"
            }
          >
            <label>
              <div className="label">
                {data.label}{" "}
                {data.isRequired && <span className="require">*</span>}
              </div>
              <div className="row">
                {data?.inputs?.map((el) => {
                  return (
                    <Fragment key={el.id}>
                      {!el.isHidden && (
                        <div className="sub-input">
                          <span>{el.label}</span>
                          <input
                            type="text"
                            name={checkName(el.id)}
                            placeholder={el.label}
                            onChange={(e) => handleFieldTextChange(e)}
                          />
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
              {/* {formik.errors[checkErrorName(data.id)] ? (
                    <p className="error">
                      {formik.errors[checkErrorName(item.id)]}
                    </p>
                  ) : null} */}
            </label>
          </div>
        </Fragment>
      );
    } else if (data.type === "TEXTAREA") {
      return (
        <Fragment>
          <div
            className={
              data.layoutGridColumnSpan === 6
                ? "form-group  col-lg-6 col-md-12"
                : "form-group col-12"
            }
          >
            <label>
              <div className="label">
                {data.label}{" "}
                {data.isRequired && <span className="require">*</span>}
              </div>
              <textarea
                id={data.id}
                name={checkName(data.id)}
                onChange={(e) => handleFieldTextChange(e)}
                placeholder={data.label}
              />
              {/* {formik.errors[checkErrorName(data.id)] ? (
                    <p className="error">
                      {formik.errors[checkErrorName(item.id)]}
                    </p>
                  ) : null} */}
            </label>
          </div>
        </Fragment>
      );
    } else if (data.type === "FILEUPLOAD") {
      return (
        <Fragment>
          <div
            className={
              data.layoutGridColumnSpan === 6
                ? "form-group  col-lg-6 col-md-12"
                : "form-group col-12"
            }
          >
            <label>
              <div className="label">
                {data.label}{" "}
                {data.isRequired && <span className="require">*</span>}
              </div>
              <ImageUploading
                id={data.id}
                onChange={handleImage}
                dataURLKey={checkName(data.id)} 
              >
                {({ onImageUpload }) => (
                  <div
                    onClick={() => {
                      onImageUpload();
                    }}
                  >
                    <button type="button" className="">
                      browse from your device
                    </button>
                  </div>
                )}
              </ImageUploading>
              {/* {formik.errors[checkErrorName(data.id)] ? (
                    <p className="error">
                      {formik.errors[checkErrorName(item.id)]}
                    </p>
                  ) : null} */}
            </label>
          </div>
        </Fragment>
      );
    } else if (data.type === "CONSENT") {
      return (
        <Fragment>
          <div
            className={
              data.layoutGridColumnSpan === 6
                ? "form-group  col-lg-6 col-md-12"
                : "form-group col-12"
            }
          >
            <label>
              <div className="label">
                {data.label}{" "}
                {data.isRequired && <span className="require">*</span>}
              </div>
              <div className="consent-checkbox">
                <input
                  id={data.id}
                  type="checkbox"
                  name={checkName(data.id)}
                  onChange={(e) => handleFieldTextChange(e)}
                  placeholder={data.label}
                />
                <span>{data.checkboxLabel}</span>
              </div>
              {/* {formik.errors[checkErrorName(data.id)] ? (
                <p className="error">
                {formik.errors[checkErrorName(item.id)]}
                </p>
              ) : null} */}
            </label>
            <p>{data.description}</p>
          </div>
        </Fragment>
      );
    }else if(data.type === "EMAIL") {
      return (
        <Fragment>
          <div
            className={
              data.layoutGridColumnSpan === 6
                ? "form-group  col-lg-6 col-md-12"
                : "form-group col-12"
            }
          >
            <label>
              <div className="label">
                {data.label}{" "}
                {data.isRequired && <span className="require">*</span>}
              </div>
              <input
                id={data.id}
                type="email"
                name={checkName(data.id)}
                onChange={(e) => handleFieldTextChange(e)}
                placeholder={data.label}
              />
              {/* {formik.errors[checkErrorName(data.id)] ? (
                    <p className="error">
                      {formik.errors[checkErrorName(item.id)]}
                    </p>
                  ) : null} */}
            </label>
          </div>
        </Fragment>
      );
    }
  };
  return (
    <Fragment>
      <div className="form-component-wrapper">{renderForm(item)}</div>
    </Fragment>
  );
}

export default FormComponent;
