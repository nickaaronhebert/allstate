import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import matchPath from 'react-router/matchPath';
import * as pages from '../app/pages';
import qs from 'query-string';
import Logic from '../logic';

const { resolveRoute, setParameters, configureRoute, fetchRouteData } = Logic.router.actions;

class RouteWrapperData extends Component {
  constructor (props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount () {
    const {
      path,
      exact,
      dataActions,
      location
    } = this.props;

    const match = matchPath(
      location.pathname, // global DOM variable
      { path, exact }
    );
    const queryValues = qs.parse(location.search);

    if (match) {
      this.props.configureRoute({ match, queryValues });
      dataActions.map((action) => { action.payload = Object.assign(action.payload, match.params, queryValues); });
      this.props.fetchRouteData(dataActions);
    }
  }

  render () {
    const {
      path,
      exact,
      component,
      router,
      session
    } = this.props;

    const match = matchPath(
      location.pathname, // global DOM variable
      { path, exact }
    );
    if (!match) {
      // Do nothing because the current
      // location doesn't match the path prop.

      return null;
    }
    if (!router.isConfigured) {
      if (session.user.id) {
        return <pages.IsLoading/>;
      } else {
        return <pages.IsLoadingUnauthenticated/>;
      }
    }
    if (component) {
      return (
        <Route exact path={path} render={() => React.createElement(component, { match, key: Math.random().toString()
        })}>

        </Route>);
    }
    return null;
  }
}

function mapStateToProps (state) {
  return {
    session: state.session,
    router: state.containers.router
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    resolveRoute,
    setParameters,
    configureRoute,
    fetchRouteData
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouteWrapperData));
