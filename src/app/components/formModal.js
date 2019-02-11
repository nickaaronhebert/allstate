import React, { Component} from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class FormModal extends Component {
  constructor (props) {
    super(props);

    this.state = {

    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
    this.props.form.resetFields();
  };

  componentDidMount () {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  render () {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.props.ok}
        onCancel={() => this.props.onCancel()}
        footer={false}
        header={false}
      >
        {this.props.headerContent && this.props.headerContent}
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          {this.props.formContent.map((question, qIndex) => {
            return (

              <FormItem
                validateStatus={isFieldTouched(question.attr) && getFieldError(question.attr) ? 'error' : ''}
                help={isFieldTouched(question.attr) && getFieldError(question.attr) || ''}
                key={qIndex}
                label={question.text}
                style={{ display: question.hidden ? 'none' : 'show' }}

              >
                {
                  question.type == 'select'
                    ? getFieldDecorator(question.attr, {
                      rules: [{ required: question.required, message: `Please input your ${question.text}!` }]
                    })(

                      <Select
                        placeholder={question.text}
                      >
                        {question.options.map((o, i) => {
                          return (
                            <Option key={i} value={o.value}>{o.label}</Option>
                          );
                        })}
                      </Select>
                    )

                    : getFieldDecorator(question.attr, {
                      rules: [{ required: question.required, message: `Please input your ${question.text}!` }],
                      initialValue: question.initialValue
                    })(

                      <Input
                        placeholder={question.text}
                        hidden={question.hidden}
                        disabled={question.disabled}
                        label={question.text}
                        type={question.type}
                      />
                    )

                }
              </FormItem>
            );
          })
          }
          <Button type="primary" htmlType="submit" className="login-form-button">
            {
              this.props.submitText ? this.props.submitText : 'Submit'
            }
          </Button>
        </Form>
      </Modal>
    );
  }
}

const FormModalComponent = Form.create()(FormModal);

export default FormModalComponent;
