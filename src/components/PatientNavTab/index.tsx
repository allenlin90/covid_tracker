import { useState, useEffect } from 'react';
import { Patient, selectPatient } from '../../store/actions';
import { Tabs, Tab } from 'react-bootstrap';

import { StoreState } from '../../store/reducers';
import { connect } from 'react-redux';

interface PatientNavTabProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  selectPatient: Function;
}

const _PatientNavTab = (props: PatientNavTabProps): JSX.Element => {
  const [tab, setTab] = useState(0);
  // listen on changes to patients
  useEffect(() => {}, [props.patients]);
  useEffect(() => {}, [props.selectedPatient]);

  const onSelectPatient = (event: any, patient: Patient) => {
    console.log('event');
    console.log(event);
    console.log('patient');
    console.log(patient);
  };

  const renderPatientList = (): JSX.Element[] => {
    return props.patients.map((patient: Patient, index: number) => {
      return (
        <Tab
          title={index + 1}
          key={patient._id}
          // onClick={(event) => onSelectPatient(event, patient)}
          onSelect={(event) => console.log('click')}
        ></Tab>
      );
    });
  };

  return <Tabs activeKey={tab}>{renderPatientList()}</Tabs>;
};

const mapStateToProps = (
  state: StoreState,
): { selectedPatient: Patient | null; patients: Patient[] } => {
  return { selectedPatient: state.selectedPatient, patients: state.patients };
};

export const PatientNavTab = connect(mapStateToProps, { selectPatient })(
  _PatientNavTab,
);
