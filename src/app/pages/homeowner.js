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
              <div style={{fontSize: '60px', fontWeight: 200}}>Your Dream.</div>
              <div style={{fontSize: '40px', textAlign: 'right', fontWeight: 300}}>Our Responsibility</div>
            </div>
          </div>
          <Row type='flex' justify='center' style={{margin: '20px 0px'}}>
            <Col span={16}>
              <Row gutter={32}>
                <Col span={12}>
                  <div>
                    <h1>We Protect Your Dream. Our Full Inspection Promise</h1>
                  </div>
                  <div>
                    <br/><p>As home inspectors, we know that we are often the only thing that stands between you and the place you want to call home. We also know that your home is your biggest investment. We want to make sure that your investment is protected against unforseen risks. This is why we inspect each home <strong><em> as if it was our very own </em></strong>. In so doing, we can promise the most thorough service in town. 
                    </p>
                    <br/><p>
                      <strong>All State Inspections</strong> would love to be your lifelong home inspection company. 
                      We value working with homebuyers for not only once but on each step of your familys journey as you size up, down, or just change location.
                      Here is a list of things we are looking for and checking as we conduct our inspection: 
                    </p><br/>
                    <ul style={{listStyle: 'circle'}}>
                      <li>Proper Electrical Practices and Safety</li>
                      <li>Structural Continuity</li>
                      <li>Attic Walkthrough</li>
                      <li>Crawl-space Check</li>
                      <li>Roof Inspection</li>
                      <li>Maintained Heating and Cooling</li>
                      <li>Mold and Termite Check</li>
                      <li>And so much more...</li>
                    </ul>
                  </div>
                </Col>
                <Col span={12} style={{textAlign: 'center'}}>
                  <Avatar size={240} style={{}} icon="user" src='https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-1/p320x320/37347271_10214484941631544_1982809104313221120_n.jpg?_nc_cat=104&_nc_ht=scontent-sea1-1.xx&oh=49e364ce18df29d428f01d0605c8f171&oe=5CEF92C7' />
                  <div style={{marginTop: '20px'}}>
                    <div><h3>Nick and Madison Hebert</h3></div>
                    <div><div><em>All State Clients - Kennewick, Washington</em></div></div>
                    <div style={{marginTop: '30px'}}><div><em>Home inspections are nerve-racking events. As a homebuyer, you feel like so much is out of your hands. There are so many words and things you have never heard of. <strong>All State Inspections</strong> does a nice job at making sure that all your questions are answered and that they dont rush through the inspection just to get done. I would recommend them to anyone.</em></div></div>
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
