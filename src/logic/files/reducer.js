import * as actions from './actions';

export default function (state = {
  resources: []
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
    default:
      return { ...stateCopy };
  }
}
