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
          <div className="col-12 col-md-6 col-lg-7">
            <Timeline />
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            <div className={`accordion ${style.accordion_form}`}>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className={`accordion-button ${style.bg_blue}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Create Event
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <TimelineForm />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${style.event_form}`}>
              <TimelineForm />
            </div>
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
