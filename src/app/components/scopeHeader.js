import React, { Component} from 'react';
import { Row, Col, Icon } from 'antd';


export default class ScopeHeader extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div style={{ width: '100%', backgroundColor: this.props.background, borderRadius: '10px', padding: '10px', marginBottom: '20px' }}>
        <Row>
          <Col span={1}>
            <Icon type="info-circle" style={{color: 'white', fontSize: '40px'}}/> 
          </Col>
          <Col span={15} style={{paddingLeft: '10px', color: 'white'}}>
            {this.props.scopeDetails()}
          </Col>
          <Col span={8} style={{textAlign: 'right'}}>
            {this.props.scopeQuickAction()}
          </Col>
        </Row>
      </div>
    );
  }
}
