import * as actions from './actions';

export default function (state = {
  items: [],
  item: null,
  params: {},
  parameters: {},
  isLoading: false,
  isLoaded: false,
  isConfigured: false,
  routeDataLoaded: false,
  routeDataLoading: false
}, action) {
  let stateCopy = { ...state };
  switch (action.type) {
    case actions.FETCH_ONE_SUCCESS:
      stateCopy.item = action.payload;
      return { ...stateCopy };
    case actions.FETCH_MANY_SUCCESS:
      stateCopy.items = action.payload;
      return { ...stateCopy };
    case actions.SET_PARAMETERS:
      stateCopy.parameters = action.payload;
      return { ...stateCopy };
    case actions.CONFIGURE_ROUTE:
      stateCopy.parameters = action.payload.match;
      stateCopy.query = action.payload.queryValues;
      stateCopy.isLoading = true;
      stateCopy.isLoaded = false;
      return { ...stateCopy };
    case actions.CONFIGURE_ROUTE_SUCCESS:
      stateCopy.isLoading = false;
      stateCopy.isConfigured = true;
      stateCopy.routeDataLoaded = true;
      return { ...stateCopy };
    case actions.RESET_ROUTE_STATE:
      stateCopy.isLoading = false;
      stateCopy.isLoaded = false;
      stateCopy.isConfigured = false;
      stateCopy.routeDataLoaded = false;
      return { ...stateCopy };
    case actions.FETCH_ROUTE_DATA_START: 
      stateCopy.routeDataLoading = true;
      return stateCopy;
    default:
      return state;
  }
}
