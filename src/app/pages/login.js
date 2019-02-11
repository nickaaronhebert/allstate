import React from 'react';
import { LayoutProvider } from '../layouts';
import { Form, Icon, Input, Button, Checkbox, Col, Row, Alert } from 'antd';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import HomeDecorSplash from '../../image/homeDecorSplash.jpg';

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

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.sessionLogin(values);
      }
    });
  };

  getAlertsBox () {
    return (
      <div>
        {this.props.alerts.map((alert, i) => {
          return (
            <Alert message={alert.text} type={alert.type} banner key={i}/>
          );
        })}
      </div>
    );
  }

  render () {
    const { getFieldDecorator } = this.props.form;


    return (
      <div style={{height: '100%'}}>
      <LayoutProvider 
        type='external' 
        header={{
          left: () => {
            return (null);
          },
          right: () => {
            return (null);
          },
        }}
        >
        <div style={{width: '100%', backgroundImage: `url(${HomeDecorSplash})`, backgroundRepeat: 'no-repeat', 'backgroundSize': 'cover', height: '460px', backgroundColor: '#84b0a7'}}>
        
          <div style={{paddingTop: '70px'}}>
            <LoginStyleWrapper>
              <Row type='flex' justify='center'>
                <Col span={10} style={{background: 'white'}}>
                  <Row>
                    <Col span={24}>
                      {
                        this.getAlertsBox()
                      }
                    </Col>
                    <Col span={24} style={{padding: '20px'}}>
                      <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                          {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }]
                          })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }]
                          })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                          )}
                        </FormItem>
                        <FormItem id="rememberCheck">
                          {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true
                          })(
                            <Row>
                              <Col span={12}>
                                <Checkbox className='TEST'>Remember me</Checkbox>
                              </Col>
                              <Col span={12} style={{textAlign: 'right'}}>
                                <a className="login-form-forgot" onClick={ () => { this.props.navigateToRoute({ to: '/forgot', replace: false }); } }>Forgot password</a>
                              </Col>
                              <Col span={24}>
                                <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%', backgroundColor: '#84b0a7', border: '#84b0a7 1px solid'}}>
                                  Log in
                                </Button>
                                <Button type="default"  onClick={() => { this.props.navigateToRoute({ to: '/register', replace: false });} } className="login-form-button" style={{width: '100%'}}>
                                  I Need To Sign Up
                                </Button>
                              </Col>
                            </Row>
                            
                          )}
                          
                          
                        </FormItem>
                      </Form>    
                    </Col>
                  </Row>


                  
                </Col>
              </Row>
              
            </LoginStyleWrapper>
          </div>
        </div>
      </LayoutProvider>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const { navigateToRoute } = Logic.router.actions;
const { sessionLogin } = Logic.session.actions;

function mapStateTpProps (state) {
  const isAuthenticated = state.session.authenticated;
  return {
    isAuthenticated,
    alerts: state.containers.notifications.alerts
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    navigateToRoute,
    sessionLogin
  }, dispatch);
}

export default withRouter(connect(mapStateTpProps, mapDispatchToProps)(WrappedNormalLoginForm));
