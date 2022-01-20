import { combineReducers } from 'redux';
import { patientsReducer, selectPatientReducer } from './patients';
import { eventsReducer } from './events';
import { overlayReducer } from './overlay';
import { Patient, Event } from '../actions';

// this helps to catch errors
export interface StoreState {
  selectedPatient: Patient | null;
  patients: Patient[];
  events: Event[];
  showOverlay: boolean;
}

export const reducers = combineReducers<StoreState>({
  selectedPatient: selectPatientReducer,
  patients: patientsReducer,
  events: eventsReducer,
  showOverlay: overlayReducer,
});
