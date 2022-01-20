import { OverlayActions, ActionTypes } from '../actions';

export const overlayReducer = (
  state: boolean = false,
  action: OverlayActions,
) => {
  switch (action.type) {
    case ActionTypes.toggleOverlay:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
