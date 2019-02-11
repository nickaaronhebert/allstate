import React, { Component} from 'react';
import { Row, Col } from 'antd';
import FormModal from '../../app/components/formModal';

class Activate extends Component {
  constructor () {
    super();

    this.state = {
      visible: true
    };
  }

  handleSubmit (values) {
    this.props.validateVendor(values);
  }

  render () {
    const { isReady, invite } = this.props;
    if (isReady) {
      return (
        <FormModal
          title={null}
          visible={true}
          onCancel={() => this.props.navigateToRoute({ to: '/login', replace: true })}
          formContent={this.props.activateAccountForm}
          onSubmit={this.handleSubmit.bind(this)}
          navigateToRoute={this.props.navigateToRoute}
          submitText={'Sign Up'}
          headerContent={
            <Row type="flex" justify="center">
              <Col span={16}>
                <div style={{ textAlign: 'center' }}>
                  <h4>{`${invite.invitor.name} has invited you to join Dash: `}</h4>
                  {
                    invite.assessment &&
                          <h4>Your participation is requested for the following assessment: <strong>{`${invite.assessment.name}`}</strong></h4>
                  }

                </div>

              </Col>
            </Row>
          }
        />
      );
    } else {
      return (null);
    }
  }
}

export default Activate;
