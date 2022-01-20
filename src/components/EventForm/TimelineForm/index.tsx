import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import style from './TimelineForm.module.css';

import { Modal } from '../../Modal';
import { Spinner } from '../../Spinner';
import { ResultText } from '../../ResultText';

import { createEvent, Event, Patient } from '../../../store/actions';
import { StoreState } from '../../../store/reducers';
import { dateCompiler } from '../../../assests/helpers';

export interface LocationType {
  name: string;
  value: string;
}

export interface TimeLineFormProps {
  selectedPatient: Patient | null;
  hideConfirmBtn?: boolean;
  createEvent: Function;
}

export interface EventFormData {
  timeFrom: string;
  timeTo: string;
  detail: string;
  locationType: string;
  location: string;
}

const _TimelineForm = ({
  selectedPatient,
  createEvent,
  hideConfirmBtn = false,
}: TimeLineFormProps): JSX.Element => {
  const orgFormData = {
    timeFrom: '',
    timeTo: '',
    detail: '',
    locationType: 'indoor',
    location: '',
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRequestDone, setIsRequestDone] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [nameRequired, setNameRequired] = useState<boolean>(true); // check if location name is required
  const [formData, setFormData] = useState<EventFormData>(orgFormData);
  const [validInput, setValidInput] = useState<boolean>(false);
  const [invalidToTime, setInvalidToTime] = useState<boolean>(false);

  const locationTypes: LocationType[] = [
    { name: 'Indoor', value: 'indoor' },
    { name: 'Outdoor', value: 'outdoor' },
    { name: 'Home', value: 'home' },
    { name: 'Travelling', value: 'travelling' },
  ];

  useEffect(() => {
    const { timeFrom, timeTo, detail, location, locationType } = formData;

    if (timeFrom && timeTo && detail && locationType) {
      if (
        (!nameRequired || (nameRequired && location)) &&
        !isTimeInvalid(formData)
      ) {
        setValidInput(true);
        return;
      }
    }
    setValidInput(false);
  }, [formData]);

  useEffect(() => {
    if (isRequestSent && !showModal) {
      reset();
    }
  }, [showModal]);

  const onChangeHandler = (
    event: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.currentTarget;
    const { timeFrom, timeTo, location, locationType } = formData;
    setFormData({ ...formData, [name]: value });

    let nameRequired = false;
    if (name === 'locationType') {
      if (value === 'indoor' || value === 'outdoor') {
        nameRequired = true;
        setNameRequired(true);
      } else {
        nameRequired = false;
        setNameRequired(false);
      }
    }

    let invalidTime = false;
    if (name === 'timeTo') {
      invalidTime = isTimeInvalid({ [name]: value, timeFrom });
    } else if (name === 'timeFrom' && timeTo) {
      invalidTime = isTimeInvalid({ [name]: value, timeTo });
    }
    if (invalidTime) {
      setInvalidToTime(true);
    }

    if (invalidTime || (nameRequired && !location)) {
      setValidInput(false);
    } else {
      setInvalidToTime(false);
      setValidInput(true);
    }
  };

  const submitHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);
    setIsRequestSent(true);
    const response = await createEvent({
      ...formData,
      timeFrom: new Date(formData.timeFrom).toISOString(),
      timeTo: dateObjectCreate(
        formData.timeFrom,
        formData.timeTo,
      ).toISOString(),
      patient_id: selectedPatient?._id,
    });
    setIsLoading(false);

    if (response) {
      setIsRequestDone(true);
    }
  };

  const locationTypeOptions = (types: LocationType[]): JSX.Element[] => {
    return types.map((type: LocationType) => {
      return (
        <option value={type.value} key={type.value}>
          {type.name}
        </option>
      );
    });
  };

  const confirmButton = () => {
    if (isRequestSent) return null;

    return (
      <button
        type="button"
        form="create_event"
        className="btn btn-warning ms-3"
        onClick={submitHandler}
      >
        Add
      </button>
    );
  };

  const dateObjectCreate = (dateStr: string = '', timeStr: string = '') => {
    const timeObj = new Date(dateStr);
    const [hour, minute] = timeStr.split(':');

    return new Date(
      timeObj.getFullYear(),
      timeObj.getMonth(),
      timeObj.getDate(),
      parseInt(hour),
      parseInt(minute),
    );
  };

  const isTimeInvalid = ({
    timeTo,
    timeFrom,
  }: {
    timeTo: string;
    timeFrom: string;
  }) => {
    // time to should always be later than time from
    const fromTimeObj = new Date(timeFrom);
    const year = fromTimeObj.getFullYear();
    const month = fromTimeObj.getMonth();
    const date = fromTimeObj.getDate();

    const [hourTo, minuteTo] = timeTo.split(':');

    const from = fromTimeObj.getTime();
    const to = new Date(
      year,
      month,
      date,
      parseInt(hourTo),
      parseInt(minuteTo),
    ).getTime();

    if (to > from) return false;

    return true;
  };

  const reset = () => {
    setShowModal(false);
    setIsLoading(false);
    setDisabled(false);
    setNameRequired(true);
    setFormData(orgFormData);
    setValidInput(false);

    setTimeout(() => {
      setIsRequestSent(false);
      setIsRequestDone(false);
    }, 500);
  };

  return (
    <>
      <Modal
        show={showModal}
        closeModal={() => setShowModal(false)}
        confirmBtn={confirmButton()}
        title="Add Event"
      >
        <>
          <Spinner isLoading={isLoading} />
          <ResultText
            success={isRequestDone}
            isRequestSent={isRequestSent}
            isLoading={isLoading}
          />
          <ul
            className={`list-group ${style.bg_blue} ${
              isLoading || isRequestSent ? style.display_none : ''
            }`}
          >
            <li className="list-group-item">
              From Date: {dateCompiler(formData.timeFrom)}
            </li>
            <li className="list-group-item">To Time: {formData.timeTo}</li>
            <li className={`list-group-item`}>Detail: {formData.detail}</li>
            <li className="list-group-item">
              Location Type: {formData.locationType}
            </li>
            <li
              className={`list-group-item ${
                formData.location ? '' : style.display_none
              }`}
            >
              Location Name: {formData.location}
            </li>
          </ul>
        </>
      </Modal>
      <form
        className={`${style.timeline_form} ${style.form_display} ${
          hideConfirmBtn ? style.grid_3_row : ''
        }`}
        id="create_event"
      >
        <div className={`${style.date_from}`}>
          <label className="form-label" htmlFor="timeFrom">
            From <span className={style.red_text}>*</span>
          </label>
          <input
            className={`form-control mb-3`}
            type="datetime-local"
            id="timeFrom"
            name="timeFrom"
            disabled={disabled}
            onChange={onChangeHandler}
            value={formData.timeFrom}
            required
          />
        </div>
        <div className={style.date_to}>
          <label className="form-label" htmlFor="timeTo">
            To <span className={style.red_text}>*</span>
          </label>
          <input
            className={`form-control mb-3 ${invalidToTime ? 'is-invalid' : ''}`}
            type="time"
            id="timeTo"
            name="timeTo"
            disabled={disabled}
            onChange={onChangeHandler}
            value={formData.timeTo}
            required
          />
          <div className="invalid-feedback">
            To must be later than time from
          </div>
        </div>
        <div className={style.detail}>
          <label className="form-label" htmlFor="detail">
            Detail <span className={style.red_text}>*</span>
          </label>
          <textarea
            className={`form-control mb-3`}
            name="detail"
            id="detail"
            disabled={disabled}
            rows={5}
            onChange={onChangeHandler}
            value={formData.detail}
            required
          ></textarea>
        </div>
        <div className={style.location_type}>
          <label className="form-label" htmlFor="locationType">
            Location Type <span className={style.red_text}>*</span>
          </label>
          <select
            className={`form-control mb-3`}
            name="locationType"
            id="locationType"
            disabled={disabled}
            onChange={onChangeHandler}
            value={formData.locationType}
            required
          >
            {locationTypeOptions(locationTypes)}
          </select>
        </div>
        <div className={style.location_name}>
          <label className="form-label" htmlFor="location">
            Location Name{' '}
            <span
              className={`${style.red_text} ${
                nameRequired ? '' : style.display_none
              }`}
            >
              *
            </span>
          </label>
          <input
            className={`form-control mb-3`}
            type="text"
            id="location"
            name="location"
            disabled={disabled}
            onChange={onChangeHandler}
            value={formData.location}
          />
        </div>
        <div
          className={`${style.submit_btn} ${
            hideConfirmBtn ? style.display_none : ''
          }`}
        >
          <button
            className={`btn btn-warning ${validInput ? '' : 'disabled'}`}
            type="button"
            onClick={() => setShowModal(true)}
          >
            + Add Entry
          </button>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (
  state: StoreState,
): { selectedPatient: Patient | null; events: Event[] } => {
  return { selectedPatient: state.selectedPatient, events: state.events };
};

export const TimelineForm = connect(mapStateToProps, { createEvent })(
  _TimelineForm,
);
