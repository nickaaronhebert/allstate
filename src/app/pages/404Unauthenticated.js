import React, { Component} from 'react';
import { LayoutProvider } from '../layouts';
import { Row, Col, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';

class Logout extends Component {
  constructor (props) {
    super(props);

    this.state = {

    };
  }

  render () {
    return (
      <LayoutProvider type='external' >
        <div style={{ height: window.height }}>
          <Row type='flex' justify='center' style={{marginTop: '100px', textAlign: 'center'}}>
            <Col span={12}>
              <div><span>Ooops....</span></div>
              <div><span>The page you requested does not exist.</span></div>  
              <div onClick={() => this.props.navigateToRoute({to: '/', replace: false}) } style={{marginTop: '50px'}}><Button default size='large'>Return To A Happy Place</Button></div>  
            </Col>
            
          </Row>
          

        </div>
      </LayoutProvider>
    );
  }
}

const { navigateToRoute } = Logic.router.actions;

function mapStateToProps (state) {
  return {
    app: state.containers.app
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    navigateToRoute
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
