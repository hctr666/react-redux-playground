import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { FETCH_USERS_REQUESTED } from '../actionTypes';

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-evenly'
}

const cellStyle = {
  fontWeight: 'bold'
}

function UserList(props) {
  const {
    users,
    fetchUsersWithThunk,
    fetchUsersWithSaga,
    loading
  } = props;

  const onLoadUsersWithThunk = () => {
    fetchUsersWithThunk();
  };

  const onLoadUsersWithSaga = () => {
    fetchUsersWithSaga();
  };

  return (
    <React.Fragment>
      <button type="button" onClick={onLoadUsersWithThunk}>Load users with thunk</button>
      <button type="button" onClick={onLoadUsersWithSaga}>Load users with saga</button>
      <ul>
        <li style={rowStyle}>
          <div style={cellStyle}>Id</div>
          <div style={cellStyle}>name</div>
          <div style={cellStyle}>email</div>
          <div style={cellStyle}>phone</div>
        </li>
        {!loading ? users.map(user => {
          return (
            <li
              key={user.id}
              style={rowStyle}
            >
              <div>{user.id}</div>
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.phone}</div>
            </li>
          )
        }) : 'Loading users'}
      </ul>
    </React.Fragment>
  )
}

const mapStateToProps = ({ userState }) => ({
  users: userState.users,
  loading: userState.loading
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsersWithThunk: () => dispatch(fetchUsers()),
  fetchUsersWithSaga: () => dispatch({ type: FETCH_USERS_REQUESTED })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
