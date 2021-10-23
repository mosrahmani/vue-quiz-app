<template>
  <div id="app">
    <div class="quiz-box">
      <QuizWelcome
        v-if="quizStatus === 'onWelcome'"
      />
      <QuizStepper
        v-if="quizStatus === 'onPerforming'"
        :questions="questions"
      />
      <QuizResult
        v-if="quizStatus === 'onResult'"
        :data="result"
      />
    </div>
    <div class="copyright">
      Made with <span>❤</span> by Mostafa Rahmani
    </div>
  </div>
</template>

<script>
import QuizStepper from '@/components/QuizStepper.vue'
import QuizWelcome from '@/components/QuizWelcome'
import QuizResult from '@/components/QuizResult'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: { QuizStepper, QuizWelcome, QuizResult },
  computed: mapState([
    'quizStatus',
    'questions',
    'result'
  ])
}
</script>
<style lang="sass" scoped>
#app
  @apply mx-4
.quiz-box
  max-width: 48rem
  min-height: 24rem
  @apply bg-white rounded-xl p-10 mx-auto mt-24 relative flex flex-col

.copyright
  @apply py-6 container text-gray-600 mx-auto text-center mb-12
  span
    @apply text-red-700
</style>
