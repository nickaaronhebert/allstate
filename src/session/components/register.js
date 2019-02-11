import React, { Component, Fragment } from 'react';
import { Modal } from 'antd';
import RegisterForm from './registerForm';

class Register extends Component {
  constructor () {
    super();

    this.state = {
      visible: true
    };
  }

  render () {
    return (
      <Fragment>
        <Modal
          title="Register"
          visible={this.state.visible}
          closable={false}
          footer={null}
        >
          <RegisterForm register={this.props.register}/>
        </Modal>
      </Fragment>
    );
  }
}

export default Register;
