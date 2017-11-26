export default {
  api: {
    question: {
      store: () => "/question",
      update: (id) => "/question/" + id,
      all: () => "/question/all"
    },
    root: '/'
  },
  local: {
    question: {
      create: (squareIndex) => `/${squareIndex}/question/create`,
      edit: (questionId, squareIndex) => `/${squareIndex}/question/${questionId}/edit`
    }
  }
};