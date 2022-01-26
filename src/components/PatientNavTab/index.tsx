import { useState, useEffect, useRef } from 'react';
import { Patient, selectPatient } from '../../store/actions';
import { Tabs, Tab, Button } from 'react-bootstrap';

import { StoreState } from '../../store/reducers';
import { connect } from 'react-redux';

import { Modal } from '../Modal';
import { NewPatientForm } from './NewPatientForm';

import style from './PatientNavTab.module.css';

interface PatientNavTabProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  selectPatient: Function;
}

const _PatientNavTab = ({
  patients,
  selectedPatient,
  selectPatient,
}: PatientNavTabProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [patientLimit, setPatientLimit] = useState(8);
  const [isRequestSent, setIsRequestSent] = useState(false);

  // listen on changes to patients
  useEffect(() => {
    if (patients.length) {
      // select the last patient in the list when it's updated
      if (!selectedPatient) {
        const patient = patients[patients.length - 1];
        selectPatient({ patient });
      } else {
        const { _id } = selectedPatient;
        const patient = patients.find((patient) => patient._id === _id);
        selectPatient({ ...patient });
      }
    }
  }, [patients]);

  const confirmAdding = (): JSX.Element | undefined => {
    if (!isRequestSent) {
      return (
        <button
          className='btn btn-warning ms-3'
          type='submit'
          form='new_patient'
        >
          Create
        </button>
      );
    }

    return undefined;
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSelectPatient = (event: any, patient: Patient) => {
    event.stopPropagation();
    selectPatient(patient);
  };

  const renderPatientList = (): JSX.Element[] => {
    return patients.map((patient: Patient, index: number) => {
      return (
        <li
          className={`${style.nav_items} ${
            selectedPatient?._id === patient._id ? style.active : ''
          }`}
          key={patient._id}
          onClick={(event) => onSelectPatient(event, patient)}
        >
          <span>Patient</span>
          <span>{index + 1}</span>
        </li>
      );
    });
  };

  return (
    <nav>
      <Modal
        title='Create New Patient'
        show={showModal}
        closeModal={closeModal}
        confirmBtn={confirmAdding()}
      >
        <NewPatientForm showModal={showModal} sentRequest={setIsRequestSent} />
      </Modal>
      <ul className={`mt-2 ${style.nav_tabs}`}>
        {renderPatientList()}
        <li
          className={`${style.nav_items} ${style.nav_items_extra} ${
            patients.length >= patientLimit ? style.hide : ''
          }`}
          onClick={() => setShowModal(true)}
        >
          <div className={style.add_patient}>&nbsp;</div>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (
  state: StoreState
): { selectedPatient: Patient | null; patients: Patient[] } => {
  return { selectedPatient: state.selectedPatient, patients: state.patients };
};

export const PatientNavTab = connect(mapStateToProps, { selectPatient })(
  _PatientNavTab
);
