import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quizStatus: 'onWelcome',
    questions: [],
    answers: [],
    result: [],
    statistics: null
  },
  mutations: {
    CHANGE_QUIZ_STATUS (state, status) {
      state.quizStatus = status
    },
    GET_QUESTIONS (state, questions) {
      state.questions = questions
    },
    GET_ANSWERS (state, answers) {
      state.answers = answers
    },
    SAVE_RESULT (state, result, statistics) {
      state.result = result
      state.statistics = statistics
    }
  },
  actions: {
    changeQuizStatus ({ commit }, status) {
      commit('CHANGE_QUIZ_STATUS', status)
    },
    async getQuestions ({ commit }) {
      await axios.get('lhb')
        .then(resp => {
          const questions = resp.data.questions
          questions.forEach(elem => {
            elem.selected = null
          })
          commit('GET_QUESTIONS', questions)
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getAnswers ({ commit }) {
      await axios.get('m93')
        .then(resp => {
          commit('GET_ANSWERS', resp.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getResult ({ dispatch, commit, state }, questions) {
      const result = {
        incorrect: 0,
        correct: 0,
        unanswered: 0,
        data: []
      }
      dispatch('getAnswers')
        .then(() => {
          questions.forEach(question => {
            state.answers.forEach(answer => {
              let selectedAnswer = question.selected
              if (selectedAnswer !== null && question.type === 'mc') {
                selectedAnswer = selectedAnswer + 1
              }
              if (question.id === answer.question_id) {
                switch (selectedAnswer) {
                  case answer.answer:
                    result.correct++
                    break
                  case null:
                    result.unanswered++
                    break
                  default:
                    result.incorrect++
                }
                result.data.push(Object.assign({}, question, answer))
              }
            })
          })
          commit('SAVE_RESULT', result, result)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
