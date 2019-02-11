import * as actions from './actions';

export default function (state = {
  items: [],
  item: null,
  initialDataLoaded: false,
  fetchingInitialData: false,
}, action) {
  let stateCopy = { ...state };
  switch (action.type) {
    case actions.FETCH_SUCCESS:
      stateCopy.items = action.payload;
      return { ...stateCopy };
    case actions.SAVE_SUCCESS:
      stateCopy.items = action.payload;
      return { ...stateCopy };
    case actions.DELETE_SUCCESS:
      stateCopy.items = action.payload;
      return { ...stateCopy };
    case actions.FETCH_ONE_SUCCESS:
      stateCopy.items = stateCopy.items.filter(x => x.id != action.payload.id).concat(action.payload);
      return { ...stateCopy };
    case actions.FETCH_INITIAL_DATA_SUCCESS:
      stateCopy.initialDataLoaded = true;
      stateCopy.fetchingInitialData = false;
      return { ...stateCopy };
    case actions.FETCH_INITIAL_DATA_BEGIN:
      stateCopy.fetchingInitialData = true;
      return stateCopy;
    default:
      return { ...stateCopy };
  }
}
