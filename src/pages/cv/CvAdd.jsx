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
import ConvertDate from "../../utilities/helpers/convertDate";
import axios from "axios";


export default function CvAdd() {
  const [edcEntryDate,] = useState([]);
  const [edcLeavingDate,] = useState([]);
  const [expEntryDate,] = useState([]);
  const [expLeavingDate,] = useState([]);
  const [uploadedImage, setUploadedImage] = useState();
  const [uploadedImageSrc, setUploadedImageSrc] = useState();
  const convertDate = new ConvertDate();

  const handleChangeSemantic = (fieldName, value) => {
    formik.setFieldValue(fieldName, value);
  }
  

  const initialValues = {
    candidateId : 11,
    coverLetter: "",
    educationList: [{
      school: {
        name: ""
      },
      department: {
        name: ""
      },
      entryDate: "",
      leavingDate: ""
    }],
    experienceList: [{
      company: {
        name: ""
      },
      position: {
        name: ""
      },
      entryDate: "",
      leavingDate: ""
    }],
    languageList: [{
      language: {
        language: "",
      },
      languageLevel: {
        level : 1
      }
    }],
    technologyStackList: [{
      technology: {
        name: ""
      }
    }],
    cvImage: {
      url : ""
    },
    socialMediaDetails: {
      linkedinUrl: "",
      githubUrl: "",
    },
  };



  const schema = Yup.object({
    educationList: Yup.array().of(
      Yup.object().shape({
        school:  Yup.string(),
        department: Yup.string(),
        entryYear: Yup.date(),
        graduateYear: Yup.date(),
      })
    ),
    experienceList: Yup.array().of(
      Yup.object().shape({
        company: Yup.string(),
        position: Yup.string(),
        entryYear: Yup.date(),
        leavingYear: Yup.date(),
      })
    ),
    languageList: Yup.array().of(
      Yup.object().shape({
        language: Yup.string(),
        languageLevel: Yup.number().min(1).max(5),
      })
    ),
    technologyStackList: Yup.array().of(
      Yup.object().shape({
        technologyStack: Yup.string(),
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

  const fileInputRef = React.createRef();

  const fileSelectedHandler = (event) => {
    setUploadedImage(event.target.files[0]);
    var file = event.target.files[0];
    var reader = new FileReader();
    if(file){
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setUploadedImageSrc(reader.result);
    }
    }
  };

  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append("file", uploadedImage);
    formData.append("upload_preset", "suydob0i");
    return formData;
  };

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit:  values => {

     axios.post("https://api.cloudinary.com/v1_1/dobvuvt76/image/upload", fileUploadHandler())
    .then((response) => {
      formik.setFieldValue("cvImage.url",response.data.public_id)
      return formik.values.cvImage.url;
    }).then(() => 
      axios.post("http://localhost:8080/api/cv/add", values).then((response) => console.log(response)));
    }
  })

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
                labelPosition="left"
                icon="image"
                onClick={(e) =>{e.preventDefault(); fileInputRef.current.click()}}
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
                              name={`educationList.${index}.school.name`}
                              placeholder="School"
                              onChange={formik.handleChange}
                              value={formik.values.educationList.name}
                            ></input>
                          </FormField>
                          <FormField>
                            <input
                              name={`educationList.${index}.department.name`}
                              placeholder="Department"
                              onChange={formik.handleChange}
                              value={formik.values.educationList.name}
                            ></input>
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`educationList.${index}.entryDate`}
                              selected={edcEntryDate[index]}
                              placeholderText="Entry Date"
                              dateFormat="yyyy/MM/dd"
                              onChange={ (date) =>{
                                handleChangeSemantic(`educationList.${index}.entryDate`, convertDate.convertDate(date))
                               edcEntryDate[index] = date;
                              }
                              }
                              value={formik.values.educationList.entryDate}
                            />
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`educationList.${index}.leavingDate`}
                              selected={edcLeavingDate[index]}
                              placeholderText="Graduate Date"
                              dateFormat="yyyy/MM/dd"
                              onChange={ (date) =>{
                                handleChangeSemantic(`educationList.${index}.leavingDate`, convertDate.convertDate(date))
                                edcLeavingDate[index] = date
                              }
                              }
                              value={formik.values.educationList.leavingDate}
                            />
                          </FormField>
                          {index > 0 && (
                            <Button
                              floated="right"
                              onClick={(e) => {e.preventDefault(); remove(index)}}
                            >
                              -
                            </Button>
                          )}
                          {index < 1 && (
                            <Button floated="left" onClick={(e) =>{e.preventDefault(); push("")}}>
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
                              name={`experienceList.${index}.company.name`}
                              placeholder="Company"
                              onChange={formik.handleChange}
                              value={formik.values.experienceList.name}
                            ></input>
                          </FormField>
                          <FormField>
                            <input
                              name={`experienceList.${index}.position.name`}
                              placeholder="Position"
                              onChange={formik.handleChange}
                              value={formik.values.experienceList.name}
                            ></input>
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`experienceList.${index}.entryDate`}
                              selected={expEntryDate[index]}
                              placeholderText="Entry Date"
                              dateFormat="yyyy/MM/dd"
                              onChange={ (date) =>{
                                handleChangeSemantic(`experienceList.${index}.entryDate`, convertDate.convertDate(date))
                                expEntryDate[index] = date
                              }
                              }
                              value={formik.values.experienceList.entryDate}
                            />
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`experienceList.${index}.leavingDate`}
                              selected={expLeavingDate[index]}
                              placeholderText="Leaving Date"
                              dateFormat="yyyy/MM/dd"
                              onChange={ (date) =>{
                                handleChangeSemantic(`experienceList.${index}.leavingDate`, convertDate.convertDate(date))
                                expLeavingDate[index] = date
                              }
                              }
                              value={formik.values.experienceList.leavingDate}
                            />
                          </FormField>
                          {index > 0 && (
                            <Button
                              floated="right"
                              onClick={(e) => {e.preventDefault(); remove(index)}}
                            >
                              -
                            </Button>
                          )}
                          {index < 1 && (
                            <Button floated="left" onClick={(e) =>{e.preventDefault(); push("")}}>
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
                              name={`languageList.${index}.language.language`}
                              placeholder="Language"
                              onChange={formik.handleChange}
                              value={formik.values.languageList.language}  
                            ></input>
                          </FormField>
                          <FormField>
                            <Dropdown
                              name={`languageList.${index}.languageLevel.level`}
                              clearable
                              fluid
                              selection
                              placeholder="Level"
                              options={languageLevelOptions}
                              onChange={(event, data) =>
                                handleChangeSemantic(`languageList.${index}.languageLevel.level`,data.value)
                              }
                              value={formik.values.languageList.level}
                            >
                            </Dropdown>
                          </FormField>
                          {index > 0 && (
                            <Button
                              floated="right"
                              onClick={(e) => {e.preventDefault(); remove(index)}}
                            >
                              -
                            </Button>
                          )}
                          {index < 1 && (
                            <Button floated="left" onClick={(e) =>{e.preventDefault(); push("")}}>
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
                              name={`technologyStackList.${index}.technology.name`}
                              placeholder="Technology"
                              onChange={formik.handleChange}
                              value={formik.values.technologyStackList.name}
                            ></input>
                          </FormField>
                          {index > 0 && (
                            <Button
                              floated="right"
                              onClick={(e) => {e.preventDefault(); remove(index)}}
                            >
                              -
                            </Button>
                          )}
                          {index < 1 && (
                            <Button floated="left" onClick={(e) =>{e.preventDefault(); push("")}}>
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
