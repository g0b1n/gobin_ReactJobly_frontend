import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import JoblyApi from '../api';
import { useUser } from '../Context/UserContext';
import './LoginForm.css';

function LoginForm({ onLogin }) {

    const initialValues = {
        username: "",
        password: ""
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required')
    });

    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            // try to login user via API
            const token = await JoblyApi.login(values);
            console.log('Login successful', token);
            // set the token for future API requests
            JoblyApi.token = token;
            // save token/ user info in localStorage
            localStorage.setItem('token', token);
            // store user data in context
            setUser({ username: values.username });
            // navigate to '/' after loggin in
            navigate('/');
            // if func is passed to loginForm to handle successful loing, call it
            if (onLogin) onLogin(token);
        } catch (error) {
            console.error('Login error', error.response || error);
            // display errors if there is any issue
            let message = error.response && error.response.data ? error.response.data.error.message : "Login failed. Please try again.";
            // set form error if the API return and error message
            setErrors({ general: message});
        } finally {
            setSubmitting(false);
        }
    }
    
  return (
    <div className="login-form">
          <h2>Login</h2>
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

                <button type="submit" disabled={isSubmitting}>
                  Login
                </button>
              </Form>
            )}
          </Formik>      
        </div>
  )
}

export default LoginForm;
