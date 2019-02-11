import React, { Component} from 'react';
import { Modal } from 'antd';

class Logout extends Component {
  constructor () {
    super();

    this.state = {
      visible: true
    };
  }

  render () {
    return (
      <Modal
        title={this.props.session.authenticated ? 'Logging Out' : 'Logged Out'}
        visible={this.state.visible}
        onCancel={() => this.props.navigateToRoute({ to: '/', replace: true })}
        footer={null}
      >
                You are logged out now.
      </Modal>
    );
  }
}

export default Logout;
