import React from 'react';
import { Spin } from 'antd';

export default function (WrappedComponent) {
  class WithReady extends React.Component {
    render () {
      if (this.props.isReady) {
        return <WrappedComponent {...this.props} />;
      } else {
        return (
          <div style={{ 'textAlign': 'center' }}>
            {this.props.readyMessage ? this.props.readyMessage() : 'Please Wait'}
            <Spin/>
          </div>
        );
      }
    }
  }
  return WithReady;
}
