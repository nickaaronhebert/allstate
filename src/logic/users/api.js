import axios from 'axios';
import { sessionService } from 'redux-react-session';
import qs from 'query-string';

export default class UsersApi {
  static fetch (data) {
    return axios({
      method: 'GET',
      url: `${process.env.ABODELY_REST_URL}/users?access_token=${data.authToken}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response && error.response.data ? error.response.data : error.message;
      });
  }

  static fetchOne (data) {
    return axios({
      method: 'GET',
      url: `${process.env.ABODELY_REST_URL}/users/${data.id}?access_token=${data.authToken}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response && error.response.data ? error.response.data : error.message;
      });
  }

  static save (data) {
    return axios({
      method: 'POST',
      url: `${process.env.ABODELY_REST_URL}/users?access_token=${data.authToken}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response && error.response.data ? error.response.data : error.message;
      });
  }

  static delete () {
    return axios({
      method: 'DELETE',
      url: `${process.env.ABODELY_REST_URL}/users`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response && error.response.data ? error.response.data : error.message;
      });
  }

  static invite (data) {
    return axios({
      method: 'POST',
      url: `${process.env.ABODELY_REST_URL}/users/invite?access_token=${data.authToken}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response && error.response.data ? error.response.data : error.message;
      });
  }

  static resetPassword (payload) {
    return axios({
      method: 'PUT',
      url: `${process.env.ABODELY_REST_URL}/users/${payload.user}?access_token=${payload.access_token}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        password: payload.password
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response && error.response.data ? error.response.data : error.message;
      });
  }

  static updateSessionUser (payload) {
    return axios({
      method: 'PUT',
      url: `${process.env.ABODELY_REST_URL}/users/me?access_token=${payload.authToken}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: payload
    })
      .then(response => {
        if (response.data.hasOwnProperty('token')) {
          const token = response.data.token;

          sessionService
            .saveSession(token);

          sessionService
            .saveUser(Object.assign(response.data.user, { token }));
        }
        return response.data;
      })
      .catch(error => {
        throw error.response && error.response.data ? error.response.data : error.message;
      });
  }

  static updateSessionUserPassword (payload) {
    return axios({
      method: 'PUT',
      url: `${process.env.ABODELY_REST_URL}/users/me/password?access_token=${payload.authToken}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw Error(JSON.stringify(error));
      });
  }

  static checkInvitedStatus (payload) {
    return axios({
      method: 'GET',
      url: `${process.env.ABODELY_REST_URL}/users/actions/invitedStatus?access_token=${payload.token}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response && error.response.data ? error.response.data : error.message;
      });
  }

  static completeInviteSetup (payload) {
    const queryValues = qs.parse(location.search);
    const userToken = queryValues.token;
    return axios({
      method: 'POST',
      url: `${process.env.ABODELY_REST_URL}/users/actions/completeInvite?access_token=${userToken}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: payload
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response && error.response.data ? error.response.data : error.message;
      });
  }

  static paymentReceived (data) {
    return axios({
      method: 'POST',
      url: `${process.env.ABODELY_REST_URL}/users/actions/paymentReceived?access_token=${data.authToken}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
      .then(response => {
        if (response.data.hasOwnProperty('token')) {
          const token = response.data.token;

          sessionService
            .saveSession(token);

          sessionService
            .saveUser(Object.assign(response.data.user, { token }));
        }
        return response.data;
      })
      .catch(error => {
        throw error.response && error.response.data ? error.response.data : error.message;
      });
  }
}
