import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import routes from '../routes';
import {connect} from 'react-redux';
import {remoteQuestion} from "../actions/questions";

const ContextMenu = ({contextMenu, questions, deleteQuestion}) => {
  const style = {top: contextMenu.top, left: contextMenu.left};
  const squareQuestions = questions.filter(question => question.square_index === contextMenu.squareIndex);

  return (
    <div style={style} className="context-menu">
      <Link to={routes.local.question.create(contextMenu.squareIndex)} className="menu-item">
        Thêm Câu hỏi
      </Link>
      {squareQuestions.map((question, index) => (
        <div>
          <div className="menu-item">
            {question.content}
            <Link className="edit" to={routes.local.question.edit(question.id, contextMenu.squareIndex)}>
              Sửa
            </Link>
            <span className="delete" onClick={deleteQuestion(question.id)}>
              Xóa
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

ContextMenu.PropTypes = {
  contextMenu: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    show: PropTypes.bool,
    squareIndex: PropTypes.any,
  }),
  addQuestion: PropTypes.func,
  deleteQuestion: PropTypes.func,
};

ContextMenu.DefaultProps = {
  position: {
    top: 0,
    left: 0,
  }
};

const mapStateToProps = ({questions}) => ({questions});
const mapDispatchTopProps = (dispatch) => ({
  removeQuestion: (question) => dispatch(remoteQuestion(question))
});

export default connect(mapStateToProps, mapDispatchTopProps)(ContextMenu);