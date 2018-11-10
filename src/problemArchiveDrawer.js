import React from 'react';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// this.props.open
// this.props.drawerCloseTapped
class ProblemArchiveDrawer extends React.Component {
  render() {
    return (
      <Drawer
        variant="persistent"
        anchor="left"
        open={this.props.open}
      >
        <div>
          <IconButton 
            onClick={this.props.drawerCloseTapped}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {['hello', 'I', 'am', 'tigertang'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={index + ". " + text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
};

export default ProblemArchiveDrawer;