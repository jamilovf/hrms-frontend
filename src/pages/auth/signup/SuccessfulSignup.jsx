import React from 'react'
import { Container, Header, Icon } from 'semantic-ui-react'
import "./SuccessfulSignup.css"

export default function SuccessfulSignup() {

    return (
        <div>
      
            <Container text>
            <Icon name="check circle outline" size="massive"/>
    <Header
      as='h1'
      content='Registration completed successfully'
      inverted
    />
    <Header
      as='h2'
      content='Please, check your registered email for email verification'
      inverted
    />
  </Container>
        </div>
    )
}
