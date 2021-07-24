import React from "react";
import { Form, Input, Dropdown, Checkbox, Button, Menu } from 'semantic-ui-react'

export default function AdvertisementFilter() {
  return (
    <div>
        <Menu>
        <Menu.Item>
      <Form>
        <Form.Field inline>
          <Input placeholder="City"/>
        </Form.Field>
        <Form.Field inline>
        <Dropdown placeholder='Company' search selection/>
        </Form.Field>
        <Form.Field inline>
        <Checkbox label='Part-time' />
        <Checkbox label='Full-time' />
        </Form.Field>
        <Button
        size='large'
            content='Filter'
            primary
          />
      </Form>
      </Menu.Item>
      </Menu>
    </div>
  );
}
