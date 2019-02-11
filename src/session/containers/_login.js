import LoginForm from '../components/loginForm';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';

function mapStateToProps () {
  return {};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    login: Logic.session.actions.sessionLogin,
  }, dispatch);
}

export const LoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
