import { ADD_ANSWER, UPDATE_ANSWER, REMOVE_ANSWER } from "../actions/answers";

const initialState = [];
const answers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANSWER:
        return state.concat(action.answers);
    case UPDATE_ANSWER:
        return state.map(answer => {
          const ans = action.answers.find(item => item.id === answer.id);
          if(ans) {
            return ans;
          }

          return answer;
        });
    case REMOVE_ANSWER:
        return state.filter(answer => answer.id !== action.answer.di);
    default:
      return state;
  }
};

export default answers;
