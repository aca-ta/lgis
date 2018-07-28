import $ from 'jquery';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Map from './map';
import Navbar from './navbar';


class App extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleToggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <div>
        <Navbar onToggle={() => this.handleToggle()} open={this.state.open} />
      </div>
    );
  }
}

window.addEventListener(
  'load',
  () => {
    ReactDOM.render(<App />, document.querySelector('#navbar'));
  },
  false,
);
