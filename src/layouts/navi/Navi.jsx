import React from "react";
import { Link } from "react-router-dom";
import { Menu, Segment, Dropdown, Container } from "semantic-ui-react";
import "./Navi.css";


export default function Navi() {
  return (
    <div>
      <Segment color="blue" inverted>
        <Container>
          <Menu color="blue" inverted secondary size="large">
            <Menu.Menu position="left">
              <Link to="/">
                <Menu.Item icon="home" name="home" />
              </Link>

              <Link to="/advertisements">
                <Menu.Item name="Advertisements" />
              </Link>
            </Menu.Menu>
            <Menu.Menu position="right">
              <Link to="/cv/add">
                
                <Menu.Item icon="file alternate outline" name="Add CV" />
              </Link>
              <Dropdown item text="Profile">
                <Dropdown.Menu>
                  <Dropdown.Item>Details</Dropdown.Item>
                  <Dropdown.Item>My CV</Dropdown.Item>
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Menu>
        </Container>
      </Segment>
    </div>
  );
}
