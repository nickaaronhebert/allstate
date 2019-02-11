import React from 'react';
import { LayoutProvider } from '../layouts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import { Button, Row, Col, Icon } from 'antd';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
    };
  }

  render () {
    const { user: { name } } = this.props.session;

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
              <Col span={16}>
                <div>
                  <span style={{fontSize: '48px', fontWeight: '200'}}>Welcome, {name}</span>
                </div>
                <div>
                  <span style={{fontSize: '24px', fontWeight: '200'}}>Thanks for being an excellent decorator</span>
                </div>
              </Col>

            </Row>

            <Row gutter={32} type='flex' justify='center' style={{margin: '30px 0px'}}>
              <Col span={4}>
                <div style={{width: '100%', border: '1px solid lightgray', textAlign: 'center'}} onClick={() => { this.props.navigateToRoute({ to: '/decorator/messages', replace: false}); } }>
                  <div><span style={{fontWeight: '200', fontSize: '16px'}}>Client Messages </span></div>
                  <div style={{margin: '20px 0px'}}><Icon type="inbox"  style={{fontSize: '48px'}}/></div>
                  <div><span style={{fontWeight: '200', fontSize: '16px'}}>24 Messages </span></div>
                </div>
              </Col>
              <Col span={4}>
                <div style={{width: '100%', border: '1px solid lightgray', textAlign: 'center'}} onClick={() => { this.props.navigateToRoute({ to: '/decorator/clients', replace: false}); } }>
                  <div><span style={{fontWeight: '200', fontSize: '16px'}}>Active Clients </span></div>
                  <div style={{margin: '20px 0px'}}><Icon type="user"  style={{fontSize: '48px'}}/></div>
                  <div><span style={{fontWeight: '200', fontSize: '16px'}}> 3 Active Clients</span></div>
                </div>
              </Col>
              <Col span={4}>
                
              </Col>
              <Col span={4}>
                
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
    paymentReceived
  }, dispatch);
}

export default withRouter(connect(mapStateTpProps, mapDispatchToProps)(Home));
