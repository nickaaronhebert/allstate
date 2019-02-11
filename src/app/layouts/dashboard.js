import React, { Component} from 'react';
import { Layout, Alert } from 'antd';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import { siteConfig } from '../settings';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BlockUi from 'react-block-ui';
import styled from 'styled-components';
import '../styles/global.css';
import 'react-block-ui/style.css';

const { Footer, Content } = Layout;

const DashboardStyleWrapper = styled.div`
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
`;

class Dashboard extends Component {
  constructor (props) {
    super(props);

    this.state = {

    };
  }

  getAlertsBox () {
    return (
      <div>
        {this.props.alerts.map((alert, i) => {
          return (
            <Alert message={alert.text} banner key={i} />
          );
        })}
      </div>
    );
  }

  render () {
    const { blockUi, blockMessage } = this.props.app;

    return (
      <Layout style={{ height: '100%' }}>
        <Topbar url={''} />
        <Layout style={{ flexDirection: 'row' }}>
          <Sidebar url={''} />
          <Layout
            className="isoContentMainLayout"
            style={{

            }}
          >
            <Content
              className="isomorphicContent"
              style={{
                padding: '70px 0 0',
                flexShrink: '0',
                backgroundColor: '#e8ecf0 !important',
                position: 'relative',
                height: window.height
              }}
            >
              {
                this.getAlertsBox()
              }

              <DashboardStyleWrapper>
                <BlockUi tag="div" blocking={blockUi} message={blockMessage} keepInView={true}>
                  {this.props.children}
                </BlockUi>
              </DashboardStyleWrapper>
            </Content>

            <Footer
              style={{
                color: 'rgb(160, 160, 160)',
                textAlign: 'center',
                borderTop: '1px solid rgba(152, 166, 173, 0.2)',
                backgroundColor: '#e8ecf0 !important'
              }}
            >
              {siteConfig.footerText}
            </Footer>
          </Layout>
        </Layout>
      </Layout>
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

  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
