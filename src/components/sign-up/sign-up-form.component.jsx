import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button-component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFields);  
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({...formFields, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return
    }

    try {
      // firebase authenticate
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      
      // add user to database, pass on display name
      createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
      
    } catch (error) {
      if(error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.")
      }

      if(error.code === "auth/email-already-in-use") {
        alert("Email already in use.")
      }
    }

  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label="Display Name" 
          inputOptions= {{
            type: "text", 
            name: "displayName", 
            required: true, 
            onChange: handleChange,
            value: displayName 
          }}
        />

        <FormInput
          label="Email"
          inputOptions= {{
            type: "email" ,
            name: "email" ,
            required: true, 
            onChange: handleChange,
            value: email
          }}   
        />

        <FormInput
          label="Password"
          inputOptions= {{
            type:"password", 
            name:"password", 
            required: true, 
            onChange: handleChange, 
            value: password
          }}
        />

        <FormInput
          label="Confirm Password"
          inputOptions= {{
            type: "password", 
            name: "confirmPassword", 
            required: true, 
            onChange: handleChange, 
            value: confirmPassword 
          }}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
} 

export default SignUpForm