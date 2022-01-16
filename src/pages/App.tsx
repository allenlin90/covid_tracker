import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPatients, Patient, fetchEvents, Event } from '../store/actions';
import { StoreState } from '../store/reducers';

import { PatientNavTab } from '../components/PatientNavTab';
import { PatientInfo } from '../components/PatientInfo';
import { Timeline } from '../components/Timeline';
import { TimelineForm } from '../components/TimelineForm';

import '../assests/style.css';
import style from './App.module.css';

interface AppProps {
  patients: Patient[];
  fetchPatients: Function;
  events: Event[];
  fetchEvents: Function;
}

class _App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPatients();
    // this.props.fetchEvents();
  }

  onFetchPatients = (): void => {
    this.props.fetchPatients();
  };

  render(): JSX.Element {
    return (
      <div className="container">
        <div className="row mb-3">
          <div className="col-12">
            <h1 className={style.header}>COVID Timeline Generator</h1>
          </div>
          <div className="col-12">
            <PatientNavTab />
          </div>
          <div className="col-12">
            <PatientInfo />
          </div>
          <div className="col-12">
            <h2 className={style.timeline}>Timeline</h2>
          </div>
          <div className="col-7 col-sm-12">
            <Timeline />
          </div>
          <div className="col-5">
            <TimelineForm />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  state: StoreState,
): { patients: Patient[]; events: Event[] } => {
  return { patients: state.patients, events: state.events };
};

export const App = connect(mapStateToProps, { fetchPatients, fetchEvents })(
  _App,
);
