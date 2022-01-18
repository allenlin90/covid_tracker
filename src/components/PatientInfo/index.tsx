import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import {
  Patient,
  fetchPatients,
  updatePatient,
  deletePatient,
} from '../../store/actions';

import { Modal } from '../Modal';
import { Spinner } from '../Spinner';
import { EditBtn } from './buttons/EditBtn';
import { LargeBtn } from './buttons/LargeBtn';
import { SmallBtn } from './buttons/SmallBtn';
import { PatientCard } from './PatientCard';

import App_style from '../../pages/App.module.css';
import style from './PatientInfo.module.css';
import { StoreState } from '../../store/reducers';

interface PatientInfoProps {
  selectedPatient: Patient | null;
  fetchPatients: Function;
  updatePatient: Function;
  deletePatient: Function;
}

const _PatientInfo = (props: PatientInfoProps): JSX.Element => {
  const { fetchPatients, updatePatient, deletePatient } = props;
  const jobInput = useRef<HTMLInputElement>(null);

  // states
  const [showModal, setShowModal] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestDone, setIsRequestDone] = useState(false);
  const [canEdit, setcanEdit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateType, setUpdateType] = useState('delete');
  const [formData, setFormData] = useState({
    _id: props.selectedPatient ? props.selectedPatient?._id : '',
    gender: props.selectedPatient ? props.selectedPatient.gender : 'female',
    age: props.selectedPatient ? props.selectedPatient.age : 0,
    occupation: props.selectedPatient ? props.selectedPatient.occupation : '',
  } as Patient);

  // life cyecle hook
  useEffect(() => {
    if (props.selectedPatient) {
      setFormData({ ...props.selectedPatient });
    }
  }, [props.selectedPatient]);

  useEffect(() => {
    // check if the user wants to update or delete patient data
    if (canEdit) {
      setUpdateType('update');
    } else {
      setUpdateType('delete');
    }
  }, [canEdit]);

  useEffect(() => {
    // check if patient data is changed
    const { gender, age, occupation } = formData;
    if (
      (gender !== props.selectedPatient?.gender && gender) ||
      (age !== props.selectedPatient?.age && age) ||
      (occupation !== props.selectedPatient?.occupation && occupation)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData]);

  // below are event handlers
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

  const removePatientHandler = async () => {
    setIsLoading(true);
    setIsRequestSent(true);
    const response = await deletePatient(props.selectedPatient?._id);
    setIsLoading(false);

    if (response) {
      setIsRequestDone(true);
    }
  };

  const confirmEditHandler = async (
    event: React.TouchEvent | React.MouseEvent | React.FormEvent,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setIsLoading(true);
    setIsRequestSent(true);
    const response = await updatePatient(formData);
    setIsLoading(false);

    if (response) {
      setIsRequestDone(true);
    }
  };

  const clearInputHandler = (event: React.TouchEvent | React.MouseEvent) => {
    event.stopPropagation();
    if (jobInput.current) {
      jobInput.current.value = '';
    }
    setFormData({ ...formData, occupation: '' });
  };

  const closeModal = () => {
    setShowModal(false);

    if (isRequestSent && !isLoading) {
      // resest after closing modal
      reset();
    }
  };

  const modalTitle = canEdit ? 'Update Patient' : 'Remove Patient';

  const confirmBtn = (): JSX.Element | undefined => {
    if (!isRequestSent && !canEdit) {
      return (
        <button
          className={`btn btn-danger ms-3 ${style.delete_btn}`}
          type="button"
          onClick={removePatientHandler}
        >
          <i className="fas fa-trash-alt"></i> <span>Delete</span>
        </button>
      );
    }

    if (!isRequestSent && canEdit) {
      return (
        <button
          className="btn btn-warning ms-3"
          type="submit"
          form="patient_info"
          onSubmit={confirmEditHandler}
        >
          Update
        </button>
      );
    }

    return undefined;
  };

  const modalContent = () => {
    if (!isLoading && !isRequestSent) {
      // before sending request
      switch (updateType) {
        case 'delete':
          return <PatientCard selectedPatient={props.selectedPatient} />;
        case 'update':
          return;
        default:
      }
    } else if (!isLoading && isRequestDone) {
      // if the request succeed
      let message = '';
      switch (updateType) {
        case 'delete':
          message = 'Patient data is deleted';
          break;
        case 'update':
          message = 'Patient data is updated';
          break;
        default:
      }

      return (
        <h1 className={`text-center`}>
          <span className={`badge bg-success`}>{message}</span>
        </h1>
      );
    } else if (!isLoading && isRequestSent && !isRequestDone) {
      // if the request fails
      return (
        <h1 className={`text-center`}>
          Sorry, service is currently unavailable...
        </h1>
      );
    }

    return undefined;
  };

  const reset = () => {
    setShowModal(false);
    setIsLoading(false);
    setcanEdit(false);
    setUpdateType('delete');
    setFormData({
      _id: props.selectedPatient ? props.selectedPatient?._id : '',
      gender: props.selectedPatient ? props.selectedPatient.gender : 'female',
      age: props.selectedPatient ? props.selectedPatient.age : 0,
      occupation: props.selectedPatient ? props.selectedPatient.occupation : '',
    });

    setTimeout(() => {
      // prevent patient data render in Modal
      setIsRequestDone(false);
      setIsRequestSent(false);
    }, 500);
  };

  return (
    <>
      <Modal
        title={modalTitle}
        show={showModal}
        closeModal={closeModal}
        confirmBtn={confirmBtn()}
      >
        <>
          <Spinner isLoading={isLoading} />
          {modalContent()}
        </>
      </Modal>
      <div className={style.header}>
        <h2 className={App_style.timeline}>
          Patient Information
          <EditBtn
            canEdit={canEdit}
            clickHandler={() => setcanEdit(!canEdit)}
          />
        </h2>
        <LargeBtn
          canEdit={canEdit}
          disabled={disabled}
          clickHandler={() => {
            setShowModal(true);
          }}
        />
      </div>
      <div className={style.form_wrapper}>
        <form
          className={style.patient_form}
          onSubmit={confirmEditHandler}
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
                className={`btn btn-secondary ${canEdit ? '' : 'disabled'}`}
                type="button"
                onClick={clearInputHandler}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </form>
        <SmallBtn
          canEdit={canEdit}
          disabled={disabled}
          clickHandler={() => setShowModal(true)}
        />
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
  fetchPatients,
})(_PatientInfo);
