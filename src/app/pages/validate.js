import React from 'react';
import { LayoutProvider } from '../layouts';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import HomeDecorSplash from '../../image/homeDecorSplash.jpg';

class Validate extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.sessionLogin(values);
      }
    });
  };

  render () {
    return (
      <div style={{height: '100%'}}>
      <LayoutProvider 
        type='external' 
        header={{
          left: () => {
            return (null);
          },
          right: () => {
            return (null);
          },
        }}
        >
        <div style={{width: '100%', backgroundImage: `url(${HomeDecorSplash})`, backgroundRepeat: 'no-repeat', 'backgroundSize': 'cover', height: '460px', backgroundColor: '#84b0a7'}}>
          <div style={{paddingTop: '100px'}}>
            <Row type='flex' justify='center'>
              <Col span={10} style={{background: 'white', padding: '20px'}}>
                Validate Account
              </Col>
            </Row>
          </div>
          
        </div>

        
      </LayoutProvider>
      </div>
    );
  }
}

const { navigateToRoute } = Logic.router.actions;
const { sessionLogin, sessionValidateEmail } = Logic.session.actions;

function mapStateTpProps (state) {
  const isAuthenticated = state.session.authenticated;
  return {
    isAuthenticated, 
    router: state.containers.router
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    navigateToRoute,
    sessionLogin,
    sessionValidateEmail
  }, dispatch);
}

export default withRouter(connect(mapStateTpProps, mapDispatchToProps)(Validate));
