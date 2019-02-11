import React, { Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import RouteWrapperData from './base-routes-wrapper-data';
import * as pages from '../app/pages';
import Logic from '../logic';

const { SESSION_VALIDATE_EMAIL } = Logic.session.actions;

export default class BaseUnuthenticatedRoutes extends Component {
  constructor (props) {
    super(props);

    this.state = {

    };
  }

  render () {
    const { session, initialDataLoaded } = this.props;
    if (!initialDataLoaded) { return null; }
    return (
      <Switch>
        <RouteWrapperData
          exact
          path='/'
          component={pages.Home}
          key={'home'}
          routeId='HOME'
          dataActions={[
          ]}
        />
        <RouteWrapperData
          exact
          path='/serverIsNotAvailable'
          component={pages.ActivationServerIsNotAvailable}
          key={'not-available-'}
          dataActions={[
          ]}
        />
        <RouteWrapperData
          exact
          path='/login'
          component={pages.Login}
          key={'login'}
          routeId='LOGIN'
          dataActions={[
          ]}
        />
        <RouteWrapperData
          exact
          path='/register'
          component={pages.Register}
          key={'register'}
          routeId='REGISTER'
          dataActions={[
          ]}
        />
        <RouteWrapperData
          exact
          path='/loggedOut'
          component={pages.Logout}
          routeId='LOG_OUT'
          session={session}
          key={'logout'}
          dataActions={[
          ]}
        />
        <RouteWrapperData
          exact
          path='/validate'
          component={pages.Validate}
          routeId='VALIDATE-EMAIL'
          session={session}
          key={'validate-email'}
          dataActions={[
            { type: SESSION_VALIDATE_EMAIL, payload: {  } }
          ]}
        />
        <RouteWrapperData
          exact
          path='/signup/:result'
          component={pages.SignupResult}
          routeId='SIGNUP-RESULT'
          session={session}
          key={'signup-result'}
          dataActions={[
          ]}
        />
        <Route render={() => { return (<pages.NotFound/>); }}/>

      </Switch>
    );
  }
}
