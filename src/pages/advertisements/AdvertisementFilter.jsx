import React, { useState,useEffect } from "react";
import "./AdvertisementFilter.css"
import { Form, Dropdown, Checkbox, Button, Menu } from 'semantic-ui-react'
import JobPositionService from "../../services/jobPositionService";
import CompanyService from "../../services/companyService";

export default function AdvertisementFilter() {

  const [jobPositions, setJobPositions] = useState([]);

  const [companies, setCompanies] = useState([]);
  

  useEffect(() => {
    let jobPositionService = new JobPositionService()
    jobPositionService.getAll().then(result => setJobPositions(result.data.data))

    let companyService = new CompanyService();
    companyService.getAll().then(result => setCompanies(result.data.data))
  })

  const jobPositionOptions = jobPositions.map((jobPosition) => ({
    key: jobPosition.id,
    text: jobPosition.position,
    value: jobPosition.id,  
  }))

  const companyOptions = companies.map((company) => ({
    key: company.id,
    text: company.companyName,
    value: company.id,  
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
        <Dropdown placeholder='Company' search selection options={companyOptions}/>
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
