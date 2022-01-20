import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface ToggleOverlayAction {
  type: ActionTypes.toggleOverlay;
  payload: boolean;
}

export const toggleOverlay = (show: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch<ToggleOverlayAction>({
      type: ActionTypes.toggleOverlay,
      payload: show,
    });
  };
};
