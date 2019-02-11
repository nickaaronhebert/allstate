import React, { Fragment } from 'react';
import { LayoutProvider } from '../layouts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import { Button, Row, Col, Icon, Form, Input, Tag } from 'antd';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';

class Profile extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      previewVisible: false,
      focusView: 'overview',
      previewImage: '',
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    };
  }

  changeShippingAddress = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.updateOrder(values);
        console.log('Received values of form: ', values);
      }
    });
  }

  onToken(e) {
    this.props.updateOrder(Object.assign({id: this.props.session.user.currentOrder.id, }, {...e}));
    return e;
  }

  getSubscriptionDetails() {
    switch (this.props.session.user.status) {
      case 'active':
        return (
          <Fragment>
            <div><strong>Subscription: <Tag>Active</Tag></strong> </div>
            <div>Yay! We hope you are loving your box.</div>
          </Fragment>
        );
      case 'past':
        return (
          <Fragment>
            <div><strong>Subscription: <Tag>Previous</Tag></strong> </div>
            <div>Click here to renew your Abode Box  </div>
          </Fragment>
        );
    }
  }

  render () {
    const { user } = this.props.session; 
    const { getFieldDecorator } = this.props.form;

    return (
      <div style={{height: '100%'}}>
        <LayoutProvider 
          type='external'
          header={{
            left: () => {
              return (<div style={{textAlign: 'right'}}><p>Recent Boxes</p></div>);
            },
            right: () => {
              return (
                <div >
                  <Button style={{marginRight: '20px'}} onClick={() => { this.props.navigateToRoute({ to: '/logout', replace: false}); } }>Logout</Button>
                </div>
              );
            },
          }}
          >
          <div >
            <div style={{width: '100%', backgroundImage: `url('https://s3-eu-west-1.amazonaws.com/ch-production-uploads/wp-content/uploads/2018/03/Home_decor_banner_modern_vintage.jpg')`, backgroundRepeat: 'no-repeat', 'backgroundSize': 'fill', height: '300px', backgroundPosition: 'right'}}>
              
            
            </div>
            <Row type='flex' justify='center' style={{padding: '20px'}}>
              <Col span={17}>
                <Row gutter={32}>
                  <Col span={8}>
                    <div style={{width: '100%', border: '1px solid lightgrey'}}>
                      <div style={{height: '100px', background: '#84b0a7', textAlign: 'center'}}>
                        <span style={{fontSize: '70px', color: 'white'}}>{user.firstName[0]}{user.lastName[0]}</span>
                      </div>
                      <div>
                        <div style={{padding: '20px 10px', fontWeight: '200'}}>
                          <div style={{fontSize: '18px'}}>{user.firstName} {user.lastName}</div>
                          <div>{user.email}</div>
                          <div style={{marginTop: '20px'}}><strong>Subscription Status:</strong> One-Time Box</div>
                          <div><strong>Member Since:</strong> {moment(user.createdAt).fromNow()}</div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={16}>
                    <Row gutter={16}>
                      {
                        this.state.focusView == 'overview' && 
                          <Fragment>
                          <Col span={12} style={{borderRight: '1px lightgrey solid', height: '270px'}}>
                            <div style={{height: '135px', borderBottom: '1px lightgrey solid', display: 'flex','justify-content': 'center', 'align-items': 'center'}}>
                              <div style={{ fontWeight: '200', textAlign: 'center', width: '100%'}}>
                                <Icon type="tags" style={{fontSize: '40px', color: '#84b0a7'}} />
                                <div style={{marginTop: '10px'}}>
                                {this.getSubscriptionDetails()}
                              
                                </div>
                              </div>
                            </div>
                            <div style={{height: '135px', display: 'flex','justify-content': 'center', 'align-items': 'center'}}>
                              <div style={{ fontWeight: '200', textAlign: 'center', width: '100%'}}>
                                <Icon type="credit-card" style={{fontSize: '40px', color: '#84b0a7'}} />
                                <div style={{marginTop: '10px'}}>
                                <div><strong>... .... .... {user.currentOrder.lastFourCard}</strong> - (exp. {user.currentOrder.exp_month}/{user.currentOrder.exp_year})</div>
                                <div ><a style={{fontWeight: '300', color: '#84b0a7'}} onClick={() => { this.setState({ focusView: 'changeCard'}); }}>Change Payment Details</a></div>
                                </div>
                              </div>
                            </div>
                            
                          </Col>
                          <Col span={12} style={{ height: '270px'}}>
                            <div style={{height: '135px', borderBottom: '1px lightgrey solid', display: 'flex','justify-content': 'center', 'align-items': 'center'}}>
                              <div style={{ fontWeight: '200', textAlign: 'center', width: '100%'}}>
                                <Icon type="home" style={{fontSize: '40px', color: '#84b0a7'}} />
                                <div style={{marginTop: '10px'}}>
                                <div><strong>{user.currentOrder.firstLineAddress}, {user.currentOrder.city}, {user.currentOrder.state}, {user.currentOrder.zip}</strong></div>
                                <div ><a style={{fontWeight: '300', color: '#84b0a7'}} onClick={() => { this.setState({ focusView: 'changeAddress' }); }}>Change Delivery Address</a></div>
                                </div>
                              </div>
                            </div>
                            <div style={{height: '135px', display: 'flex','justify-content': 'center', 'align-items': 'center'}}>
                              <div style={{ fontWeight: '200', textAlign: 'center', width: '100%'}}>
                                <Icon type="phone" style={{fontSize: '40px', color: '#84b0a7'}} />
                                <div style={{marginTop: '10px'}}>
                                <div><strong>Have a Question? </strong> - We Can Help</div>
                                <div ><a style={{fontWeight: '300', color: '#84b0a7'}}>Request Customer Service</a></div>
                                </div>
                              </div>
                            </div>
                          </Col>
                          </Fragment>
                      }
                      {
                        this.state.focusView == 'changeAddress' && 
                          <Col span={24} style={{textAlign: 'center'}}>
                            <div>
                              <div style={{marginBottom: '20px'}}><Icon type="environment" style={{color: '#84b0a7', fontSize: '40px'}} /></div>
                              <div style={{marginBottom: '20px'}}>
                                <div>Looks like you need to change shipping address...</div>
                                <div>Where should we ship your Abode Box to?</div>
                              </div>
                              <Form layout="inline" onSubmit={this.changeShippingAddress} className="login-form">
                                <div>
                                <Form.Item>
                                  {getFieldDecorator('firstLineAddress', {
                                    rules: [{ required: true, message: 'Please input your address!' }],
                                  })(
                                    <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Line Address" />
                                  )}
                                </Form.Item>
                                <Form.Item>
                                  {getFieldDecorator('secondLineAddress', {
                                    rules: [{ required: false, message: 'Please input your address!' }],
                                  })(
                                    <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Second Line Address" />
                                  )}
                                </Form.Item>
                                </div>
                                <div>
                                  <Form.Item>
                                    {getFieldDecorator('city', {
                                      rules: [{ required: true, message: 'Please input your city!' }],
                                    })(
                                      <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="City" />
                                    )}
                                  </Form.Item>
                                  <Form.Item>
                                    {getFieldDecorator('state', {
                                      rules: [{ required: true, message: 'Please input your state!' }],
                                    })(
                                      <Input prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="State" />
                                    )}
                                  </Form.Item>
                                  <Form.Item>
                                    {getFieldDecorator('zip', {
                                      rules: [{ required: true, message: 'Please input your zip!' }],
                                    })(
                                      <Input prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Zip" />
                                    )}
                                  </Form.Item>
                                  <Form.Item>
                                    {getFieldDecorator('id', {
                                      rules: [{ required: true, message: 'Please input your zip!', hidden: true }],
                                      initialValue: user.currentOrder.id
                                    })(
                                      <Input hidden={true}  />
                                    )}
                                  </Form.Item>
                                </div>
                                <Form.Item>
                                  <Button default htmlType="submit" className="login-form-button" style={{marginRight: '10px'}}>
                                    Save
                                  </Button>
                                  <Button default onClick={() => { this.setState({ focusView: 'overview'}); }} >
                                    Back
                                  </Button>
                                </Form.Item>
                              </Form>

                            </div>
                          </Col>

                      }
                      {
                        this.state.focusView == 'changeCard' && 
                          <Col span={24} style={{textAlign: 'center'}}>
                            <div>
                              <div style={{marginBottom: '20px'}}><Icon type="credit-card" style={{color: '#84b0a7', fontSize: '40px'}} /></div>
                              <StripeCheckout
                                description="Abode Box"
                                image="https://yourdomain.tld/images/logo.svg"
                                locale="auto"
                                name="Abode Box"
                                stripeKey="pk_test_U3oqj5YTzr5mNURghBwfWh5u"
                                token={(e) => {this.onToken(e); }}
                                zipCode
                                panelLabel="Update Card Information"
                                email={this.props.session.user.email}
                              >
                                
                                <div style={{padding: '10px', border: '1px solid lightgray', cursor: 'pointer', background: '#84b0a7', color: 'white', marginTop: '10px'}} onClick={this.openForm}>
                                  <div style={{textAlign: 'center', fontWeight: 200}}>
                                    <div style={{fontSize: '16px'}}>Update Credit Card Information</div>
                                  </div>
                                  <div style={{textAlign: 'center', fontSize: '30px', fontWeight: 200}}>
                                    Update
                                  </div>
                                </div>
                                
                              </StripeCheckout>
                              <div style={{padding: '10px', border: '1px solid lightgray', cursor: 'pointer', marginTop: '10px'}} onClick={() => { this.setState({ focusView: 'overview'}); } }>
                                <div style={{textAlign: 'center', fontWeight: 200}}>
                                  <div style={{fontSize: '16px'}}>Back to My Profile</div>
                                </div>
                                <div style={{textAlign: 'center', fontSize: '30px', fontWeight: 200}}>
                                  Go Back
                                </div>
                              </div>
                            </div>
                          </Col>

                      }
                    </Row>
                  </Col>
                </Row>
              </Col>

            </Row>

          </div>
        </LayoutProvider>
      </div>
    );
  }
}

const ProfileComponent = Form.create({ name: 'Profile' })(Profile);

const { navigateToRoute } = Logic.router.actions;
const { sessionLogin } = Logic.session.actions;
const { update } = Logic.orders.actions;

function mapStateTpProps (state) {
  const isAuthenticated = state.session.authenticated;
  return {
    isAuthenticated,
    session: state.session
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    navigateToRoute,
    sessionLogin,
    updateOrder: update
  }, dispatch);
}

export default withRouter(connect(mapStateTpProps, mapDispatchToProps)(ProfileComponent));
