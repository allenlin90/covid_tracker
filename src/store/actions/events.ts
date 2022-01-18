import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Event {
  _id?: string;
  timeFrom?: string;
  timeTo?: string;
  detail?: string;
  location?: string;
  locationType?: string;
}

export interface FetchEventsAction {
  type: ActionTypes.fetchEvents;
  payload: Event[];
}

export interface CreateEventAction {
  type: ActionTypes.createEvent;
  payload: Event;
}

export interface UpdateEventAction {
  type: ActionTypes.updateEvent;
  payload: Event;
}

export interface DeleteEventAction {
  type: ActionTypes.deleteEvent;
  payload: string; // id of the event
}

export const fetchEvents = (id: string = '') => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`/event/${id}`);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      dispatch<FetchEventsAction>({
        type: ActionTypes.fetchEvents,
        payload: response.data.data.events,
      });
    } catch (error) {
      console.warn('something went wrong when fetching events');
      console.warn(error);
    }
  };
};

export const createEvent = (event: Event = {}) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post('/event', event);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      dispatch<CreateEventAction>({
        type: ActionTypes.createEvent,
        payload: response.data.data.event,
      });
    } catch (error) {
      console.warn('something went wrong when creating an event');
      console.warn(error);
    }
  };
};

export const updateEvent = (event: Event = {}) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.patch(`/event/${event._id}`, event);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      dispatch<UpdateEventAction>({
        type: ActionTypes.updateEvent,
        payload: response.data.data.event,
      });
    } catch (error) {
      console.warn('something went wrong when updating an event');
      console.warn(error);
    }
  };
};

export const deleteEvent = (id: string = '') => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.delete(`/event/${id}`);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      dispatch<DeleteEventAction>({
        type: ActionTypes.deleteEvent,
        payload: id,
      });
    } catch (error) {
      console.warn('something went wrong when deleting an event');
      console.warn(error);
    }
  };
};
