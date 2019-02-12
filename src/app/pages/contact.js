import React from 'react';
import { LayoutProvider } from '../layouts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import { Button, Row, Col } from 'antd';
import { ReactTypeformEmbed } from 'react-typeform-embed';

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
              <div style={{fontSize: '60px', fontWeight: 200}}>Contact Us</div>
              <div style={{fontSize: '40px', textAlign: 'right', fontWeight: 300}}>We look forward to hearing from you</div>
            </div>
          </div>
          <Row type='flex' justify='center' style={{margin: '20px 0px', height: '500px'}}>
            <Col span={16}>
              <ReactTypeformEmbed url="https://nickhebert1.typeform.com/to/f03tup"  />
                          

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
