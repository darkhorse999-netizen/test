import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { requestPassword } from "../../modules/auth/core/_requests";
import { toAbsoluteUrl } from "../../../_metronic/helpers";

const initialValues = {
  email: "admin@demo.com",
};

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
});

export function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setHasErrors(undefined);
      setTimeout(() => {
        requestPassword(values.email)
          .then(() => {
            setHasErrors(false);
            setLoading(false);
          })
          .catch(() => {
            setHasErrors(true);
            setLoading(false);
            setSubmitting(false);
            setStatus("The login detail is incorrect");
          });
      }, 1000);
    },
  });

  return (
    <div className="d-flex flex-row w-100 h-100">
      {/* begin::Aside */}
      <div
        className="d-flex flex-column bgi-size-cover bgi-position-center order-1 order-lg-1 h-100 col-4"
        style={{
          backgroundImage: `url(${toAbsoluteUrl("/media/misc/auth-bg.png")})`,
        }}
      >
        {/* begin::Content */}
        <div className="d-flex flex-column flex-center justify-content-between py-10 px-5 px-md-15 w-100 h-100">
          {/* begin::Logo */}
          <Link to="/" className="mb-12">
            <img
              alt="Logo"
              src={toAbsoluteUrl("/media/logos/custom-1.png")}
              className="h-75px"
            />
          </Link>
          {/* end::Logo */}

          {/* begin::Footer */}
          <div className="d-flex flex-center flex-wrap px-5">
            {/* begin::Links */}
            <div className="d-flex fw-semibold text-primary fs-base">
              <a href="#" className="px-5" target="_blank">
                Terms
              </a>

              <a href="#" className="px-5" target="_blank">
                Plans
              </a>

              <a href="#" className="px-5" target="_blank">
                Contact Us
              </a>
            </div>
            {/* end::Links */}
          </div>
          {/* end::Footer */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}
      {/* begin::Body */}
      <div className="d-flex flex-column p-10 order-2 order-lg-2 h-100 col-8 overflow-auto">
        {/* begin::Form */}
        <div className="d-flex flex-center flex-column flex-lg-row-fluid w-100">
          {/* begin::Wrapper */}
          <div className="w-100 p-10">
            <form
              className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
              noValidate
              id="kt_login_password_reset_form"
              onSubmit={formik.handleSubmit}
            >
              <div className="text-center mb-10">
                {/* begin::Title */}
                <h1 className="text-gray-900 fw-bolder mb-3">
                  Forgot Password ?
                </h1>
                {/* end::Title */}

                {/* begin::Link */}
                <div className="text-gray-500 fw-semibold fs-6">
                  Enter your email to reset your password.
                </div>
                {/* end::Link */}
              </div>

              {/* begin::Title */}
              {hasErrors === true && (
                <div className="mb-lg-15 alert alert-danger">
                  <div className="alert-text font-weight-bold">
                    Sorry, looks like there are some errors detected, please try
                    again.
                  </div>
                </div>
              )}

              {hasErrors === false && (
                <div className="mb-10 bg-light-info p-8 rounded">
                  <div className="text-info">
                    Sent password reset. Please check your email
                  </div>
                </div>
              )}
              {/* end::Title */}

              {/* begin::Form group */}
              <div className="fv-row mb-8">
                <label className="form-label fw-bolder text-gray-900 fs-6">
                  Email
                </label>
                <input
                  type="email"
                  placeholder=""
                  autoComplete="off"
                  {...formik.getFieldProps("email")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid": formik.touched.email && formik.errors.email,
                    },
                    {
                      "is-valid": formik.touched.email && !formik.errors.email,
                    }
                  )}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert">{formik.errors.email}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* end::Form group */}

              {/* begin::Form group */}
              <div className="d-flex flex-wrap justify-content-center pb-lg-0">
                <button
                  type="submit"
                  id="kt_password_reset_submit"
                  className="btn btn-primary me-4"
                >
                  <span className="indicator-label">Submit</span>
                  {loading && (
                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  )}
                </button>
                <Link to="/auth/login">
                  <button
                    type="button"
                    id="kt_login_password_reset_form_cancel_button"
                    className="btn btn-light"
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    Cancel
                  </button>
                </Link>{" "}
              </div>
              {/* end::Form group */}
            </form>
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}
      </div>
      {/* end::Body */}
    </div>
  );
}
