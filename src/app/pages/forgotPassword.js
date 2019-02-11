import React from 'react';
import { LayoutProvider } from '../layouts';
import { Form, Icon, Input, Button, Divider, Row, Col } from 'antd';
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
const FormItem = Form.Item;

class ForgotPassword extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.forgotPassword(values);
      }
    });
  };
  render () {
    const { getFieldDecorator } = this.props.form;
    const { isAuthenticated } = this.props;

    return (
      <LayoutProvider type='external'>
        <LoginStyleWrapper>
          { isAuthenticated &&
            <div>Looks like you are already authenticated</div>
          }
          {
            !isAuthenticated &&
              <Form onSubmit={this.handleSubmit} className="login-form">
                <div style={{ marginTop: '20px', textAlign: 'left' }}>
                Forgot Your Password?
                  <Divider/>
                  <p>We&apos;d be happy to reset the password for you. Please put in your email below and we will get it reset.</p>
                </div>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' }]
                  })(
                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                  )}
                </FormItem>
                <FormItem id="rememberCheck">
                  <Row gutter={64}>
                    <Col span={12}>
                      <Button type="ghost" className="login-form-button" style={{width: '100%'}} onClick={() => this.props.navigateToRoute({ to: '/login', replace: false }) }>Back To Login</Button>
                    </Col>
                    <Col span={12}>
                      <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>Change Password</Button>
                    </Col>
                  </Row>
                </FormItem>
              </Form>
          }

        </LoginStyleWrapper>
      </LayoutProvider>
    );
  }
}

const WrappedForgotPasswordForm = Form.create()(ForgotPassword);

const { navigateToRoute } = Logic.router.actions;
const { forgotPassword } = Logic.session.actions;

function mapStateTpProps (state) {
  const isAuthenticated = state.session.authenticated;
  return {
    isAuthenticated
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    navigateToRoute,
    forgotPassword
  }, dispatch);
}

export default withRouter(connect(mapStateTpProps, mapDispatchToProps)(WrappedForgotPasswordForm));
