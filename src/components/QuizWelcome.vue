<template>
    <div class="welcome-section">
        <i class="las la-brain"></i>
        <h1>Quiz App!</h1>
        <p>Hey there , stay calm for best results ✨ </p>
        <button class="btn btn-success mt-6" @click="startQuiz">Let's Go</button>
    </div>
</template>
<script>
export default {
  name: 'QuizWelcome',
  methods: {
    startQuiz () {
      this.$store.dispatch('changeQuizStatus', 'onPerforming')
      this.$store.dispatch('getQuestions')
    }
  }
}
</script>
<style lang="sass" scoped>
    .welcome-section
        @apply w-full flex justify-center items-center flex-col flex-1
        i
            @apply text-8xl text-green-700
        h1
            @apply font-bold text-2xl my-2
</style>
