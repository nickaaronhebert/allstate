import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RouteWrapperData from './base-routes-wrapper-data';
import * as pages from '../app/pages';
import Logic from '../logic';

const { SESSION_LOGOUT } = Logic.session.actions;
const { FETCH_CHANNELS } = Logic.messages.actions;
const { FETCH: FETCH_USERS, FETCH_ONE:  FETCH_USER } = Logic.users.actions;

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
            return <Redirect to={'/decorator/dashboard'} key={'decorator-home-' + Math.random().toString()}/>;
          }}
        />
        <RouteWrapperData
          exact
          path='/decorator/dashboard'
          component={pages.DecoratorDashboard}
          routeId='DASHBOARD'
          key={'decorator-dashboard'}
          session={session}
          dataFetch
          dataActions={
            [
              { type: FETCH_CHANNELS, payload: {  }, authCall: true }
            ]
          }
        />

        <RouteWrapperData
          exact
          path='/decorator/messages'
          component={pages.DecoratorMessages}
          routeId='DASHBOARD-MESSAGES'
          key={'decorator-messages'}
          session={session}
          dataFetch
          dataActions={
            [
              { type: FETCH_CHANNELS, payload: {  }, authCall: true }
            ]
          }
        />

        <RouteWrapperData
          exact
          path='/decorator/clients'
          component={pages.DecoratorClients}
          routeId='DECORATOR-CLIENTS'
          key={'decorator-clients'}
          session={session}
          dataFetch
          dataActions={
            [
              { type: FETCH_USERS, payload: {  }, authCall: true },
            ]
          }
        />

        <RouteWrapperData
          exact
          path='/decorator/clients/:id/orders'
          component={pages.DecoratorClientOrders}
          routeId='DECORATOR-CLIENT-ORDERS'
          key={'decorator-client-orders'}
          session={session}
          dataFetch
          dataActions={
            [
              { type: FETCH_USER, payload: {  }, authCall: true },
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

        

        <Route render={() => { return (<pages.NotFoundAuthenticated/>); }}/>
      </Switch>
    );
  }
}
