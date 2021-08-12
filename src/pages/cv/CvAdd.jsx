import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dropdown,
  FormField,
  FormGroup,
  Header,
  Icon,
  Image,
  Input,
  Label,
  Segment,
} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CvAdd.css";

export default function CvAdd() {
  const [, setEdcEntryDate] = useState(new Date());
  const [, setEdcLeavingDate] = useState(new Date());
  const [, setExpEntryDate] = useState(new Date());
  const [, setExpLeavingDate] = useState(new Date());
  const [uploadedImage,setUploadedImage] = useState();
  const [uploadedImageSrc,setUploadedImageSrc] = useState();

  const fileInputRef = React.createRef();

 const fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    setUploadedImage(event.target.files[0]);
    var reader = new FileReader();
    reader.onloadend = (e) => {
    setUploadedImageSrc(reader.result);
    } 
  }

  const fileUploadHandler = () => {

  }

  const initialValues = {
    educationList: [""],
    experienceList: [""],
    languageList: [""],
    technologyStackList: [""],
    socialMediaDetails: {
      linkedinUrl: "",
      githubUrl: "",
    },
  };

  const schema = Yup.object({
    educationList: Yup.array().of(
      Yup.object().shape({
        school: {
          name: Yup.string(),
        },
        department: {
          name: Yup.string(),
        },
        entryYear: Yup.date(),
        graduateYear: Yup.date(),
      })
    ),
    experienceList: Yup.array().of(
      Yup.object().shape({
        company: {
          name: Yup.string(),
        },
        position: {
          name: Yup.string(),
        },
        entryYear: Yup.date(),
        leavingYear: Yup.date(),
      })
    ),
    languageList: Yup.array().of(
      Yup.object().shape({
        language: {
          language: Yup.string(),
        },
        languageLevel: {
          level: Yup.number().min(1).max(5),
        },
      })
    ),
    technologyStackList: Yup.array().of(
      Yup.object().shape({
        technologyStack: {
          technologyname: Yup.string(),
        },
      })
    ),
    socialMediaDetails: {
      linkedinUrl: Yup.string(),
      githubUrl: Yup.string(),
    },
  });
  return (
    <div>
      <Formik initialValues={initialValues} schema={schema}>
        <Form className="ui form">
          <Header as="h2" icon textAlign="center">
            <Icon name="file alternate outline" circular />
            <Header.Content>My CV</Header.Content>
          </Header>
          <FormGroup widths="equal">
            <FormField width="10">
              <textarea
                name="coverLetter"
                placeholder="Cover Letter"
              ></textarea>
            </FormField>
            <FormField width="1">
              <Button
                content="Choose Image"
                labelPosition="bottom"
                icon="image"
                onClick={() => fileInputRef.current.click()}
              />
              <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={fileSelectedHandler}
              />
              <Image src={uploadedImageSrc} size='small' />
            </FormField>
          </FormGroup>
          <Segment>
            <Label as="a" color="red" ribbon>
              Education
            </Label>
            <FieldArray name="educationList">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { educationList } = values;
                return (
                  <div>
                    {educationList.map((education, index) => (
                      <div key={index}>
                        <FormGroup widths="equal">
                          <FormField>
                            <input
                              name={`educationList[${index}]`}
                              placeholder="School"
                            ></input>
                          </FormField>
                          <FormField>
                            <input
                              name={`educationList[${index}]`}
                              placeholder="Department"
                            ></input>
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`educationList[${index}]`}
                              placeholderText="Entry Date"
                              onChange={(date) => setEdcEntryDate(date)}
                            />
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`educationList[${index}]`}
                              placeholderText="Graduate Date"
                              onChange={(date) => setEdcLeavingDate(date)}
                            />
                          </FormField>
                          {index > 0 && (
                            <Button
                              floated="right"
                              onClick={() => remove(index)}
                            >
                              -
                            </Button>
                          )}
                          {index < 1 && (
                            <Button floated="left" onClick={() => push("")}>
                              +
                            </Button>
                          )}
                        </FormGroup>
                      </div>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
          </Segment>
          <Segment>
            <Label as="a" color="blue" ribbon>
              Experience
            </Label>
            <FieldArray name="experienceList">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { experienceList } = values;
                return (
                  <div>
                    {experienceList.map((experience, index) => (
                      <div key={index}>
                        <FormGroup widths="equal">
                          <FormField>
                            <input
                              name={`experienceList[${index}]`}
                              placeholder="Company"
                            ></input>
                          </FormField>
                          <FormField>
                            <input
                              name={`experienceList[${index}]`}
                              placeholder="Position"
                            ></input>
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`experienceList[${index}]`}
                              placeholderText="Entry Date"
                              onChange={(date) => setExpEntryDate(date)}
                            />
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`experienceList[${index}]`}
                              placeholderText="Leaving Date"
                              onChange={(date) => setExpLeavingDate(date)}
                            />
                          </FormField>
                          {index > 0 && (
                            <Button
                              floated="right"
                              onClick={() => remove(index)}
                            >
                              -
                            </Button>
                          )}
                          {index < 1 && (
                            <Button floated="left" onClick={() => push("")}>
                              +
                            </Button>
                          )}
                        </FormGroup>
                      </div>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
          </Segment>
          <Segment>
            <Label as="a" color="orange" ribbon>
              Language
            </Label>
            <FieldArray name="languageList">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { languageList } = values;
                return (
                  <div>
                    {languageList.map((language, index) => (
                      <div key={index}>
                        <FormGroup widths="equal">
                          <FormField>
                            <input
                              name={`languageList[${index}]`}
                              placeholder="Language"
                            ></input>
                          </FormField>
                          <FormField>
                            <Dropdown
                              name={`languageList[${index}]`}
                              fluid
                              selection
                              placeholder="Level"
                            >
                              <Dropdown.Menu>
                                <Dropdown.Item text="1" />
                                <Dropdown.Item text="2" />
                                <Dropdown.Item text="3" />
                                <Dropdown.Item text="4" />
                                <Dropdown.Item text="5" />
                              </Dropdown.Menu>
                            </Dropdown>
                          </FormField>
                          {index > 0 && (
                            <Button
                              floated="right"
                              onClick={() => remove(index)}
                            >
                              -
                            </Button>
                          )}
                          {index < 1 && (
                            <Button floated="left" onClick={() => push("")}>
                              +
                            </Button>
                          )}
                        </FormGroup>
                      </div>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
          </Segment>
          <Segment>
            <Label as="a" color="teal" ribbon>
              Technology
            </Label>
            <FieldArray name="technologyStackList">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { technologyStackList } = values;
                return (
                  <div>
                    {technologyStackList.map((technologyStack, index) => (
                      <div key={index}>
                        <FormGroup widths="equal">
                          <FormField>
                            <input
                              name={`technologyStackList[${index}]`}
                              placeholder="Technology"
                            ></input>
                          </FormField>
                          {index > 0 && (
                            <Button
                              floated="right"
                              onClick={() => remove(index)}
                            >
                              -
                            </Button>
                          )}
                          {index < 1 && (
                            <Button floated="left" onClick={() => push("")}>
                              +
                            </Button>
                          )}
                        </FormGroup>
                      </div>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
          </Segment>
          <Segment>
            <Label as="a" color="purple" ribbon>
              Social Media
            </Label>
            <FormGroup widths="equal">
              <FormField>
                <Input
                  name="socialMediaDetails.linkedinUrl"
                  placeholder="Linkedin"
                  icon="linkedin"
                />
              </FormField>
              <FormField>
                <Input
                  name="socialMediaDetails.githubUrl"
                  placeholder="Github"
                  icon="github"
                />
              </FormField>
            </FormGroup>
          </Segment>
          <Button primary fluid>
            Save CV
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
