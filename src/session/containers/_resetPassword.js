import ResetPassword from '../components/resetPassword';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';

const { resetPassword } = Logic.users.actions;
const { getFocusedUser, userBelongsToMe } = Logic.users.selectors;

function mapStateToProps (state) {
  const userToReset = getFocusedUser(state);
  const selfReset = userToReset && (userToReset.id == state.session.user._id);
  return {
    userToReset,
    authorized: (userToReset && selfReset) || (userBelongsToMe(state)),
    isReady: userToReset && true,
    selfReset,
    session: state.session,
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    resetPassword,
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));
