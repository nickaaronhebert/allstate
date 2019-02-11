import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Logic from '../logic';
import { Debounce } from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import UnauthenticatedRoutes from './base-unauthenticated-routes';
import AuthenticatedRoutes from './base-authenticated-routes';
import AuthenticatedRoutesDecorator from './base-authenticated-routes-decorator';


const { toggleAll, fetchApplicationSettings } = Logic.app.actions;

const { fetchInitialData, fetchInitialDataBegin } = Logic.users.actions;

class Routes extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  componentDidMount () {
    // Include the Crisp code here, without the <script></script> tags
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = process.env.CRISP_WEBSITE_ID;

    (function () {
      var d = document;
      var s = d.createElement('script');

      s.src = 'https://client.crisp.chat/l.js';
      s.async = 1;
      d.getElementsByTagName('head')[0].appendChild(s);
    })();
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (!nextProps.initialDataLoaded && !nextProps.fetchingInitialData) {
      this.props.fetchInitialDataBegin();
      this.props.fetchInitialData();
    }

  }

  renderSessionBasedRoutes(session, initialDataLoaded) {
    if (session.user.id && session.user.role == 'decorator') {
      return <AuthenticatedRoutesDecorator session={session} initialDataLoaded={initialDataLoaded}/>;
    }
    else if (session.user.id && session.user.role == 'user') {
      return <AuthenticatedRoutes session={session} initialDataLoaded={initialDataLoaded}/>;
    }
    else {
      return <UnauthenticatedRoutes session={session} initialDataLoaded={initialDataLoaded}/>;
    }
  }

  render () {
    const { session, initialDataLoaded } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <Debounce time="500" handler="onResize">
          <WindowResizeListener
            onResize={windowSize =>
              this.props.toggleAll(
                windowSize.windowWidth,
                windowSize.windowHeight,
              )
            }
          />
        </Debounce>
        {
         this.renderSessionBasedRoutes(session, initialDataLoaded) 
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    session: state.session,
    activation: state.activation,
    initialDataLoaded: state.containers.users.initialDataLoaded,
    fetchingInitialData: state.containers.users.fetchingInitialData,
    isReady: state.session.user.id,
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchInitialDataBegin,
    fetchInitialData,
    fetchApplicationSettings,
    toggleAll,
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
