import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Markdown from '@nteract/markdown';

import { API_ENDPOINT } from './constants';
import ResultModal from './resultModal';

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
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
});

class AnswerSheet extends React.Component {
  static descriptionCache = {}

  constructor(props) {
    super(props);
    this.state = {
      ok: false,
      description: "",
      modalOpen: false,
      testResult: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.problemID === null) {
      this.setState({
        ok: false,
        description: "",
        modalOpen: false,
        testResult: null
      });
    } else {
      if (AnswerSheet.descriptionCache[nextProps.problemID]) {
        this.setState({
          ok: true,
          description: AnswerSheet.descriptionCache[nextProps.problemID]
        });
      } else {
        let that = this;
        let url = encodeURI(API_ENDPOINT + '/api/description/' + nextProps.problemID);
        fetch(url).then((response) => {
          if (response.status !== 200) {
            console.log("[log] response.status = " + response.status);
            return;
          }
          response.text().then((data) => {
            AnswerSheet.descriptionCache[nextProps.problemID] = data;
            that.setState({
              ok: true,
              description: data,
              modalOpen: false,
              testResult: null
            });
          });
        }).catch((error) => {
          console.log("[log] fetch an error:", error);
        });
      }
    }
  }

  render() {
    const { classes } = this.props;
    if (!this.state.ok) {
      return (
        <div>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="h5" component="h3">
              SQL Judger
            </Typography>
            <Typography component="p">
              Welcome!
            </Typography>
          </Paper>
        </div>
      );
    } else {
      return (
        <div>
          <Markdown source={this.state.description}></Markdown>
          <TextField
            id="code-textarea"
            label="code"
            placeholder="Input your code here"
            multiline
            fullWidth
            className={classes.textField}
            margin="normal"
            variant="filled"
            rows="25"
          />
          <Button 
            variant="contained" color="primary" 
            className={classes.button}
            onClick={() => {
              let dom = document.getElementById("code-textarea");
              let data = {};
              data.problemID = this.props.problemID;
              data.code = dom.value;
              let stringifiedData = JSON.stringify(data);

              fetch(API_ENDPOINT + "/api/submitCode", {
                method: 'POST',
                body: stringifiedData,
                headers:{
                  "Content-Type": "application/json",
                }
              }).then(response => response.json()).then((result) => {
                this.setState({
                  ok: this.state.ok,
                  description: this.state.description,
                  modalOpen: true,
                  testResult: result 
                });
              });
            }}
          >
            Submit
          </Button>
          <ResultModal 
            open={this.state.modalOpen} 
            handleClose={() => {
              this.setState({
                ok: this.state.ok,
                description: this.state.description,
                modalOpen: false,
                testResult: null 
              });
            }}  
            data={this.state.testResult}
          />
        </div>
      );
    }
  }
}

AnswerSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnswerSheet);
