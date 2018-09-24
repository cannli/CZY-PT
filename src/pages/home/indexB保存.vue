<template>
  <div>

    <div class="amap-wrapper">
      <el-amap class="amap-box" :vid="'amap-vue'" :plugin="plugins" :zoom="zoom">
        <el-amap-circle-marker v-for="marker in markers"
                               :center="marker.center"
                               :radius="marker.radius"
                               :fill-color="marker.fillColor"
                               :fill-opacity="marker.fillOpacity"
                               :events="marker.events">
        </el-amap-circle-marker>

        <el-amap-info-window v-for="x in currentWindow"
          :position="x.position"
          :content="x.content"
          :visible="x.visible"
          :events="x.events">
        </el-amap-info-window>
      </el-amap>
    </div>
    <div class="wrapper">
      <div class="butBox">
        <div class="but but1" :class="{'butTrue':butTrue===1}" @click="_getOverview(1)">平台数据</div>
        <div class="but but2" :class="{'butTrue':butTrue===2}" @click="_getOverview(2)">任务处理</div>
      </div>

      <div class="but1Box" v-show="butTrue===1">
        <div class="tip backg-bor-style">
          <img src="./img/laoshi1.png" class="img"/>
          <div class="text">
            <div class="span1 span">{{isNull(allUserCount)}}</div>
            <div class="span2 span">累计用户数</div>
          </div>
        </div>

        <div class="tip backg-bor-style">
          <img src="./img/laoshi2.png" class="img"/>
          <div class="text">
            <div class="span1 span">{{isNull(allSchoolCount)}}</div>
            <div class="span2 span">合作学校总数</div>
          </div>
        </div>

        <div class="tip backg-bor-style">
          <img src="./img/laoshi3.png" class="img"/>
          <div class="text">
            <div class="span1 span">{{isNull(allStudentCount)}}</div>
            <div class="span2 span">学生总数</div>
          </div>
        </div>

        <div class="tip backg-bor-style">
          <img src="./img/laoshi4.png" class="img"/>
          <div class="text">
            <div class="span1 span">{{isNull(allParentCount)}}</div>
            <div class="span2 span">家长总数</div>
          </div>
        </div>

        <div class="tip backg-bor-style">
          <img src="./img/laoshi5.png" class="img"/>
          <div class="text">
            <div class="span1 span">{{isNull(allTeacherCount)}}</div>
            <div class="span2 span">老师总数</div>
          </div>
        </div>
      </div>


      <div class="but1Box" v-show="butTrue===2">
        <div class="tip backg-bor-style">
          <img src="./img/laoshi2.png" class="img"/>
          <div class="text">
            <div class="span1 span">{{isNull(allSchoolCountWei)}}</div>
            <div class="span2 span">待审核学校</div>
          </div>
        </div>

        <div class="tip backg-bor-style">
          <img src="./img/laoshi4.png" class="img"/>
          <div class="text">
            <div class="span1 span">{{isNull(allParentCountWei)}}</div>
            <div class="span2 span">待绑定家长</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

  export default {

    data() {
      return {
        // 平台数据 ===1
        allSchoolCount: '',   //学校数量
        schoolList: [],       //学校列表
        allUserCount: '',     //所有用户数
        allStudentCount: '',  //学生数量
        allParentCount: '',  //父母数量
        allTeacherCount: '',  //老师人数

        // ===2
        allParentCountWei: '',
        allSchoolCountWei: '',

        /****************/
        butTrue: 1,
        resizeEnable: true,
        zoom: 5,
        //  center: [121.5273285, 31.21515044],
        markers: [],

        windows: [  // 在弹框
          {
            position: [114.246899, 22.720968],
            content:
            '<div class="box">' +
            '<h3>深大附中中学</h3>' +
            '<p style="font-size: 14px;height: 20px;">学生人数：623人</p>' +
            '<p style="font-size: 14px;height: 20px;">体检参数：12次</p>' +
            '<p style="font-size: 14px;height: 20px;">负责人：将波</p>' +
            '<p style="font-size: 14px;height: 20px;">电话：17620317584</p>' +
            '</div>',
            visible: true,
            events: {
              close() {
                console.log('close infowindow1');
              }
            }
          }
        ],
        /* slotWindow: {
           position: [121.5163285, 31.21515044]
         },*/
        currentWindow: {
          position: [0, 0],
          content: '',
          events: {
            close() {
              console.log('close infowindow1');
            }
          },
          visible: false
        },
        plugins: [{
          pName: 'ToolBar',
          events: {
            init(instance) {
              console.log(instance);
              self.center = [121.5163285, 31.21515044];
            }
          },
          autoPosition: true,
        }]

      };
    },
    created() {},
    methods: {
      switchWindow(tab) {
        this.currentWindow.visible = false;
        this.$nextTick(() => {
          this.currentWindow = this.windows[tab];
          this.currentWindow.visible = true;
        });
      },

      //获取平台数据
      _getOverview(status = 1) {
        this.butTrue = status
        let params = {
          status: status
        };
        this.$fetch.dataApi
          .getOverview(params)
          .then(({data, msg, total}) => {
            if (!data || data.length <= 0) {
              return
            }
           /* this.windows = [
              {
                position: [114.246899, 22.720968],
                content:
                '<div class="box">' +
                '<h3>深大附中中学</h3>' +
                '<p style="font-size: 14px;height: 20px;">学生人数：623人</p>' +
                '<p style="font-size: 14px;height: 20px;">体检参数：12次</p>' +
                '<p style="font-size: 14px;height: 20px;">负责人：将波</p>' +
                '<p style="font-size: 14px;height: 20px;">电话：17620317584</p>' +
                '</div>',
                visible: true,
                events: {
                  close() {
                    console.log('close infowindow1');
                  }
                }
              }
            ]*/

            if (this.butTrue === 1) {
              /*
              *
              * <div class="box">
                                  <h3>深大附中中学</h3>
                                      <p style="font-size: 14px;height: 20px;">学生人数：623人</p>
                                    <p style="font-size: 14px;height: 20px;">体检参数：12次</p>
                                    <p style="font-size: 14px;height: 20px;">负责人：将波</p>
                                    <p style="font-size: 14px;height: 20px;">电话：17620317584</p>
                                    </div>`
              * */
              this.allSchoolCount = data.allSchoolCount //学校数量
              this.allUserCount = data.allUserCount //所有用户数
              this.allStudentCount = data.allStudentCount //学生数量
              this.allParentCount = data.allParentCount //父母数量
              this.allTeacherCount = data.allTeacherCount //老师人数
              let schoolList = data.schoolList //学校列表
              if (schoolList && schoolList.length > 0) {
               // for (let x in schoolList)
                 for (let i = 0 ; i < schoolList.length ; i ++) {
                  this.markers.push(
                    {
                      center: [schoolList[x].latitude, schoolList[x].longitude],
                      radius: 5,
                      fillOpacity: 1,
                      fillColor: '#ff0000',
                      events: {
                        click: () => {
                          this.switchWindow(0)

                        }
                      }
                    }
                  )
                }
              }

            } else {
              this.allParentCountWei = data.allParentCount
              this.allSchoolCountWei = data.allSchoolCount
            }


          })
          .catch(() => {
            console.log("请求失败");
            console.log(msg);
          });
      },
    },

    mounted() {
      this.$nextTick(function () {
        this._getOverview(1)
        this.currentWindow = this.windows;
      });

    }
  };
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .amap-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .wrapper {
    position: absolute;
    right: 0;
    top: 0;
    width: 250px;
    height: 100%;
    background: #fff;
    .butBox {
      box-sizing: border-box;
      width: 240px;
      display: inline-block;
      background: #F4F4F4;
      margin: 5px;
      .but {
        box-sizing: border-box;
        width: 115px;
        color: #808080;
        display: inline-block;
        text-align: center;
        font-size: 14px;
        margin: 10px 0;
        font-weight: bold;
        cursor: pointer;
      }
      .but1 {
        border-right: 1px solid #cccccc;
      }
      .butTrue {
        color: #009EE0;
      }
    }
    .but1Box {
      padding: 40px 20px;
      .tip {
        height: 52px;
        position: relative;
        padding-left: 10px;
        margin-bottom: 20px;
        /* transform: translate(-50%, -50%);*/
        .img {
          position: absolute;
          top: 58%;
          left: 15%;
          transform: translate(-50%, -50%);
        }
        .text {
          position: absolute;
          top: 58%;
          left: 56%;
          transform: translate(-50%, -50%);
          height: 55px;
          .span {

          }
          .span2 {
            color: #808080;
            font-size: 12px;
          }
          .span1 {
            color: #333333;
            font-size: 24px;
            font-weight: bold;
          }
        }
      }
    }
  }


</style>
