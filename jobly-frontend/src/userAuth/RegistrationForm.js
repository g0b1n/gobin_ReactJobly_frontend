import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUser } from '../Context/UserContext';

// import Jobly API
import JoblyApi from '../api.js';
import './RegistrationForm.css';

function RegistrationForm() {

  const initialValues = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  }

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().required('Required'),
  })

  const { setUser } = useUser();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // make API call to beckend to register
      const token = await JoblyApi.register(values);
      console.log('Registration succesful, token', token);
      // history.pushState('/login');
      // after succesfull registration, redirect user to home page
      setUser({ username: values.username });

    } catch (error) {
      // handle registration errors
      console.error('Registration error', error.response || error);
      // form error if API return a message
      if (error.response && error.response.data.message) {
        setErrors({ general: error.response.data.message });
      }
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="registration-form">
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor='username'>Username</label>
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" className="error-message" />

            <label htmlFor='password'>Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error-message" />

            <label htmlFor='firstName'>First Name</label>
            <Field type="text" name="firstName" />
            <ErrorMessage name="firstName" component="div" className="error-message" />

            <label htmlFor='lastName'>Last Name</label>
            <Field type="text" name="lastName" />
            <ErrorMessage name="lastName" component="div" className="error-message" />

            <label htmlFor='email'>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error-message" />

            <button type='submit' disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RegistrationForm;
