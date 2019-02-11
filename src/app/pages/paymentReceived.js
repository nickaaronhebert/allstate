import React from 'react';
import { LayoutProvider } from '../layouts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import { Button, Row, Col } from 'antd';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
    this.state =  {
      activeItem: 'One Box',
      cost:  {'One Box': 5000, 'Four Box': 16000}
    };
  }

  openForm() {
    this.typeformEmbed.typeform.open();
  }

  setActiveItem(box) {
    this.setState({ activeItem: box});
  }

  getBoxStyle(box) {
    if (box == this.state.activeItem) {
      return {
        backgroundColor: '#84b0a7',
        color: 'white',
        fontWeight: 300
      };
    }
    else {
      return {
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 200
      };
    }
  }

  onToken(e) {
    this.props.paymentReceived({user: this.props.session.user.id, token: e });
  }

  render () {

    const { user: { firstName, email } } = this.props.session;

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
            <Row type='flex' justify='center' style={{padding: '20px', textAlign: 'center'}}>
              <Col span={14}>
                <div style={{fontSize: '30px', fontWeight: 200}}>Yay, {firstName}! </div>
                <div style={{fontSize: '30px', fontWeight: 200}}>We received your subscription</div>
                <div> We just sent an email to {email} to confirm your subscription. Time to decorate.</div>
                <div><a onClick={() => { this.props.navigateToRoute( {to: '/dashboard', replace: false} ); } }>Return to My Dashboard</a></div>

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
    session: state.session
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
