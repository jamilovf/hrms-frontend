import { ErrorMessage,Form,Formik } from "formik";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  FormField,
  Grid,
  Header,
  Image,
  Input,
  Message,
  Segment,
} from "semantic-ui-react";
import * as Yup from "yup";
import logo from "../../../img/login-logo-hr.png";
import FjTextError from "../../../utilities/customFormControls/FjTextError";
import AuthService from "../../../services/authService";
import "./LoginForm.css";

export default function LoginHrForm() {

  let authService = new AuthService();

  let history = useHistory();

  const initialValues = {
    email: "",
    password: "",
  };

  const schema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Please Enter your email"),
    password: Yup.string().required("Please Enter your password")
  });

  const onSubmit = (values) => {
    authService
    .loginUser(values)
    .then(response =>  {
      window.localStorage.setItem("Authorization", response.headers["authorization"])
      history.push({
        pathname: "/advertisements",
    })
    })
  }

  return (
    <div>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ width: 500 }}>
          <Header as="h2" color="blue" textAlign="center">
            <Image size="massive" src={logo} /> Log-in as System Personnel
          </Header>
          <Formik    
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={onSubmit}
            enableReinitialize
          >
         { formik => {
           return(
 <Form className="ui form" size="large">
              <Segment>
                <FormField>
                  <Input
                    size="large"
                    fluid
                    icon="user"
                    iconPosition="left"
                    name="email"
                    placeholder="E-mail address"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </FormField>
                <ErrorMessage name='email' component={FjTextError}></ErrorMessage>
                <FormField >
                  <Input
                    size="large"
                    fluid
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </FormField>
                <ErrorMessage name='password' component={FjTextError}></ErrorMessage>
                <Link className="forgotPassword">Forgot Password?</Link>
                <Button type="submit" color="blue" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>)
}}
          </Formik>
          <Message>
            New to us? <Link to="/auth/signup/hr">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}
