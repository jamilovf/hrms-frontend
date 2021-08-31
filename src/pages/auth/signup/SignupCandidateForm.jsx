import { ErrorMessage,Form,Formik } from "formik";
import React, { useState } from "react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import logo from "../../../img/login-logo-candidate.png";
import FjTextError from "../../../utilities/customFormControls/FjTextError";
import ConvertDate from "../../../utilities/helpers/convertDate";
import AuthService from "../../../services/authService";
import "./SignupForm.css";

export default function SignupCandidateForm() {
  const [birthDate, setBirthDate] = useState();
  const convertDate = new ConvertDate();

  let authService = new AuthService();

  let history = useHistory();

  const initialValues = {
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
    identityNumber: "",
    birthDate: ""
  };

  const schema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Please Enter your email"),
    password: Yup.string().required("Please Enter your password"),
    passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    firstName: Yup.string().required("Please Enter your first name"),
    lastName: Yup.string().required("Please Enter your last name"),
    identityNumber: Yup.string().required("Please Enter your identity number"),
    birthDate: Yup.date().required("Please Enter your birth date")
  });

  const successRedirect = () => {
    history.push({
      pathname: "/auth/signup/success",
  })
  }

  const onSubmit = (values) => {
    authService.registerCandidate(values)
    .then(response => {
      if(response.status === 200){
        successRedirect();
      }
    });
  }
  
  return (
    <div>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ width: 500 }}>
          <Header as="h2" color="blue" textAlign="center">
            <Image size="massive" src={logo} /> Sign up as Candidate
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
                    icon="mail"
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
                <FormField >
                  <Input
                    size="large"
                    fluid
                    icon="lock"
                    iconPosition="left"
                    name="passwordConfirmation"
                    placeholder="Re-type Password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirmation}
                  />
                </FormField>
                <ErrorMessage name='passwordConfirmation' component={FjTextError}></ErrorMessage>
                <FormField >
                  <Input
                    size="large"
                    fluid
                    icon="user"
                    iconPosition="left"
                    name="firstName"
                    placeholder="First name"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                </FormField>
                <ErrorMessage name='firstName' component={FjTextError}></ErrorMessage>
                <FormField >
                  <Input
                    size="large"
                    fluid
                    icon="user"
                    iconPosition="left"
                    name="lastName"
                    placeholder="Last name"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                </FormField>
                <ErrorMessage name='lastName' component={FjTextError}></ErrorMessage>
                <FormField >
                  <Input
                    size="large"
                    fluid
                    icon="id card"
                    iconPosition="left"
                    name="identityNumber"
                    placeholder="Identity №"
                    onChange={formik.handleChange}
                    value={formik.values.identityNumber}
                  />
                </FormField>
                <ErrorMessage name='identityNumber' component={FjTextError}></ErrorMessage>
                <FormField>
                            <DatePicker
                              size="large"
                              fluid
                              name="birthDate"
                              selected={birthDate}
                              placeholderText="Birth Date"
                              dateFormat="yyyy/MM/dd"
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              onChange={ (date) =>{
                                formik.setFieldValue(`birthDate`, convertDate.convertDate(date))
                               setBirthDate(date);
                              }
                              }
                              value={formik.values.birthDate}
                            />
                          </FormField>
                          <ErrorMessage name='birthDate' component={FjTextError}></ErrorMessage>
                <Button type="submit" color="blue" fluid size="large">
                  Sign up
                </Button>
              </Segment>
            </Form>)
}}
          </Formik>
          <Message>
          Already have account? <Link to="/auth/login/candidate">Log-in</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}
