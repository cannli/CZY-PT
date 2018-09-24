<template>
  <div :class="className" :style="{height:height,width:width}" style=" background: #fff;
     box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import {debounce} from '../../../../../utils'

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
      }
    },
    data() {
      return {
        chart: null,
        dataObj:{}
      }
    },
    watch: {},
    created() {
      this._shapeReport()
    },
    mounted() {
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
      _shapeReport() {
        let params = {
          projectCode: this.projectCode
        };
        this.$fetch.dataApi
          .shapeReport(params)
          .then(({data, msg, total}) => {
            this.dataObj = data
            this.initChart()
          })
      },

      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['正常男', '正常女', '异常男', '异常女'],
            x: '2%',
          },
          grid: {
            left: '1%',
            right: '3%',
            bottom: '5%',
            containLabel: true
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              saveAsImage: {show: true}
            }
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['腿型', '骨盆位置', '头部（前倾）', '躯干（偏移）', '高低肩', '弓腰（驼背）', '头部（侧歪）']
          },
          series: [
            {
              name: '正常男',
              type: 'bar',
              stack: '总量',
              barMinHeight: 20,

              itemStyle: { //['#339933','#669999','#99ff99','#cccccc']
                normal: {
                  color: '#6BCA66'
                }
              },
              label: {
                normal: {
                  show: true,
                  // position: 'insideRight'
                }
              },
              data: [this.dataObj.legxo.man, this.dataObj.pelvispitch.man, this.dataObj.headfore.man, this.dataObj.bodyCenter.man, this.dataObj.shoulder.man,
                this.dataObj.hump.man, this.dataObj.head.man]
            },
            {
              name: '正常女',
              type: 'bar',
              stack: '总量',
              barMinHeight: 20,
              itemStyle: {
                normal: {
                  color: '#008A00'
                }
              },
              label: {
                normal: {
                  show: true,
                }
              },
              data: [this.dataObj.legxo.felMan, this.dataObj.pelvispitch.felMan, this.dataObj.headfore.felMan, this.dataObj.bodyCenter.felMan, this.dataObj.shoulder.felMan,
                this.dataObj.hump.felMan, this.dataObj.head.felMan]
            },
            {
              name: '异常男',
              type: 'bar',
              stack: '总量',
              barMinHeight: 20,
              itemStyle: {
                normal: {
                  color: '#A6AAA8'
                }
              },
              label: {
                normal: {
                  show: true,
                  // position: 'insideRight'
                }
              },

              data: [this.dataObj.legxo.ycMan, this.dataObj.pelvispitch.ycMan, this.dataObj.headfore.ycMan, this.dataObj.bodyCenter.ycMan, this.dataObj.shoulder.ycMan,
                this.dataObj.hump.ycMan, this.dataObj.head.ycMan]
            },
            {
              name: '异常女',
              type: 'bar',
              stack: '总量',
              barMinHeight: 20,
              itemStyle: {
                normal: {
                  color: '#6C6F6F'
                }
              },
              label: {
                normal: {
                  show: true,
                  // position: 'insideRight'
                }
              },
              data: [this.dataObj.legxo.ycFelMan, this.dataObj.pelvispitch.ycFelMan, this.dataObj.headfore.ycFelMan, this.dataObj.bodyCenter.ycFelMan, this.dataObj.shoulder.ycFelMan,
                this.dataObj.hump.ycFelMan, this.dataObj.head.ycFelMan]
            }
          ]
        })
      }
    }
  }
</script>
