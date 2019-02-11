import React, { Component} from 'react';
import { Layout, Row, Col } from 'antd';
import '../styles/global.css';
import DashLogo from '../../image/dash-logo-grey.png';

const { Content } = Layout;

export default class External extends Component {
  constructor (props) {
    super(props);

    this.state = {

    };
  }

  render () {
    return (
      <Layout style={{ minHeight: '100%', backgroundColor: '#e8ecf0', paddingBottom: '20px' }}>
        <Content
          className="isomorphicContent"
          style={{
            padding: '50px 0 0',
            flexShrink: '0',
            position: 'relative',
            height: window.height
          }}
        >
          <Row type='flex' justify='center'>
            <Col span={8} style={{ textAlign: 'center' }}>
              <img src={DashLogo}/>
              <div><span>Always Flexible. Always Compliant</span></div>
            </Col>
          </Row>

          <Row type='flex' justify='center' style={{ marginTop: '40px' }}>
            <Col span={8} style={{ backgroundColor: 'white', textAlign: 'center', height: '100%', boxShadow: '0 0px 24px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02)' }}>
              <div style={{ padding: '20px' }}>
                {this.props.children}
              </div>
            </Col>
          </Row>

        </Content>
      </Layout>
    );
  }
}
