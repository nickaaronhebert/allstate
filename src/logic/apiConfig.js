export default class ApiConfig {
  constructor () {

  }

  static getEnvironmentBaseUrl () {
    return process.env.DASH_API_URL;
  }
}
