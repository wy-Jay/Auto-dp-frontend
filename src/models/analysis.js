import { getProjectList, setDeployJar, setDeployProject, getOutInfo } from '../services/api';

export default {
  namespace: 'analysis',

  state: {
    projectList: [
      {
          "branchList":[
              "v1.0",
              "v2.0",
              "v3.0"
          ],
          "ipList":[
              "172.12.33.42",
              "172.12.33.43",
              "172.12.33.44"
          ],
          "projectId":1,
          "projectName":"ywwl-channel-owner"
      },
      {
          "branchList":[
              "v3.2",
              "v3.3",
              "v3.4"
          ],
          "ipList":[
              "172.12.33.206",
              "172.12.33.207",
              "172.12.33.208"
          ],
          "projectId":2,
          "projectName":"ywwl-channel-owner-oper"
      }
    ],
    outInfo: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getProjectList);
      yield put({
        type: 'setList',
        payload: response,
      });
    },
    *deployJar(_, { call, put }) {
      const response = yield call(setDeployJar);
      yield put({
        type: 'setList',
        payload: response,
      });
    },
    *deployProject(_, { call, put }) {
      const response = yield call(setDeployProject);
    },
    *fetchOutInfo(_, { call, put }) {
      const response = yield call(getOutInfo);
      yield put({
        type: 'setOutInfo',
        payload: response,
      });
    },
  },

  reducers: {
    setList(state, { payload }) {
        return {
          ...state,
          ...payload,
        }
    },
    setOutInfo (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
  },
  },
};
