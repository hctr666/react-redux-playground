import React from 'react';
import { connect } from 'react-redux';

const style = {
  display: 'flex'
}

function CreateTask() {
  return (
    <div style={style} className="Form">
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
  )
}

const mapStateToProps = (state) => ({
  newTaskId: state.tasks.length
});

export default connect(mapStateToProps)(CreateTask);
