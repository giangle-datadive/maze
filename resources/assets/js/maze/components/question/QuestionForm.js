import React from "react";
import { withRouter } from "react-router-dom";
import Answer from "./Answer";
import axios from "axios";
import { connect } from "react-redux";
import { addQuestion, updateQuestion } from "../../actions/questions";
import { addAnswer, updateAnswer } from "../../actions/answers";
import routes from '../../routes';

const intitalAnswer = {
  content: "",
  is_correct: 0
};

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question,
      answers: props.answers,
      isLoading: false,
      message: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      question: nextProps.question,
      answers: nextProps.answers,
    });
  }

  backToHome = event => {
    if (this.refs.form.contains(event.target)) {
      return;
    }
    this.props.history.push("/");
  };

  saveQuestion = event => {
    event.preventDefault();
    //Validate has question content
    const { question, answers, isLoading } = this.state;
    if (!question.content) {
      return this.errorMessage("Phải nhập nội dung câu hỏi");
    }
    //At least 1 answer
    if (!answers.length) {
      return this.errorMessage("Phải nhập ít nhất 1 câu trả lời");
    }

    //Validate all answer has content
    const checkContentAnswer = answers.find(anwser => !anwser.content);
    if (checkContentAnswer) {
      return this.errorMessage("Phải nhập nội dung cho tất cả câu hỏi");
    }

    //Validate at least 1 correct answer
    const answerIndex = answers.findIndex(anwser => anwser.is_correct);
    if (answerIndex === -1) {
      return this.errorMessage("Phải chọn câu trả lời đúng cho câu hỏi");
    }

    if(isLoading) return;
    this.setState({
      isLoading: true,
    });

    let url = routes.api.question.store();
    let data = {
      content: question.content,
      square_index: this.props.match.params.squareIndex,
      answers
    };
    if(this.props.isUpdate) {
      url = routes.api.question.update(question.id);
      data._method = 'put';
    }

    axios
      .post(url, data)
      .then(this.handleSuccess)
      .catch(this.handleError);

    this.setState({
      message: null,
      isLoading: false,
    });
  };

  handleSuccess = ({ data }) => {
    if(this.props.isUpdate) {
      this.props.updateAnswer(data.answers);
      this.props.updateQuestion(data.question);
    }else {
      this.props.addAnswer(data.answers);
      this.props.addQuestion(data.question);
    }
  };

  handleError = ({ response }) => {
    console.log(response);
  };

  errorMessage = message => {
    this.setState({
      message: {
        type: "warning",
        body: message
      }
    });
  };

  onQuestionContentChange = event => {
    this.setState({
      question: {
        ...this.state.question,
        content: event.target.value
      }
    });
  };

  onAnswerChange = index => answer => {
    this.setState({
      answers: this.state.answers.map((item, i) => {
        if (i === index) {
          return { ...item, ...answer };
        }

        return item;
      })
    });
  };

  addAnswer = () => {
    this.setState({
      answers: this.state.answers.concat(intitalAnswer)
    });
  };

  deleteAnswer = index => () => {
    this.setState({
      answers: this.state.answers.filter((answer, i) => index !== i)
    });
  };

  render() {
    const { answers, message, question } = this.state;

    return (
      <div onClick={this.backToHome} className="question">
        <div className="question-form">
          <form onSubmit={this.saveQuestion} ref="form">
            <label>Nội dung câu hỏi</label>
            <textarea
              value={question.content}
              onChange={this.onQuestionContentChange}
              className="u-full-width"
            />

            {message ? (
              <div className={`alert alert-${message.type}`}>
                {message.body}
              </div>
            ) : null}

            <label>Danh sách câu trả lời</label>
            <small>Tích để chọn phương án đúng</small>
            <br />
            {answers.map((answer, index) => (
              <Answer
                onDelete={this.deleteAnswer(index)}
                onChange={this.onAnswerChange(index)}
                answer={answer}
                key={index}
              />
            ))}

            <div>
              <button type="button" onClick={this.addAnswer}>
                Thêm câu trả lời
              </button>
            </div>

            <input className="button-primary" type="submit" value="Đăng" />
          </form>
        </div>
      </div>
    );
  }
}

QuestionForm.defaultProps = {
  question: {
    content: ""
  },
  answers: [],
  isUpdate: false
};

const mapDispatchToProps = dispatch => ({
  addQuestion: question => dispatch(addQuestion(question)),
  updateQuestion: question => dispatch(updateQuestion(question)),
  addAnswer: answer => dispatch(addAnswer(answer)),
  updateAnswer: answer => dispatch(updateAnswer(answer))
});

export default withRouter(
  connect(null, mapDispatchToProps)(QuestionForm)
);
