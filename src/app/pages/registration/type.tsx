import { useState, useEffect } from "react";
import { Form, Formik, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useAuth } from "../../modules/auth";
import {
  ICreateAccount,
  createAccountSchemas,
  inits,
} from "../../modules/wizards/components/CreateAccountWizardHelper";
import { Step1 } from "../../modules/wizards/components/steps/Step1";
import { KTIcon } from "../../../_metronic/helpers";

export function RegistrationTypes({ onContinued }: { onContinued: any }) {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0]);
  const [initValues] = useState<ICreateAccount>(inits);

  const submitStep = (values: ICreateAccount, actions: FormikValues) => {
    setCurrentSchema(createAccountSchemas[0]);
  };

  return (
    <div className="d-flex flex-row-fluid flex-center bg-body rounded">
      <Formik
        validationSchema={currentSchema}
        initialValues={initValues}
        onSubmit={submitStep}
      >
        {() => (
          <Form
            className="py-20 w-100 w-xl-700px px-9"
            noValidate
            id="kt_create_account_form"
          >
            <Step1 />
            <div className="d-flex flex-end pt-10">
              <button
                type="submit"
                className="btn btn-lg btn-primary me-3"
                onClick={() => onContinued()}
              >
                <span className="indicator-label">
                  {"Continue"}
                  <KTIcon iconName="arrow-right" className="fs-3 ms-2 me-0" />
                </span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
