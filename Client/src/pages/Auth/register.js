import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
// import ShowhidePassword from "../../component/showhidePassword";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (values) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/register`,
      requestOptions
    );
    const data = await response.json();

    if (data) {
      //   console.log(data);
      //   message.success(data.msg);
      alert(data.msg);
      navigate("/");
    }
  };

  const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be 6 characters long")
      .matches(passwordRule, "Please create a stronger password"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "password doesnot match"),
  });

  return (
    <section className="form_section">
      <div className="container">
        <div className="form">
          <h1 className="welcome">Create an account</h1>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              registerUser(values);
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
                <Field
                  className="input-field"
                  name="name"
                  placeholder="Enter your name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <div className="error">{errors.name}</div>
                ) : null}

                <Field
                  className="input-field"
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <div className="error">{errors.email}</div>
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
                    className="input-field"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
                    className="input-field"
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
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
          <p style={{ marginTop: "10px" }}>
            Already have an account? Please <Link to="/">Login</Link> to
            continue
          </p>
        </div>
      </div>
    </section>
  );
};
export default Register;
