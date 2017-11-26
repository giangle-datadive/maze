export const ADD_QUESTION = 'ADD_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const REMOVE_QUESTION= 'REMOVE_QUESTION';

export const addQuestion = (question) => ({type: ADD_QUESTION, question});
export const updateQuestion = (question) => ({type: UPDATE_QUESTION, question});
export const remoteQuestion = (question) => ({type: REMOVE_QUESTION, question});