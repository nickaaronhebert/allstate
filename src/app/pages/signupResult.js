import React from 'react';
import { LayoutProvider } from '../layouts';
import { bindActionCreators } from 'redux';
import { Row, Col, Icon } from 'antd';
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
    const { result } = this.props.router.parameters.params;
    if (result === 'success') {
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
                    <div style={{textAlign: 'center'}}>
                      <Icon type="mail" style={{fontSize: '48px', color: '#84b0a7'}}/>
                      <p style={{fontSize: '20px', fontWeight: '200'}}>You successfully signed up!</p>
                      <div style={{marginTop: '20px', fontSize: '16px', fontWeight: '200'}}>
                      <p>Would you mind checking your email? We want to verify that you are not a robot.</p>
                      </div>
                    </div>
                    
                    
                  </Col>
                </Row>
              </div>
              
            </div>

            
          </LayoutProvider>
        </div>
      );  
    }
    
  }
}

const { navigateToRoute } = Logic.router.actions;

function mapStateTpProps (state) {
  return {
    router: state.containers.router
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    navigateToRoute,
  }, dispatch);
}

export default withRouter(connect(mapStateTpProps, mapDispatchToProps)(Validate));
