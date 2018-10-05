import { detail, queryArticleList, fetchTagList, fetchCateList, changeStatus, operateArticle } from '@/services/article';
import { message } from 'antd';


export default {
  namespace: 'article',

  state: {
    data: {
      list: [],
      pagination: {}
    },
    tags: [],
    categroy: [],
    queryParam: {},
    detail: {},
  },

  effects: {
    *fetchList({ payload }, { call, put}) {
      const response = yield call(queryArticleList, payload);
      if(!response) return;
      const {  data } = response;
      yield put({
        type: 'save',
        payload: data,
      })
      yield put({
        type: 'saveQuery',
        payload: payload,
      })
    },
    *fetchTags({ payload }, { call, put}) {
      const response = yield call(fetchTagList);
      if(!response) return;
      const { data } = response;
      yield put({
        type: 'saveTags',
        payload: data,
      })
    },
    *fetchCategroy({ payload }, { call, put }) {
      const response = yield call(fetchCateList);
      if(!response) return;      
      const { data } = response

      yield put({
        type: 'saveCate',
        payload: data,
      })
    },
    *deleteArticle({ payload: { deleteId, queryParam } , callback }, { call, put }) {
      const response = yield call(changeStatus, deleteId);
      if(!response) return;
      yield put({
        type: 'fetchList',
        payload: queryParam,
      })
    },
    *operate({ payload , callback}, { call, put }) {
      const response = yield call(operateArticle, payload);
      if(!response) return;
      const { data } = response;
      yield put({
        type: 'saveDetail',
        payload: data,
      })
      yield callback(data.id);
      message.success('修改成功')
    },
    *detailArticle({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      if(!response) return;
      const { data } = response;
      yield put({
        type: 'saveDetail',
        payload: data,
      })
    }

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      }
    },
    saveTags(state, action) {
      return {
        ...state,
        tags: action.payload,
      }
    },
    saveCate(state, action) {
      return {
        ...state,
        categroy: action.payload,
      }
    },
    saveQuery(state, action) {
      return {
        ...state,
        queryParam: action.payload
      }
    },
    saveDetail(state, action) {
      return {
        ...state,
        detail: action.payload,
      }
    },
  }
}