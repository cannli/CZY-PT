
import fetch from 'common/fetch'
// 获取上传资料列表
export function getDataList(params) {
  return fetch({
    url: 'http://api.junlz.com/admin/Satum/index',
    method: 'get',
    params
  })
}

// 添加文件
export function addDataFn(data) {
  return fetch({
    url: 'http://api.junlz.com/admin/Satum/add',
    method: 'post',
    data
  })
}


// 编辑文件
export function editDataFn(data) {
  return fetch({
    url: 'http://api.junlz.com/admin/Satum/edit',
    method: 'post',
    data
  })
}

// 编辑文件
export function delDataFn(data) {
  return fetch({
    url: 'http://api.junlz.com/admin/Satum/del',
    method: 'post',
    data
  })
}

