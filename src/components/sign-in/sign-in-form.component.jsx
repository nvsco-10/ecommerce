import { useState } from 'react';

import { 
  signInWithGooglePopup, 
  createUserDocumentFromAuth, 
  signInAuthUserWithEmailAndPassword 
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button-component';

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFields);  
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields();
    } catch (error) {
      switch(error.code) {
        case 'auth/user-not-found':
          alert('user does not exist');
          break;
        case 'auth/wrong-password':
          alert('incorrect credentials');
          break;
        default:
          console.log(error)
      }
    }

  }

  return (
    <div className='sign-in-container'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

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

        <div className='buttons-container'>
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm