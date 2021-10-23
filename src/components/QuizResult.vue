<template>
  <div class="result-wrapper" v-if="data">
    <h1 class="result-title">Yeah, you're done!</h1>
    <p>Let's check your proficiency together ✨</p>
    <hr class="result-divider" />
    <div class="result-items">
      <div>
        <span class="text-green-700">correct answers: </span>
        <span>{{ data.correct }}</span>
      </div>
      <div>
        <span class="text-red-700">incorrect answers: </span>
        <span>{{ data.incorrect }}</span>
      </div>
      <div>
        <strong class="text-yellow-600">unanswered: </strong>
        <span>{{ data.unanswered }}</span>
      </div>
    </div>
    <hr class="result-divider" />
    <div class="result-data" v-for="(item, index) in data.data" :key="index">
      <h4>{{ item.id }}: {{ item.text }}</h4>
      <div v-if="item.type === 'tf'">
        <div
          v-for="(value, index) in booleanValues"
          :key="index"
          :class="{ 'correct-answer': item.answer === value }"
          class="mb-2"
        >
          <i class="las la-check-circle mr-2"></i>
          <span>
            {{ value }}
            <i
              class="las la-check text-red-600"
              v-if="item.selected === value"
            ></i>
          </span>
        </div>
      </div>
      <div v-else>
        <div
          v-for="(answer, index) in item.answers"
          :key="index"
          class="mb-2"
          :class="{ 'correct-answer': item.answer === index + 1 }"
        >
          <i class="las la-check-circle mr-2"></i>
          <span>
            {{ answer }}
            <i
              class="las la-check text-red-600"
              v-if="item.selected === index"
            ></i>
          </span>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'QuizResult',
  props: {
    data: Array
  },
  data () {
    return {
      booleanValues: [false, true]
    }
  }
}
</script>
<style lang="sass">
.result
    &-title
        @apply font-bold text-2xl mb-2
    &-divider
        @apply border-gray-700 border-dashed my-4
    &-items
        @apply flex flex-col
        div
            @apply border border-gray-300 rounded-xl py-3 px-5 mb-4 flex justify-between font-bold
    &-data
        @apply bg-gray-200 rounded-lg p-5 mb-4
        h4
            @apply mb-4 font-bold
.correct-answer
    @apply font-bold text-green-700
</style>
