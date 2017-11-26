export default {
  api: {
    question: {
      store: () => "/question",
      update: (id) => "/question/" + id,
      all: () => "/question/all",
      destroy: (id) => `/question/` + id,
    },
    square: {
      store: () => "/square",
    },
    root: '/question'
  },
  local: {
    question: {
      create: (squareIndex) => `/${squareIndex}/question/create`,
      edit: (questionId, squareIndex) => `/${squareIndex}/question/${questionId}/edit`,
    }
  }
};