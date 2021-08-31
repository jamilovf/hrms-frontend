import { ErrorMessage,Form,Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
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
import logo from "../../../img/login-logo-employer.png";
import FjTextError from "../../../utilities/customFormControls/FjTextError";
import "./LoginForm.css";

export default function LoginEmployerForm() {
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
    console.log(values);
  }

  return (
    <div>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ width: 500 }}>
          <Header as="h2" color="blue" textAlign="center">
            <Image size="massive" src={logo} /> Log-in as Employer
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
            New to us? <Link to="/auth/signup/employer">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}
