import React from 'react';
import { connect } from 'react-redux';

function TaskList({ tasks, dispatch }) {
  const onDelete = (id) => {
    dispatch({ type: 'task/delete', id });
  };

  const renderTaskItem = ({ id, name, time }, i) => (
    <li key={`key_${i}`}>
      {`${name} -> ${time}`}
       <button type="button" onClick={() => onDelete(id)}>Delete</button>
    </li>
  )

  return (
    <ul>
      {tasks.map(renderTaskItem)}
    </ul>
  )
}

const mapStateToProps = ({ rootState }) => ({
  tasks: rootState.tasks
})

export default connect(mapStateToProps)(TaskList);
