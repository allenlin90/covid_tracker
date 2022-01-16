import {
  Patient,
  PatientActions,
  ActionTypes,
  SelectPatientAction,
} from '../actions';

export const selectPatientReducer = (
  state: Patient | null = null,
  action: SelectPatientAction,
) => {
  switch (action.type) {
    case ActionTypes.selectPatient:
      state = action.payload;
      return { ...action.payload };
    default:
      return state;
  }
};

// state should be an array of Patients
// the default value for state is an emtpy array
export const patientsReducer = (
  state: Patient[] = [],
  action: PatientActions,
) => {
  switch (action.type) {
    case ActionTypes.fetchPatients:
      state = [...action.payload];
      return [...action.payload];
    case ActionTypes.createPatient:
      state = [...state, action.payload];
      return [...state];
    case ActionTypes.updatePatient:
      const index = state.findIndex((patient: Patient) => {
        return patient._id === action.payload._id;
      });
      if (index > -1) {
        state[index] = action.payload;
      }
      return [...state];
    case ActionTypes.deletePatient:
      return state.filter((patient: Patient) => patient._id !== action.payload);
    default:
      return state;
  }
};
