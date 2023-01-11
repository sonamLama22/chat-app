import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  // const { name } = useSelector((state) => state.username);
  // console.log(name);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loginUser = async (values, resetForm) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch("http://localhost:4000/login", requestOptions);
    const data = await response.json();

    if (data.msg === "login success") {
      // alert("login success");
      navigate("/chat");
    } else {
      alert("Invalid email or password.");
    }
  };
  const SignupSchema = Yup.object().shape({
    password: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  return (
    <section>
      <div className="container">
        <div className="form">
          <h1>Welcome back</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
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
                <Field
                  name="email"
                  placeholder="Enter Email"
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

                <p>
                  <Link to="/ForgotPassword">Forgot your password?</Link>
                </p>

                <Button
                  sx={{ m: 3 }}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Log In
                </Button>
              </Form>
            )}
          </Formik>
          <p style={{ marginTop: "10px" }}>
            Dont have an account? <Link to="/register">Signup</Link> here
          </p>
        </div>
      </div>
    </section>
  );
};
export default Login;
