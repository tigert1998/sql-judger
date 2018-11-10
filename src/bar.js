import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// this.props.drawerOpen
// this.props.drawerOpenTapped
class Bar extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit" 
              aria-label="Menu"
              onClick={this.props.drawerOpenTapped}
              style={{
                display: this.props.drawerOpen ?  "none" : "inline"
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              SQL Judger
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Bar;