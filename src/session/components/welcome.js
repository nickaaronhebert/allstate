import React, { Component, Fragment } from 'react';
import { Row, Col, Button, Icon, Input, Form, Alert, Select, Steps } from 'antd';
import { countries, states } from '../../app/settings/formHelpers';
import withReady from '../../app/components/withReady';

const Option = Select.Option;
const FormItem = Form.Item;
const Step = Steps.Step;

class Welcome extends Component {
  constructor (props) {
    super(props);
    this.state = {
      stage: 'personal',
      stages: ['personal', 'organization', 'services'],
      questions: [
        {
          icon: 'user',
          type: 'text',
          options: [],
          placeholder: 'First Name',
          stage: 'personal',
          rules: [{ required: false, message: 'Please input your first name!' }],
          fieldId: 'first_name'
        },
        {
          icon: 'user',
          type: 'text',
          options: [],
          placeholder: 'Last Name',
          stage: 'personal',
          rules: [{ required: false, message: 'Please input your last name!' }],
          fieldId: 'last_name'
        },
        {
          icon: 'phone',
          type: 'text',
          options: [],
          placeholder: '(888)-888-8888',
          stage: 'personal',
          rules: [{ required: false, message: 'Please input your phone number!' }],
          fieldId: 'phone'
        },
        {
          icon: 'home',
          type: 'text',
          options: [],
          placeholder: 'Organization Name',
          stage: 'organization',
          rules: [{ required: false, message: 'Please input your organization name' }],
          fieldId: 'title'
        },
        {
          icon: 'team',
          type: 'text',
          options: [],
          placeholder: 'Job Title (ex. Software Engineer)',
          stage: 'organization',
          rules: [{ required: false, message: 'Please input your job title!' }],
          fieldId: 'job_title'
        },
        {
          icon: 'global',
          type: 'text',
          options: [],
          placeholder: 'First Line Address',
          stage: 'organization',
          rules: [{ required: false, message: 'Please input your address!' }],
          fieldId: 'physical_address1'
        },
        {
          icon: 'global',
          type: 'text',
          options: [],
          placeholder: 'Second Line Address',
          stage: 'organization',
          rules: [{ required: false, message: 'Please input your address!' }],
          fieldId: 'physical_address2'
        },
        {
          icon: 'flag',
          type: 'select',
          options: countries,
          placeholder: 'Country',
          stage: 'organization',
          rules: [{ required: false, message: 'Please input your country!' }],
          fieldId: 'country'
        },
        {
          icon: 'flag',
          type: () => {
            // console.log(this.props.form.getFieldValue('country'), 'VAL');
            if (this.props.form.getFieldValue('country') == 'US') {
              return 'select';
            } else {
              return 'text';
            }
          },
          options: () => {
            if (this.props.form.getFieldValue('country') == 'US') {
              return states.map((state, index) => { return (<Option value={state} key={index}>{state}</Option>); });
            } else {
              return [];
            }
          },
          placeholder: 'State/Province',
          stage: 'organization',
          rules: [{ required: false, message: 'Please input your state/province!' }],
          fieldId: 'state'
        },
        {
          icon: 'flag',
          type: 'text',
          options: [],
          placeholder: 'Zip or Postal Code',
          stage: 'organization',
          rules: [{ required: false, message: 'Please input your country!' }],
          fieldId: 'zip_code'
        },
        {
          icon: 'solution',
          type: 'multi-select',
          options: () => {
            return this.props.aws.regions.map((region, i) => { return (<Option key={i} value={region.VpcName}>{region.VpcName}</Option>); });
          },
          placeholder: 'Which AWS VPCs or Regions should Dash monitor?',
          stage: 'services',
          rules: [{ required: false, message: 'Please input your answer!' }],
          fieldId: 'organization-vpcMonitoring'
        }
      ],
      formErrors: []
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const segregatedValues = {};
        this.state.stages.map((stage) => segregatedValues[stage] = {});
        Object.keys(values).map((valueKey) => {
          const question = this.state.questions.find((question) => question.fieldId == valueKey);
          segregatedValues[question.stage][question.fieldId] = values[valueKey];
        });
        this.props.completeUserSetup(segregatedValues);
      } else {
        this.setState({
          stage: 'personal',
          formErrors: [].concat.apply([], Object.keys(err).map((errorKey) => { return err[errorKey].errors; }))
        });
      }
    });
  };

  navigateStages (direction) {
    var newIndex = this.state.stages.findIndex(x => x == this.state.stage) + (direction == 'next' ? 1 : -1);
    this.setState({
      stage: this.state.stages[newIndex]
    });
  }

  getNavigationButton () {
    const { stages, stage } = this.state;
    const currIndex = stages.findIndex(x => x == stage);
    const showNextButton = currIndex < (stages.length - 1);
    const showSubmitButton = currIndex == (stages.length - 1);
    const showBackButton = currIndex > 0;
    return (
      <Row gutter={12}>
        <Col span={12} >
          { showBackButton &&
            <FormItem id="rememberCheck">
              <Button type="primary" className="login-form-button" onClick={() => this.navigateStages('back')}>
                Back
              </Button>
            </FormItem>
          }
        </Col>
        <Col span={12} >
          { showNextButton &&
            <FormItem id="rememberCheck">
              <Button type="primary" className="login-form-button" onClick={() => this.navigateStages('next')}>
                Next
              </Button>
            </FormItem>
          }
          { showSubmitButton &&
            <FormItem id="rememberCheck">
              <Button type="primary" ghost className="login-form-button" onClick={(e) => this.handleSubmit(e)}>
                All Done
              </Button>
            </FormItem>
          }
        </Col>
      </Row>
    );
  }

  getDefaultValue (question) {
    if (question.fieldId == 'first_name') {
      return this.props.user.first_name;
    } else if (question.fieldId == 'last_name') {
      return this.props.user.last_name;
    }
    return null;
  }

  renderInputField (question) {
    var children = [];
    const questionType = typeof question.type === 'function' ? question.type() : question.type;
    switch (questionType) {
      case 'text':
        return <Input prefix={<Icon type={question.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={question.placeholder} />;
      case 'select':
        if (typeof question.options === 'function') {
          children = [...question.options()];
        } else {
          question.options.map((option, index) => { children.push(<Option value={option.value} key={index}>{option.label}</Option>); });
        }
        return <Select
          style={{ width: '100%' }}
          placeholder="Please select"
        >
          {children}
        </Select>;
      case 'multi-select':
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

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        { this.state.formErrors.length > 0 &&
            <div style={{ marginBottom: '20px' }}>
              <Alert
                message="Ooops. Fill out the form to finish the setup process."
                description={<ul>{this.getErrorList()}</ul>}
                type="error"
                showIcon
              />
            </div>
        }
        <Row style={{ margin: '20px 0px' }}>
          <Col span={24}>
            <Steps current={this.state.stages.findIndex(x => x == this.state.stage)}>
              <Step title="User" />
              <Step title="Organization" />
              <Step title="Services" />
            </Steps>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit} className="login-form">
          {this.state.questions.filter(x => x.stage == this.state.stage).map((question, index) => {
            const initialValue = (question.type != 'select' && question.type != 'multi-select') ? { initialValue: this.getDefaultValue(question) } : {};
            return (
              <FormItem key={index}>
                {getFieldDecorator(question.fieldId, Object.assign({
                  rules: question.rules

                }, initialValue))(
                  this.renderInputField(question)
                )}
              </FormItem>
            );
          })}
          {this.state.questions.filter(x => x.stage != this.state.stage).map((question, index) => {
            return (
              <div style={{ display: 'none' }} key={index}>
                <FormItem>
                  {getFieldDecorator(question.fieldId, {
                    rules: question.rules
                  })(
                    <Input prefix={<Icon type={question.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={question.placeholder} />
                  )}
                </FormItem>
              </div>
            );
          })}
          {this.getNavigationButton()}
        </Form>
      </Fragment>
    );
  }
}

const WrappedWelcomeForm = Form.create()(Welcome);

const ReadiedComponent = withReady(WrappedWelcomeForm);

export default ReadiedComponent;
