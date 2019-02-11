import React, { Component, Fragment } from 'react';
import { Modal, Spin } from 'antd';
import axios from 'axios';
import config from '../../api/apiSettings';

export default class EmailConfirmation extends Component {
  constructor () {
    super();

    this.state = {
      visible: true,
      emailConfirmed: false
    };
  }

  getQueryStrings () {
    var assoc = {};
    var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, ' ')); };
    var queryString = location.search.substring(1);
    var keyValues = queryString.split('&');

    for (var i in keyValues) {
      var key = keyValues[i].split('=');
      if (key.length > 1) {
        assoc[decode(key[0])] = decode(key[1]);
      }
    }

    return assoc;
  }

  async componentDidMount () {
    var qs = this.getQueryStrings();
    var data = { userId: this.props.match.params.id, emailConfirmationToken: qs['email_confirmation_token'] };

    var result = await axios({
      method: 'GET',
      url: `${config.crowDataApi}/users/${data.userId}/emailConfirmation?email_confirmation_token=${data.emailConfirmationToken}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw new Error(error);
      });
    if (result.email_validated) {
      this.setState({
        emailConfirmed: true
      });
    }
  }

  render () {
    return (
      <Fragment>
        <Modal
          visible={this.state.visible}
          closable={false}
          footer={null}
        >
          {
            this.state.emailConfirmed
              ? <div>
                <p>Your email address has been confirmed.</p>
                <a href='/login'>Click Here to Log In.</a>
              </div>
              : <div>
                <p style={{ textAlign: 'center' }}>Gettings things organized. Verifying email. Ready for lift off...</p>
                <Spin size="large"/>
              </div>
          }

        </Modal>
      </Fragment>
    );
  }
}
