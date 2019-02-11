import axios from 'axios';

export default class Api {
  static fetch (data) {
    return axios({
      method: 'GET',
      url: `${process.env.ABODELY_REST_URL}/orders?access_token=${data.authToken}`,
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
      url: `${process.env.ABODELY_REST_URL}/orders/${data.id}?access_token=${data.authToken}`,
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

  static create (data) {
    return axios({
      method: 'POST',
      url: `${process.env.ABODELY_REST_URL}/orders?access_token=${data.authToken}`,
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

  static update (data) {
    return axios({
      method: 'PUT',
      url: `${process.env.ABODELY_REST_URL}/orders/${data.id}/updateAddress?access_token=${data.authToken}`,
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
      url: `${process.env.ABODELY_REST_URL}/orders?access_token=${data.authToken}`,
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
