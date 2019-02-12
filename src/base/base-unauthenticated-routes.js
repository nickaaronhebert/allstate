import React, { Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import RouteWrapperData from './base-routes-wrapper-data';
import * as pages from '../app/pages';

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
          path='/realestate'
          component={pages.RealEstate}
          routeId='REAL-ESTATE'
          session={session}
          key={'real-estate'}
          dataActions={[
          ]}
        />
        <RouteWrapperData
          exact
          path='/homeowner'
          component={pages.Homeowner}
          routeId='SIGNUP-RESULT'
          session={session}
          key={'homeowner'}
          dataActions={[
          ]}
        />
        <RouteWrapperData
          exact
          path='/about'
          component={pages.About}
          routeId='SIGNUP-RESULT'
          session={session}
          key={'about'}
          dataActions={[
          ]}
        />
        <RouteWrapperData
          exact
          path='/contact'
          component={pages.Contact}
          routeId='SIGNUP-RESULT'
          session={session}
          key={'contact'}
          dataActions={[
          ]}
        />
        <RouteWrapperData
          exact
          path='/request'
          component={pages.Request}
          routeId='SIGNUP-RESULT'
          session={session}
          key={'request'}
          dataActions={[
          ]}
        />
        <RouteWrapperData
          exact
          path='/tools'
          component={pages.Contact}
          routeId='SIGNUP-RESULT'
          session={session}
          key={'tools'}
          dataActions={[
          ]}
        />
        <Route render={() => { return (<pages.NotFound/>); }}/>

      </Switch>
    );
  }
}
