import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Form, Field, withFormik} from 'formik'
import * as Yup from 'yup'


const LoginForm = ({errors,touched}) => {
 // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
 
  return (
      <div className='login-form'>
          <Form>
              <Field 
                  className='username'
                  type= 'text'
                  name= 'username'
                  placeholder ='Username'
              />
              {touched.username && errors.username && (
                  <p className= 'error'>{errors.username}</p>
              )}
              <Field 
                  className='password'
                  type= 'password'
                  name= 'password'
                  placeholder ='Password'
              />
              {touched.password && errors.password && (
                  <p className= 'error'>{errors.password}</p>
              )}
            <button type ='submit'>Login</button>
          </Form>
          {/* <div className = ''>
          {users.map((user, index) => (
              <p key={index}>{user.color}</p>
          ))} 
          </div> */}
      </div>
  )
}

export default withFormik({ 

          mapPropsToValues({username,password}) {
          return {
              username: username || '',
              password: password || ''
          }
      },
      validationSchema: Yup.object.shape({
          username: Yup.string().required('Please enter your username'),
          password: Yup.string().required('Please enter your password')
      }),
      
      handleSubmit(values, formikBag){
        axios
        .post(`http://localhost:5000/api/colors/login`, values)
        .then(res => {
            console.log(res)
            localStorage.setItem('token',res.data.payload)
            formikBag.  this.history.push('/colors');
        })
        .catch(error => console.log(error.res))
      }
    
  })(LoginForm)