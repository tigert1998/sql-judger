import React from 'react';
import ReactDOM from 'react-dom';
import Frame from './frame';

class App extends React.Component {
  render() {
    return (
      <Frame></Frame>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
