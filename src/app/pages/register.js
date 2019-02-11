import React from 'react';
import { LayoutProvider } from '../layouts';
import { Form, Icon, Input, Button, Col, Row } from 'antd';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import HomeDecorSplash from '../../image/homeDecorSplash.jpg';

const RegisterStyleWrapper = styled.div`
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

class NormalRegisterForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.sessionRegister(values);
      }
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }


  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render () {
    const { getFieldDecorator } = this.props.form;


    return (
      <div style={{height: '100%'}}>
      <LayoutProvider 
        type='external' 
        header={{
          left: () => {
            return (<p></p>);
          },
          right: () => {
            return (null);
          },
        }}
        >
        <div style={{width: '100%', backgroundImage: `url(${HomeDecorSplash})`, backgroundRepeat: 'no-repeat', 'backgroundSize': 'cover', height: '470px'}}>
        
          <div style={{paddingTop: '20px'}}>
            <RegisterStyleWrapper>
              <Row type='flex' justify='center'>
                <Col span={12} style={{background: 'white', padding: '20px 20px 0px 20px'}}>
                  <Row gutter={32}>
                    <Col span={24} style={{paddingRight: '10px'}}>
                      <div style={{textAlign: 'center', fontWeight: 200, fontSize: '20px', paddingBottom: '20px'}}>
                        <div>Its Style Time...But First, Some Housekeeping Items</div>
                      </div>
                      <Form onSubmit={this.handleSubmit} className="login-form">
                        <Row gutter={32}>
                          <Col span={12}>
                            <FormItem>
                              {getFieldDecorator('firstName', {
                                rules: [{ required: true, message: 'Please input your first name!' }, {
                                  
                                }],
                                
                              })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />
                              )}
                            </FormItem>
                          </Col>
                          <Col span={12}>
                            <FormItem>
                              {getFieldDecorator('lastName', {
                                rules: [{ required: true, message: 'Please input your last name!' }, {
                                  
                                }],
                                
                              })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />
                              )}
                            </FormItem>
                          </Col>

                        </Row>
                        <FormItem>
                          {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your username!' }, {
                              
                            }],
                            
                          })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Address" />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }, {
                              validator: this.validateToNextPassword
                            }]
                          })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('confirm', {
                            rules: [{ required: true, message: 'Please confirm your password!!' }, {
                                      validator: this.compareToFirstPassword,
                                    }]
                          })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
                          )}
                        </FormItem>
                        <FormItem id="rememberCheck">
                          {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true
                          })(
                            <Row>
                              <Col span={24}>
                                <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%', backgroundColor: '#84b0a7', border: '#84b0a7 1px solid'}}>
                                  Sign Up
                                </Button>
                              </Col>
                              <Col span={24}>
                                <Button style={{width: '100%'}} onClick={() => { this.props.navigateToRoute({ to: '/login', replace: false });} }>
                                  Wait...I already have an account
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
              
            </RegisterStyleWrapper>
          </div>
        </div>
      </LayoutProvider>
      </div>
    );
  }
}

const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);

const { navigateToRoute } = Logic.router.actions;
const { sessionRegister } = Logic.session.actions;

function mapStateTpProps (state) {
  const isAuthenticated = state.session.authenticated;
  return {
    isAuthenticated
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    navigateToRoute,
    sessionRegister
  }, dispatch);
}

export default withRouter(connect(mapStateTpProps, mapDispatchToProps)(WrappedNormalRegisterForm));
