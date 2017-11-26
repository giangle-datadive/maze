import {ADD_QUESTION, UPDATE_QUESTION, REMOVE_QUESTION} from '../actions/questions';

const initialState = [];
const questions = (state = initialState, action) => {
    switch(action.type) {
        case ADD_QUESTION:
            return state.concat(action.question);
        case UPDATE_QUESTION:
            return state.map(q => q.id === action.question.id ? action.question : q);
        case REMOVE_QUESTION:
            return  state.filter(q => q.id !== action.question.id);
        default:
            return state;
    }
};

export default questions;