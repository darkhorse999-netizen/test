import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../../modules/auth";
import { getUserByToken, login } from "../../modules/auth/core/_requests";
import { toAbsoluteUrl } from "../../../_metronic/helpers";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const initialValues = {
  email: "admin@demo.com",
  password: "demo",
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setTimeout(() => {
        saveAuth(undefined);
        setCurrentUser({
          id: 1,
          username: "test",
          password: "213123",
          email: "test@gmail.com",
          first_name: "test",
          last_name: "test",
        });
        setSubmitting(false);
        setLoading(false);
      }, 1000);
      try {
        const { data: auth } = await login(values.email, values.password);
        saveAuth(auth);
        const { data: user } = await getUserByToken(auth.api_token);
        setCurrentUser(user);
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus("The login details are incorrect");
        setSubmitting(false);
        setLoading(false);
      }
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
              className="form w-100"
              onSubmit={formik.handleSubmit}
              noValidate
              id="kt_login_signin_form"
            >
              {/* begin::Heading */}
              <div className="text-center mb-11">
                <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1>
                <div className="text-gray-500 fw-semibold fs-6">
                  Your Social Campaigns
                </div>
              </div>
              {/* begin::Heading */}

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
                      src={toAbsoluteUrl(
                        "/media/svg/brand-logos/google-icon.svg"
                      )}
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
                      src={toAbsoluteUrl(
                        "/media/svg/brand-logos/apple-black.svg"
                      )}
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

              {/* begin::Separator */}
              <div className="separator separator-content my-14">
                <span className="w-125px text-gray-500 fw-semibold fs-7">
                  Or with email
                </span>
              </div>
              {/* end::Separator */}

              {/* begin::Form group */}
              <div className="fv-row mb-8">
                <label className="form-label fs-6 fw-bolder text-gray-900">
                  Email
                </label>
                <input
                  placeholder="Email"
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
                  type="email"
                  name="email"
                  autoComplete="off"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="fv-plugins-message-container">
                    <span role="alert">{formik.errors.email}</span>
                  </div>
                )}
              </div>
              {/* end::Form group */}

              {/* begin::Form group */}
              <div className="fv-row mb-3">
                <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
                  Password
                </label>
                <input
                  type="password"
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
              {/* end::Form group */}

              {/* begin::Wrapper */}
              <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                <div />

                {/* begin::Link */}
                <Link to="/auth/forgot-password" className="link-primary">
                  Forgot Password ?
                </Link>
                {/* end::Link */}
              </div>
              {/* end::Wrapper */}

              {/* begin::Action */}
              <div className="d-grid mb-10">
                <button
                  type="submit"
                  id="kt_sign_in_submit"
                  className="btn btn-primary"
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {!loading && (
                    <span className="indicator-label">Continue</span>
                  )}
                  {loading && (
                    <span
                      className="indicator-progress"
                      style={{ display: "block" }}
                    >
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  )}
                </button>
              </div>
              {/* end::Action */}

              <div className="text-gray-500 text-center fw-semibold fs-6">
                Not a Member yet?{" "}
                <Link to="/auth/registration" className="link-primary">
                  Sign up
                </Link>
              </div>
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
