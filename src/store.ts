import Vue from 'vue';
import Vuex from 'vuex';
import { ActionContext } from 'vuex';

Vue.use(Vuex);

interface StateType {
  menuname: string;
  userInfo: UserInfoType;
}
interface UserInfoType {
  username: string;
  type: number;
}

export default new Vuex.Store({
  state: {
    menuname: 'home',
    userInfo: {type: -1},
  },
  mutations: {
    SET_MENU_NAME(state: StateType, menuname: string) {
      state.menuname = menuname;
    },
    SET_USER_INFO(state: StateType, userInfo: UserInfoType) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    setMenuName(context: ActionContext<StateType, any>, menuname: string) {
      context.commit('SET_MENU_NAME', menuname);
    },
    setUserInfo(context: ActionContext<StateType, any>, userInfo: UserInfoType) {
      context.commit('SET_USER_INFO', userInfo);
    },
  },
});
