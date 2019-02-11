import React from 'react';
import { LayoutProvider } from '../layouts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import { Button, Row, Col, Table, Divider, Tag } from 'antd';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
    };
  }

  render () {
    const { user: { name } } = this.props.session;

    const columns = [{
      title: 'Name',
      key: 'name',
      render: record => <div href="javascript:;">{`${record.firstName} ${record.lastName}`}</div>,
    }, {
      title: 'Status',
      render: record => <div href="javascript:;"><Tag>{`${record.status}`}</Tag></div>,
      key: 'status',
    }, {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <span>
          <a href="javascript:;" onClick={() => { this.props.navigateToRoute({to: `/decorator/clients/${record.id}/orders`}); }}>{record.orders.length} Active Order(s) - View Order History</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={() => { this.props.navigateToRoute({to: `/decorator/messages?focus=${record.id}`}); }}>Send Message</a>
        </span>
      ),
    }];



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
              <Col span={18}>
                <div>
                  <span style={{fontSize: '48px', fontWeight: '200'}}>Your Clients, {name}</span>
                </div>
              </Col>

            </Row>

            <Row gutter={32} type='flex' justify='center' style={{margin: '30px 0px'}}>
              <Col span={18}>
                <Table columns={columns} dataSource={this.props.users.items} />
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
    users: state.containers.users,
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
