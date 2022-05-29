import React from 'react';
import './Home.css';
import Loginform from './Loginform/Loginform';
import env from 'react-dotenv';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

console.log(env.SERVER_ADDRESS);

const Home = () => {
  const navigate = useNavigate();
  const login = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    axios
      .post(env.SERVER_ADDRESS + '/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          let route = '';
          switch (res.data.data.userType) {
            case 'EMP':
              route = '/employee';
              break;
            case 'AD':
              route = '/admin';
              break;
            case 'SA':
              route = '/superadmin';
              break;
            default:
          }
          console.log(route);
          const data = res.data.data;
          sessionStorage.setItem('access', data.access);
          sessionStorage.setItem('refresh', data.refresh);
          navigate(route, {
            state: { userId: data.userId, companyId: data.companyId },
          });
        } else {
          console.log('Login Error');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className='home-page'>
      <div className='heading'>
        <h1>Attendance Capturing Platform</h1>
      </div>
      <div className='login-form'>
        <Loginform login={login} />
      </div>
    </div>
  );
};

export default Home;
