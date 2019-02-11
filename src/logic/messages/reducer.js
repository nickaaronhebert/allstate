import * as actions from './actions';

export default function (state = {
  resources: [],
  alerts: [],
  channels: []
}, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));
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
    case actions.FETCH_CHANNEL_SUCCESS: 
      stateCopy.channels = stateCopy.channels.filter(x => x.id != action.payload.id).concat(action.payload);
      return stateCopy;
    case actions.FETCH_CHANNELS_SUCCESS:
      stateCopy.channels = action.payload;
      return stateCopy;
    case actions.CREATE_MESSAGE_SUCCESS: {
      const focusChannelIndex = stateCopy.channels.findIndex(x => x.id == action.payload.channel);
      stateCopy.channels[focusChannelIndex].messages.push(action.payload);
      return stateCopy;
    }
    default:
      return state;
  }
}
