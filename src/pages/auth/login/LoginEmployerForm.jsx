import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from '../../../img/login-logo-employer.png'
import "./LoginForm.css";

export default function LoginEmployerForm() {
    return (
        <div>
  <Grid textAlign='center' verticalAlign='middle'>
    <Grid.Column style={{ width: 500 }}>
      <Header as='h2' color='blue' textAlign='center'>
      <Image size='massive' src={logo}/>   Log-in as Employer
      </Header>
      <Form size='large'>
        <Segment >
          <Form.Input size='large' fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            size='large'
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button color='blue' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? Sign Up
      </Message>
    </Grid.Column>
  </Grid>
  </div>
)       
}