import React, { Component} from 'react';
import { Row, Col, Button, Modal, Badge, Icon } from 'antd';
import ModuleHeaderStyle from '../styles/moduleHeader.style';

export default class ModuleHeader extends Component {
  constructor (props) {
    super(props);
  }

  toggleModal () {
    if (this.props.configurationVisible) {
      this.props.close();
    } else {
      this.props.open();
    }
  }

  render () {
    const { serviceStatus, service, status, close } = this.props;

    return (
      <ModuleHeaderStyle>
        <Row style={{ marginBottom: '20px' }}>
          <Col span={6}>
            <Button block className={'nonHighlighted'}><Badge status={status} /> {serviceStatus}</Button>
          </Col>
          <Col span={12}>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button block onClick={() => this.toggleModal() }>{service} Configuration <Icon type="setting" theme="outlined" style={{ fontSize: '20px', color: '#00caff' }} /></Button>
          </Col>
          <Modal
            visible={this.props.configurationVisible}
            footer={false}
            header={false}
            onCancel={close}
          >
            {
              React.cloneElement(this.props.modalContent,
                {
                  toggleModal: () => { this.toggleModal(); },
                  modalStatus: () => this.props.configurationVisible
                }
              )
            }
          </Modal>
        </Row>
      </ModuleHeaderStyle>
    );
  }
}
