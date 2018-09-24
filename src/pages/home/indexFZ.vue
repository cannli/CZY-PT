<template>
  <div class="centen">

    <div class="content-bj">
      <navTitle :navArr="['概况','访问概况']"></navTitle>
      <!--<el-row class="backg-bor-style">-->
      <!--<el-col :span="24">-->
      <!--<div class="gong-gao">-->
      <!--<span>公告通告：2018年9月10日，到，9月10日，成长云联合，全国高等学校联办青少年体能大赛，全国学校踊跃报名中。</span>-->
      <!--<a class="a-sty">参看报名方式</a>-->
      <!--</div>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <panelTitle :title="'网站数据'"></panelTitle>
      <div class="care2">
        <el-row class="panel-group" :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class='card-panel'>
              <div class="card-panel-icon-wrapper icon-people">
                <img src="./img/tip-a.png">
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">今日访客</div>
                <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to>
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-message">
                <img src="./img/tip-b.png">
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">今日IP</div>
                <count-to class="card-panel-num" :startVal="0" :endVal="81212" :duration="3000"></count-to>
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-money">
                <img src="./img/tip-e.png">
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">今日文章浏览量</div>
                <count-to class="card-panel-num" :startVal="0" :endVal="9280" :duration="3200"></count-to>
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-shoppingCard">
                <img src="./img/tip-g.png">
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">今日咨询人数</div>
                <count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600"></count-to>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <panelTitle :title="'会员统计'"></panelTitle>
      <div class="care2">
        <el-row class="panel-group" :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">


          </el-col>
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-message">
                <img src="./img/tip-h.png">
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">昨日新增</div>
                <count-to class="card-panel-num" :startVal="0" :endVal="81212" :duration="3000"></count-to>
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-money">
                <img src="./img/tip-c.png">
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">本月新增</div>
                <count-to class="card-panel-num" :startVal="0" :endVal="9280" :duration="3200"></count-to>
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">

          </el-col>
        </el-row>
      </div>

      <div id="allmap" class="allmap" style="height: 1000px;width: 100%;background: #50cf77;"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'
  import navTitle from 'components/navTitle'
  import echarts from 'echarts'
  import CountTo from 'vue-count-to'
  import lineChart from './components/line'

  export default {

    data() {
      return {
        title: '学校情况',
        title1: '学校情况',

      }
    },
    components: {
      echarts,
      panelTitle, navTitle, CountTo, lineChart
    },
    mounted() {
      var map = new BMap.Map("allmap"); // 创建地图实例
      var point = new BMap.Point(116.331398, 39.897445); // 创建点坐标
      map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.ScaleControl());
      map.addControl(new BMap.OverviewMapControl());
      map.addControl(new BMap.MapTypeControl());
      map.setCurrentCity("武汉"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用

// var opts = {type: BMAP_NAVIGATION_CONTROL_ZOOM}
// map.addControl(new BMap.NavigationControl(opts)); 自定义控件

      map.setMapStyle({style: 'midnight'});//地图风格
    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .gong-gao {
    /*background: #cccccc;*/
    padding: 10px 10px;
    border-radius: 2px;
    color: #f00;
    font-size: 12px;
    .a-sty {
      position: absolute;
      right: 30px;
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .tips {
    background: #cccccc;
    padding: 25px 20px;
    .tipA-img img {
      padding: 0 20px;
      width: 66px;
      height: 66px;
    }
  }

  .p1, .p2 {
    text-align: center;
    font-size: 14px;
    // line-height: 20px;
  }

  .p1 {
    color: #424f63;
  }

  .p2 {
    color: #000;
    font-weight: 600;
  }

  .echarts {
    height: 450px;
    width: 100%;
  }

  .panel-group {
    margin-top: 18px;
    .card-panel-col {
      margin-bottom: 32px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shoppingCard {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shoppingCard {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          font-size: 12px;
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
</style>
