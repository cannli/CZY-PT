
<template>
  <div v-if="myIsLoading" :style="loadingBox" class="loadingBox" @click="showFn">

    <img :src="imgUrl" class="bannerImg"/>

    <!-- <div class="back">X</i></div>-->
  </div>
</template>

<script type="text/javascript">
  export default {
    data: function () {
      return {
        myIsLoading: this.isLoading
      }
    },
    watch: {
      isLoading(val) {
        this.myIsLoading = val
      }
    },
    props: {
      imgUrl: [String],
      isLoading: {
        type: Boolean,
        default: false
      },
      boxTop: {
        type: Number,
        default: 0
      },
      boxLeft: {
        type: Number,
        default: 0
      }
    },
    computed: {// 计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。
      loadingBox: function () {
        var self = this
        return {
          top: self.boxTop + 'px',
          left: self.boxLeft + 'px',
          width: 'calc( 100% - ' + self.boxLeft + 'px )',
          height: 'calc( 100% - ' + self.boxTop + 'px )'
        }
      }
    },
    methods: {
      setBannerH() {
        this.bannerH = (document.body.clientHeight - 100) + 'px'
        console.log(this.bannerH)
      },
      showFn() {
        this.myIsLoading = false
        this.$emit('showFn')
      }
    },
    mounted() {
      this.setBannerH()
      /*  window.addEventListener('resize', () => {
          this.setBannerH()
        }, false) */

      // window.addEventListener('resize', this.setBannerH)
    },
    beforeDestroy() {

      // window.removeEventListener('resize', this.setBannerH)
      // this.bannerH = null
      // this.setBannerH = null
    }
  }
</script>

<style type="text/css">
  .loadingBox {
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .8);
  }

  .bannerImg {
/*    text-align: center;
   !* margin: 5% auto;*!
    !* width: 100%;*!
    height: 90%;
    min-height: 360px;*/
    height: 85%;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
</style>
