import React from 'react';
import { LayoutProvider } from '../layouts';
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
  
`;


class IsLoadingUnauthenticated extends React.Component {
  render () {
    return (
      <LayoutProvider type='external'>
        <LoginStyleWrapper>
        </LoginStyleWrapper>
      </LayoutProvider>
    );
  }
}

const { navigateToRoute } = Logic.router.actions;
const { sessionLogin } = Logic.session.actions;

function mapStateToProps (state) {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IsLoadingUnauthenticated));
