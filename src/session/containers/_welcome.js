import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import Welcome from '../components/welcome';

const { completeUserSetup } = Logic.session.actions;

const isReady = (state) => {
  const regionsLoaded = state.containers.aws.regions.length > 0;
  return regionsLoaded;
};

function mapStateToProps (state) {
  return {
    isReady: isReady(state),
    user: state.session.user,
    readyMessage: () => {
      return (
        <div style={{ margin: '20px' }}>
          <p>Loading AWS Configuration and Region Information</p>
          <p>Please wait...</p>

        </div>
      );
    },
    aws: state.containers.aws
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    completeUserSetup
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Welcome));
