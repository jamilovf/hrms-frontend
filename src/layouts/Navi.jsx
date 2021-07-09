import React from 'react'
import { Menu, Segment, Dropdown, Label} from 'semantic-ui-react'





export default function Navi() {
    return (
        <div>
      <Segment color='blue' inverted >
        <Menu color="blue"  inverted secondary>
      <Label color='blue' size='massive'>
        FJ HRMS
      </Label>
        <Menu.Menu position='right'>
          <Menu.Item
            name='home'
          />
          <Menu.Item
            name='Advertisements'
          />
          <Dropdown item text='Profile'>
            <Dropdown.Menu>
              <Dropdown.Item>Details</Dropdown.Item>
              <Dropdown.Item>My CV</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Menu.Menu>
        </Menu>
      </Segment>
        </div>
    )
}
