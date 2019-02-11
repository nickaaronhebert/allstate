import { Icon, Col, Button, Select, Form, Alert, Input, Switch } from 'antd';
import React, { Component, Fragment } from 'react';

const { TextArea } = Input;

const Option = Select.Option;
const FormItem = Form.Item;


class DashForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      formErrors: []
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      } else {
        this.props.onError(err);
      }
    });
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

  renderInputField (question) {
    const questionType = typeof question.type === 'function' ? question.type() : question.type;
    let children = [];
    switch (questionType) {
      case 'text':
        return <Input {...question.qProps} prefix={<Icon type={question.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={question.placeholder} />;
      case 'textarea':
        return <TextArea rows={4} {...question.qProps} prefix={<Icon type={question.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={question.placeholder} />;
      case 'password':
        return <Input prefix={<Icon type={question.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={question.placeholder} type='password' />;
      case 'switch':
        return <Switch checkedChildren={question.switch.checkedText} unCheckedChildren={question.switch.unCheckedText} defaultChecked />;
      case 'select':
        children = [];
        if (typeof question.options === 'function') {
          children = [...question.options()];
        } else {
          question.options.map((option, index) => { children.push(<Option value={option.value} key={index}>{option.label}</Option>); });
        }
        return <Select
          style={{ width: '100%' }}
          placeholder="Please select"
          onChange={ question.onChange ? (e) => { question.onChange(e); } : null }
        >
          {children}
        </Select>;
      case 'multi-select':
        children = [];
        if (typeof question.options === 'function') {
          children = [...question.options()];
        } else {
          question.options.map((option, index) => { children.push(<Option value={option.value} key={index}>{option.label}</Option>); });
        }
        return <Select
          style={{ width: '100%' }}
          placeholder={question.placeholder}
          mode="multiple"
        >
          {children}
        </Select>;
      default:
        null;
    }
    return <Input prefix={<Icon type={question.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={question.placeholder} />;
  }

  toggleAddOrgModal () {
    this.setState({
      addOrgModalVisible: !this.state.addOrgModalVisible
    });
  }

  getErrorList () {
    const formErrors = [];
    this.state.formErrors.map((error) => {
      formErrors.push(
        <div>
          <li>{error.field} - {error.message}</li>
        </div>
      );
    });
    return formErrors;
  }

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
      form.validateFields(['passwordConfirm'], { force: true });
    }
    callback();
  };

  getRules (question) {
    let { dashRules, rules: questionRules, required } = question;
    const additiveRules = [];
    dashRules = dashRules || [];
    dashRules.map((dr) => {
      if (dr == 'password') {
        additiveRules.push({
          validator: this.validateToNextPassword
        });
      }
      if (dr == 'passwordConfirm') {
        additiveRules.push({
          validator: this.compareToFirstPassword
        });
      }
    });
    additiveRules.push(
      {
        required: required,
        message: 'Please input a value'
      }
    );
    return [...questionRules, ...additiveRules];
  }

  getInitialValues (question) {
    return { initialValue: question.initialValue ? question.initialValue : null };
  }

  getValueProp (question) {
    if (question.type == 'switch') {
      return { valuePropName: 'checked' };
    }
    return {};
  }

  render () {
    const { getFieldDecorator } = this.props.form;

    return (
      <Col span={24} >
        <Fragment>
          { this.state.formErrors.length > 0 &&
            <div style={{ marginBottom: '20px' }}>
              <Alert
                message="Ooops. Looks like you missed a couple things."
                description={<ul>{this.getErrorList()}</ul>}
                type="error"
                showIcon
              />
            </div>
          }
          <Form onSubmit={this.handleSubmit} className="login-form" layout={'vertical'}>
            {this.props.questions.map((question, index) => {
              if (question.type === 'component') {
                return question.render();
              }
              return (
                <FormItem key={index} label={question.label ? question.label : null} style={{ textAlign: 'left' }}>
                  {getFieldDecorator(question.fieldId, Object.assign({
                    rules: this.getRules(question)
                  }, this.getInitialValues(question), this.getValueProp(question)))(
                    this.renderInputField(question)
                  )}
                </FormItem>
              );
            })}
            <Button type="primary" htmlType="submit" block style={{ color: 'white' }}>
              <span style={{ color: 'white' }}>{this.props.submitText || 'Submit'}</span>
            </Button>
          </Form>
        </Fragment>
      </Col>

    );
  }
}

const WrappedDashForm = Form.create()(DashForm);
export default WrappedDashForm;
