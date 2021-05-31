import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import TaskList from './TaskList';

function ReduxTasks(props) {
  const [name, setName] = useState('');
  const [time, setTime] = useState(0);
  const [counting, setCounting] = useState(false);

  const { dispatch } = props;

  const nameInputRef = useRef(null)

  const clearInputs = () => {
    setName('');
    setTime(0);
  }

  const onChangeName = ({ value }) => {
    setName(value);
  };

  const onChangeTime = ({ value }) => {
    setTime(value);
  };

  const onStart = () => {
    setCounting(true);
  };

  const onStop = () => {
    setCounting(false);
    dispatch({
      type: 'task/add',
      payload: { id: props.newTaskId + 1, name, time }
    });
    clearInputs();
    nameInputRef.current.focus();
  };

  const handleInputChange = ({ target: { value } }) => (handler) => {
    if (handler) return handler({ value })
  };

  useEffect(() => {
    let counter;

    if (counting) {
      counter = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(counter)
  });

  useEffect(() => {
    nameInputRef.current.focus()
  }, [])

  const renderForm = () => (
    <div className="Form">
      <div className="FormGroup">
        <input ref={nameInputRef} id="name" value={name} onChange={(e) => handleInputChange(e)(onChangeName)} />
      </div>
      <div className="FormGroup">
        <input readOnly id="time" value={time} type="number" min={0} onChange={(e) => handleInputChange(e)(onChangeTime)} />
      </div>
      <div className="FormActions">
        <button type="button" disabled={counting} onClick={onStart}>Start</button>
        <button type="button" disabled={!counting} onClick={onStop}>Stop</button>
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
  newTaskId: rootState.tasks.length
})

export default connect(mapStateToProps)(ReduxTasks);
