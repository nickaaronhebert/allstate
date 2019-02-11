import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Logic from '../../logic';
import ModuleHeader from '../components/moduleHeader';

const { open, close } = Logic.modals.actions;

function mapStateToProps (state) {
  return {
    ...state.containers.modals
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    open,
    close
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModuleHeader));
