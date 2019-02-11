import React from 'react';
import { LayoutProvider } from '../layouts';
import { Form } from 'antd';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';

const LoginStyleWrapper = styled.div`
  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
  .TEST {
    float: left;
  }

  .isLoading {
    height: 1000px
  }
`;


class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.sessionLogin(values);
      }
    });
  };
  render () {



    return (
      <LayoutProvider type='external'>
        <LoginStyleWrapper>
          <div className='isLoading'>
          </div>
        </LoginStyleWrapper>
      </LayoutProvider>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const { navigateToRoute } = Logic.router.actions;
const { sessionLogin } = Logic.session.actions;

function mapStateTpProps (state) {
  const isAuthenticated = state.session.authenticated;
  return {
    isAuthenticated
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    navigateToRoute,
    sessionLogin
  }, dispatch);
}

export default withRouter(connect(mapStateTpProps, mapDispatchToProps)(WrappedNormalLoginForm));
