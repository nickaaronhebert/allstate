import React, { Component } from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import withAuthorized from '../../app/components/withAuthorized';
import withReady from '../../app/components/withReady';
const FormItem = Form.Item;

class ResetPassword extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let redirectUrl;
        switch (this.props.session.user.role) {
          case 'superAdmin':
            redirectUrl = '/dash/settings';
            break;
          case 'organizationAdmin':
            redirectUrl = '/organization/settings';
            break;
          case 'vendorAdmin':
            redirectUrl = '/vendor/settings';
            break;
        }
        this.props.resetPassword(Object.assign(values, { redirectUrl }));
      }
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      let msg = 'Two passwords that you enter is inconsistent!';
      callback(msg);
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render () {
    const { getFieldDecorator } = this.props.form;
    const { userToReset, selfReset } = this.props;

    const formItemLayout = {

    };
    const tailFormItemLayout = {

    };

    return (

      <Row type='flex' justify='center' style={{ marginTop: '50px' }}>
        <Col span={14}>
          { selfReset &&
            <div>
              <p>Looks like you are attempting to reset your password </p>
            </div>
          }
          { !selfReset &&
              <div>
                <p>Looks like you are attempting to reset the password for the following user: </p>
                <p>{userToReset.email}</p>
              </div>
          }

          <Form onSubmit={this.handleSubmit} layout={'vertical'}>
            <FormItem
              {...formItemLayout}
              label="User"
              style={{ display: 'none' }}
            >
              {getFieldDecorator('user', {
                rules: [{
                  required: true, message: 'Please input your password!'
                }],
                initialValue: this.props.userToReset.id
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="New Password"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input the new password!'
                }, {
                  validator: this.validateToNextPassword
                }]
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Confirm New Password"
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm the new password!'
                }, {
                  validator: this.compareToFirstPassword
                }]
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Row gutter={64}>
                <Col span={12}>
                  <Button type="primary" htmlType="submit" className="login-form-button">Back To Login</Button>
                </Col>
                <Col span={12}>
                  <Button type="primary" htmlType="submit" className="login-form-button">Change Password</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </Col>
      </Row>

    );
  }
}

const WrappedResetPassword = Form.create()(ResetPassword);

const withAuthorizedResetPassword = withAuthorized(WrappedResetPassword);

export default withReady(withAuthorizedResetPassword);
