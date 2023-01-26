import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { login } from './api'
import Joi from 'joi-browser';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateUsername = () => {
    try {
      Joi.assert(username, Joi.string().required());
      return true;
    } catch(err) {
      setUsernameError('username-required');
      return false;
    }
  }

  const validatePassword = () => {
    try {
      Joi.assert(password, Joi.string().required());
      return true;
    } catch(err) {
      setPasswordError('password-required');
      return false;
    }
  }

  async function logInUser(e) {
    e.preventDefault();

    let validInput = validateUsername();
    validInput = validatePassword() && validInput;

    if(validInput) {
      try {
        const res = await login({ username, password });
        localStorage.setItem('token', res.token);
        setSuccess(true);
      } catch (err) {
          setServerError('wrong-credentials');
      }
    }
  }

  return (
    <>
    {success ? (
      <Navigate replace to='/main' />
    ) : (   
    <div className='container'>
      <div className='link'>
        <Link to='/signup'>
            <p>Sign Up</p>
        </Link>
      </div>

      <h2>Log in to your account.</h2>
      
      <div className='form-container'>
        <Form onSubmit={ logInUser }>
          <FormGroup>
            <Label for='username'>
              Username
            </Label>
            <Input
              id='username'
              name='username'
              placeholder='Enter username'
              type='text'
              onChange={ (e) => {
                setUsername(e.target.value);
                setUsernameError('');
                setServerError('');
              }}
            />
            { usernameError === 'username-required' && <FormText>Username is required.</FormText> }
          </FormGroup>

          <FormGroup>
            <Label for='password'>
                Password
              </Label>
              <Input
                id='password'
                name='password'
                placeholder='Enter password'
                type='password'
                onChange={ (e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                  setServerError('');
                }}
              />
              { passwordError === 'password-required' && <FormText>Password is required.</FormText> }
          </FormGroup>
          
          { serverError === 'wrong-credentials' && <p>Wrong username or password.</p> }
          <Button id='btn-login'>
            Log in
          </Button>
        </Form>
      </div>
      
    </div>
    )}
    </>
  )
}

export default Login;