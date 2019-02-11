import axios from 'axios';
import config from '../apiConfig';

export default class AssessmentAPI {
  static register (mail, firstname, lastname, pass, passConfirm) {
    return axios({
      method: 'POST',
      url: `${config.getEnvironmentBaseUrl()}/users`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: mail,
        password: pass,
        password_confirmation: passConfirm,
        first_name: firstname,
        last_name: lastname
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response && error.response.data ? error.response.data : error.message;
      });
  }
}
