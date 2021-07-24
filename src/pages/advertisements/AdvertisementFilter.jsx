import React, { useState,useEffect } from "react";
import "./AdvertisementFilter.css"
import { Form, Dropdown, Checkbox, Button, Menu } from 'semantic-ui-react'
import JobPositionService from "../../services/jobPositionService";

export default function AdvertisementFilter() {

  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    let jobPositionService = new JobPositionService()
    jobPositionService.getAll().then(result => setJobPositions(result.data.data))
  })

  const jobPositionOptions = jobPositions.map((jobPosition) => ({
    key: jobPosition.id,
    text: jobPosition.position,
    value: jobPosition.id,  
  }))

  return (
    <div>
        <Menu>
         <Menu.Item>
      <Form>
        <Form.Field inline>
        <Dropdown placeholder='City' search selection/>
        </Form.Field>
        <Form.Field inline>
        <Dropdown placeholder='Job Position' search selection options={jobPositionOptions}/>
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
