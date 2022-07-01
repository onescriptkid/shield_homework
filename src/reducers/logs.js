
const INITIAL_STATE = {
  logs: {},
  filters: {
    created_at_start: '10-13-2018',
    created_at_end: '10-14-2018',
    flight_time: '',
    generation: null,
    username: '',
    lat_up: null,
    lng_right: null,
    lat_down: null,
    lng_left: null
  },

  // network
  isFetching: false,
  lastRequest: null,
  success: true,
  error: null,
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {

    case 'FETCH_LOGS':
      return {
        ...state,
        lastRequest: 'Fetch Logs',
        isFetching: true
      }

    case 'FETCH_LOGS_SUCCESS':
      const logs = payload.data;
      const logsByKey = {};
      logs.forEach(log => logsByKey[log.id]=log);
      return {
        ...state,
        isFetching: false,
        success: true,
        error: null,
        logs: {
          ...logsByKey
        },
      }

    case 'FETCH_LOGS_FAILURE':
      const fetchLogsFailure = Object.getOwnPropertyNames(payload).reduce((acc, v) => {
        acc[v] = payload[v];
        return acc;
      }, {});
      return {
        ...state,
        isFetching: false,
        success: false,
        error: fetchLogsFailure
      }

    case 'INSERT_LOGS':
      return {
        ...state,
        lastRequest: 'Upload Logs',
        isFetching: true
      }

    case 'INSERT_LOGS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        success: payload.success,
        error: null
      }

    case 'INSERT_LOGS_FAILURE':
      const updateLogsFailure = Object.getOwnPropertyNames(payload).reduce((acc,v ) =>{
        acc[v] = payload[v];
        return acc;
      },{});
      return {
        ...state,
        isFetching: false,
        success: false,
        error: updateLogsFailure
      }

    case 'UPDATE_FILTER_CREATED_AT_START':
      return {
        ...state,
        filters: {
          ...state.filters,
          created_at_start: payload
        }
      }

    case 'UPDATE_FILTER_CREATED_AT_END':
      return {
        ...state,
        filters: {
          ...state.filters,
          created_at_end: payload
        }
      }

    case 'UPDATE_FILTER_CREATED_AT_RANGE':
      let startStr = '';
      let endStr = '';
      if(payload !== undefined) {
        const range = payload.split(' ').filter(v => v !== '');
        if (range.length > 0) {
          startStr = range[0];
          if (range[2] && range[2].length > 0) {
            endStr = range[2];
          }
        }
      }  
      return {
        ...state,
        filters: {
          ...state.filters,
          created_at_start: startStr,
          created_at_end: endStr,
        }
      }

    case 'UPDATE_FILTER_GENERATION':
      return {
        ...state,
        filters: {
          ...state.filters,
          generation: payload
        }
      }

    case 'UPDATE_FILTER_FLIGHT_TIME':
      const flight_time_fixed = payload.substr(0, 7);
      return {
        ...state,
        filters: {
          ...state.filters,
          flight_time: flight_time_fixed
        }
      }

    case 'UPDATE_FILTER_USERNAME':
      return {
        ...state,
        filters: {
          ...state.filters,
          username: payload
        }
      }
      
    case 'UPDATE_FILTER_CLEAR_ALL':
      return {
        ...state,
        filters: {
          created_at_start: '',
          created_at_end: '',
          flight_time: '',
          generation: null,
          username: '',
          lat_up: null,
          lng_right: null,
          lat_bottom: null,
          lng_left: null
        },
      }
    case 'UPDATE_FILTER_LAT_LNG':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...payload
        },
      }
    default:
      return state;
  }
}