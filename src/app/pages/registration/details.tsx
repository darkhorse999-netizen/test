import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useAuth } from "../../modules/auth";
import { getUserByToken, register } from "../../modules/auth/core/_requests";
import { PasswordMeterComponent } from "../../../_metronic/assets/ts/components";
import { toAbsoluteUrl } from "../../../_metronic/helpers";

const initialValues = {
  firstname: "",
  lastname: "",
  creatorname: "",
  phonenumber: "",
  email: "",
  password: "",
  changepassword: "",
  acceptTerms: false,
};

const registrationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("First name is required"),
  creatorname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Creator name is required"),
  phonenumber: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  lastname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Last name is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
  changepassword: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password")], "Password and Confirm Password didn't match"),
  acceptTerms: Yup.bool().required("You must accept the terms and conditions"),
});

export function RegistrationDetails() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const { data: auth } = await register(
          values.email,
          values.firstname,
          values.lastname,
          values.password,
          values.changepassword
        );
        saveAuth(auth);
        const { data: user } = await getUserByToken(auth.api_token);
        setCurrentUser(user);
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus("The registration details is incorrect");
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    PasswordMeterComponent.bootstrap();
  }, []);

  return (
    <div className="d-flex flex-row-fluid flex-center bg-body rounded">
      <form
        className="form fv-plugins-bootstrap5 fv-plugins-framework"
        noValidate
        id="kt_login_signup_form"
        onSubmit={formik.handleSubmit}
      >
        {/* begin::Heading */}
        <div className="text-center mb-11">
          {/* begin::Title */}
          <h1 className="text-gray-900 fw-bolder mb-3">Account Details</h1>
          {/* end::Title */}

          <div className="text-gray-500 fw-semibold fs-6">
            Add your personal info
          </div>
        </div>
        {/* end::Heading */}

        {/* begin::Login options */}
        <div className="row g-3 mb-9">
          {/* begin::Col */}
          <div className="col-md-6">
            {/* begin::Google link */}
            <a
              href="#"
              className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
            >
              <img
                alt="Logo"
                src={toAbsoluteUrl("/media/svg/brand-logos/google-icon.svg")}
                className="h-15px me-3"
              />
              Sign in with Google
            </a>
            {/* end::Google link */}
          </div>
          {/* end::Col */}

          {/* begin::Col */}
          <div className="col-md-6">
            {/* begin::Google link */}
            <a
              href="#"
              className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
            >
              <img
                alt="Logo"
                src={toAbsoluteUrl("/media/svg/brand-logos/apple-black.svg")}
                className="theme-light-show h-15px me-3"
              />
              <img
                alt="Logo"
                src={toAbsoluteUrl(
                  "/media/svg/brand-logos/apple-black-dark.svg"
                )}
                className="theme-dark-show h-15px me-3"
              />
              Sign in with Apple
            </a>
            {/* end::Google link */}
          </div>
          {/* end::Col */}
        </div>
        {/* end::Login options */}

        <div className="separator separator-content my-14">
          <span className="w-125px text-gray-500 fw-semibold fs-7">
            Or with email
          </span>
        </div>

        {formik.status && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}

        {/* begin::Form group Firstname */}
        <div className="row mb-8">
          <div className="col-md-6 fv-row">
            <input
              placeholder="First name"
              type="text"
              autoComplete="off"
              {...formik.getFieldProps("firstname")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.firstname && formik.errors.firstname,
                },
                {
                  "is-valid":
                    formik.touched.firstname && !formik.errors.firstname,
                }
              )}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.firstname}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
          <div className="col-md-6 fv-row">
            {/* begin::Form group Lastname */}
            <input
              placeholder="Last name"
              type="text"
              autoComplete="off"
              {...formik.getFieldProps("lastname")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.lastname && formik.errors.lastname,
                },
                {
                  "is-valid":
                    formik.touched.lastname && !formik.errors.lastname,
                }
              )}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.lastname}</span>
                </div>
              </div>
            )}
            {/* end::Form group */}
          </div>
        </div>

        <div className="fv-row mb-8">
          {/* begin::Form group Lastname */}
          <input
            placeholder="Creator Name"
            type="text"
            autoComplete="off"
            {...formik.getFieldProps("creatorname")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.creatorname && formik.errors.creatorname,
              },
              {
                "is-valid":
                  formik.touched.creatorname && !formik.errors.creatorname,
              }
            )}
          />
          {formik.touched.creatorname && formik.errors.creatorname && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.creatorname}</span>
              </div>
            </div>
          )}
          {/* end::Form group */}
        </div>
        {/* begin::Form group Email */}
        <div className="fv-row mb-8">
          <input
            placeholder="Email"
            type="email"
            autoComplete="off"
            {...formik.getFieldProps("email")}
            className={clsx(
              "form-control bg-transparent",
              { "is-invalid": formik.touched.email && formik.errors.email },
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
        <div className="fv-row mb-8">
          {/* begin::Form group Lastname */}
          <input
            placeholder="Phone Number"
            type="text"
            autoComplete="off"
            {...formik.getFieldProps("phonenumber")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.phonenumber && formik.errors.phonenumber,
              },
              {
                "is-valid":
                  formik.touched.phonenumber && !formik.errors.phonenumber,
              }
            )}
          />
          {formik.touched.phonenumber && formik.errors.phonenumber && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.phonenumber}</span>
              </div>
            </div>
          )}
          {/* end::Form group */}
        </div>
        {/* begin::Form group Password */}
        <div className="fv-row mb-8">
          <div className="position-relative mb-3">
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              {...formik.getFieldProps("password")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.password && formik.errors.password,
                },
                {
                  "is-valid":
                    formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* begin::Form group Confirm password */}
        <div className="fv-row mb-5">
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="off"
            {...formik.getFieldProps("changepassword")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.changepassword && formik.errors.changepassword,
              },
              {
                "is-valid":
                  formik.touched.changepassword &&
                  !formik.errors.changepassword,
              }
            )}
          />
          {formik.touched.changepassword && formik.errors.changepassword && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.changepassword}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className="fv-row mb-8">
          <label
            className="form-check form-check-inline"
            htmlFor="kt_login_toc_agree"
          >
            <input
              className="form-check-input"
              type="checkbox"
              id="kt_login_toc_agree"
              {...formik.getFieldProps("acceptTerms")}
            />
            <span>
              I Accept the{" "}
              <a
                href="https://keenthemes.com/metronic/?page=faq"
                target="_blank"
                className="ms-1 link-primary"
              >
                Terms
              </a>
              .
            </span>
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.acceptTerms}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className="text-center">
          <button
            type="submit"
            id="kt_sign_up_submit"
            className="btn btn-lg btn-primary w-100 mb-5"
            disabled={
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.values.acceptTerms
            }
          >
            {!loading && <span className="indicator-label">Continue</span>}
            {loading && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
          <div className="text-gray-500 text-center fw-semibold fs-6">
            Already have an Account?{" "}
            <Link to="/auth/login" className="link-primary">
              Sign in
            </Link>
          </div>
        </div>
        {/* end::Form group */}
      </form>
    </div>
  );
}
