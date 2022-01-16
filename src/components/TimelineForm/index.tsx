import { useState } from 'react';
import style from './TimelineForm.module.css';

export interface LocationType {
  name: string;
  value: string;
}

export const TimelineForm = (): JSX.Element => {
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

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dateFrom = formData.get('dateFrom');
    const dateTo = formData.get('dateTo');
    const detail = formData.get('detail');
    const locationType = formData.get('locationType');
    const locationName = formData.get('locationName');

    console.log('sumbit');
  };

  return (
    <form
      className={`${style.timeline_form} ${style.form_display}`}
      onSubmit={submitHandler}
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
      <div className={style.submit_btn}>
        <button className={`btn btn-warning`} type="submit">
          + Add Entry
        </button>
      </div>
    </form>
  );
};
