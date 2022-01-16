import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Patient {
  _id?: string;
  gender?: string;
  age?: number;
  occupation?: string;
}

export interface SelectPatientAction {
  type: ActionTypes.selectPatient;
  payload: Patient;
}

export interface FetchPatientsAction {
  type: ActionTypes.fetchPatients;
  payload: Patient[];
}

export interface CreatePatientAction {
  type: ActionTypes.createPatient;
  payload: Patient;
}

export interface UpdatePatientAction {
  type: ActionTypes.updatePatient;
  payload: Patient;
}

export interface DeletePatientAction {
  type: ActionTypes.deletePatient;
  payload: string; // id of the patient
}

export const selectPatient = (patient: Patient) => {
  return (dispatch: Dispatch) => {
    dispatch<SelectPatientAction>({
      type: ActionTypes.selectPatient,
      payload: patient,
    });
  };
};

export const fetchPatients = (id: string = '') => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`/patient/${id}`);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      dispatch<FetchPatientsAction>({
        type: ActionTypes.fetchPatients,
        payload: response.data.data.patients,
      });
    } catch (error) {
      console.warn('something went wrong when fetching patients');
      console.warn(error);
    }
  };
};

export const createPatient = (patient: Patient) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post('/patient', {
        data: patient,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      dispatch<CreatePatientAction>({
        type: ActionTypes.createPatient,
        payload: response.data.data.patient,
      });
    } catch (error) {
      console.warn('something went wrong when creating a patient');
      console.warn(error);
    }
  };
};

export const updatePatient = (patient: Patient) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.patch(`/patient/${patient._id}`, {
        data: patient,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      dispatch<UpdatePatientAction>({
        type: ActionTypes.updatePatient,
        payload: response.data.data.patient,
      });
    } catch (error) {
      console.warn('something went wrong when updating a patient');
      console.warn(error);
    }
  };
};

export const deletePatient = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.delete(`/patient/${id}`);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      dispatch<DeletePatientAction>({
        type: ActionTypes.deletePatient,
        payload: id,
      });
    } catch (error) {
      console.warn('something went wrong when deleting a patient');
      console.warn(error);
    }
  };
};
