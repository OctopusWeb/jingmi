<template>
  <div class="menu">
    <div class="logo">京米营销</div>
    <el-menu
      mode="vertical"
      background-color="#545c64"
      text-color="#fff"
      :default-active="active"
      @select="selectHandler"
      active-text-color="#ffd04b">
      <el-menu-item v-for="(item, index) in menuList" :key="index" :index="item.path">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="less">
.menu{
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  bottom: 0;
  background-color: rgb(84, 92, 100);
  .logo{
    width: 150px;
    margin: 25px;
    height: 30px;
    line-height: 30px;
    background: #ccc;
    border-radius: 2px;
  }
}
.el-menu{
  width: 200px;
  text-align: left;
}
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Menu extends Vue {
  private active = 'home';
  private menuList = [
    {name: '领取详情', path: 'getGoodsInfo', icon: 'el-icon-s-goods'},
    {name: '粉丝管理', path: 'fansList', icon: 'el-icon-star-on'},
    {name: '粉丝分组', path: 'groupList', icon: 'el-icon-s-grid'},
    {name: '短信营销', path: 'messageList', icon: 'el-icon-s-promotion'},
    {name: '赞助商管理', path: 'merchant', icon: 'el-icon-s-shop'},
    {name: '广告位管理', path: 'advertising', icon: 'el-icon-s-order'},
    {name: '用户管理', path: 'userList', icon: 'el-icon-s-custom'},
  ];
  private selectHandler(path: string) {
    this.$store.dispatch('setMenuName', path);
    const nowPath = this.$route.name;
    if (nowPath !== path) {
      this.$router.push({
        path,
      });
    }
  }
}
</script>
