import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { App } from './pages/App';
import { reducers } from './store/reducers';

// axios global config
import axios from 'axios';
const endpoint = 'https://covide-tracker.herokuapp.com';
// axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = endpoint;

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
