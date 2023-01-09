import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loginUser = async (values, resetForm) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch(
      "http://localhost:4000/resetPassword",
      requestOptions
    );
    const data = await response.json();

    if (data.msg === "Password updated") {
      // alert("login success");
      navigate("/login");
    }
  };
  const SignupSchema = Yup.object().shape({
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "password doesnot match"),
  });
  return (
    <section>
      <div className="container">
        <div className="form">
          <h1>Reset Password</h1>

          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { resetForm }) => {
              loginUser(values);
              resetForm();
            }}
          >
            {({
              errors,
              touched,
              values,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="input_wrap">
                  <i onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </i>

                  <Field
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></Field>
                </div>
                {errors.password && touched.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}

                <div className="input_wrap">
                  <i onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </i>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className="error">{errors.confirmPassword} </div>
                ) : null}

                <Button
                  sx={{ m: 3 }}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};
export default ForgotPassword;
