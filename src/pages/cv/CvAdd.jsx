import React, { useState } from "react";
import { Formik, Form, FieldArray, useFormik } from "formik";
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
  const [edcEntryDate, setEdcEntryDate] = useState([]);
  const [edcLeavingDate, setEdcLeavingDate] = useState([]);
  const [expEntryDate, setExpEntryDate] = useState();
  const [expLeavingDate, setExpLeavingDate] = useState();
  const [uploadedImage, setUploadedImage] = useState();
  const [uploadedImageSrc, setUploadedImageSrc] = useState();

  const fileInputRef = React.createRef();

  const fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    setUploadedImage(event.target.files[0]);
    var file = event.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setUploadedImageSrc(reader.result);
    }
  };

  const fileUploadHandler = () => {};


  const initialValues = {
    coverLetter: "",
    educationList: [{
      school: "",
      department: "",
      entryDate: "",
      leavingDate: ""
    }],
    experienceList: [""],
    languageList: [{
      language: "",
      languageLevel: 1
    }],
    technologyStackList: [{
      technology: ""
    }],
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

  const languageLevelOptions = [
    {key: 1, value: 1, text: 1},
    {key: 2, value: 2, text: 2},
    {key: 3, value: 3, text: 3},
    {key: 4, value: 4, text: 4},
    {key: 5, value: 5, text: 5}
  ]

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: values => {
      console.log('Form data', values);
    }
  })

  const handleChangeSemantic = (fieldName, value) => {
    formik.setFieldValue(fieldName, value);
  }

  return (
    <div>
      <Formik initialValues={initialValues} schema={schema} onSubmit={formik.handleSubmit}>
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
                onChange={formik.handleChange}
                value={formik.values.coverLetter}
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
              <Image src={uploadedImageSrc} size="small" />
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
                              name={`educationList.${index}.school`}
                              placeholder="School"
                              onChange={formik.handleChange}
                              value={formik.values.educationList.school}
                            ></input>
                          </FormField>
                          <FormField>
                            <input
                              name={`educationList.${index}.department`}
                              placeholder="Department"
                              onChange={formik.handleChange}
                              value={formik.values.educationList.department}
                            ></input>
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`educationList.${index}.entryDate`}
                              selected={edcEntryDate[edcEntryDate.length-1]}
                              placeholderText="Entry Date"
                              dateFormat="yyyy/MM/dd"
                              onChange={ (date) =>{
                                handleChangeSemantic(`educationList.${index}.entryDate`, date)
                                setEdcEntryDate( dates => [...dates, date])
                                console.log(date);
                              }
                              }
                              value={formik.values.educationList.entryDate}
                            />
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`educationList.${index}.leavingDate`}
                              selected={edcLeavingDate[edcLeavingDate.length-1]}
                              placeholderText="Graduate Date"
                              dateFormat="yyyy/MM/dd"
                              onChange={ (date) =>{
                                handleChangeSemantic(`educationList.${index}.leavingDate`, date)
                                setEdcLeavingDate( dates => [...dates, date])
                                console.log(date);
                              }
                              }
                              value={formik.values.educationList.leavingDate}
                           
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
                              selected={expEntryDate}
                              placeholderText="Entry Date"
                              onChange={(date) => setExpEntryDate(date)}
                            />
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`experienceList[${index}]`}
                              selected={expLeavingDate}
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
                              name={`languageList.${index}.language`}
                              placeholder="Language"
                              onChange={formik.handleChange}
                              value={formik.values.languageList.language}  
                            ></input>
                          </FormField>
                          <FormField>
                            <Dropdown
                              name={`languageList.${index}.languageLevel`}
                              clearable
                              fluid
                              selection
                              placeholder="Level"
                              options={languageLevelOptions}
                              onChange={(event, data) =>
                                handleChangeSemantic(`languageList.${index}.languageLevel`,data.value)
                              }
                              value={formik.values.languageList.languageLevel}
                            >
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
                              name={`technologyStackList.${index}.technology`}
                              placeholder="Technology"
                              onChange={formik.handleChange}
                              value={formik.values.technologyStackList.technology}
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
                  onChange={formik.handleChange}
                  value={formik.values.socialMediaDetails.linkedinUrl}
                />
              </FormField>
              <FormField>
                <Input
                  name="socialMediaDetails.githubUrl"
                  placeholder="Github"
                  icon="github"
                  onChange={formik.handleChange}
                  value={formik.values.socialMediaDetails.githubUrl}
                />
              </FormField>
            </FormGroup>
          </Segment>
          <Button type="submit" primary fluid>
            Save CV
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
