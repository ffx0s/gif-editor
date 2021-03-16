import request from '@/utils/request'

export function search(keywords, params) {
  return request({
    url: `/search/${keywords}`,
    method: 'get',
    params
  })
}

export function pictures(type, params) {
  return request({
    url: '/pictures',
    method: 'get',
    params: { ...params, type }
  })
}

export function like(id, status) {
  return request({
    url: `/like/picture/${id}/${status}`,
    method: 'post'
  })
}
