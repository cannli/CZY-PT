<template>
  <div>

    <transition name="bounce">
      <div class="iframe-box" v-if="show" style="z-index:5;">
        <div class="mod-iframe">
          <!--<div class="iframe-title"><h2>{{title}}</h2><span class="iframe-close" @click="close" v-show="isbtn"></span>-->
          <!--</div>-->
          <slot name="search"></slot>
          <div class="iframe-main">
            <div class="iframe-tips" style="padding: 30px 0;">
              <slot></slot>
            </div>
            <slot name="selection"></slot>
          </div>
          <div class="iframe-line-btn">
            <div v-show="isbtn">
              <a href="javascript:;" class="mod-btn ext-btn-blue" @click="submit" v-if="isOkBtn" v-html="btnfontOk"></a>
              <a href="javascript:;" class="mod-btn ext-btn-white" @click="close" v-if="isCancelBtn">取&nbsp;&nbsp;消</a>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        // show: false,
      }
    },
    props: {
      data: Array,
      title: {
        type: String,
        default: '提示',
      },
      btnfontOk: {
        type: String,
        default: '确&nbsp;&nbsp;定',
      },
      btnfontCancel: {
        type: String,
        default: '取&nbsp;&nbsp;消',
      },
      show: {
        type: Boolean,
        default: false,
      },
      isbtn: {
        type: Boolean,
        default: true,//是否显示确定和取消按钮
      },
      isOkBtn: {
        type: Boolean,
        default: true
      },
      isCancelBtn: {
        type: Boolean,
        default: true
      }
    },
    computed: {//计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。

    },
    watch: {},
    methods: {
      close: function () {
        // this.$emit('input',!this.show);
        this.$emit('close')
      },
      submit: function () {
        // this.$emit('input',!this.show);
        this.$emit('submit');
      }
    },
    mounted: function () {

    },
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .mod-iframe .iframe-main {
    overflow: hidden;
    width: 100%;
    max-height: 460px;
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-out .2s;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  .iframe-box {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .2);
    z-index: 5;
    .mod-iframe {
      position: absolute;
      background-color: #fff;
      width: 600px;
      left: 50%;
      top: 50%;
      border-radius: 5px;
      -webkit-transform: translateX(-50%) translateY(-50%);
      transform: translateX(-50%) translateY(-50%);
      .iframe-title {
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        color: #fff;
        background: #008000;
        border-radius: 5px 5px 0 0;
        h2 {
          height: 50px;
          line-height: 50px;
          padding: 0 20px;
          font-weight: 400;
          font-size: 18px;
        }
        .iframe-close {
          position: absolute;
          width: 17px;
          height: 17px;
          display: block;
          top: 15px;
          right: 16px;
          box-sizing: content-box;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
          cursor: pointer;
          .iframe-close:before {
            width: 1px;
            height: 17px;
            top: 0;
            left: 8px;
          }
          .iframe-close:after {
            width: 17px;
            height: 1px;
            top: 8px;
            left: 0;
          }

        }
      }
      .iframe-main {
        overflow: hidden;
        width: 100%;
        max-height: 460px;
        .mod-iframe .iframe-tips {
          line-height: 24px;
          text-align: center;
          font-size: 18px;
          color: #333;
        }
      }
      .iframe-line-btn {
        margin: 25px auto;
        text-align: center;
        .mod-btn {
          margin: 0 10px;
          display: inline-block;
          padding: 0 24px;
          height: 30px;
          line-height: 30px;
          border-radius: 4px;
        }
        .ext-btn-blue {
          border: 1px solid #008000;
          color: #fff;
          background-color: #008000;
        }
        .ext-btn-white{
          background-color: #fff;
          color: #CCCCCC;
          border: 1px solid #e6e6e6;
        }
      }
    }
  }
</style>
