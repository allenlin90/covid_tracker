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
  selectPatient,
  fetchPatients,
  createPatient,
  updatePatient,
  deletePatient,
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
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
