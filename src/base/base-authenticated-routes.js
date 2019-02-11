import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RouteWrapperData from './base-routes-wrapper-data';
import * as pages from '../app/pages';
import Logic from '../logic';

const { SESSION_LOGOUT } = Logic.session.actions;
const { FETCH_CHANNEL } = Logic.messages.actions;
const { FETCH: FETCH_FILES } = Logic.files.actions;

export default class BaseAuthenticatedRoutes extends Component {
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
        <Route
          exact
          path='/'
          render={() => {
            return <Redirect to={'/dashboard'} key={'home-' + Math.random().toString()}/>;
          }}
        />
        <RouteWrapperData
          exact
          path='/dashboard'
          component={pages.Dashboard}
          routeId='DASHBOARD'
          key={'dashboard-' + Math.random().toString()}
          session={session}
          dataFetch
          dataActions={
            [
              { type: FETCH_CHANNEL, payload: {  }, authCall: true }
            ]
          }
        />

        <RouteWrapperData
          exact
          path='/profile'
          component={pages.Profile}
          routeId='PROFILE'
          key={'profile-' + Math.random().toString()}
          session={session}
          dataFetch
          dataActions={
            [
              
            ]
          }
        />

        <RouteWrapperData
          exact
          path='/spaces/:spaceName'
          component={pages.Space}
          routeId='SPACE'
          key={'SPACE' + Math.random().toString()}
          session={session}
          dataFetch
          dataActions={
            [
              { type: FETCH_FILES, payload: {  }, authCall: true }
            ]
          }
        />

        <RouteWrapperData
          exact
          path='/payment/received'
          component={pages.PaymentReceived}
          routeId='PAYMENT-RECEIVED'
          key={'payment-received-' + Math.random().toString()}
          session={session}
          dataFetch
          dataActions={
            [
              
            ]
          }
        />

        <RouteWrapperData
          exact
          path='/logout'
          component={pages.Logout}
          routeId='LOGOUT'
          key={'logout' + Math.random().toString()}
          session={session}
          dataFetch
          dataActions={
            [
              { type: SESSION_LOGOUT, payload: {  }, authCall: true }
            ]
          }
        />

        <Route render={() => <Redirect to={'/dashboard'} key={'home-' + Math.random().toString()}/> }/>
      </Switch>
    );
  }
}
