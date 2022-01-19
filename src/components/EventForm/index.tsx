import { TimelineForm } from './TimelineForm';

import style from './EventForm.module.css';

export const EventForm = () => {
  return (
    <>
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
              <div
                className={`${style.chevron_mark} ${style.chevron_mark__down}`}
              >
                <i className="fas fa-chevron-down"></i>
              </div>
              <div
                className={`${style.chevron_mark} ${style.chevron_mark__up}`}
              >
                <i className="fas fa-chevron-up"></i>
              </div>
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
    </>
  );
};
