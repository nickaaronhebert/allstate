import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

export default class Api {
  static fetch () {
    return axios({
      method: 'GET',
      url: BACKEND_URL + 'notifications',
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
      url: BACKEND_URL + 'notifications/' + data.id,
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

  static createMessage (data) {
    return axios({
      method: 'POST',
      url: `${process.env.ABODELY_REST_URL}/messages?access_token=${data.authToken}`,
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

  static fetchChannel (data) {
    return axios({
      method: 'GET',
      url: `${process.env.ABODELY_REST_URL}/channels/actions/fetchByToken?access_token=${data.authToken}`,
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

  static fetchChannels (data) {
    return axios({
      method: 'GET',
      url: `${process.env.ABODELY_REST_URL}/channels?access_token=${data.authToken}`,
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
      url: BACKEND_URL + 'notifications/' + data.id,
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

  static delete (data) {
    return axios({
      method: 'DELETE',
      url: BACKEND_URL + 'notifications/' + data.id,
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
}
