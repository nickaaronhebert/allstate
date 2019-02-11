import React, { Fragment } from 'react';
import { LayoutProvider } from '../layouts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Logic from '../../logic';

import { Button, Row, Col, List, Avatar, Input } from 'antd';

const Search = Input.Search;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      channelIndex: 0
    };
  }

  render () {
    const { channels } = this.props;
    const { channelIndex } = this.state;

    const currentChannel = channels[channelIndex] ? channels[channelIndex] : {};

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
              <Col span={20}>
                <div>
                  <span style={{fontSize: '48px', fontWeight: '200'}}>Client Messages</span>
                </div>
              </Col>

            </Row>

            <Row gutter={32} type='flex' justify='center' style={{margin: '30px 0px'}}>
              <Col span={7}>
                <List
                  itemLayout="horizontal"
                  bordered={true}
                  dataSource={channels}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a onClick={() => this.setState({ channelIndex: index }) }>{item.customer.name}</a>}
                        description={item.customer.email}
                      />
                      
                    </List.Item>
                  )}
                />
              </Col>
              <Col span={13}>
                {
                  currentChannel.messages && currentChannel.messages.map((message, key) => {
                    if (message.sender == 'decorator') {
                      return (
                        <Fragment key={key}>
                        <div style={{width: '80%', background: '#4d5d53', height: '20px', padding: '0px 10px', color: 'white', fontWeight: '200', marginLeft: '20%'}}>
                          <Row>
                            <Col span={12}>
                              {currentChannel.decorator.name}
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
                        <div style={{width: '80%', background: '#90a498', height: '20px', padding: '0px 10px', color: 'white', fontWeight: '200'}}>
                          <Row>
                            <Col span={12}>
                              {currentChannel.customer.name}
                            </Col>
                            <Col span={12} style={{textAlign: 'right'}}>
                              {moment(message.createdAt).fromNow()}
                            </Col>
                          </Row>
                        </div>
                        <div style={{width: '80%', border: '1px solid lightgray', padding: '10px', marginBottom: '10px'}}>
                          <div>
                            <Row>
                              <Col span={6}>
                                <Avatar size={64}>HS</Avatar>
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
                <Search
                  style={{marginTop: '20px'}}
                  placeholder="input search text"
                  enterButton={<Button style={{background: 'darkgrey', fontWeight: '200', color: 'white'}}>Send Message</Button>}
                  size="large"
                  onSearch={value => {var t = value; this.props.createMessage({text: t, sender: 'decorator', channel: currentChannel.id}); }}
                />
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
    channels: state.containers.messages.channels
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
