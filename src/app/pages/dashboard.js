import React, { Fragment } from 'react';
import { LayoutProvider } from '../layouts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import { Button, Row, Col, Icon, Divider, Avatar, Input, Tag } from 'antd';
import HomeDecorLivingRoom from '../../image/homeDecorLivingRoom.png';
import HomeDecorKitchen from '../../image/homeDecorKitchen.png';
import HomeDecorBathroom from '../../image/homeDecorBathroom.png';
import HomeDecorBedroom from '../../image/homeDecorBedroom.png';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import StripeCheckout from 'react-stripe-checkout';
import moment from 'moment';
//import Message from '../../dashboard/components/message';

const Search = Input.Search;

const statusDescriptors = { 'questionnaire-needed': { status: 'Not Yet Started - Time To Get To Know You', line: 'Lets get personal'},
                            'billing-needed': { status: 'The No-Fun Money Part', line: 'It will be quick and painless. We promise'},
                            'active': { status: 'Active', line: 'You stylish fox, you!'},
                            'inactive': { status: 'Inactive', line: 'Baby...Come back...You can blame it all on me.'},
                          };
const itemMap = { 'oneTimeBox' : 'One Time Box', 'subscriptionBox': 'Subscription Style'};

const greeting = { 'questionnaire-needed': 'Welcome', 'billing-needed': 'Next Step', 'active': 'You are all set'};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
    this.state =  {
      activeItem: 'oneTimeBox',
      cost:  {'oneTimeBox': 5000, 'subscriptionBox': 4500}
    };
  }

  openForm() {
    this.typeformEmbed.typeform.open();
  }

  setActiveItem(box) {
    this.setState({ activeItem: box});
  }

  getBoxStyle(box) {
    if (box == this.state.activeItem) {
      return {
        backgroundColor: '#84b0a7',
        color: 'white',
        fontWeight: 300
      };
    }
    else {
      return {
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 200
      };
    }
  }

  onToken(e) {
    this.props.paymentReceived({user: this.props.session.user.id, token: e, type: this.state.activeItem });
  }

  render () {
    const { user: { subscriptionStatus, decorator, id, email, firstName } } = this.props.session;

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
          <div>
            <div style={{width: '100%', backgroundImage: `url('https://www.savers.com/sites/default/files/home-banner_1_0.jpg')`, backgroundRepeat: 'no-repeat', 'backgroundSize': 'fill', height: '250px'}}>
              
            
            </div>
            <Row type='flex' justify='center' style={{marginTop: '30px'}}>
              <Col span={17}>
                <div>
                  <span style={{fontSize: '48px', fontWeight: '200'}}>{greeting[subscriptionStatus]}, {firstName}</span>
                </div>
                <div>
                  <span style={{fontSize: '24px', fontWeight: '200'}}>Subscription Status: <span style={{fontWeight: 300}}>{statusDescriptors[subscriptionStatus].status}</span></span>
                </div>
                {
                  subscriptionStatus == 'questionnaire-needed' &&
                    <Row style={{margin: '50px 0px 50px 0px'}} gutter={32}>
                      <Col span={8}>
                        <div style={{padding: '10px', border: '1px solid lightgray'}}>
                          <div style={{textAlign: 'center', fontWeight: 200}}>
                            <div style={{fontSize: '16px'}}>What is my </div>
                          </div>
                          <div style={{textAlign: 'center', fontSize: '30px', fontWeight: 200}}>
                            Next Step?
                          </div>
                        </div>
                      </Col>
                      <Col span={10}>
                        <ReactTypeformEmbed
                            popup={true}
                            autoOpen={false}
                            url={`https://nickhebert1.typeform.com/to/d6eOGf?user=${id}`}
                            hideHeaders={true}
                            hideFooter={true}
                            buttonText="Go!"
                            style={{top: 100}}
                            onSubmit={(e) => {
                              this.props.updateSessionUser({subscriptionStatus: 'billing-needed'});
                              this.typeformEmbed.typeform.close();
                              return e;
                            }}
                            ref={(tf => this.typeformEmbed = tf) }/>
                        <div style={{padding: '10px', border: '1px solid lightgray', cursor: 'pointer', background: '#84b0a7', color: 'white'}} >
                          <div style={{textAlign: 'center', fontWeight: 200}}>
                            <div style={{fontSize: '16px'}}>5 Minute</div>
                          </div>
                          <div style={{textAlign: 'center', fontSize: '30px', fontWeight: 200}} onClick={this.openForm}>
                            Style Questionnaire
                          </div>
                        </div>
                      </Col>
                    </Row>
                }
                {
                  subscriptionStatus == 'billing-needed' &&
                  <Fragment>
                  <Row style={{marginTop: '50px'}} gutter={32}>
                    <Col span={8}>
                      <div style={{padding: '10px', border: '1px solid lightgray'}}>
                        <div style={{textAlign: 'center', fontWeight: 200}}>
                          <div style={{fontSize: '16px'}}>What is my </div>
                        </div>
                        <div style={{textAlign: 'center', fontSize: '30px', fontWeight: 200}}>
                          Next Step?
                        </div>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div style={{padding: '10px', border: '1px solid lightgray', cursor: 'pointer', background: '#84b0a7', color: 'white'}} >
                        <div style={{textAlign: 'center', fontSize: '30px', fontWeight: 200}}>
                          No-fun Money Part
                        </div>
                        <div style={{textAlign: 'center', fontWeight: 200}}>
                          <div style={{fontSize: '16px'}}>(Scroll Down)</div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{backgroundColor: '#e8ecf0', padding: '20px', margin: '50px 0px'}}>
                    <Col span={24}>
                      <div style={{padding: '10px', backgroundColor: '#84b0a7'}}>
                        <Row gutter={32}>
                          <Col span={12}>
                            <div style={{backgroundColor: 'white', padding: '10px 20px'}}>
                              <div><span style={{fontSize: '24px', fontWeight: '200'}}>Choose a plan</span></div>
                              <Divider/>
                              <Row gutter={32} style={{paddingBottom: '20px'}}>
                                <Col span={12}>
                                  <div style={{padding: '10px', border: '1px solid lightgray', cursor: 'pointer', ...this.getBoxStyle('oneTimeBox')}} onClick={() => this.setActiveItem('oneTimeBox')} >
                                    <div style={{textAlign: 'center', fontWeight: 200}}>
                                      <div style={{fontSize: '16px'}}> One Time Box</div>
                                    </div>
                                    <div style={{textAlign: 'center', fontSize: '30px', fontWeight: 200}}>
                                      $50
                                    </div>
                                    <div style={{textAlign: 'center', fontWeight: 200}}>
                                      <div style={{fontSize: '16px'}}>Arriving Mid March</div>
                                    </div>
                                  </div>
                                </Col>
                                <Col span={12}>
                                  <div style={{padding: '10px', border: '1px solid lightgray', cursor: 'pointer', ...this.getBoxStyle('subscriptionBox') }} onClick={() => this.setActiveItem('subscriptionBox')}>
                                    <div style={{textAlign: 'center', fontWeight: 200}}>
                                      <div style={{fontSize: '16px'}}>Subscription Style</div>
                                    </div>
                                    <div style={{textAlign: 'center', fontSize: '30px', fontWeight: 200}}>
                                      $45/box
                                    </div>
                                    <div style={{textAlign: 'center', fontWeight: 200}}>
                                      <div style={{fontSize: '16px'}}>Every Other Month</div>
                                    </div>
                                  </div>
                                </Col>
                                {
                                  this.state.activeItem == 'oneTimeBox' && 
                                  <Col span={24}>
                                    <div style={{marginTop: '20px'}}>
                                    <div style={{fontSize: '16px', fontWeight: '300'}}>What is included in my one time box?</div>
                                    <ul style={{marginTop: '15px'}}>
                                      <li style={{marginTop: '15px', fontWeight: '200'}}>Highly-curated, individualized products that will highlight the uniqueness of your home</li>
                                      <li style={{marginTop: '15px', fontWeight: '200'}}>A relationship-centered interior designer who can answer your questions about products in your box and guide you in implementing it in your space</li>
                                      <li style={{marginTop: '15px', fontWeight: '200'}}>A one-time coupon for a discounted gift Abode Box to send to a friend, family member, or special someon</li>
                                    </ul>
                                    </div>

                                  </Col>  
                                }
                                {
                                  this.state.activeItem == 'subscriptionBox' && 
                                  <Col span={24}>
                                    <div style={{marginTop: '20px'}}>
                                    <div style={{fontSize: '16px', fontWeight: '300'}}>What is included in my subscription box?</div>
                                    <ul style={{marginTop: '15px'}}>
                                      <li style={{marginTop: '15px', fontWeight: '200'}}>Highly-curated, individualized products that will highlight the uniqueness of your home</li>
                                      <li style={{marginTop: '15px', fontWeight: '200'}}>A relationship-centered interior designer who advises on how to further enhance your space</li>
                                      <li style={{marginTop: '15px', fontWeight: '200'}}>Access to our limited access product library for future ordering and gifting</li>
                                      <li style={{marginTop: '15px', fontWeight: '200'}}>Once a year voucher to gift an Abode Box to a friend, family member, or special someone</li>
                                    </ul>
                                    </div>

                                  </Col>  
                                }
                                
                              </Row>
                              

                            </div>
                          </Col>
                          <Col span={12}>
                            <div style={{backgroundColor: 'white', padding: '10px 20px 35px 20px'}}>
                              <div><span style={{fontSize: '24px', fontWeight: '200'}}>Order Summary</span></div>
                              <Divider/>
                              
                              {
                                this.state.activeItem == 'oneTimeBox' && 
                                <Row>
                                  <Col span={18}>
                                    <div >
                                      <div style={{fontSize: '16px', fontWeight: '300'}}>One Time Box</div>
                                    </div>
                                    <div >
                                      <div style={{fontSize: '12px', fontWeight: '200'}}>Arriving Mid-March</div>
                                    </div>
                                  </Col>
                                  <Col span={6}>
                                    <div >
                                      <div style={{fontSize: '16px', fontWeight: '300'}}>$50.00</div>
                                    </div>
                                  </Col>
                                  <Col span={18}>
                                    <div >
                                      <div style={{fontSize: '16px', fontWeight: '300'}}>Taxes</div>
                                    </div>
                                  </Col>
                                  <Col span={6}>
                                    <div >
                                      <div style={{fontSize: '16px', fontWeight: '300'}}>Included</div>
                                    </div>
                                  </Col>
                                  <Col span={18} style={{marginTop: '40px'}}>
                                    <div >
                                      <div style={{fontSize: '16px', fontWeight: '300'}}>Total</div>
                                    </div>
                                  </Col>
                                  <Col span={6} style={{marginTop: '40px'}}>
                                    <div >
                                      <div style={{fontSize: '16px', fontWeight: '300'}}>$50.00</div>
                                    </div>
                                  </Col>
                                </Row>
                                  
                              }
                              {
                                this.state.activeItem == 'subscriptionBox' && 
                                <Row>
                                  <Col span={18}>
                                    <div >
                                      <div style={{fontSize: '16px', fontWeight: '300'}}>Subscription Style</div>
                                    </div>
                                    <div >
                                      <div style={{fontSize: '12px', fontWeight: '200'}}>Sent Every Other Month</div>
                                    </div>
                                  </Col>
                                  <Col span={6}>
                                    <div >
                                      <div style={{fontSize: '16px', fontWeight: '300'}}>$45.00</div>
                                    </div>
                                  </Col>
                                  <Col span={18}>
                                    <div >
                                      <div style={{fontSize: '16px', fontWeight: '300'}}>Taxes</div>
                                    </div>
                                  </Col>
                                  <Col span={6}>
                                    <div >
                                      <div style={{fontSize: '16px', fontWeight: '300'}}>Included</div>
                                    </div>
                                  </Col>
                                  <Col span={18} style={{marginTop: '40px'}}>
                                    <div >
                                      <div style={{fontSize: '16px', fontWeight: '300'}}>Total</div>
                                    </div>
                                  </Col>
                                  <Col span={6} style={{marginTop: '40px'}}>
                                    <div >
                                      <div style={{fontSize: '16px', fontWeight: '300'}}>$45.00</div>
                                    </div>
                                  </Col>
                                  <Col span={24}>
                                    <div >
                                      <div style={{fontSize: '12px', fontWeight: '200', fontStyle: 'italic'}}>*Billing will occur on the first of each month that a box is sent your way</div>
                                    </div>
                                  </Col>

                                  
                                </Row>
                                  
                              }
                              <Row style={{marginTop: '20px'}}>
                                <Col span={24}>
                                  <div >
                                    <Input size="large" placeholder="Coupon Code? Ohhh...we love those" />
                                  </div>
                                </Col>
                              </Row>

                              <StripeCheckout
                                amount={this.state.cost[this.state.activeItem]}
                                billingAddress
                                shippingAddress
                                description="Abode Box"
                                image="https://yourdomain.tld/images/logo.svg"
                                locale="auto"
                                name="Abode Box"
                                stripeKey="pk_test_U3oqj5YTzr5mNURghBwfWh5u"
                                token={(e) => {this.onToken(e); }}
                                zipCode
                                email={email}
                              >
                                
                                <div style={{padding: '10px', border: '1px solid lightgray', cursor: 'pointer', background: '#84b0a7', color: 'white', marginTop: '10px'}} onClick={this.openForm}>
                                  <div style={{textAlign: 'center', fontWeight: 200}}>
                                    <div style={{fontSize: '16px'}}>{itemMap[this.state.activeItem]}</div>
                                  </div>
                                  <div style={{textAlign: 'center', fontSize: '30px', fontWeight: 200}}>
                                    Continue Checkout
                                  </div>
                                </div>
                              </StripeCheckout>

                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  </Fragment>
                }
                {
                  subscriptionStatus == 'active' && 
                    <Fragment>
                    <Row gutter={32} style={{marginTop: '50px'}}>
                      <Col span={8}>
                        <div style={{width: '100%', border: '1px solid lightgray', textAlign: 'center'}}>
                          <div><span style={{fontWeight: '200', fontSize: '16px'}}>Next Box Status: </span></div>
                          <div style={{margin: '20px 0px'}}><Icon type="code-sandbox"  style={{fontSize: '48px', color: '#84b0a7'}}/></div>
                          <div><span style={{fontWeight: '200', fontSize: '16px'}}>Est. Arrival:  </span></div>
                          <div><span style={{fontWeight: '200', fontSize: '16px'}}> {moment(this.props.session.user.currentOrder.nextDelivery.estimatedArrivalDate).fromNow()}  </span></div>
                        </div>
                      </Col>
                      <Col span={8}>
                        <div style={{width: '100%', border: '1px solid lightgray', textAlign: 'center', cursor: 'pointer'}} onClick={() => { this.props.navigateToRoute({to: '/profile', replace: false}); } }>
                          <div><span style={{fontWeight: '200', fontSize: '16px'}}>My Profile </span></div>
                          <div style={{margin: '20px 0px'}}><Icon type="idcard" style={{fontSize: '48px', color: '#84b0a7'}} /></div>
                          <div><span style={{fontWeight: '200', fontSize: '16px'}}>Edit Profile. </span></div>
                          <div><span style={{fontWeight: '200', fontSize: '16px'}}>Billing Information </span></div>
                        </div>
                      </Col>
                      <Col span={8}>
                        <div style={{width: '100%', border: '1px solid lightgray', textAlign: 'center'}}>
                          <div><span style={{fontWeight: '200', fontSize: '16px'}}>Invite Friend To Abode Box </span></div>
                          <div style={{margin: '20px 0px'}}><Icon type="idcard" style={{fontSize: '48px', color: '#84b0a7'}} /></div>
                          <div><span style={{fontWeight: '200', fontSize: '16px'}}>Share a Box. </span></div>
                          <div><span style={{fontWeight: '200', fontSize: '16px'}}>Get a free Box. </span></div>
                        </div>
                      </Col>
                    </Row>
                    <Row style={{margin: '80px 0px'}}>
                  
                      <Col span={24}>
                        <div style={{textAlign: 'left'}}>
                          <span style={{fontSize: '30px', fontWeight: '200'}}>Your Personal Interior Designer</span>
                          <Divider/>
                          <Row>
                            <Col span={10}>
                              <div style={{textAlign: 'center', padding: '30px 0px'}}>
                              <Avatar src={decorator.picture} style={{height: '200px', width: '200px'}} />
                              <div style={{marginTop: '20px'}}>
                                <span>{decorator.name}</span>
                              </div>
                              </div>
                            </Col>
                            <Col span={14} style={{padding: '20px'}}>
                              <div style={{marginBottom: '20px'}}>
                                {
                                  this.props.channel.messages && this.props.channel.messages.map((message, key) => {

                                    if (message.sender == 'decorator') {
                                      return (
                                        <Fragment key={key}>
                                        <div style={{width: '80%', background: '#90a498', height: '20px', padding: '0px 10px', color: 'white', fontWeight: '200', marginLeft: '20%'}}>
                                          <Row>
                                            <Col span={12}>
                                              {this.props.channel.decorator.name}
                                            </Col>
                                            <Col span={12} style={{textAlign: 'right'}}>
                                              {moment(message.createdAt).fromNow()}
                                            </Col>
                                          </Row>
                                        </div>
                                        <div style={{width: '80%', border: '1px solid lightgray', padding: '10px', marginBottom: '10px', marginLeft: '20%'}}>
                                          <div>
                                            <Row>
                                              
                                              <Col span={18}>
                                                <span style={{fontWeight: '200'}}>{message.text}</span>
                                              </Col>
                                              <Col span={6}>
                                                <Avatar size={64}>HS</Avatar>
                                              </Col>
                                            </Row>
                                          
                                          </div>
                                        </div>
                                        </Fragment>
                                      );
                                    }
                                    else {
                                      return (
                                        <Fragment key={key}>
                                        <div style={{width: '80%', background: '#4d5d53', height: '20px', padding: '0px 10px', color: 'white', fontWeight: '200'}}>
                                          <Row>
                                            <Col span={12}>
                                              {this.props.channel.customer.name}
                                            </Col>
                                            <Col span={12} style={{textAlign: 'right'}}>
                                              {moment(message.createdAt).fromNow()}
                                            </Col>
                                          </Row>
                                        </div>
                                        <div style={{width: '80%', border: '1px solid lightgray', padding: '10px', marginBottom: '10px',}}>
                                          <div>
                                            <Row>
                                              <Col span={6}>
                                                <Avatar size={64}>NH</Avatar>
                                              </Col>
                                              <Col span={18}>
                                                <span style={{fontWeight: '200'}}>{message.text}</span>
                                              </Col>
                                            </Row>
                                          
                                          </div>
                                        </div>
                                        </Fragment>
                                      );
                                    }
                                  })
                                }
                                
                              </div>

                              

                              
                              <Search
                                style={{marginTop: '20px'}}
                                placeholder="input search text"
                                enterButton={<Button style={{background: 'darkgrey', fontWeight: '200', color: 'white'}}>Send Message</Button>}
                                size="large"
                                onSearch={value => {var t = value; this.props.createMessage({text: t, sender: 'customer', channel: this.props.channel.id}); }}
                              />
                              

                            </Col>
                          </Row>


                        </div>
                      </Col>
                      <Col span={24}>
                        <div style={{marginTop: '100px', textAlign: 'left'}}>
                          <span style={{fontSize: '30px', fontWeight: '200'}}>Your Spaces</span>
                          <Divider/>


                          <div>
                          <span style={{fontSize: '24px', fontWeight: '200'}}>Help us understand your unique space and style...</span>
                          </div>
                          <Row gutter={16} style={{marginTop: '50px'}}>
                            <Col span={6}>
                              <div style={{width: '100%', border: '1px solid lightgray', textAlign: 'center'}}>
                                <div><span style={{fontWeight: '200', fontSize: '16px'}}>Living Room: </span></div>
                                <div style={{margin: '20px 0px'}}><img style={{width: '50px'}} src={HomeDecorLivingRoom}/></div>
                                <div><span style={{fontWeight: '200', fontSize: '16px'}}>Where My People Chill</span></div>
                              </div>
                              <div style={{width: '100%', border: '1px solid lightgray', textAlign: 'center', padding: '5px'}}>
                                <Tag color="grey" onClick={() => { this.props.navigateToRoute({ to: '/spaces/living', replace: false });} }>Edit Photos</Tag>
                                <Tag color="#84b0a7">Next Up...</Tag>
                              </div>
                            </Col>
                            <Col span={6}>
                              <div style={{width: '100%', border: '1px solid lightgray', textAlign: 'center'}}>
                                <div><span style={{fontWeight: '200', fontSize: '16px'}}>Kitchen </span></div>
                                <div style={{margin: '20px 0px'}}><img style={{width: '50px'}} src={HomeDecorKitchen}/></div>
                                <div><span style={{fontWeight: '200', fontSize: '16px'}}>Where My People Eat</span></div>
                              </div>
                              <div style={{width: '100%', border: '1px solid lightgray', textAlign: 'center', padding: '5px'}}>
                                <Tag color="grey" onClick={() => { this.props.navigateToRoute({ to: '/spaces/kitchen', replace: false });} }>Edit Photos</Tag>
                                <Tag color="#84b0a7">Coming Soon...</Tag>
                              </div>
                            </Col>
                            <Col span={6}>
                              <div style={{width: '100%', border: '1px solid lightgray', textAlign: 'center'}}>
                                <div><span style={{fontWeight: '200', fontSize: '16px'}}>Bathroom </span></div>
                                <div style={{margin: '20px 0px'}}><img style={{width: '50px'}} src={HomeDecorBathroom}/></div>
                                <div><span style={{fontWeight: '200', fontSize: '16px'}}>Where My People Ponder</span></div>
                              </div>
                              <div style={{width: '100%', border: '1px solid lightgray', textAlign: 'center', padding: '5px'}}>
                                <Tag color="grey" onClick={() => { this.props.navigateToRoute({ to: '/spaces/bathroom', replace: false });} }>Edit Photos</Tag>
                                <Tag color="#84b0a7">So Ready</Tag>
                              </div>
                            </Col>
                            <Col span={6}>
                              <div style={{width: '100%', border: '1px solid lightgray', textAlign: 'center'}}>
                                <div><span style={{fontWeight: '200', fontSize: '16px'}}>Master Bedroom</span></div>
                                <div style={{margin: '20px 0px'}}><img style={{width: '50px'}} src={HomeDecorBedroom}/></div>
                                <div><span style={{fontWeight: '200', fontSize: '16px'}}>Where I Relax</span></div>
                              </div>
                              <div style={{width: '100%', border: '1px solid lightgray', textAlign: 'center', padding: '5px'}}>
                                <Tag color="grey" onClick={() => { this.props.navigateToRoute({ to: '/spaces/bedroom', replace: false });} }>Photos Needed</Tag>
                                <Tag color="#84b0a7">Questions</Tag>
                              </div>
                            </Col>
                            
                          </Row>



                        </div>
                      </Col>
                    </Row>
                    </Fragment>
                }
                
                
              </Col>

            </Row>

          </div>
        </LayoutProvider>
      </div>
    );
  }
}

const { navigateToRoute } = Logic.router.actions;
const { sessionLogin } = Logic.session.actions;
const { updateSessionUser, paymentReceived } = Logic.users.actions;
const { createMessage } = Logic.messages.actions;

function mapStateTpProps (state) {
  const isAuthenticated = state.session.authenticated;
  return {
    isAuthenticated,
    session: state.session,
    channel: state.containers.messages.channels[0] ? state.containers.messages.channels[0] : {}
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    navigateToRoute,
    sessionLogin,
    updateSessionUser, 
    paymentReceived,
    createMessage
  }, dispatch);
}

export default withRouter(connect(mapStateTpProps, mapDispatchToProps)(Home));
