import React from 'react';
import ProblemArchiveDrawer from './problemArchiveDrawer';
import Bar from './bar';

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
  }

  render() {
    return (
      <div>
        <Bar
          drawerOpen={this.state.drawerOpen}
          drawerOpenTapped={() => {
            this.setState({
              drawerOpen: true
            });
          }}
        />
        <ProblemArchiveDrawer
          open={this.state.drawerOpen}
          drawerCloseTapped={() => {
            this.setState({
              drawerOpen: false
            });
          }}
        />
      </div>
    )
  }
}

export default Frame;