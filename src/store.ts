import Vue from 'vue';
import Vuex from 'vuex';
import { ActionContext } from 'vuex';

Vue.use(Vuex);

interface StateType {
  menuname: string;
}

export default new Vuex.Store({
  state: {
    menuname: 'home',
  },
  mutations: {
    SET_MENU_NAME(state: StateType, menuname: string) {
      state.menuname = menuname;
    },
  },
  actions: {
    setMenuName(context: ActionContext<StateType, any>, menuname: string) {
      context.commit('SET_MENU_NAME', menuname);
    },
  },
});
