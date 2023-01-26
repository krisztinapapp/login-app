import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getUserInfo } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const asyncGetUserInfo = async () => {
      const user = await getUserInfo();
      setUserName(user.username);
    }
    asyncGetUserInfo();
  }, []);
  
  return (
    <>
    { localStorage.getItem('token') == null || localStorage.getItem('token') === 'undefined' ? (
      <Navigate replace to='/login' />
    ) : (
      <div className='container' id='main'>
        <div className='link'>
          <Link to='/login' onClick={ () => { localStorage.removeItem('token'); }}>
            <p>Log Out</p>
          </Link>
        </div>

        <h1>Main page</h1>
        <h2>Hello, { userName }!</h2>
      </div> 
    )}
    </>
  )
}

export default Main;