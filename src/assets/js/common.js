exports.install = function (Vue, options) {
  'use strict'
  Vue.prototype.dataEnum = {
    grade: [{name: '一年级', val: 1}],
    sex: [{name: '男', val: 1}, {name: '女', val: 2}],
    fgrade: [
      {name: '幼小班', val: 1},
      {name: '幼中班', val: 2},
      {name: '幼大班', val: 3},
      {name: '学前班', val: 4},
      {name: '一年级', val: 5},
      {name: '二年级', val: 6},
      {name: '三年级', val: 7},
      {name: '四年级', val: 8},
      {name: '五年级', val: 9},
      {name: '六年级', val: 10},
      {name: '初一', val: 11},
      {name: '初二', val:12},
      {name: '初三', val: 13},
      {name: '高一', val: 14},
      {name: '高二', val: 15},
      {name: '高三', val: 16},
      {name: '大一', val: 17},
      {name: '大二', val: 18},
      {name: '大三', val: 19},
      {name: '大四', val: 20}
    ],
    tiTaiList: [
      {name: '头前倾', val: 19},
      {name: '头晕', val: 2},
      {name: '头痛', val: 3},
      {name: '耳鸣', val: 10},
      {name: '骨刺', val: 7},
      {name: '腰痛', val: 1},
      {name: '手脚麻', val: 4},
    ],
    illnessArr: [
      {name: '腰痛', val: 1},
      {name: '头晕', val: 2},
      {name: '头痛', val: 3},
      {name: '手脚麻', val: 4},
      {name: '颈椎硬化', val: 5},
      {name: '颈肩痛', val: 6},
      {name: '骨刺', val: 7},
      {name: '便秘', val: 8},
      {name: '背痛', val: 9},
      {name: '耳鸣', val: 10},
      {name: '脊柱变形', val: 11},
      {name: '慢性劳损', val: 12},
      {name: '腰椎间盘突出', val: 13},
      {name: '身体疲惫', val: 14},
      {name: '膝关节痛', val: 15},
      {name: '眼睛干涉', val: 16},
      {name: '失眠', val: 17},
      {name: '胸闷气短', val: 18},
    ],
    schoolType: [{name: '幼儿园', val: 1},
      {name: '小学', val: 2},
      {name: '中学', val: 3},
      {name: '高中', val: 4},
      {name: '大学', val: 5},],
    njiObj: [],
    ageObj: [],
    tijianDate: [],
    schoolArr: []


  }
  Vue.prototype.dataShenG = {
    legendData: ['男生平均身高', '女生平均身高', '总体平均身高'],
    xAxisData: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'], // 年级
    xAxisDataAge: ['6岁', '7岁', '8岁', '9岁', '10岁', '11岁', '12岁'],     // 年龄
    seriesData: [ // 年级
      {type: 'bar', data: [123, 125.4, 131.8, 136.2, 145.4, 147.9]},
      {type: 'bar', data: [120.3, 124.5, 129.6, 135.7, 146, 150.3]},
      {type: 'line', data: [122, 124.9, 130.5, 135.9, 145.7, 149.1]}
    ],
    seriesDataAge: [// 年级
      {type: 'bar', data: [117.7, 124, 130.0, 135.4, 142.6, 145.3, 151.9]},
      {type: 'bar', data: [116.6, 122.5, 128.5, 134.1, 140.1, 146.6, 152.6]},
      {type: 'line', data: [117.1, 123.3, 129.6, 134.7, 141.3, 145.9, 152.3]}
    ]
  }

  Vue.prototype.dataTiZ = {
    legendData: ['男平均', '女平均', '总平均'],
    xAxisData: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'], // 年级
    xAxisDataAge: ['6岁', '7岁', '8岁', '9岁', '10岁', '11岁', '12岁'],     // 年龄
    seriesData: [ // 年级
      {type: 'bar', data: [22.4, 24.4, 28.8, 32.7, 37.2, 41.9]},
      {type: 'bar', data: [21.9, 23.8, 26.7, 30.9, 36.0, 39.6]},
      {type: 'line', data: [22.1, 24.1, 27.7, 31.5, 36.7, 40.8]}
    ],
    seriesDataAge: [// 年级
      {type: 'bar', data: [21.3, 24.1, 27.3, 30.5, 33.7, 37.7, 42.5]},
      {type: 'bar', data: [20.4, 22.6, 25.3, 28.2, 31.8, 36.1, 40.8]},
      {type: 'line', data: [20.7, 23.3, 26.3, 29.3, 32.7, 36.9, 41.6]}
    ]
  }

  Vue.prototype.dataGongZu = {
    legendData: ['男正常', '男异常', '女正常', '女异常'],
    seriesData: [883, 457, 1052, 168]
  }

  // 健康成长 身高
  Vue.prototype.dataShengGao = {
    legendData: ['本次男平均身高', '上次男平均身高', '本次女平均身高', '上次女平均身高', '本次平均身高', '上次平均身高'],
    xAxisData: ['1班', '2班', '3班', '4班', '5班'],
    seriesData: [ // 年级
      {type: 'bar', data: [124.3, 125.1, 124.5, 125.3, 125.0]},
      {type: 'bar', data: [121.4, 122.3, 121.0, 122.1, 121.5]},
      {type: 'bar', data: [121.3, 122.1, 121.2, 121.8, 121.4]},
      {type: 'bar', data: [119.2, 120.0, 119.4, 120.5, 119.5]},
      {type: 'line', data: [122.8, 123.2, 122.2, 123.1, 123.2]},
      {type: 'line', data: [121.1, 121.2, 120.2, 121.3, 120.5]}
    ],
    color: ['#0066ff', '#99ccff', '#cc99ff', '#ffccff', '#01B200', '#FFef00']
  }

  // 健康成长 体重
  Vue.prototype.dataTiZhong = {
    legendData: ['本次男平均体重', '上次男平均体重', '本次女平均体重', '上次女平均体重', '本次平均体重', '上次平均体重'],
    xAxisData: ['1班', '2班', '3班', '4班', '5班'],
    seriesData: [ // 年级
      {type: 'bar', data: [24.6, 24.0, 24.8, 24.5, 25.1]},
      {type: 'bar', data: [23.7, 23.4, 24.0, 23.3, 23.8]},
      {type: 'bar', data: [24.0, 22.6, 22.7, 23.8, 23.4]},
      {type: 'bar', data: [22.9, 21.8, 21.7, 22.9, 22.0]},
      {type: 'line', data: [24.3, 23.3, 23.8, 24.2, 24.2]},
      {type: 'line', data: [23.2, 22.6, 22.8, 23.1, 22.9]}
    ],
    color: ['#0066ff', '#99ccff', '#cc99ff', '#ffccff', '#01B200', '#FFef00']
  }


  // 成长轨迹
/*  Vue.prototype.dataSG = {
    legendData: ['2017第一次', '2017第二次', '2018第一次', '2018第二次'],
    seriesData: [160, 161, 162, 164],
    seriesData2: [34, 44, 40, 38],
    color: ['#ff0000,#00ff00', '#0000ff', '#cccccc']
  }*/

  // 成长轨迹 风险对比
/*  Vue.prototype.dataFXDB = {
    seriesData: [
      [110, 121, 134, 123, 145, 167, 167, 156, 154, 145, 134, 123, 123, 99, 127, 156, 67, 88],
      [120, 132, 101, 134, 90, 89, 87, 56, 66, 77, 88, 99, 111, 67, 123, 67, 45, 66],
      [46, 89, 34, 56, 80, 34, 56, 77, 88, 55, 67, 89, 90, 111, 62, 55, 66, 77],
      [44, 55, 40, 56, 60, 33, 44, 23, 44, 33, 22, 11, 33, 56, 75, 34, 54, 66]
    ],
    xAxisData: ['腰痛', '头晕', '头痛', '手脚麻', '颈椎硬化', '颈肩痛',
      '骨刺', '便秘', '背痛', '耳鸣', '脊柱变形', '慢性劳损', '腰椎间盘突出',
      '身体疲惫', '膝关节痛', '眼睛干涉', '失眠', '胸闷气短'],
    legendData: ['2017第一次', '2017第二次', '2018第一次', '2018第二次'],
  }*/

  // 成长轨迹 风险对比
  Vue.prototype.xxDuiB = {
    seriesData: [
      [110, 121, 134, 123, 145, 167, 167, 156, 154, 145, 134, 123, 123, 99, 127, 156, 67, 88],
      [120, 132, 101, 134, 90, 89, 87, 56, 66, 77, 88, 99, 111, 67, 123, 67, 45, 66],
    ],
    xAxisData: ['腰痛', '头晕', '头痛', '手脚麻', '颈椎硬化', '颈肩痛',
      '骨刺', '便秘', '背痛', '耳鸣', '脊柱变形', '慢性劳损', '腰椎间盘突出',
      '身体疲惫', '膝关节痛', '眼睛干涉', '失眠', '胸闷气短'],
    legendData: ['A区', 'B区'],
  }

  // 判断性别
  Vue.prototype.verifySet = function (val) {
    if (val == 1) {
      return '男'
    } else if (val == 2) {
      return '女'
    } else {
      return '未知'
    }
  }
}
