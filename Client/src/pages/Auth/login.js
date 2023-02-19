import React, { useState, useRef, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import "./auth.css";
import { setUserDetails } from "../../reducers/userSlice";

const Login = () => {
  const { name, _id } = useSelector((state) => state.user);
  console.log(name);
  console.log(_id);

  const dispatch = useDispatch();
  const focusRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loginUser = async (values, resetForm) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/login`,
        requestOptions
      );
      const data = await response.json();
      if (response.status === 200) {
        alert("login success");
        navigate("/chat");
        data.userDetails.token = data.token;
        dispatch(setUserDetails(data.userDetails));
      } else {
        alert("Invalid email or password.");
      }
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  };

  useEffect(() => {
    // console.log(focusRef.current);
    focusRef.current.focus();
  }, []);

  const SignupSchema = Yup.object().shape({
    password: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <section>
      <div className="container">
        <div className="form">
          <h1 className="welcome">Welcome back</h1>
          {/* {"you are: " + name} */}
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
                  className="input-field"
                  name="email"
                  placeholder="Enter Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  innerRef={focusRef}
                />

                {errors.email && touched.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}

                <div className="input_wrap">
                  <i
                    className="eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
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

                {/* <p>
                  <Link to="/ForgotPassword">Forgot your password?</Link>
                </p> */}

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
