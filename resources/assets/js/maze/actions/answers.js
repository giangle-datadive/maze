export const ADD_ANSWER = 'ADD_ANSWER';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';

export const addAnswer = (answers) => ({type: ADD_ANSWER, answers});
export const updateAnswer = (answers) => ({type: UPDATE_ANSWER, answers});
export const remoteAnswer = (answer) => ({type: REMOVE_ANSWER, answer});