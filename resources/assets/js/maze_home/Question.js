import React from 'react';

class Question extends React.Component {

  state = {
    selected: [],
  };

  onContextMenu = (event) => {
    event.preventDefault();
  };

  submitAnswer = (event) => {
    event.preventDefault();
    const {selected} = this.state;
    const isWrong = selected.find(answer => !answer.is_correct);
    if(!selected.length || isWrong) {
      return this.props.surrender();
    }

    this.props.resume();
  };

  onAnswerChange = (answer) => (event) => {
    const {selected} = this.state;
    if(event.target.checked) {
      this.setState({
        selected: selected.concat(answer),
      });
    }else {
      this.setState({
        selected: selected.filter(a => a.id !== answer.id),
      })
    }
  };

  render() {
    const {currentQuestion, surrender} = this.props;

    return (
      <div className="question" onContextMenu={this.onContextMenu}>
        <div className="question-content">
          <h4>Phải trả lời câu hỏi đề tiếp tục</h4>
          <pre>{currentQuestion.data.content}</pre>
          <h6>Danh sách đáp án</h6>

          {currentQuestion.answers.map((answer, index) => (
            <div key={index}>
              <input onChange={this.onAnswerChange(answer)} type="checkbox"/> {answer.content}
            </div>
          ))}
          <div className="group-btn">
            <button className="button-primary" onClick={this.submitAnswer}>Trả lời</button>
            <button onClick={surrender}>Đầu hàng</button>
          </div>
        </div>
      </div>
    );
  }
}

Question.defaultProps = {
  surrender: () => {},
  cancel: () => {}
};

export default Question;