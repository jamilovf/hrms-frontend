import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Button, FormField, FormGroup, Label, Segment } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CvAdd.css";

export default function CvAdd() {
  const [, setEdcEntryDate] = useState(new Date());
  const [, setEdcLeavingDate] = useState(new Date());
  const [, setExpEntryDate] = useState(new Date());
  const [, setExpLeavingDate] = useState(new Date());

  const initialValues = {
    educationList: [""],
    experienceList: [""],
    languageList: {
      language: {
        language: "",
      },
      languageLevel: {
        level: 1,
      },
    },
    technologyStackList: {
      technologyStack: {
        technologyname: "",
      },
    },
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
          <FormField>
            <textarea name="coverLetter" placeholder="Cover Letter"></textarea>
          </FormField>
          <Segment>
          <Label as='a' color='red' ribbon>
          Education
        </Label>
          <FieldArray name="educationList">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { educationList } = values;
              return (
                <div>
                  {educationList.map((educationItem, index) => (
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
                          <Button floated="right" onClick={() => remove(index)}>
                            -
                          </Button>
                        )}
                        { index < 1 && (<Button floated="left" onClick={() => push("")}>
                          +
                        </Button>)}
                      </FormGroup>
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
          </Segment>
          <Segment>
          <Label as='a' color='red' ribbon>
          Experience
        </Label>
          <FieldArray name="experienceList">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { experienceList } = values;
              return (
                <div>
                  {experienceList.map((experienceItem, index) => (
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
                          <Button floated="right" onClick={() => remove(index)}>
                            -
                          </Button>
                        )}
                      { index < 1 && (<Button floated="left" onClick={() => push("")}>
                          +
                        </Button>)}
                      </FormGroup>
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
          </Segment>
        </Form>
      </Formik>
    </div>
  );
}
