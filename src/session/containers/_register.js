import RegisterComponent from '../components/registerForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';

const actions = Logic.session.actions;

function mapStateToProps () {
  return {};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    register: actions.sessionRegister,
  }, dispatch);
}

export const RegisterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterComponent));
