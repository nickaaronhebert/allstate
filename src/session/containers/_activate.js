import Activate from '../components/activate';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import qs from 'qs';

const { validateVendor } = Logic.session.actions;
const queryParams = qs.parse(location.search.slice(1, location.search.length));

function mapStateToProps (state) {
  const invite = state.containers.session.invite;
  if (invite.id) {
    let activateAccountForm = [
      {
        text: 'Name',
        attr: 'name',
        hidden: false,
        initialValue: invite.invitee.name,
        required: true,
        disabled: true,
        type: 'text',
      },
      {
        text: 'Email',
        attr: 'email',
        hidden: false,
        initialValue: invite.invitee.email,
        required: true,
        disabled: true,
        type: 'text',
      },
      {
        text: 'Password',
        attr: 'password',
        hidden: false,
        initialValue: null,
        required: true,
        type: 'password',
      }, {
        text: 'Confirm Password',
        attr: 'passwordConfirm',
        hidden: false,
        initialValue: null,
        required: true,
        type: 'password',
      },
      {
        text: 'Signup Code',
        attr: 'signupCode',
        hidden: true,
        initialValue: queryParams.suc,
        required: true,
        type: 'password',
      },
      {
        text: 'Sid',
        attr: 'sid',
        hidden: true,
        initialValue: queryParams.sid,
        required: true,
        type: 'password',
      },
      {
        text: 'Group Id',
        attr: invite.inviteeType,
        hidden: true,
        initialValue: invite.invitee.id,
        required: true,
        type: 'text',
      },
    ];
    return {
      isReady: invite.id && true,
      invite,
      activateAccountForm,
    };
  } else {
    return {
      isReady: false,
    };
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    validateVendor,
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activate));
