import React, { Component} from 'react';
import { Layout, Row, Col, Alert, Divider, Input, Icon, Menu } from 'antd';
import '../styles/global.css';
import styled from 'styled-components';
import Logic from '../../logic';
import AllStateLogo from '../../image/allStateLogo.jpg';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const { Content, Header, Footer } = Layout;
const Search = Input.Search;
const { navigateToRoute } = Logic.router.actions;

const StyleWrapper = styled.div`
  .block-ui-overlay {
    opacity: .7;
    background-color: black;
  }

  .block-ui-message-container {
    top: 20% !important;
  }

  .block-ui-message {
    color: white;
    font-size: 36px
  }

  .block-ui {
    z-index: 10
  }

  .ant-layout-header {
    border-bottom: 1px solid lightgray;
    padding-right: 0px;
    padding-left: 0px
  }

  .ant-menu {
    line-height: 30px;
    border: 0px;
    background-color: #f3f3f3;

  }

  .ant-menu:hover {
    color: green;
    fontWeight: 600px
  }

  .ant-menu-horizontal > .ant-menu-item:hover {
    border-bottom: 0px;
    color: green;
  }

  .secondaryNavBar {
    background-color: white;
    line-height: 100px;
    font-size: 16px;
    color: green;
  }
`;

class External extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

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

  handleClick(e) {
    this.props.navigateToRoute({to: e.key, replace: false});
  }

  render () {
    return (
      <div style={{ height: '100%' }}>
        <StyleWrapper style={{ height: '100%' }}>
          <Layout style={{ height: '100%' }}>
           
            <Header style={{ margin: '0px', height: '140px', position: 'fixed', zIndex: 1, width: '100%', backgroundColor: 'white', border: '1px solid bottom lightgray' }}>
              <div style={{backgroundColor: '#f3f3f3', lineHeight: '30px'}}>
                <Row>
                  <Col span={4}>
                  </Col>
                  <Col span={6}>
                    <div style={{fontSize: '10px', color: 'green'}}>
                      <span>All State Inspections</span>
                      <span style={{marginLeft: '10px', color: 'black'}}>Serving Tri-Cities, Washington</span>
                    </div>
                    
                  </Col>
                  <Col span={10}>
                    <Menu mode='horizontal' onClick={(e) => {this.handleClick(e);}}>
                      <Menu.Item key='about' style={{fontWeight: '600', fontSize: '12px'}}>About Us</Menu.Item>
                      <Menu.Item key='contact' style={{fontWeight: '600', fontSize: '12px'}}>Contact Us</Menu.Item>
                      <Menu.Item key='request' style={{fontWeight: '600', fontSize: '12px'}}>Request An Inspection</Menu.Item>
                      <Menu.Item key='tools' style={{fontWeight: '600', fontSize: '12px'}}>Tools and Resources</Menu.Item>
                    </Menu>
                  </Col>
                  <Col span={4}>
                    <span style={{fontWeight: '600'}}>(509) 378-2549</span>
                  </Col>
                </Row>
              </div>
              <div style={{backgroundColor: 'white', lineHeight: '100px'}}>
                <Row style={{height: '70px'}}>
                  <Col span={4}>
                  </Col>
                  <Col span={6} style={{ }}>
                    <img onClick={() => {this.props.navigateToRoute({ to: '/', replace: false });}} src={AllStateLogo} style={{width: '180px', height: '100px', cursor: 'pointer'}}/>
                  </Col>
                  <Col span={14}>
                    <Menu mode='horizontal' className='secondaryNavBar' onClick={(e) => {this.handleClick(e);}}>
                      <Menu.Item key='realestate' style={{fontWeight: '600'}}>Real Estate Professionals</Menu.Item>
                      <Menu.Item key='homeowner' style={{fontWeight: '600'}}>Home Buyers & Sellers</Menu.Item>
                      <Menu.Item key='homeowner' style={{fontWeight: '600'}}>Our Services</Menu.Item>
                    </Menu>
                  </Col>
                </Row>
              </div>
            </Header>
            <Content
              className="isomorphicContent"
              style={{
                padding: '30px 0 0px',
                flexShrink: '0',
                position: 'relative',
                height: window.height,
                backgroundColor: 'white',
                marginTop: '30px'
              }}
            >
              {this.props.children}
            </Content>
            <Footer style={{ textAlign: 'center', 'background':'#f0f2f5' }}>
              <Divider/>
              <Row type={'flex'} justify={'center'}>
                <Col span={18}>
                  <Row>
                    <Col span={6} style={{textAlign: 'left'}}>
                      <div>
                        <span><strong>GET STARTED NOW</strong></span>
                      </div>
                      <div>(509)-378-2549</div>
                      <div>Contact Us</div>
                      <div>Visit Our Office</div>
                    </Col>
                    <Col span={6} style={{textAlign: 'left'}}>
                      <div>
                        <span><strong>About All State Inspections</strong></span>
                      </div>
                      <div>Our Story</div>
                      <div>Careers</div>
                      <div>Contact Us</div>
                      <div>FAQs</div>
                    </Col>
                    <Col span={6} style={{textAlign: 'left'}}>
                      <div>
                        <span><strong>Our Services</strong></span>
                      </div>
                      <div>Residential Inspections</div>
                      <div>Commercial Inspections</div>
                    </Col>
                    <Col span={6} style={{textAlign: 'left'}}>
                      <div>
                        <span><strong>Keep Up-to-Date with ASI</strong></span>
                      </div>
                      <div>
                        <Search placeholder={'Email Address'} enterButton="Sign Up" style={{marginTop: '10px'}}/>
                      </div>
                      <div style={{marginTop: '10px'}}>
                        <Icon type="facebook" style={{marginRight: '10px', fontSize: '20px'}}/>
                        <Icon type="twitter" style={{marginRight: '10px', fontSize: '20px'}}/>
                        <Icon type="instagram" style={{marginRight: '10px', fontSize: '20px'}}/>
                      </div>
                    </Col>
                  </Row>

                </Col>
              </Row>

            </Footer>
          </Layout>
        </StyleWrapper>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    app: state.containers.app,
    alerts: state.containers.notifications.alerts
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    navigateToRoute
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(External));
