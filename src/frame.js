import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { observable, decorate } from 'mobx';
import { observer } from 'mobx-react';

import AnswerSheet from './answerSheet';
import LoginModal from './loginModal';
import { API_ENDPOINT } from './constants';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

const PersistentDrawerLeft =
observer(class PersistentDrawerLeft extends React.Component {
  loginModalOpen = false;
  drawerOpen = false;
  problemNames = [];
  problemID = null;
  
  componentDidMount() {
    let that = this;
    fetch(API_ENDPOINT + '/api/archive').then((response) => {
      if (response.status !== 200) {
        console.log("[log] response.status = " + response.status);
        return;
      }
      response.json().then(function(data) {
        that.problemNames = data.slice();
      }).catch((error) => {
        console.log("[log] run into an error when parsing into JSON:", error);    
      });;
    }).catch((error) => {
      console.log("[log] fetch an error:", error);
    });
  }

  handleDrawerOpen = () => {
    this.drawerOpen = true;
  };

  handleDrawerClose = () => {
    this.drawerOpen = false;
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.drawerOpen,
          })}
        >
          <Toolbar disableGutters={!this.drawerOpen}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.drawerOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap style={{flexGrow: 1}}>
              SQL Judger
            </Typography>
            <Button color="inherit" onClick={
              () => { this.loginModalOpen = true; console.log(this.loginModalOpen); }
            }>Login</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.drawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {this.problemNames.map((text, index) => (
              <ListItem 
                button 
                key={text} 
                onClick={() => {
                  this.problemID = text;
                }}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: this.drawerOpen,
          })}
        >
          <div className={classes.drawerHeader} />
          <AnswerSheet problemID={this.problemID}></AnswerSheet>
        </main>
        <LoginModal 
            open={this.loginModalOpen} 
            handleClose={() => {
              this.loginModalOpen = false;
            }}
            data={{}}
          />
      </div>
    );
  }
});

decorate(PersistentDrawerLeft, {
  loginModalOpen: observable,
  drawerOpen: observable,
  problemNames: observable,
  problemID: observable
})

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);