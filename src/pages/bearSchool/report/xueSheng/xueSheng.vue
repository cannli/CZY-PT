<template>
  <div>
    <detailsX v-if="page===1" @blockFn="blockFn" :studentId="studentId"></detailsX>
    <process v-if="page===2" @blockFn="blockFn" :studentId="studentId"></process>
  </div>

</template>

<script>
  import detailsX from './bash/details.vue'
  import process from './bash/process.vue'
  export default {
    components: {detailsX, process},
    props: {
      page: {
        type: Number,
        default: 1
      },
      studentId: [Number, String]

    },
    data() {
      return {}
    },
    watch: {},
    computed: {},
    created() {
    },
    mounted() {
      this.$nextTick(() => {

      })

    },
    methods: {
      blockFn() {
        this.$emit('blockFn')
      }
    },
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
