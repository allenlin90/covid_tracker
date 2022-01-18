import {
  FetchEventsAction,
  CreateEventAction,
  UpdateEventAction,
  DeleteEventAction,
} from './events';

import {
  SelectPatientAction,
  FetchPatientsAction,
  CreatePatientAction,
  UpdatePatientAction,
  DeletePatientAction,
} from './patients';

export enum ActionTypes {
  selectPatient = 'SELECT_PATIENT',
  fetchPatients = 'FETCH_PATIENTS',
  createPatient = 'CREATE_PATIENT',
  updatePatient = 'UPDATE_PATIENT',
  deletePatient = 'DELETE_PATIENT',
  fetchEvents = 'FETCH_EVENTS',
  createEvent = 'CREATE_EVENT',
  updateEvent = 'UPDATE_EVENT',
  deleteEvent = 'DELETE_EVENT',
}

export type EventActions =
  | FetchEventsAction
  | CreateEventAction
  | UpdateEventAction
  | DeleteEventAction;

export type PatientActions =
  | SelectPatientAction
  | FetchPatientsAction
  | CreatePatientAction
  | UpdatePatientAction
  | DeletePatientAction;
