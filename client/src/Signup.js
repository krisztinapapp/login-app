import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { signup } from './api';
import Joi from 'joi-browser';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const [signUpError, setSignUpError] = useState('');
  const [unknownError, setUnknownError] = useState('');
  
  const [success, setSuccess] = useState(false);

  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  });

  const validate = () => {
    const result = Joi.validate({
      username: username,
      password: password,
      confirmPassword: confirmPassword
    }, schema, { 
      abortEarly: false
    });
    if(result.error) {
      for (const item of result.error.details) {
        switch(item.path[0]) {
          case 'username':
            setUsernameError(item.message);
            break;
          case 'password':
            setPasswordError(item.message);
            break;
          case 'confirmPassword':
            setConfirmPasswordError(item.message);
            break;
          default:
            setUnknownError(item.message);
        }
      }
      return false;
    } else {
      return true;
    }
  }

  async function signUpUser(event) {
    event.preventDefault();

    if(validate()) {
      try {
        await signup({ username, password });
        setSuccess(true);
      } 
      catch(err) {
        setSignUpError('duplicate-username');
        console.log('Sign up error');
      }
    }    
  }

  return (
    <>
    {success ? (
      <Navigate replace to='/login' />
    ) : (
      <div className='container'>
        <div className='link'>
          <Link to='/login'>
              <p>Log In</p>
          </Link>
        </div>
    
        <h2>Create a new account.</h2>
        
        <div className='form-container'>
          <Form onSubmit={ signUpUser }>
            <FormGroup>
              <Label for='username'>Username</Label>
              <Input
                id='username'
                name='username'
                placeholder='Enter username'
                type='text'
                value={ username }
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError('');
                }}
              />
              { usernameError !== '' && <FormText>Username is required.</FormText> }
              { signUpError === 'duplicate-username' && <FormText>This username is already in use. Please select another one.</FormText> }
            </FormGroup>

            <FormGroup>
              <Label for='password'>Password</Label>
              <Input
                id='password'
                name='password'
                placeholder='Enter password'
                type='password'
                value={ password }
                onChange={ (e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
              />
              { passwordError !== '' && <FormText>Password must be at least 4 characters.</FormText> }
            </FormGroup>

            <FormGroup>
              <Label for='confirm-password'>Confirm password</Label>
              <Input
                id='confirm-password'
                name='confirm-password'
                placeholder='Enter password'
                type='password'
                value={ confirmPassword }
                onChange={ (e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError('');
                }}
              />
              { confirmPasswordError !== '' && <FormText>Passwords must match.</FormText> }
            </FormGroup>

            { unknownError !== '' && 
            <FormGroup>
              <FormText>{ unknownError }</FormText>
            </FormGroup>
            }

            <Button id='btn-signup'>
              Sign up
            </Button>

          </Form>
        </div>
      </div>
    
    )}
    </>
  )
}

export default Signup;