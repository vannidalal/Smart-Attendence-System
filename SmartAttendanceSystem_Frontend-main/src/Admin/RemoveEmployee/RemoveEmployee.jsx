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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteEmployee = (event) => {
    event.preventDefault();
    const empId = event.currentTarget.elements.empId.value;

    axios
      .delete(env.SERVER_ADDRESS + '/user/' + companyId + '/' + empId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });

    console.log(event.currentTarget.elements.empId.value);
    handleClose();
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Remove Employee
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remove Employee</DialogTitle>
        <form className='remove-employee-form' onSubmit={deleteEmployee}>
          <DialogContent>
            <DialogContentText>Remove employees here!</DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='id'
              name='empId'
              label='Id'
              type='text'
              fullWidth
              variant='standard'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Remove</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
