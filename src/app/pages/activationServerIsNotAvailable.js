import React from 'react';
import { LayoutProvider } from '../layouts';
import Ionicon from 'react-ionicons';

class ActivationServerIsNotAvailable extends React.Component {
  constructor (props) {
    super(props);

    this.state = {

    };
  }

  render () {
    return (
      <LayoutProvider type='external' >
        <div style={{ height: window.height }}>
          <Ionicon icon={'ios-help-circle-outline'} fontSize="48px"/>
          <div><span>Ooops....</span></div>
          <div><span>Activation server is not available. status server page: Link to server status page</span></div>

        </div>
      </LayoutProvider>
    );
  }
}

export default ActivationServerIsNotAvailable;
