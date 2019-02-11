const ROOT = 'MODALS';

export const OPEN_DIALOG = ROOT + '/OPEN_DIALOG';
export const CLOSE_DIALOG = ROOT + '/CLOSE_DIALOG';

export const OPEN_MODULE_HEADER = ROOT + '/OPEN_MODULE_HEADER';
export const CLOSE_MODULE_HEADER = ROOT + '/CLOSE_MODULE_HEADER';

export function open () {
  return {
    type: OPEN_MODULE_HEADER,
    payload: { configurationVisible: true }
  };
}

export function close () {
  return {
    type: CLOSE_MODULE_HEADER,
    payload: { configurationVisible: false }
  };
}

export function openDialog () {
  return {
    type: OPEN_DIALOG,
    payload: { dialogVisible: true }
  };
}

export function closeDialog () {
  return {
    type: CLOSE_DIALOG,
    payload: { dialogVisible: false }
  };
}
