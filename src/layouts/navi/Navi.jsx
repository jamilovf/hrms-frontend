import React from 'react'
import { Menu, Segment, Dropdown, Container} from 'semantic-ui-react'





export default function Navi() {
    return (
        <div>
      <Segment color='blue' inverted >
        <Container>
        <Menu color="blue"  inverted secondary  size='large'>
        <Menu.Menu position='left'>
        <Menu.Item
            icon='home'
            name='home'
          />
       <Menu.Item
            name='Advertisements'
          />
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Dropdown item text='Profile'>
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
    )
}
