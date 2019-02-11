import React from 'react';
import { LayoutProvider } from '../layouts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import { Button, Row, Col, Icon, Divider, List } from 'antd';
import { ReactTypeformEmbed } from 'react-typeform-embed';

import styled from 'styled-components';

const data = [
  'Benton City',
  'Burbank',
  'Richland',
  'Pasco',
  'Kennewick',
  'Finley',
  'Hermiston'
];


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
            <img src='https://static.houselogic.com/content/images/first-time-home-buyer-guide-exterior-standard_396b1fcb0fed83cdb0017727794301af.jpg' style={{width: '100%', marginTop: '70px', height: '650px'}}>
            
          
            </img>
            <div className="text-block">
              <div style={{fontSize: '60px', fontWeight: 200}}>Inspecting Homes</div>
              <div style={{fontSize: '40px', textAlign: 'right', fontWeight: 300}}>As If It Was Our Own</div>
            </div>
          </div>
          <Row type='flex' justify='center' style={{margin: '20px 0px'}}>
            <Col span={16}>
              <Row gutter={32}>
                <Col span={12}>
                  <div>
                    <div style={{fontWeight: 500, fontSize: '18px'}}>Your home is the biggest investment in your life.</div>
                  </div>
                  <div>
                    <div style={{fontWeight: 400, fontSize: '16px', color: 'green'}}>Let All State Inspections guide you in your buying and selling decisions.</div>
                  </div>    
                  <div>
                    <div style={{fontWeight: 400, fontSize: '12px'}}>We highly recommend looking through our many qualifications carefully, but here are some of our highlights to speed up your decision making process:</div>
                  </div>
                  <ul className='qualList' style={{listStyle:'circle', margin: '20px 0px'}}>
                    <li>
                      As a member of the International Association of Certified Home Inspectors, we represent the best-trained and most highly qualified inspectors in the business.
                    </li>
                    <li>
                      All State Inspections is required to continually update our skills, training and education by taking the industry’s most rigorous Continuing Education, created especially for home inspectors by top experts, and accredited by nearly 1,000 state and regulatory agencies across North America
                    </li>
                    <li>
                      We abide by a strict Code of Ethics, which puts our duty to you first;
                    </li>
                    <li>
                      We  follow the inspection industry’s most comprehensive Standards of Practice;
                    </li>
                    <li>
                      All State Inspections uses the latest in inspection tools, technology and reporting software;
                    </li>
                    <li>
                      We offer specialized and ancillary services, in addition to standard, full home inspections, so that we can meet your specific inspection needs – just ask!
                    </li>
                    <li>
                      All State Inspections performs a complete, unbiased, visual examination of the property;
                    </li>
                    <li>
                      We encourage our clients to be present during inspections and welcome all questions. It is our goal to help you understand any equipment operation and will highlight the location of important features
                    </li>
                    <li>
                      Finally, All State Inspections will work with you on a personal level to both address and remedy any concerns that may exist with your home. All findings are clearly and completely printed out in a narrative report for the client.
                    </li>
                  </ul>

                  




                </Col>
                <Col span={12}>
                  <div>
                    <div style={{backgroundColor: 'whitesmoke', padding: '10px', width: '100%', fontWeight: 600, fontSize: '20px'}}>
                      <div>ALL STATE INSPECTIONS</div>
                      <div style={{marginTop: '20px'}}>
                      <div><Icon type='phone'/> (509)-378-2549</div>
                      <div><Icon type='global'/> 5900 W 17th Ave, Kennewick, WA 99338</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{backgroundColor: '#145314', padding: '10px', width: '100%', color: 'white', textAlign: 'center', fontWeight: 600}}>
                      DOWNLOAD SAMPLE REPORT
                    </div>
                  </div>

                  <div style={{marginTop: '20px'}}>
                    <img src='http://www.crayplumbing.com/wp-content/uploads/2016/05/Tri-cities-wa-map.png'>
                    </img>
                  </div>
                  <div style={{marginTop: '20px'}}>
                    <Divider>Areas We Serve</Divider>
                    <div style={{height: '200px', overflowY: 'scroll'}}>
                      <List
                        bordered
                        dataSource={data}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                      />
                    </div>
                  </div>
                  <div>
                    
                    
                  </div>
                  
                  
                </Col>
                <Col span={24} style={{textAlign: 'center'}}>
                                <ReactTypeformEmbed
                      popup={true}
                      autoOpen={false}
                      url={`https://nickhebert1.typeform.com/to/lXRjdS`}
                      hideHeaders={true}
                      hideFooter={true}
                      buttonText="Go!"
                      style={{top: 100}}
                      onSubmit={(e) => {
                        this.typeformEmbed.typeform.close();
                        return e;
                      }}
                      ref={(tf => this.typeformEmbed = tf) }/>
                      <button className="btn" onClick={this.openForm} style={{ cursor: 'pointer', backgroundColor: '#145314', padding: '20px', color: 'white', fontWeight: '600', width: '50%' }}>
                        REQUEST AN INSPECTION
                      </button>
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
