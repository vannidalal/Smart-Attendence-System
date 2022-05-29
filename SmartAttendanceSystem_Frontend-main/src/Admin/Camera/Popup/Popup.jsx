import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@material-ui/core/Box';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';

const useStyles = makeStyles(({ palette }) => ({
  avatar: {
    width: '200px',
    height: '200px',
  },
  statLabel: {
    fontSize: 14,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
    textAlign: 'center',
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Popup(props) {
  const styles = useStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (props.openDialog) setOpen(true);
    else setOpen(false);
  }, [open, props]);

  return (
    <div>
      {/* <Button variant='outlined' onClick={props.handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={props.handleClose}
        >
          Employee Info
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            display={'flex'}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Avatar
              alt='Cindy Baker'
              src={props.employee.image}
              // className={styles.avatar}
              style={{ width: '200px', height: '200px' }}
            />
          </Box>
          <Box display={'flex'}>
            <Box p={5} flex={'auto'} className={borderedGridStyles.item}>
              <p className={styles.statLabel}>Name</p>
              <p className={styles.statValue}>{props.employee.name}</p>
            </Box>
            <Box p={5} flex={'auto'} className={borderedGridStyles.item}>
              <p className={styles.statLabel}>UserId</p>
              <p className={styles.statValue}>{props.employee.userId}</p>
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
