import * as actions from './actions';

export default function (state = {
  configurationVisible: false,
  dialogVisible: false
}, action) {
  let stateCopy = { ...state };
  switch (action.type) {
    case actions.OPEN_MODULE_HEADER:
    case actions.CLOSE_MODULE_HEADER:
      stateCopy.configurationVisible = action.payload.configurationVisible;
      return { ...stateCopy };
    case actions.OPEN_DIALOG:
    case actions.CLOSE_DIALOG:
      stateCopy.dialogVisible = action.payload.dialogVisible;
      return { ...stateCopy };
    default:
      return state;
  }
}
