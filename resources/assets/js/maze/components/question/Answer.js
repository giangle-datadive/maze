import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({answer, onChange, onDelete}) => {
  const onInputChange = (event) => {
    onChange({
      ...answer,
      content: event.target.value,
    });
  };

  const onCheckboxChange = (event) => {
    onChange({
      ...answer,
      is_correct: event.target.checked ? 1 : 0,
    });
  };

  return (
    <label>
      <input onChange={onCheckboxChange} type="checkbox" checked={answer.is_correct}/>
      <input onChange={onInputChange} value={answer.content} type="text" className="answer-input"/>
      <button type="button" onClick={onDelete} className="delete-answer">Xóa</button>
    </label>
  );
}

Answer.PropTypes = {
  onChange: PropTypes.func,
  answer: PropTypes.object,
};

export default Answer;
