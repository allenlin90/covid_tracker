import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { Patient, updatePatient, deletePatient } from '../../store/actions';

import App_style from '../../pages/App.module.css';
import style from './PatientInfo.module.css';
import { StoreState } from '../../store/reducers';

interface PatientInfoProps {
  selectedPatient: Patient | null;
}

const _PatientInfo = (props: PatientInfoProps): JSX.Element => {
  const jobInput = useRef(document.createElement('input'));
  const [canEdit, setcanEdit] = useState(false);
  const [formData, setFormData] = useState({
    gender: props.selectedPatient ? props.selectedPatient.gender : 'female',
    age: props.selectedPatient ? props.selectedPatient.age : 0,
    occupation: props.selectedPatient ? props.selectedPatient.occupation : '',
  } as Patient);

  useEffect(() => {
    if (props.selectedPatient) {
      const { age, occupation, gender } = props.selectedPatient;
      setFormData({
        gender,
        occupation,
        age,
      });
    }
  }, [props.selectedPatient]);

  const createPatient = (formData?: Patient): void => {
    console.log(formData);
  };

  // below are event handlers

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('create new patient');
    createPatient(formData);
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;
    switch (name) {
      case 'age':
        const age = parseInt(value);
        setFormData({ ...formData, age });
        break;
      case 'occupation':
        setFormData({ ...formData, occupation: value });
        break;
      default:
        return;
    }
  };

  const selectChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const gender = event.target.value;
    setFormData({ ...formData, gender });
  };

  const editPatientInfoHandler = () => {
    setcanEdit(!canEdit);
  };

  const removePatientHandler = () => {
    console.log('remove patient');
  };

  const confirmEditHandler = () => {
    setcanEdit(!canEdit);
    console.log('confirm edit');
  };

  const removeInputHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    jobInput.current.value = '';
    setFormData({ ...formData, occupation: '' });
  };

  // below are smaller components in PatientInfo

  const editBtn = (): JSX.Element => {
    if (canEdit) {
      return <span></span>;
    }

    return (
      <span className={style.edit_btn} onClick={editPatientInfoHandler}>
        <i className="far fa-edit"></i>
      </span>
    );
  };

  const largeBtn = (): JSX.Element => {
    if (canEdit) {
      return (
        <button
          className={`btn btn-success ${style.patient_remover_bg}`}
          onClick={confirmEditHandler}
        >
          Confirm Edit
        </button>
      );
    }

    return (
      <button
        className={`btn btn-danger ${style.patient_remover_bg}`}
        onClick={removePatientHandler}
      >
        Remove Patient
      </button>
    );
  };

  const smallBtn = (): JSX.Element => {
    if (canEdit) {
      return (
        <button
          className={`btn btn-success ${style.upper_right}`}
          onClick={confirmEditHandler}
        >
          Confirm Edit
        </button>
      );
    }

    return (
      <button
        className={`btn btn-danger ${style.upper_right}`}
        onClick={removePatientHandler}
      >
        Remove Patient
      </button>
    );
  };

  return (
    <>
      <div className={style.header}>
        <h2 className={App_style.timeline}>
          Patient Information
          {editBtn()}
        </h2>
        <div>{largeBtn()}</div>
      </div>
      <div className={style.form_wrapper}>
        <form
          className={style.patient_form}
          onSubmit={submitHandler}
          id="patient_info"
        >
          <div>
            <label className="form-label" htmlFor="gender">
              Gender
            </label>
            <select
              className="form-control"
              name="gender"
              id="gender"
              required
              disabled={!canEdit}
              value={formData.gender}
              onChange={selectChangeHandler}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="age">
              Age
            </label>
            <input
              className="form-control"
              type="number"
              name="age"
              id="age"
              min={0}
              max={120}
              required
              disabled={!canEdit}
              value={formData.age}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="occupation">
              Occupation
            </label>
            <div className={`input-group ${style.clear_btn}`}>
              <input
                className="form-control"
                type="text"
                name="occupation"
                id="occupation"
                required
                disabled={!canEdit}
                value={formData.occupation}
                onChange={inputChangeHandler}
                ref={jobInput}
              />
              <button
                className="btn btn-secondary"
                type="button"
                onClick={removeInputHandler}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </form>
        {smallBtn()}
      </div>
    </>
  );
};

const mapStateToProps = (
  state: StoreState,
): { selectedPatient: Patient | null } => {
  return { selectedPatient: state.selectedPatient };
};

export const PatientInfo = connect(mapStateToProps, {
  updatePatient,
  deletePatient,
})(_PatientInfo);
