import React, { Component} from 'react';
import { Modal } from 'antd';
import LoginForm from './loginForm';

class Login extends Component {
  constructor () {
    super();

    this.state = {
      visible: true
    };
  }

  render () {
    return (
      <Modal
        title="Login"
        visible={this.state.visible}
        closable={false}
        footer={null}
      >
        <LoginForm login={this.props.login}/>
      </Modal>
    );
  }
}

export default Login;
