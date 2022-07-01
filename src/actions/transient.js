export const openModal = () => (dispatch) => {
  dispatch({
    type: 'OPEN_MODAL',
    payload: true
  });
}

export const closeModal = () => (dispatch) => {
  dispatch({
    type: 'CLOSE_MODAL',
    payload: closeModal
  });
}

export const deselectRow = (key) => (dispatch) => {
  dispatch({
    type: 'DESELECT_ROW',
    payload: key
  });
}

export const selectRow = (key) => (dispatch) => {
  dispatch({
    type: 'SELECT_ROW',
    payload: key
  });
}