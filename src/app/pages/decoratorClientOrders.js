import React from 'react';
import { LayoutProvider } from '../layouts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import { Button, Row, Col, Tag, Divider, Table } from 'antd';
import moment from 'moment';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
    };
  }

  render () {
    const { currentUser } = this.props;

    const columns = [{
      title: 'Order Date',
      key: 'orderDate',
      render: record => <div href="javascript:;">{`${moment(record.createdAt).fromNow()}`}</div>,
    }, {
      title: 'Order Recipient',
      render: (record) => (
        <span>
          <div>{record.recipient}</div>
          <div>{record.firstLineAddress}</div>
          <div>{record.secondLineAddress}</div>
          <div>{record.city}, {record.state} {record.zip}</div>
        </span>
      )
    },
    {
      title: 'Type',
      render: record => <div href="javascript:;"><Tag>{`${record.type}`}</Tag></div>,
      key: 'type',
    }, {
      title: 'Action',
      key: 'action',
      render: () => (
        <span>
          <a>View Deliveries</a>
          <Divider type="vertical" />
        </span>
      ),
    }];

    debugger;
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
                  <span style={{fontSize: '48px', fontWeight: '200'}}>Client Orders - {currentUser.firstName} {currentUser.lastName}</span>
                </div>
              </Col>



            </Row>

            <Row gutter={32} type='flex' justify='center' style={{margin: '30px 0px'}}>
              <Col span={18}>
                <Table columns={columns} dataSource={currentUser.orders} />
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

  const getCurrentUser = (state) => {
    const id = state.containers.router.parameters.params.id;
    return state.containers.users.items.find(x => x.id == id);
  };

  return {
    isAuthenticated,
    session: state.session,
    users: state.containers.users,
    channels: state.containers.messages.channels,
    currentUser: getCurrentUser(state)
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
