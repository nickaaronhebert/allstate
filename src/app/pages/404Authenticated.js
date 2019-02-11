import React, { Component} from 'react';
import { Card, Layout } from 'antd';
import { LayoutProvider } from '../layouts';
import Ionicon from 'react-ionicons';

const { Content } = Layout;

export default class Logout extends Component {
  constructor (props) {
    super(props);

    this.state = {

    };
  }

  render () {
    return (
      <LayoutProvider type='dashboard' >
        <div style={{ height: window.height }}>
          <Content style={{ padding: '20px 30px' }}>
            <Card>
              <Ionicon icon={'ios-help-circle-outline'} fontSize="48px"/>
              <div><span>Ooops....</span></div>
              <div><span>The page you requested does not exist.</span></div>
            </Card>
          </Content>

        </div>
      </LayoutProvider>
    );
  }
}
