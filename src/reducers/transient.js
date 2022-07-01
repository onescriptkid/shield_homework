
const INITIAL_STATE = {
  uploadModal: false,
  mapAccordion: false,
  rowSelected: false,
}

export default (state=INITIAL_STATE, {type, payload}) => {
  switch(type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        uploadModal: true
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        uploadModal: false
      }
    case 'SELECT_ROW':
      return {
        ...state,
        rowSelected: payload
      }
    case 'DESELECT_ROW':
      return {
        ...state,
        rowSelected: false
      }
    default:
      return state;
  }
}