import React from 'react';
import QuestionForm from './QuestionForm';
import {connect} from 'react-redux';

const Edit = ({match, questions, answers}) => {
  const question = questions.find(question => question.id === parseInt(match.params.questionId));
  const listAnswers = answers.filter(answer => answer.question_id === question.id);
  if(!question || !listAnswers.length) {
    return null;
  }

  return <QuestionForm
    question={question}
    answers={listAnswers}
    isUpdate={true}/>
};

const mapStateToProps = ({questions, answers}) => ({questions, answers});

export default  connect(mapStateToProps)(Edit);