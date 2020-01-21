import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import GetGoodsInfo from './views/GetGoodsInfo.vue';
import FansList from './views/FansList.vue';
import GroupList from './views/GroupList.vue';
import MessageList from './views/MessageList.vue';
import Merchant from './views/Merchant.vue';
import Advertising from './views/Advertising.vue';
import UserList from './views/UserList.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/getGoodsInfo',
      name: 'getGoodsInfo',
      component: GetGoodsInfo,
    },
    {
      path: '/fansList',
      name: 'fansList',
      component: FansList,
    },
    {
      path: '/groupList',
      name: 'groupList',
      component: GroupList,
    },
    {
      path: '/messageList',
      name: 'messageList',
      component: MessageList,
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: Merchant,
    },
    {
      path: '/advertising',
      name: 'advertising',
      component: Advertising,
    },
    {
      path: '/userList',
      name: 'userList',
      component: UserList,
    },
  ],
});
