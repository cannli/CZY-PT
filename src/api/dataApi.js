import fetch from 'common/fetch'


//报告 ->报告管理 -> 学生列表
export function getExamStudent(params) {
  return fetch({
    url: window.projectRootUrl + '/admin/studentList.do',
    method: 'get',
    params
  })
}

//报告 ->报告管理 -> 学生列表
export function addStudentHeightWeight(params) {
  return fetch({
    url: window.projectRootUrl + '/school/report/addStudentHeightWeight.do',
    method: 'post',
    params
  })
}







//报告 ->报告管理 -> 项目列表
export function getExamProjectList(params) {
  return fetch({
    url: window.projectRootUrl + '/admin/projectList.do',
    method: 'get',
    params
  })
}


//报告 ->报告管理 -> 项目列表
export function getReport(params) {
  return fetch({
    url: window.projectRootUrl + '/school/report/syncExam.do',
    method: 'get',
    params
  })
}



//修改体检申请状态
export function modifyStatusExam(params) {
  return fetch({
    url: window.projectRootUrl + '/admin/score/modifyExamStatus.do',
    method: 'post',
    params
  })
}



//报告-上传成绩体检列表
export function getScoreList(params) {
  return fetch({
    url: window.projectRootUrl + '/admin/score/getScoreList.do',
    method: 'get',
    params
  })
}

//应用-获取文章
export function getArticleList(params) {
  return fetch({
    url: window.projectRootUrl + '/articleList.do',
    method: 'get',
    params
  })
}

// 应用 - 添加编辑文章
export function saveOrUpdateArticle(data) {
  return fetch({
    url: window.projectRootUrl + '/saveOrUpdateArticle.do',
    method: 'post',
    data
  })
}

//应用 -  删除文章
export function deleteArticle(params) {
  return fetch({
    url: window.projectRootUrl + '/deleteArticle.do',
    method: 'GET',
    params
  })
}

/*         ………………………………         用户       &&&&&&&&&&    */

// 用户-列表
export function getUserList(params) {
  return fetch({
    url: window.projectRootUrl + '/users/userList.do',
    method: 'get',
    params
  })
}

//添加管理员
export function saveOrUpdateUser(data) {
  return fetch({
    url: window.projectRootUrl + '/users/saveOrUpdateUser.do',
    method: 'post',
    data
  })
}

//添加管理员
export function getUserDetail(params) {
  return fetch({
    url: window.projectRootUrl + '/users/getUserDetail.do',
    method: 'get',
    params
  })
}



// 运营-运营管理
export function getAdviseList(params) {
  return fetch({
    url: window.projectRootUrl + '/admin/adviseList.do',
    method: 'get',
    params
  })
}

// 运营-运营管理
export function deleteRole(params) {
  return fetch({
    url: window.projectRootUrl + '/function/deleteRole.do',
    method: 'get',
    params
  })
}




//运营-运营管理删除
export function deleteAdvise(params) {
  return fetch({
    url: window.projectRootUrl + '/admin/deleteAdvise.do',
    method: 'get',
    params
  })
}



// 用户-列表
export function getAdminUserList(params) {
  return fetch({
    url: window.projectRootUrl + '/users/userList.do',
    method: 'get',
    params
  })
}


//左侧菜单 -  删除
export function getMenuFn(params) {
  return fetch({
    url: window.projectRootUrl + '/function/getMenuList.do',
    method: 'get',
    params              //: JSON.parse(JSON.stringify(data))
  })
}


//用户 -  删除
export function deleteUser(params) {
  return fetch({
    url: window.projectRootUrl + '/users/deleteUser.do',
    method: 'get',
    params              //: JSON.parse(JSON.stringify(data))
  })
}


export function getAreaList(params){
  return fetch({
    url: window.projectRootUrl + '/school/getAreaList.do',
    method: 'get',
    params
  });
}


/***********************资料设置******************************/
//学校管理-获取
export function getSchoolDetail(params) {
  return fetch({
    url: window.projectRootUrl + '/admin/school/schoolDetail.do',
    method: 'get',
    params
  })
}

//学校管理-已审核-编辑-保存
export function updateSchoolDetail(data) {
  return fetch({
    url: window.projectRootUrl + '/admin/school/updateSchoolDetail.do',
    method: 'post',
    data
  })
}

//学校管理-未审核-通过
export function updateSchoolPass(params) {
  return fetch({
    url: window.projectRootUrl + '/admin/school/updateSchoolPass.do',
    method: 'post',
    params
  })
}

//学校管理-删除/注销
export function deleteSchool(params) {
  return fetch({
    url: window.projectRootUrl + '/admin/school/deleteSchool.do',
    method: 'post',
    params
  })
}


//家长管理
export function getParentList(params) {
  return fetch({
    url: window.projectRootUrl + '/parents/getParentList.do',
    method: 'get',
    params
  })
}

//家长管理-查看详情
export function parentDetail(params) {
  return fetch({
    url: window.projectRootUrl + '/parents/parentDetail.do',
    method: 'get',
    params
  })
}

/**********************************x學校列表**********************************/
export function getSchoolList(params) {
  return fetch({
    url: window.projectRootUrl + '/admin/school/schoolList.do',
    method: 'get',
    params
  })
}


export function getPraentUserList(params) {
  return fetch({
    url: window.projectRootUrl + '/users/userList.do',
    method: 'get',
    params
  })
}





/**********************************权限设置***********************************/
//角色编辑或新增
export function saveOrUpdateRole(data) {
  return fetch({
    url: window.projectRootUrl + '/function/saveOrUpdateRole.do',
    method: 'post',
    data
  })
}

//获取指定角色对用的功能列表
export function getFunctionList(params) {
  return fetch({
    url: window.projectRootUrl + '/function/getFunctionList.do',
    method: 'get',
    params
  })
}

//获取角色列表
export function getRoleList(params) {
  return fetch({
    url: window.projectRootUrl + '/function/getRoleList.do',
    method: 'get',
    params
  })
}

//报告/体检管理/详情/风险预测
export function studentRiskReport(params) {
  return fetch({
    url: window.projectRootUrl + '/school/report/studentRiskReport.do',
    method: 'get',
    params
  })
}





/*项目*/
// 综合测评
export function zongheCp(params){
  return fetch({
    url: window.projectRootUrl + '/school/report/overview.do',
    method: 'get',
    params
  })

}

/*项目*/
// 综合测评
export function baseProjectInfo(params){
  return fetch({
    url: window.projectRootUrl + '/admin/baseProjectInfo.do',
    method: 'get',
    params
  })

}




// 综合测评
export function studentBaseInfo(params){
  return fetch({
    url: window.projectRootUrl + '/school/report/studentBaseInfo.do',
    method: 'get',
    params
  })

}

// 综合测评
export function shapeReport(params){
  return fetch({
    url: window.projectRootUrl + '/school/report/shapeReport.do',
    method: 'get',
    params
  })
}


// 学生体检管理详情
export function getExamdetail(params){
  return fetch({
    url: window.projectRootUrl + '/admin/user/examdetail.do',
    method: 'get',
    params
  })
}

// 报告 / 学生体检管理 / 成长轨迹/身高
export function getHeightTrail(params){
  return fetch({
    url: window.projectRootUrl + '/admin/user/heightTrail.do',
    method: 'get',
    params
  })
}

// 报告 / 学生体检管理 / 成长轨迹/风险预测
export function getRiskTrail(params){
  return fetch({
    url: window.projectRootUrl + '/admin/user/riskTrail.do',
    method: 'get',
    params
  })
}

//报告 / 学生体检管理 / 成长轨迹/体态判定
export function getShapeTrail(params){
  return fetch({
    url: window.projectRootUrl + '/admin/user/shapeTrail.do',
    method: 'get',
    params
  })
}

// 报告 / 学生体检管理 / 成长轨迹/体重
export function getWeightTrail(params){
  return fetch({
    url: window.projectRootUrl + '/admin/user/weightTrail.do',
    method: 'get',
    params
  })
}

// 查询

export function getAreaSchoolList(params){
  return fetch({
    url:  window.projectRootUrl + '/admin/school/getAreaSchoolList.do',
    method: 'get',
    params
  })
}

/*************************************报告分析*/
//风险预测
export function getAreaReportRisk(params){
  return fetch({
    url:  window.projectRootUrl + '/admin/user/areaReportRisk.do',
    method: 'get',
    params
  })
}

//本次检测数据综合分析评级
export function getZongHeAnalysis(params){
  return fetch({
    url:  window.projectRootUrl + '/admin/user/zongHeAnalysis.do',
    method: 'get',
    params
  })
}

//人形的体态数据
export function getTiTaiAnalysis(params){
  return fetch({
    url:  window.projectRootUrl + '/admin/user/tiTaiAnalysis.do',
    method: 'get',
    params
  })
}


/*************************概况*****************************/

export function getOverview(params){
  return fetch({
    url:  window.projectRootUrl + '/admin/overview.do',
    method: 'get',
    params
  })
}
