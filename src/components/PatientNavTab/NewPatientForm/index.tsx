import React, { useState, useRef, FormEvent, useEffect } from 'react';
import { connect } from 'react-redux';

import { Spinner } from '../../Spinner';

import { Patient, createPatient } from '../../../store/actions';

import style from './NewPatientForm.module.scss';

interface NewPatientFormProps {
  createPatient: Function;
  sentRequest: Function;
  showModal: boolean;
}

export const _NewPatientForm = ({
  sentRequest,
  createPatient,
  showModal,
}: NewPatientFormProps) => {
  const patientInit = {
    gender: 'female',
    age: 0,
    occupation: '',
  };

  const [formData, setFormData] = useState<Patient>(patientInit);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isPatientCreated, setIsPatientCreated] = useState(false);

  useEffect(() => {
    if (!showModal) {
      // reset states and form inputs after closing modal
      setTimeout(() => {
        reset();
      }, 500);
    }
  }, [showModal]);
  useEffect(() => {}, [isPatientCreated]);

  const jobInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const genderSelect = useRef<HTMLSelectElement>(null);

  const reset = () => {
    setFormData(patientInit);
    setIsLoading(false);
    setIsRequestSent(false);
    sentRequest(false);
    setIsPatientCreated(false);
    if (jobInput.current) {
      jobInput.current.value = '';
    }

    if (genderSelect.current) {
      genderSelect.current.value = 'female';
    }

    if (ageInput.current) {
      ageInput.current.valueAsNumber = 0;
    }
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

  const createPatientResult = () => {
    if (isPatientCreated && isRequestSent) {
      return (
        <h1 className={`text-center`}>
          <span className={`badge bg-success`}>Success</span>
        </h1>
      );
    }

    // failed to create a new patient
    if (!isPatientCreated && isRequestSent) {
      return (
        <h1 className={`text-center`}>
          Sorry, service is currently unavailable...
        </h1>
      );
    }
  };

  const removeInputHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (jobInput.current) {
      jobInput.current.value = '';
    }
    setFormData({ ...formData, occupation: '' });
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    sentRequest(true);
    const response = await createPatient(formData);
    setIsRequestSent(true);
    setIsLoading(false);

    if (response) {
      setIsPatientCreated(true);
    }
  };

  return (
    <>
      {<Spinner isLoading={isLoading} />}
      {createPatientResult()}
      <form
        className={`${
          isLoading || isRequestSent ? style.display_none : style.display_block
        }`}
        onSubmit={submitHandler}
        id="new_patient"
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
            onChange={selectChangeHandler}
            ref={genderSelect}
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
            onChange={inputChangeHandler}
            ref={ageInput}
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
    </>
  );
};

export const NewPatientForm = connect(() => ({}), { createPatient })(
  _NewPatientForm,
);
