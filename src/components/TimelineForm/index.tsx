import { useState } from 'react';
import { connect } from 'react-redux';
import style from './TimelineForm.module.css';

import { Modal } from '../Modal';

import { createEvent, Event, Patient } from '../../store/actions';
import { StoreState } from '../../store/reducers';

export interface LocationType {
  name: string;
  value: string;
}

export interface TimeLineFormProps {
  selectedPatient: Patient | null;
  hideConfirmBtn?: boolean;
  createEvent: Function;
}

const _TimelineForm = ({
  selectedPatient,
  createEvent,
  hideConfirmBtn = false,
}: TimeLineFormProps): JSX.Element => {
  const [disabled, setDisabled] = useState(false);
  const [nameRequired, setNameRequired] = useState(false); // check if location name is required

  const locationTypes: LocationType[] = [
    { name: 'Indoor', value: 'indoor' },
    { name: 'Outdoor', value: 'outdoor' },
    { name: 'Home', value: 'home' },
    { name: 'Travelling', value: 'travelling' },
  ];

  const locationTypeOptions = (types: LocationType[]): JSX.Element[] => {
    return types.map((type: LocationType) => {
      return (
        <option value={type.value} key={type.value}>
          {type.name}
        </option>
      );
    });
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const timeFrom = formData.get('dateFrom');
    const timeTo = formData.get('dateTo');
    const detail = formData.get('detail');
    const locationType = formData.get('locationType');
    const locationName = formData.get('locationName');

    const response = await createEvent({
      timeFrom,
      timeTo,
      detail,
      locationType,
      locationName,
    });

    if (response) {
    }
  };

  return (
    <form
      className={`${style.timeline_form} ${style.form_display} ${
        hideConfirmBtn ? style.grid_3_row : ''
      }`}
      onSubmit={submitHandler}
      id="create_event"
    >
      <div className={style.date_from}>
        <label className="form-label" htmlFor="dateFrom">
          From
        </label>
        <input
          className={`form-control mb-3`}
          type="datetime-local"
          id="dateFrom"
          name="dateFrom"
          disabled={disabled}
        />
      </div>
      <div className={style.date_to}>
        <label className="form-label" htmlFor="dateTo">
          To
        </label>
        <input
          className={`form-control mb-3`}
          type="time"
          id="dateTo"
          name="dateTo"
          disabled={disabled}
        />
      </div>
      <div className={style.detail}>
        <label className="form-label" htmlFor="detail">
          Detail
        </label>
        <textarea
          className={`form-control mb-3`}
          name="detail"
          id="detail"
          rows={5}
        ></textarea>
      </div>
      <div className={style.location_type}>
        <label className="form-label" htmlFor="locationType">
          Location Type
        </label>
        <select
          className={`form-control mb-3`}
          name="locationType"
          id="locationType"
        >
          {locationTypeOptions(locationTypes)}
        </select>
      </div>
      <div className={style.location_name}>
        <label className="form-label" htmlFor="locationName">
          Location Name
        </label>
        <input
          className={`form-control mb-3`}
          type="text"
          id="locationName"
          name="locationName"
          disabled={nameRequired}
        />
      </div>
      <div
        className={`${style.submit_btn} ${
          hideConfirmBtn ? style.display_none : ''
        }`}
      >
        <button className={`btn btn-warning`} type="submit">
          + Add Entry
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (
  state: StoreState,
): { selectedPatient: Patient | null } => {
  return { selectedPatient: state.selectedPatient };
};

export const TimelineForm = connect(mapStateToProps, { createEvent })(
  _TimelineForm,
);
