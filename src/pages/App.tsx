import { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchPatients,
  Patient,
  fetchEvents,
  Event,
  toggleOverlay,
} from '../store/actions';
import { StoreState } from '../store/reducers';

import { PatientNavTab } from '../components/PatientNavTab';
import { PatientInfo } from '../components/PatientInfo';
import { Timeline } from '../components/Timeline';
import { EventForm } from '../components/EventForm';
import { Overlay } from '../components/Overlay';

import '../assests/style.css';
import style from './App.module.css';

interface AppProps {
  patients: Patient[];
  fetchPatients: Function;
  events: Event[];
  fetchEvents: Function;
  toggleOverlay: Function;
}

class _App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount() {
    this.props.toggleOverlay(true);
    this.props.fetchPatients();
    this.props.fetchEvents();
    this.props.toggleOverlay(false);
  }

  onFetchPatients = (): void => {
    this.props.fetchPatients();
  };

  render(): JSX.Element {
    return (
      <>
        <Overlay />
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
            <div className="col-12 col-md-6 col-lg-7 order-2 order-sm-1">
              <Timeline />
            </div>
            <div className="col-12 col-md-6 col-lg-5 order-1 order-sm-2">
              <EventForm />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (
  state: StoreState,
): { patients: Patient[]; events: Event[] } => {
  return { patients: state.patients, events: state.events };
};

export const App = connect(mapStateToProps, {
  fetchPatients,
  fetchEvents,
  toggleOverlay,
})(_App);
