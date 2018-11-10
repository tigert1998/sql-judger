import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class AnswerSheet extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          id="filled-textarea"
          label="code"
          placeholder="Input your code here"
          multiline
          fullWidth
          className={classes.textField}
          margin="normal"
          variant="filled"
          rows="25"
        />
        <Button variant="contained" color="primary" className={classes.button}>
          Submit
        </Button>
      </div>
    );
  }
}

AnswerSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnswerSheet);
