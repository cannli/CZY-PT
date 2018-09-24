<template>
  <div>
    <produceX v-if="page==1" :projectCode="projectCode" :schoolId="schoolId"  @closeFn="closeFn"></produceX>
    <students v-if="page==2" :projectCode="projectCode" :schoolId="schoolId"  @closeFn="closeFn"></students>
  </div>
</template>
<script>
    import produceX from './prdetails.vue'
    import students from './students.vue'
    export default {
      components: {produceX, students},
      props: {
        page: {
          type: [Number,String],
          default: 1
        },
        projectCode: [Number, String],
        schoolId:[Number, String]
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
        closeFn() {
          this.$emit('closeFn')
        }
      },
    }
</script>

<style scoped>

</style>
