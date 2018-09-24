<template>
  <div :class="className" :style="{height:height,width:width}" style=" background: #fff;
     box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import {debounce} from 'utils'

  const animationDuration = 6000

  export default {
    props: {
      projectCode: {
        type: String
      },
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },
      unit: {
        type: String,
        default: ''
      },
      valMin: {
        type: String,
        default: ''
      },
      xAxisData: { // x轴上的刻度
        type: Array,
        default: function () {
          return []
        }
      },
      seriesData: { // 总数据
        type: Array,
        default: function () {
          return []
        }
      },
      color: {
        type: Array,
        default: function () {
          return ['#3398DB']
        }
      },
      min: {
        type: Number,
        default: 130
      },
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      seriesData: {
        handler(cval, oval) {
          this.initChart()
        },
        deep: true
      }
    },
    mounted() {
      this.initChart()
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart(data) {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          color: this.color,//['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              saveAsImage: {show: true}
            }
          },
          grid: {
            left: '2%',
            right: '4%',
            bottom: '2%',
            containLabel: true,
            //   x: 50,
            //   x2: 10,
            //   y2: 50
          },
          xAxis: [
            {
             // name: "123",//坐标轴名称。
              nameLocation: 'end',//坐标轴名称显示位置。
              type: 'category',
              data: this.xAxisData,
              axisLabel: {//坐标轴刻度标签的相关设置。
                interval: 0,
                rotate: "45"
              },
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {formatter: '{value}' + this.unit},
              min: this.min
            }
          ],
          series: [
            {
              name: '风险预测',
              type: 'bar',
              barWidth: '20%',
              label: {
                normal: {
                  show: true,
                  // position: 'insideRight'
                }
              },
              data: this.seriesData
            }
          ]
        })
      }
    }
  }
</script>
