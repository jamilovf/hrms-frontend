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
  const [edcEntryYear,] = useState([]);
  const [edcGraduateYear,] = useState([]);
  const [expEntryYear,] = useState([]);
  const [expLeavingYear,] = useState([]);
  const [uploadedImage, setUploadedImage] = useState();
  const [uploadedImageSrc, setUploadedImageSrc] = useState();
  const convertDate = new ConvertDate();

  const handleChangeSemantic = (fieldName, value) => {
    formik.setFieldValue(fieldName, value);
  }
  

  const initialValues = {
    candidateId : 11,
    coverLetter: "",
    cvCandidateEducationDtoList: [{
      schoolDto: {
        name: ""
      },
      departmentDto: {
        name: ""
      },
      entryYear: "",
      graduateYear: ""
    }],
    cvCandidateExperienceDtoList: [{
      experienceCompanyDto: {
        name: ""
      },
      experiencePositionDto: {
        name: ""
      },
      entryYear: "",
      leavingYear: ""
    }],
    cvCandidateLanguageDtoList: [{
      languageDto: {
        language: "",
      },
      languageLevelDto: {
        level : 1
      }
    }],
    cvCandidateTechnologyStackDtoList: [{
      technologyStackDto: {
        technologyName: ""
      }
    }],
    cvImageDto: {
      url : ""
    },
    socialMediaDetailsDto: {
      linkedinUrl: "",
      githubUrl: "",
    },
  };



  const schema = Yup.object({
    cvCandidateEducationDtoList: Yup.array().of(
      Yup.object().shape({
        schoolDto:  Yup.string(),
        departmentDto: Yup.string(),
        entryYear: Yup.date(),
        graduateYear: Yup.date(),
      })
    ),
    cvCandidateExperienceDtoList: Yup.array().of(
      Yup.object().shape({
        experienceCompanyDto: Yup.string(),
        experiencePositionDto: Yup.string(),
        entryYear: Yup.date(),
        leavingYear: Yup.date(),
      })
    ),
    cvCandidateLanguageDtoList: Yup.array().of(
      Yup.object().shape({
        languageDto: Yup.string(),
        languageLevelDto: Yup.number().min(1).max(5),
      })
    ),
    cvCandidateTechnologyStackDtoList: Yup.array().of(
      Yup.object().shape({
        technologyStackDto: Yup.string(),
      })
    ),
    socialMediaDetailsDto: {
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

  const uploadInformer = () => {
    if (uploadedImage){
      console.log(uploadedImage)
      fileUploadHandler();
    }
  }

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
    uploadInformer();
  };

  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append("file", uploadedImage);
    formData.append("upload_preset", "suydob0i");
    axios.post("https://api.cloudinary.com/v1_1/dobvuvt76/image/upload", formData)
    .then((response) => {
      formik.setFieldValue("cvImageDto.url",response.data.public_id);
    })
  };

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: values => {
      console.log(values)
       axios.post("http://localhost:8080/api/cv/add", values)
      .then((response) => console.log(response));
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
            <FieldArray name="cvCandidateEducationDtoList">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { cvCandidateEducationDtoList } = values;
                return (
                  <div>
                    {cvCandidateEducationDtoList.map((education, index) => (
                      <div key={index}>
                        <FormGroup widths="equal">
                          <FormField>
                            <input
                              name={`cvCandidateEducationDtoList.${index}.schoolDto.name`}
                              placeholder="School"
                              onChange={formik.handleChange}
                              value={formik.values.cvCandidateEducationDtoList.name}
                            ></input>
                          </FormField>
                          <FormField>
                            <input
                              name={`cvCandidateEducationDtoList.${index}.departmentDto.name`}
                              placeholder="Department"
                              onChange={formik.handleChange}
                              value={formik.values.cvCandidateEducationDtoList.name}
                            ></input>
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`cvCandidateEducationDtoList.${index}.entryYear`}
                              selected={edcEntryYear[index]}
                              placeholderText="Entry Date"
                              dateFormat="yyyy/MM/dd"
                              onChange={ (date) =>{
                                handleChangeSemantic(`cvCandidateEducationDtoList.${index}.entryYear`, convertDate.convertDate(date))
                               edcEntryYear[index] = date;
                              }
                              }
                              value={formik.values.cvCandidateEducationDtoList.entryYear}
                            />
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`cvCandidateEducationDtoList.${index}.graduateYear`}
                              selected={edcGraduateYear[index]}
                              placeholderText="Graduate Date"
                              dateFormat="yyyy/MM/dd"
                              onChange={ (date) =>{
                                handleChangeSemantic(`cvCandidateEducationDtoList.${index}.graduateYear`, convertDate.convertDate(date))
                                edcGraduateYear[index] = date
                              }
                              }
                              value={formik.values.cvCandidateEducationDtoList.graduateYear}
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
            <FieldArray name="cvCandidateExperienceDtoList">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { cvCandidateExperienceDtoList } = values;
                return (
                  <div>
                    {cvCandidateExperienceDtoList.map((experience, index) => (
                      <div key={index}>
                        <FormGroup widths="equal">
                          <FormField>
                            <input
                              name={`cvCandidateExperienceDtoList.${index}.experienceCompanyDto.name`}
                              placeholder="Company"
                              onChange={formik.handleChange}
                              value={formik.values.cvCandidateExperienceDtoList.name}
                            ></input>
                          </FormField>
                          <FormField>
                            <input
                              name={`cvCandidateExperienceDtoList.${index}.experiencePositionDto.name`}
                              placeholder="Position"
                              onChange={formik.handleChange}
                              value={formik.values.cvCandidateExperienceDtoList.name}
                            ></input>
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`cvCandidateExperienceDtoList.${index}.entryYear`}
                              selected={expEntryYear[index]}
                              placeholderText="Entry Date"
                              dateFormat="yyyy/MM/dd"
                              onChange={ (date) =>{
                                handleChangeSemantic(`cvCandidateExperienceDtoList.${index}.entryYear`, convertDate.convertDate(date))
                                expEntryYear[index] = date
                              }
                              }
                              value={formik.values.cvCandidateExperienceDtoList.entryYear}
                            />
                          </FormField>
                          <FormField>
                            <DatePicker
                              name={`cvCandidateExperienceDtoList.${index}.leavingYear`}
                              selected={expLeavingYear[index]}
                              placeholderText="Leaving Date"
                              dateFormat="yyyy/MM/dd"
                              onChange={ (date) =>{
                                handleChangeSemantic(`cvCandidateExperienceDtoList.${index}.leavingYear`, convertDate.convertDate(date))
                                expLeavingYear[index] = date
                              }
                              }
                              value={formik.values.cvCandidateExperienceDtoList.leavingYear}
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
            <FieldArray name="cvCandidateLanguageDtoList">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { cvCandidateLanguageDtoList } = values;
                return (
                  <div>
                    {cvCandidateLanguageDtoList.map((language, index) => (
                      <div key={index}>
                        <FormGroup widths="equal">
                          <FormField>
                            <input
                              name={`cvCandidateLanguageDtoList.${index}.languageDto.language`}
                              placeholder="Language"
                              onChange={formik.handleChange}
                              value={formik.values.cvCandidateLanguageDtoList.language}  
                            ></input>
                          </FormField>
                          <FormField>
                            <Dropdown
                              name={`cvCandidateLanguageDtoList.${index}.languageLevelDto.level`}
                              clearable
                              fluid
                              selection
                              placeholder="Level"
                              options={languageLevelOptions}
                              onChange={(event, data) =>
                                handleChangeSemantic(`cvCandidateLanguageDtoList.${index}.languageLevelDto.level`,data.value)
                              }
                              value={formik.values.cvCandidateLanguageDtoList.level}
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
            <FieldArray name="cvCandidateTechnologyStackDtoList">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { cvCandidateTechnologyStackDtoList } = values;
                return (
                  <div>
                    {cvCandidateTechnologyStackDtoList.map((technologyStack, index) => (
                      <div key={index}>
                        <FormGroup widths="equal">
                          <FormField>
                            <input
                              name={`cvCandidateTechnologyStackDtoList.${index}.technologyStackDto.technologyName`}
                              placeholder="Technology"
                              onChange={formik.handleChange}
                              value={formik.values.cvCandidateTechnologyStackDtoList.technologyName}
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
                  name="socialMediaDetailsDto.linkedinUrl"
                  placeholder="Linkedin"
                  icon="linkedin"
                  onChange={formik.handleChange}
                  value={formik.values.socialMediaDetailsDto.linkedinUrl}
                />
              </FormField>
              <FormField>
                <Input
                  name="socialMediaDetailsDto.githubUrl"
                  placeholder="Github"
                  icon="github"
                  onChange={formik.handleChange}
                  value={formik.values.socialMediaDetailsDto.githubUrl}
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
