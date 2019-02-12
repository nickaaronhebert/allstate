import React from 'react';
import { LayoutProvider } from '../layouts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import { Button, Row, Col, Avatar } from 'antd';

import styled from 'styled-components';

const StyleWrapper = styled.div`
  .text-block {
    position: absolute;
    bottom: 100px;
    right: 20px;
    background-color: black;
    color: white;
    padding: 10px;
    fontSize: 30px;
    opacity: .7;
  }

  .qualList > li {
    margin-top: 10px
  }
`;


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
    this.state = {

    };
  }

  openForm() {
    this.typeformEmbed.typeform.open();
  }

  render () {


    return (
      <div style={{height: '100%'}}>
        <StyleWrapper style={{ height: '100%' }}>
        <LayoutProvider 
          type='external'
          header={{
            left: () => {
              return (<div style={{textAlign: 'right'}}><p>Recent Boxes</p></div>);
            },
            right: () => {
              return (
                <div >
                  <Button style={{marginRight: '20px'}} onClick={() => { this.props.navigateToRoute({ to: '/login', replace: false}); } }>Login</Button>
                  <Button onClick={() => {this.props.navigateToRoute({ to: '/register', replace: false}); } }>Get Started</Button>
                </div>
              );
            },
          }}
          >
          <div style={{position: 'relative'}}>
            <img src='https://www.winnetu.com/wp-content/uploads/2010/10/banner-accommodation-townhouses-bay-private-homes-01.jpg' style={{width: '100%', marginTop: '70px', height: '450px'}}>
            
          
            </img>
            <div className="text-block">
              <div style={{fontSize: '60px', fontWeight: 200}}>We Take Care</div>
              <div style={{fontSize: '40px', textAlign: 'right', fontWeight: 300}}>Of Your Clients</div>
            </div>
          </div>
          <Row type='flex' justify='center' style={{margin: '20px 0px'}}>
            <Col span={16}>
              <Row gutter={32}>
                <Col span={12}>
                  <div>
                    <h1>Helping You Help Your Clients</h1>
                  </div>
                  <div>
                    <br/><p>Your clients trust you to give them the best advise. At many points in the real estate transaction, 
                    your clients rely on your knowledge to provide them good advise. That is why it is important for you to 
                    have the best relationships with real estate partners. 
                    </p>
                    <br/><p>
                      <strong>All State Inspections</strong> would love to be your preferred home inspection company for your clientel. 
                      We value working with you and with your clients. We understand how valuable your time as a realtor is so here is how we offer your clients the most value for their dollar:
                    </p><br/>
                    <ul style={{listStyle: 'circle'}}>
                      <li>Pre-Inspection Survey to Eliminate for Time-Consuming Paperwork during Inspection</li>
                      <li>Easy-to-read summary documents to help you and your clients digest the contents of your report</li>
                    </ul>
                  </div>
                </Col>
                <Col span={12} style={{textAlign: 'center'}}>
                  <Avatar size={240} style={{}} icon="user" src='http://prestigehomestricities.com/uploads/images/201608131425052980.jpg' />
                  <div style={{marginTop: '20px'}}>
                    <div><h3>Katherine Thompson</h3></div>
                    <div><div><em>Premier Real Estate of Tri-Cities</em></div></div>
                    <div style={{marginTop: '30px'}}><div><em>When it comes to getting a high-quality inspection quickly and affordably, there is no one I trust more than the folks at All State Inspections. I can always expect my questions to be answered honestly and kindly. I know my clients will be presented with the most thorough findings that help them make good decisions. I appreciate every interaction with these guys.</em></div></div>
                  </div>
                </Col>
              </Row>             

            </Col>
            
           

          </Row>
        </LayoutProvider>
        </StyleWrapper>
      </div>
    );
  }
}

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

export default withRouter(connect(mapStateTpProps, mapDispatchToProps)(Home));
