const ROOT = 'APP';

export const TOGGLE_ALL = ROOT + '/TOGGLE_ALL';
export const TOGGLE_COLLAPSED = ROOT + '/TOGGLE_COLLAPSED';

export const TOGGLE_BLOCK_UI = ROOT + '/TOGGLE_BLOCK_UI';

export function getView (width) {
  let newView = 'MobileView';
  if (width > 1220) {
    newView = 'DesktopView';
  } else if (width > 767) {
    newView = 'TabView';
  }
  return newView;
}

export function toggleAll (width, height) {
  const view = getView(width);
  const collapsed = view !== 'DesktopView';
  return {
    type: TOGGLE_ALL,
    collapsed,
    view,
    height
  };
}

export const toggleCollapsed = () => ({
  type: TOGGLE_COLLAPSED
});

export const toggleBlockUi = (payload) => ({
  type: TOGGLE_BLOCK_UI,
  payload
});
