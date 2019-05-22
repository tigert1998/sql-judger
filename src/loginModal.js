import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import STORE from './store';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {
  render() {
    const { classes, data } = this.props;

    if (data === null) {
      return <div></div>;
    } else {
      return (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <TextField
              required
              id="id"
              label="ID"
              className={classes.textField}
              onChange={(event) => {STORE.userID = event.target.value;}}
              margin="normal"
            />
            <TextField
              required
              id="password"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
            <Button 
              variant="contained" 
              color="primary" 
              className={classes.button}
              style={{display: 'block', margin: '10px'}}
              onClick={() => { STORE.logined = true; this.props.handleClose(); }}
            >
              Go!
            </Button>
          </div>
        </Modal>
      );
    }
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const LoginModal = withStyles(styles)(SimpleModal);

export default LoginModal;