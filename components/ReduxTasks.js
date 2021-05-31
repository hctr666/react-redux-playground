import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import { useCounter, useFocus } from '../hooks';

import TaskList from './TaskList';

function ReduxTasks(props) {
  const [name, setName] = useState('');
  const { count, isCounting, startCount, stopCount, resetCount } = useCounter({
    count: 0,
    isCounting: false,
    delay: 500
  })

  const { dispatch, addTask } = props;

  const nameInputRef = useRef(null);

  const setNameInputFocus = useFocus({ ref: nameInputRef });

  const clearInputs = () => {
    setName('');
    resetCount();
  };

  const onChangeName = ({ value }) => {
    setName(value);
  };

  const onStart = () => {
    startCount();
  };

  const onStop = () => {
    stopCount();
    addTask({ id: props.newTaskId, name, time: count })
    clearInputs();
    setNameInputFocus();
  };

  const handleInputChange = ({ target: { value } }) => (handler) => {
    if (handler) return handler({ value })
  };

  const renderForm = () => (
    <div className="Form">
      <div className="FormGroup">
        <input ref={nameInputRef} id="name" value={name} onChange={(e) => handleInputChange(e)(onChangeName)} />
      </div>
      <div className="FormGroup">
        <input readOnly id="time" value={count} type="number" min={0} /* onChange={(e) => handleInputChange(e)(onChangeTime)} */ />
      </div>
      <div className="FormActions">
        <button type="button" disabled={isCounting} onClick={onStart}>Start</button>
        <button type="button" disabled={!isCounting} onClick={onStop}>Stop</button>
      </div>
    </div>
  );

  return (
    <div>
      {renderForm()}
      <TaskList />
    </div>
  )
}

const mapStateToProps = ({ rootState }) => ({
  newTaskId: rootState.tasks.length + 1
});

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (newTask) => dispatch({ type: 'task/add', payload: newTask })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTasks);
