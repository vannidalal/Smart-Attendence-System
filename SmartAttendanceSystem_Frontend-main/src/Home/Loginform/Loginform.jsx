import React from 'react';
import '../Home.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Registerform from '../Registerform/Registerform';

export default function LoginForm({ login }) {
  return (
    <div className='App'>
      <form className='form' onSubmit={login}>
        <TextField
          autoFocus
          margin='dense'
          id='email'
          name='email'
          label='Email'
          type='email'
          fullWidth
          variant='standard'
          required
        />
        <TextField
          margin='dense'
          id='id'
          name='password'
          label='Password'
          type='password'
          fullWidth
          variant='standard'
          required
        />
        <DialogActions>
          <Button
            type='submit'
            variant='contained'
            size='large'
            style={{ margin: '0 20px' }}
          >
            Login
          </Button>
          <Registerform />
        </DialogActions>
      </form>
    </div>
  );
}
