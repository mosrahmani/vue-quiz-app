<template>
  <div>
    <div class="step-wrapper">
      <hr class="step-line" />
      <div v-for="(step, index) in questions.length" :key="index" class="">
        <span
          role="button"
          class="step"
          @click="goStep(index)"
          :class="{ 'step-active': index === currentStep }"
          >{{ step }}</span
        >
      </div>
    </div>

    <div class="mt-6">
      <h3 class="question-title">{{ question.text }}</h3>
      <div v-if="question.type === 'tf'">
        <div
          v-for="(value, index) in booleanValues"
          :key="index"
          class="question-item"
          @click="selectOption(value)"
        >
          <input
            type="radio"
            :id="question.id + value"
            v-model="questions.selected"
            :class="{
              'checked-radio': questions[currentStep].selected === value,
            }"
            :value="value"
          />
          <label :for="question.id + value">
            <span></span>
            {{ value }}
          </label>
        </div>
      </div>
      <div v-else>
        <div
          v-for="(answer, index) in question.answers"
          :key="index"
          class="question-item"
          @click="selectOption(index)"
        >
          <input
            type="radio"
            :id="question.id + index"
            v-model="questions.selected"
            :value="index"
            :class="{
              'checked-radio': index === questions[currentStep].selected,
            }"
          />
          <label :for="question.id + index">
            <span></span>
            {{ answer }}
          </label>
        </div>
      </div>
    </div>
    <div class="btns-wrapper">
      <button
        class="btn btn-info mr-2"
        @click.prevent="prevStep"
        :class="{ 'btn-deactive': currentStep === 0 }"
      >
        <i class="las la-arrow-left mr-2"></i>
        prev
      </button>
      <button
        class="btn btn-success"
        @click.prevent="submitQuiz"
        v-if="currentStep === questions.length - 1"
      >
        Submit
        <i class="las la-check ml-2"></i>
      </button>
      <button class="btn btn-info" @click.prevent="nextStep" v-else>
        next
        <i class="las la-arrow-right ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizStepper',
  props: {
    questions: Array
  },
  computed: {
    question () {
      return this.questions[this.currentStep]
    }
  },
  data () {
    return {
      currentStep: 0,
      booleanValues: [false, true]
    }
  },
  methods: {
    nextStep () {
      return this.currentStep < this.questions.length - 1
        ? this.currentStep++
        : null
    },
    prevStep () {
      return this.currentStep > 0 ? this.currentStep-- : null
    },
    goStep (index) {
      this.currentStep = index
    },
    submitQuiz () {
      this.$store.dispatch('changeQuizStatus', 'onResult')
      this.$store.dispatch('getResult', this.questions)
    },
    selectOption (index) {
      this.questions[this.currentStep].selected = index
    }
  }
}
</script>

<style scoped lang="sass">
.question
  &-title
    @apply font-bold mb-6
  &-item
    @apply my-4
    input
      @apply hidden

.step
  @apply flex justify-center items-center bg-gray-300 rounded-full z-20 relative w-10 h-10
  &-wrapper
    @apply flex justify-between relative mb-10
  &-active
    @apply bg-yellow-500 text-white font-bold
  &-line
    height: .15rem
    @apply bg-gray-300 w-full absolute top-1/2 z-0

.btns-wrapper
  @apply flex justify-center mt-6
</style>
