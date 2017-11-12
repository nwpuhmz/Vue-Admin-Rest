
import fetch from '@/common/fetch'
import {port_item} from '@/common/port_uri'

//数据列表
export function list(params) {
  return fetch({
    url: port_item.list,
    method: 'get',
    params
  })
}

//数据列表带分页
export function listWithPage(params) {
  return fetch({
    url: port_item.listWithPage,
    method: 'get',
    params
  })
}

//根据id查询数据
export function get(params) {
  return fetch({
    url: port_item.get,
    method: 'get',
    params
  })
}

//根据id删除数据
export function del(params) {
  return fetch({
    url: port_item.del,
    method: 'delete',
    params
  })
}
//添加或修改数据
export function save(data) {
  return fetch({
    url: port_item.save,
    method: 'post',
    data
  })
}
//批量删除
export function batch_del(params) {
  return fetch({
    url: port_item.batch_del,
    method: 'post',
    params
  })
}

