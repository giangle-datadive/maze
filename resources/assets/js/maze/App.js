import React, {Component} from 'react';
import 'skeleton-css/css/skeleton.css';
import './App.css';
import Square from './components/Square';
import ContextMenu from './components/ContextMenu';
import CreateQuestion from './components/question/create';
import EditQuestion from './components/question/edit';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import {connect} from 'react-redux';
import {addQuestion} from './actions/questions';
import {addAnswer} from './actions/answers';
import routes from "./routes";
import axios from 'axios';

const ROW = 18;
const COLUMN = 36;

class App extends Component {

  state = {
    isShowGrid: true,
    selected: [],
    contextMenu: {
      squareIndex: null,
      show: false,
      top: 0,
      left: 0,
    }
  };

  componentWillMount() {
    //Get all question
    axios.get(routes.api.question.all()).then(({data}) => {
      this.props.addQuestion(data.questions);
      this.props.addAnswer(data.answers)
    });
  }

  onSquarePress = (index) => () => {
    const {selected} = this.state;
    if (selected.includes(index)) {
      return this.setState({
        selected: selected.filter((item) => item !== index),
      });
    }
    this.setState({
      selected: selected.concat(index),
    });
  };

  onContextMenu = (index) => (event) => {
    event.preventDefault();
    this.setState({
      contextMenu: {
        show: true,
        top: event.pageY,
        left: event.pageX,
        squareIndex: index,
      }
    });
  };

  addQuestion = (index) => (event) => {
    alert('add question');
  };

  deleteQuestion = (index) => () => {
    alert('delete question' + index);
  };

  closeContextMenu = (event) => {
    this.setState({
      contextMenu: {
        ...this.state.contextMenu,
        show: false,
      }
    });
  };

  render() {
    const {selected, contextMenu, isShowGrid} = this.state;
    const {questions, answers} = this.props;

    return (
      <Router>
        <div onClick={this.closeContextMenu} className="app">
          <div className="maze">
            {
              [...Array(ROW * COLUMN)].map((item, index) => (
                <Square
                  hasQuestion={!!questions.find(question => question.square_index === index)}
                  isShowGrid={isShowGrid}
                  isSelected={selected.includes(index)}
                  onContextMenu={this.onContextMenu(index)}
                  onPress={this.onSquarePress(index)}
                  key={index}/>
              ))
            }
          </div>
          {contextMenu.show
            ? <ContextMenu
              addQuestion={this.addQuestion(contextMenu.squareIndex)}
              deleteQuestion={this.deleteQuestion(contextMenu.squareIndex)}
              contextMenu={contextMenu}/>
            : null
          }
          <Route path="/:squareIndex/question/create" component={CreateQuestion}/>
          <Route path="/:squareIndex/question/:questionId/edit" component={EditQuestion}/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({questions, answers}) => ({
  questions,
  answers,
});

const mapDispatchToProps = (dispatch) => ({
  addQuestion: (questions) => dispatch(addQuestion(questions)),
  addAnswer: (answers) => dispatch(addAnswer(answers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
