import axios from 'axios';
import { sessionService } from 'redux-react-session';

export default class SessionAPI {
  static async logout () {
    sessionService.deleteSession();
    sessionService.deleteUser();
    sessionService
            .saveSession();

          sessionService
            .saveUser({});
    return true;
  }

  static login (mail, pass) {
    return axios({
      method: 'POST',
      url: `${process.env.ABODELY_REST_URL}/auth?access_token=${process.env.ABODELY_MASTER_TOKEN}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ''
      },
      auth: {
        username: mail,
        password: pass
      }
    })
      .then(response => {
        if (response.data.hasOwnProperty('token')) {
          const token = response.data.token;

          if (response.data.user.status == 'invited') {
            return { error: 'validateEmail' };
          }

          sessionService
            .saveSession(token);

          sessionService
            .saveUser(Object.assign(response.data.user, { token }));
        }
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }

  static updateSessionToken (data) {
    return axios({
      method: 'GET',
      url: `${process.env.ABODELY_REST_URL}/auth/updateSession?access_token=${data.authToken}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ''
      },
    })
      .then(response => {
        if (response.data.hasOwnProperty('token')) {
          const token = response.data.token;

          if (response.data.user.status == 'invited') {
            return { error: 'validateEmail' };
          }

          sessionService
            .saveSession(token);

          sessionService
            .saveUser(Object.assign(response.data.user, { token }));
        }
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }

  static validateEmail (data) {
    return axios({
      method: 'POST',
      url: `${process.env.ABODELY_REST_URL}/users/actions/validateEmail`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ''
      },
      data: {
        signUpCode: data.scode
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }

  static register (data) {
    return axios({
      method: 'POST',
      url: `${process.env.ABODELY_REST_URL}/users?access_token=${process.env.ABODELY_MASTER_TOKEN}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ''
      },
      data
    })
      .then(response => {
        if (response.data.hasOwnProperty('token')) {
          return response.data;
        }
        return null;
      })
      .catch(error => {
        return error;
      });
  }
}
