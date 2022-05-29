import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';
import env from 'react-dotenv';

export default function FormDialog({ companyId }) {
  const [open, setOpen] = React.useState(false);
  const inputPicRef = React.useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addEmployee = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.append('companyId', companyId);
    formData.append('userType', 'EMP');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    axios
      .post(env.SERVER_ADDRESS + '/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });

    handleClose();
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Add Employee
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Employee</DialogTitle>
        <form class='add-employee-form' onSubmit={addEmployee}>
          <DialogContent>
            <DialogContentText>Add employees here!</DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='id'
              name='userId'
              label='Id'
              type='text'
              fullWidth
              variant='standard'
            />
            <TextField
              autoFocus
              margin='dense'
              id='name'
              name='name'
              label='Name'
              type='text'
              fullWidth
              variant='standard'
            />
            <TextField
              autoFocus
              margin='dense'
              id='email'
              name='email'
              label='Email'
              type='email'
              fullWidth
              variant='standard'
            />
            <TextField
              autoFocus
              margin='dense'
              id='password'
              name='password'
              label='Password'
              type='password'
              fullWidth
              variant='standard'
            />
            <TextField
              autoFocus
              margin='dense'
              id='designation'
              name='designation'
              label='Designation'
              type='text'
              fullWidth
              variant='standard'
            />
            {/* <PopupCamera image={inputPicRef} /> */}
            <input type='file' name='image' ref={inputPicRef} />
          </DialogContent>
          <DialogActions>
            <Button type='submit'>Add</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
