import React from 'react';
import ReactDOM from 'react-dom';
import './maze_home.css';
import 'skeleton-css/css/skeleton.css';
import axios from 'axios';
import Question from './Question';
import Button from './Button';

const ROW = 18;
const COLUMN = 36;

const DELAY_NEXT = 700;

const initialState = {
  currentSquareIndex: 0,
  isStart: false,
  isLose: false,
  isWin: false,
  currentQuestion: {
    isShow: false,
    data: {
      content: '',
    },
    answers: [],
  },
};

class MazeHome extends React.Component {
  state = {
    questions: [],
    answers: [],
    squares: [],
    ...initialState,
  };

  componentWillMount() {
    axios.get('/data').then(({data}) => {
      this.setState({
        questions: data.questions,
        answers: data.answers,
        squares: data.squares,
      });
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const {squares, currentSquareIndex, questions, answers} = this.state;
    if (prevState.currentSquareIndex !== currentSquareIndex) {
      const squareIndex = squares[currentSquareIndex];
      const squareQuestions = questions.filter(question => question.square_index === squareIndex);
      const question = squareQuestions[Math.floor(Math.random() * squareQuestions.length)];
      if (question) {
        clearInterval(this.next);
        this.setState({
          currentQuestion: {
            isShow: true,
            data: question,
            answers: answers.filter(answer => answer.question_id === question.id),
          }
        });
      } else {
        //Check last selected square
        if (!squares[currentSquareIndex]) {
          this.win();
        }
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.next);
  }

  start = () => {
    this.setState({
      isStart: true,
    });

    this.next = this.autoNext();
  };

  autoNext = () => {
    return setInterval(this.nextIndex, DELAY_NEXT);
  };

  nextIndex = () => {
    this.setState({
      currentSquareIndex: this.state.currentSquareIndex + 1,
    });
  };

  resume = () => {
    this.setState({
      currentQuestion: {
        ...this.state.currentQuestion,
        isShow: false,
      }
    });
    this.next = this.autoNext();
  };

  surrender = () => {
    this.setState({
      isLose: true,
      currentQuestion: {
        ...this.state.currentQuestion,
        isShow: false,
      }
    });
  };

  win = () => {
    this.setState({
      isWin: true,
    });
  };

  playAgain = () => {
    this.setState({
      ...initialState,
    }, () => this.start());
  };

  render() {
    const {isStart, questions, answers, squares, currentSquareIndex, currentQuestion, isLose, isWin} = this.state;

    return (
      <div className="maze">
        {
          [...Array(ROW * COLUMN)].map((item, index) => (
            <div key={index} className={`square`}>
              {squares[currentSquareIndex] === index
                ? <div className="blue-dot"></div>
                : null
              }

            </div>
          ))
        }
        {!isStart
          ? (
            <Button onClick={this.start} text="Bắt đầu"/>
          ) : null
        }

        {
          isStart && currentQuestion.isShow
            ? (
              <Question
                resume={this.resume}
                surrender={this.surrender}
                currentQuestion={currentQuestion}/>
            ) : null
        }

        {
          isStart && isLose
            ? (
              <Button
                playAgain={this.playAgain}
                showPlayAgain={true} text="Chia buồn, bạn đã thua"/>
            ) : null
        }

        {
          isStart && isWin
            ? (
              <Button
                playAgain={this.playAgain}
                showPlayAgain={true} text="Chúc mừng bạn đã trả lời đúng hết tất cả câu hỏi"/>
            ) : null
        }
      </div>
    )
  }
}

ReactDOM.render(
  <MazeHome/>,
  document.getElementById('maze')
);