import { Event, EventActions, ActionTypes } from '../actions';

// state should be an array of Events
// the default value for state is an emtpy array
export const eventsReducer = (state: Event[] = [], action: EventActions) => {
  switch (action.type) {
    case ActionTypes.fetchEvents:
      state = [...action.payload];
      return action.payload;
    case ActionTypes.createEvent:
      state = [...state, action.payload];
      return [...state];
    case ActionTypes.updateEvent:
      const index = state.findIndex((event: Event) => {
        return event._id === action.payload._id;
      });
      if (index > -1) {
        state[index] = action.payload;
      }
      return [...state];
    case ActionTypes.deleteEvent:
      return state.filter((event: Event) => event._id !== action.payload);
    default:
      return state;
  }
};
