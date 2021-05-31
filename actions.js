import { FETCH_USERS, FETCH_USERS_LOADING } from './actionTypes';

const fetchUsers = () => {
  const request = fetch('https://jsonplaceholder.typicode.com/users');
  return (dispatch) => {
    dispatch({ type: FETCH_USERS_LOADING, payload: true })
    request
      .then(response => response.json())
      .then(data => dispatch({ type: FETCH_USERS, payload: data }))
      .finally(() => dispatch({ type: FETCH_USERS_LOADING, payload: false }))
  };
};

export {
  fetchUsers
}
