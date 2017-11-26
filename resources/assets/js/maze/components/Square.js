import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Square = ({isSelected, onPress, onContextMenu, isShowGrid, hasQuestion}) => (
  <div onClick={onPress} onContextMenu={onContextMenu}
       className={`square ${isShowGrid ? "" : "square-nonborder"} ${isSelected ? "square-selected" : ""}`}>
    {hasQuestion ? <img className="question-img" src="/question.svg"/> : null}
  </div>
);

Square.PropTypes = {
  isSelected: PropTypes.bool,
  isShowGrid: PropTypes.bool,
  hasQuestion: PropTypes.bool,
  onPress: PropTypes.func,
  onContextMenu: PropTypes.func,
};

export default Square;