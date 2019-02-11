import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import Logout from '../components/logout';

const { navigateToRoute } = Logic.router.actions;

function mapStateToProps (state) {
  return {
    session: state.session,
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    navigateToRoute,
  }, dispatch);
}

export const LogoutContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
