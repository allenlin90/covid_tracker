import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { Patient, Event } from '../../store/actions';
import { StoreState } from '../../store/reducers';

import { Modal } from '../Modal';
import { EventCard } from './EventCard';

import style from './Timeline.module.css';

interface TimelineProps {
  selectedPatient: Patient | null;
  events: Event[];
}

const _Timeline = ({ selectedPatient, events }: TimelineProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [patientEvents, setPatientEvents] = useState<Event[]>([]);
  const [patientlocations, setPatientlocations] = useState<string[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<{ [key: string]: any }>(
    {},
  );

  useEffect(() => {
    const timelineEvents = patientEvents.reduce(
      (dict: { [key: string]: any }, event: Event) => {
        const timeFrom = new Date(event.timeFrom);
        const year = timeFrom.getFullYear();
        const month = timeFrom.getMonth() + 1;
        const date = timeFrom.getDate();
        const dateStr = `${date < 10 ? '0' + date : date}/${
          month < 10 ? '0' + month : month
        }/${year}`;

        if (!(dateStr in dict)) {
          dict[dateStr] = [event];
        } else {
          dict[dateStr].push(event);
        }

        return dict;
      },
      {},
    );

    setTimelineEvents(timelineEvents);
  }, [patientEvents]);

  useEffect(() => {
    // events of the selected patient
    const patientEvents = events
      .filter((event: Event) => selectedPatient?._id === event.patient_id)
      .sort(
        (a, b) =>
          new Date(a.timeFrom).getTime() - new Date(b.timeFrom).getTime(),
      );
    setPatientEvents(patientEvents);

    // sort places
    const places = patientEvents
      .reduce((list: string[], event: Event): string[] => {
        if (!list.includes(event.location) && event.location) {
          list.push(event.location);
        }
        return list;
      }, [])
      .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
    setPatientlocations(places);
  }, [selectedPatient, events]);

  const eventLines = (() => {
    let events = [];
    for (const date in timelineEvents) {
      events.push(
        <EventCard key={date} date={date} events={timelineEvents[date]} />,
      );
    }

    return events;
  })();

  const locations = () => {
    return patientlocations.map((place, index) => {
      return (
        <span key={index} className={style.location}>
          {place}
        </span>
      );
    });
  };

  return (
    <>
      <div className={`${style.timeline}`}>
        <div className={`${style.timeline_header}`}>
          <span>{selectedPatient?.gender}</span>
          <span>{selectedPatient?.age} years old</span>
          <span>{selectedPatient?.occupation}</span>
        </div>
        <div>{eventLines}</div>
        <div className={`${style.visited}`}>
          <p>Visited Places</p>
          <div>{locations()}</div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (
  state: StoreState,
): { events: Event[]; selectedPatient: Patient | null } => {
  return { events: state.events, selectedPatient: state.selectedPatient };
};

export const Timeline = connect(mapStateToProps, {})(_Timeline);
