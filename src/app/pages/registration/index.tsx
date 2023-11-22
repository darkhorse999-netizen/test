import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { RegistrationTypes } from "./type";
import { RegistrationDetails } from "./details";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { StepperComponent } from "../../../_metronic/assets/ts/components";

export function Registration() {
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const [stepCounter, setStepCounter] = useState(1);
  const [stepper, setStepper] = useState<StepperComponent | null>(null);

  const loadStepper = () => {
    setStepper(
      StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
    );
  };

  const prevStep = () => {
    if (!stepper) {
      return;
    }

    setStepCounter(stepCounter - 1);
    stepper.goPrev();
  };

  const nextStep = () => {
    if (!stepper) {
      return;
    }

    setStepCounter(stepCounter + 1);
    stepper.goNext();
  };

  useEffect(() => {
    if (!stepperRef.current) {
      return;
    }

    loadStepper();
  }, [stepperRef]);

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
          <div
            ref={stepperRef}
            className="stepper stepper-pills stepper-column d-flex flex-column"
            id="kt_create_account_stepper"
          >
            {/* begin::Aside*/}
            <div className="card d-flex justify-content-center flex-row-auto w-100 w-xl-300px w-xxl-400px bg-transparent border-0">
              {/* begin::Wrapper*/}
              <div className="d-flex flex-center justify-content-center card-body px-6 px-lg-10 px-xxl-15">
                {/* begin::Nav*/}
                <div className="stepper-nav">
                  {/* begin::Step 1*/}
                  <div
                    className="stepper-item current"
                    data-kt-stepper-element="nav"
                  >
                    {/* begin::Wrapper*/}
                    <div className="stepper-wrapper">
                      {/* begin::Icon*/}
                      <div className="stepper-icon w-40px h-40px">
                        <i className="stepper-check fas fa-check"></i>
                        <span className="stepper-number">1</span>
                      </div>
                      {/* end::Icon*/}

                      {/* begin::Label*/}
                      <div className="stepper-label">
                        <h3 className="stepper-title">Account Type</h3>

                        <div className="stepper-desc fw-semibold">
                          Select your account type
                        </div>
                      </div>
                      {/* end::Label*/}
                    </div>
                    {/* end::Wrapper*/}

                    {/* begin::Line*/}
                    <div className="stepper-line h-40px"></div>
                    {/* end::Line*/}
                  </div>
                  {/* end::Step 1*/}

                  {/* begin::Step 2*/}
                  <div className="stepper-item" data-kt-stepper-element="nav">
                    {/* begin::Wrapper*/}
                    <div className="stepper-wrapper">
                      {/* begin::Icon*/}
                      <div className="stepper-icon w-40px h-40px">
                        <i className="stepper-check fas fa-check"></i>
                        <span className="stepper-number">2</span>
                      </div>
                      {/* end::Icon*/}

                      {/* begin::Label*/}
                      <div className="stepper-label">
                        <h3 className="stepper-title">Account Details</h3>
                        <div className="stepper-desc fw-semibold">
                          Add your personal info
                        </div>
                      </div>
                      {/* end::Label*/}
                    </div>
                    {/* end::Wrapper*/}

                    {/* begin::Line*/}
                    <div className="stepper-line h-40px"></div>
                    {/* end::Line*/}
                  </div>
                  {/* end::Step 2*/}

                  {/* begin::Step 3*/}
                  <div className="stepper-item" data-kt-stepper-element="nav">
                    {/* begin::Wrapper*/}
                    <div className="stepper-wrapper">
                      {/* begin::Icon*/}
                      <div className="stepper-icon w-40px h-40px">
                        <i className="stepper-check fas fa-check"></i>
                        <span className="stepper-number">3</span>
                      </div>
                      {/* end::Icon*/}

                      {/* begin::Label*/}
                      <div className="stepper-label">
                        <h3 className="stepper-title">Creator Info</h3>
                        <div className="stepper-desc fw-semibold">
                          Setup your business details
                        </div>
                      </div>
                      {/* end::Label*/}
                    </div>
                    {/* end::Wrapper*/}

                    {/* begin::Line*/}
                    <div className="stepper-line h-40px"></div>
                    {/* end::Line*/}
                  </div>
                  {/* end::Step 3*/}

                  {/* begin::Step 4*/}
                  <div className="stepper-item" data-kt-stepper-element="nav">
                    {/* begin::Wrapper*/}
                    <div className="stepper-wrapper">
                      {/* begin::Icon*/}
                      <div className="stepper-icon w-40px h-40px">
                        <i className="stepper-check fas fa-check"></i>
                        <span className="stepper-number">4</span>
                      </div>
                      {/* end::Icon*/}

                      {/* begin::Label*/}
                      <div className="stepper-label">
                        <h3 className="stepper-title">Completed</h3>
                        <div className="stepper-desc fw-semibold">
                          Your account is created
                        </div>
                      </div>
                      {/* end::Label*/}
                    </div>
                    {/* end::Wrapper*/}
                  </div>
                  {/* end::Step 4*/}
                </div>
                {/* end::Nav*/}
              </div>
              {/* end::Wrapper*/}
            </div>
            {/* begin::Aside*/}
          </div>
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
            {stepCounter === 1 ? (
              <RegistrationTypes onContinued={() => nextStep()} />
            ) : (
              <RegistrationDetails />
            )}
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}
      </div>
      {/* end::Body */}
    </div>
  );
}
