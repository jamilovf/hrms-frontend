import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu, Segment } from 'semantic-ui-react'

export default function HomeNavi() {
    return (
        <div>
             <Segment color="blue" inverted>
        <Container>
          <Menu color="blue" inverted secondary size="large">
            <Menu.Menu position="left">
              <Link to="/">
                <Menu.Item icon="home" name="home" />
              </Link>
            </Menu.Menu>
            <Menu.Menu position="right">
              <Link to="/cv/add">
                {" "}
                <Menu.Item icon="file alternate outline" name="Sign in" />
              </Link>
              <Link to="/cv/add">
                {" "}
                <Menu.Item icon="file alternate outline" name="Sign up" />
              </Link>
            </Menu.Menu>
          </Menu>
        </Container>
      </Segment>
        </div>
    )
}
