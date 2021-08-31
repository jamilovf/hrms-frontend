import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Menu, Segment } from "semantic-ui-react";
import "./HomeNavi.css";

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
              <Button.Group>
                <Link to="/auth/login"><Button  color="red">Log-in</Button></Link>
                <Button.Or />
                <Link to="/auth/signup"><Button color="yellow">Sign up</Button></Link>
              </Button.Group>
            </Menu.Menu>
          </Menu>
        </Container>
      </Segment>
    </div>
  );
}
