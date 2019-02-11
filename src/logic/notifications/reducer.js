import * as actions from './actions';

export default function (state = {
  resources: [],
  alerts: []
}, action) {
  let stateCopy = { ...state };
  switch (action.type) {
    case actions.FETCH_SUCCESS:
      stateCopy.resources = action.payload;
      return { ...stateCopy };
    case actions.FETCH_ONE_SUCCESS:
      var responseCopy = action.payload;
      stateCopy.resources.filter(x => x.id != responseCopy.id).concat(responseCopy);
      return { ...stateCopy };
    case actions.SAVE_SUCCESS:
      stateCopy.resources = action.payload;
      return { ...stateCopy };
    case actions.DELETE_SUCCESS:
      stateCopy.resources = action.payload;
      return { ...stateCopy };
    case actions.PUSH_ALERT:
      stateCopy.alerts = [...stateCopy.alerts, {
        type: action.payload.type,
        text: action.payload.text,
        id: action.payload.id
      }];
      return stateCopy;
    case actions.CLEAR_ALERT:
      stateCopy.alerts = stateCopy.alerts.filter(x => x.id != action.payload.id);
      return stateCopy;
    default:
      return state;
  }
}
