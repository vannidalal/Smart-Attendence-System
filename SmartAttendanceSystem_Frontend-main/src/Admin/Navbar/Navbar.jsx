import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  optionsDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const NavBar = ({ title }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            className={classes.title}
            variant='h5'
            color='inherit'
            align='center'
          >
            Company Admin Dashboard
          </Typography>

          <div className={classes.optionsDiv}>
            {/* <Button variant='contained' size='small' style={{ margin: '5px' }}>
              Employee Directory
            </Button> */}
            <Button
              variant='contained'
              size='small'
              style={{ margin: '5px' }}
              component={Link}
              to='/capture-attendance'
              target='_blank'
            >
              Launch Camera
            </Button>
            <Button
              variant='contained'
              size='small'
              style={{ margin: '5px' }}
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
