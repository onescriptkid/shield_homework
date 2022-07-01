import { closeModal } from './transient';

// Constants
const PORT = 5000;
const HOST = 'http://127.0.0.1';

export const fetchLogs = (params={}) => (dispatch) => {
  //Setup
  dispatch({
    type: 'FETCH_LOGS',
    payload: true
  });
  const url = new URL(`${HOST}:${PORT}/api/getLogs`);
  const urlWithParams = appendQueryParams(url, params);

  //Fetch
  fetch(urlWithParams).then(r => r.json()).then(r => {
    if(r.success) {
      dispatch({
        type: 'FETCH_LOGS_SUCCESS',
        payload: r
      });
    } else {
      dispatch({
        type: 'FETCH_LOGS_FAILURE',
        payload: r
      });
    }
  })
  .catch(e => {
    dispatch({
      type: 'FETCH_LOGS_FAILURE',
      payload: e
    });
  });
}

export const insertLogs = (csv) => (dispatch, getState) => {
  //Setup
  dispatch({
    type: 'INSERT_LOGS',
    payload: true
  });
  const data = new FormData();
  const url = new URL(`${HOST}:${PORT}/api/insertLogs`);
  data.append('file', csv);
  const params = {
    method: 'POST',
    body: data
  }

  //Fetch
  fetch(url, params).then(r => r.json()).then(r => {
    if (r.success) {
      dispatch({
        type: 'INSERT_LOGS_SUCCESS',
        payload: r
      });
      dispatch(fetchLogs(getState().logs.filters));
      dispatch(closeModal());
    } else {
      dispatch({
        type: 'INSERT_LOGS_FAILURE',
        payload: r
      });
    }
  })
  .catch(e => {
    dispatch({
      type: 'INSERT_LOGS_FAILURE',
      payload: e
    });
  });
}

export const updateFilterCreatedAtStart = v => (dispatch) => {
  dispatch({
    type: 'UPDATE_FILTER_CREATED_AT_START',
    payload: v
  });
}

export const updateFilterCreatedAtEnd = v => (dispatch) => {
  dispatch({
    type: 'UPDATE_FILTER_CREATED_AT_END',
    payload: v
  });
}

export const updateFilterCreatedAtRange = v => (dispatch) => {
  dispatch({
    type: 'UPDATE_FILTER_CREATED_AT_RANGE',
    payload: v
  });
}

export const updateFilterGeneration = v => (dispatch) => {
  dispatch({
    type: 'UPDATE_FILTER_GENERATION',
    payload: v
  });
}

export const updateFilterFlightTime = v => (dispatch) => {
  dispatch({
    type: 'UPDATE_FILTER_FLIGHT_TIME',
    payload: v
  });
}

export const updateFilterUsername = v => (dispatch) => {
  dispatch({
    type: 'UPDATE_FILTER_USERNAME',
    payload: v
  });
}
export const updateFilterClearAll = () => (dispatch) => {
  dispatch({
    type: 'UPDATE_FILTER_CLEAR_ALL',
    payload: null
  });
}
export const updateFilterLatLng = (bounds) => (dispatch) => {
  dispatch({
    type: 'UPDATE_FILTER_LAT_LNG',
    payload: bounds
  });
}

//Utility function to append query parameters / convert datepicker to ISOstrings
function appendQueryParams(url, params) {
  Object.keys(params).forEach(key => {
    if(params[key]!=='' && params[key] !== null) {
      let push = params[key];
      //Convert dates to expected format
      if(key === 'created_at_end' || key === 'created_at_start') {
        push = new Date(params[key]).toISOString();
      }
      url.searchParams.append(key, push);
    }
  });
  return url;
};