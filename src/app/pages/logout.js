import React, { Component } from 'react';
import { LayoutProvider } from '../layouts';
import Ionicon from 'react-ionicons';

export default class Logout extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    return (
      <LayoutProvider type='external'>
        <div style={{ height: window.height }}>
          <Ionicon icon={'ios-checkmark-circle-outline'} fontSize="48px"/>
          <div><span>You are now logged out</span></div>
          <a href='/login'>Click Here to Log In.</a>
        </div>
      </LayoutProvider>
    );
  }
}
