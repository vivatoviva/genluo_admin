import request from '@/utils/request';

// 文章列表
export async function queryArticleList(paramsData) {
  return request(`/api/admin/article/list`, {
    method: 'POST',
    body: {
      ...paramsData,
    },
  });
}
// tag列表
export async function fetchTagList(code) {
  return request(`/api/admin/tags/list`, {
    method: 'POST'
  });
}
// 标题列表
export async function fetchCateList(code) {
  return request(`/api/admin/categroy/list`, {
    method: 'POST'
  });
}

export async function  changeStatus(params) {
  return request('/api/admin/article/delete', {
    method: 'POST',
    body: {
      id: params
    }
  })
}

export async function operateArticle(params) {
  return request('/api/admin/article/operate', {
    method:'POST',
    body: params,
  })
}


export async function detail(params) {
  return request('/api/admin/article/detail', {
    method: 'POST',
    body: params,
  })
}

