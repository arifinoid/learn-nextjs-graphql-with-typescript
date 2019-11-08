import React from "react";
import { Formik, Field } from "formik";

import Layout from "../components/Layout";
import { InputField } from "../components/fields/InputField";
import { RegisterComponent } from "../generated/apolloComponents";

const register = () => {
  return (
    <Layout title="Register page">
      <RegisterComponent>
        {(
          register: (arg0: {
            variables: {
              data: {
                firstName: string;
                lastName: string;
                email: string;
                password: string;
              };
            };
          }) => void
        ) => (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: ""
            }}
            onSubmit={async (data, { setErrors }) => {
              try {
                const response = await register({ variables: { data } });

                console.log(response);
              } catch (error) {
                const errors: { [key: string]: string } = {};

                error.graphQLErrors[0].extensions.exception.validationErrors.forEach(
                  (validationError: any) => {
                    Object.values(validationError.constraints).forEach(
                      (message: any) => {
                        errors[validationError.property] = message;
                      }
                    );
                  }
                );

                setErrors(errors);
              }
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="firstName"
                  placeholder="firstName"
                  component={InputField}
                />
                <Field
                  name="lastName"
                  placeholder="lastName"
                  component={InputField}
                />
                <Field
                  name="email"
                  placeholder="email"
                  component={InputField}
                />
                <Field
                  name="password"
                  type="password"
                  placeholder="password"
                  component={InputField}
                />
                <button type="submit">submit</button>
              </form>
            )}
          </Formik>
        )}
      </RegisterComponent>
    </Layout>
  );
};

export default register;
