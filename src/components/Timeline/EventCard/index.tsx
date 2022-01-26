import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Event, deleteEvent } from '../../../store/actions';
import { dateCompiler } from '../../../assests/helpers';

import { Spinner } from '../../Spinner';
import { ResultText } from '../../ResultText';
import { Modal } from '../../Modal';

import style from './EventCard.module.css';

interface EventCardProps {
  date: string;
  events: Event[];
  deleteEvent: Function;
}

const _EventCard = ({
  date,
  events,
  deleteEvent,
}: EventCardProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [showDetialModal, setShowDetialModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isRequestDone, setIsRequestDone] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (!isLoading && isRequestDone && !showModal) {
      reset();
    }

    setTimeout(() => {
      if (!showModal) {
        setSelectedEvent(null);
      }
    }, 500);
  }, [showModal]);

  const removeEventHandler = async (event: React.MouseEvent) => {
    if (selectedEvent) {
      setIsLoading(true);
      setIsRequestSent(true);
      const response = await deleteEvent(selectedEvent._id);
      setIsLoading(false);

      if (response) {
        setIsRequestDone(true);
      }
    }
  };

  const reset = () => {
    setShowModal(false);
    setIsLoading(false);
    setSelectedEvent(null);

    setTimeout(() => {
      setIsRequestSent(false);
      setIsRequestDone(false);
    }, 500);
  };

  const detailContent = (event: Event): JSX.Element | string => {
    const sliceLength = 90;

    if (event.detail.length > sliceLength) {
      return (
        <div>
          <span>
            {event.detail.slice(0, sliceLength)}...&nbsp;
            <span
              className={`${style.readmore}`}
              onClick={() => {
                setShowDetialModal(true);
                setSelectedEvent(event);
              }}
            >
              (Read More)
            </span>
          </span>
        </div>
      );
    }

    return event.detail;
  };

  const eventList = (() => {
    return events.map((event: Event) => {
      const { timeFrom, timeTo, location, locationType, detail } = event;
      const fromHour = new Date(timeFrom).getHours();
      const fromMinute = new Date(timeFrom).getMinutes();
      const toHour = new Date(timeTo).getHours();
      const toMinute = new Date(timeTo).getMinutes();

      const fromHourStr = `${fromHour < 10 ? '0' + fromHour : fromHour}:${
        fromMinute < 10 ? '0' + fromMinute : fromMinute
      }`;
      const toHourStr = `${toHour < 10 ? '0' + toHour : toHour}:${
        toMinute < 10 ? '0' + toMinute : toMinute
      }`;

      return (
        <div key={event._id} className={`${style.event_card}`}>
          <div className={`${style.event_card__timeslot}`}>
            {fromHourStr} - {toHourStr}
          </div>
          <div className={`${style.event_card__info} ${style.info}`}>
            <div className={`${style.event_card__detail}`}>
              {detailContent(event)}
            </div>
            <div className={`${style.info__location}`}>
              {locationType} {location ? `- ${location}` : ``}
            </div>
            <div
              className={`${style.info__delete}`}
              onClick={() => {
                setShowModal(true);
                setSelectedEvent(event);
              }}
            >
              <i className={`fas fa-times`}></i>
            </div>
          </div>
        </div>
      );
    });
  })();

  const confirmEventList = ((): JSX.Element | null => {
    if (!selectedEvent) return null;
    return (
      <ul
        className={`list-group ${style.bg_blue} ${
          isLoading || isRequestSent ? style.display_none : ''
        }`}
      >
        <li className='list-group-item'>
          From Date: {dateCompiler(selectedEvent.timeFrom)}
        </li>
        <li className='list-group-item'>
          To Time: {dateCompiler(selectedEvent.timeTo)}
        </li>
        <li className={`list-group-item`}>Detail: {selectedEvent.detail}</li>
        <li className='list-group-item'>
          Location Type: {selectedEvent.locationType}
        </li>
        <li
          className={`list-group-item ${
            selectedEvent.location ? '' : style.display_none
          }`}
        >
          Location Name: {selectedEvent.location}
        </li>
      </ul>
    );
  })();

  const deleteBtn = (() => {
    return (
      <button
        type='button'
        className='btn btn-warning ms-3'
        onClick={removeEventHandler}
      >
        Delete
      </button>
    );
  })();

  return (
    <>
      <Modal
        show={showModal}
        closeModal={() => setShowModal(false)}
        confirmBtn={selectedEvent && !isRequestSent ? deleteBtn : null}
        title='Remove event'
      >
        <>
          <Spinner isLoading={isLoading} />
          <ResultText
            success={isRequestDone}
            isLoading={isLoading}
            isRequestSent={isRequestSent}
          />
          {confirmEventList}
        </>
      </Modal>
      <div className={style.event}>
        <div className={style.event_timestamp}>{date}</div>
        <div className={style.event_line}></div>
        <div className={style.event_wrapper}>{eventList}</div>
      </div>
      <Modal
        show={showDetialModal}
        closeModal={() => setShowDetialModal(false)}
        title='Event detail'
        content={selectedEvent ? selectedEvent.detail : ''}
      ></Modal>
    </>
  );
};

export const EventCard = connect(() => ({}), { deleteEvent })(_EventCard);
