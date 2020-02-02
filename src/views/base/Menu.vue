<template>
  <div class="menu">
    <div class="logo">京米营销</div>
    <div v-show="false">{{getUserinfo}}</div>
    <el-menu
      mode="vertical"
      background-color="#545c64"
      text-color="#fff"
      :default-active="active"
      @select="selectHandler"
      active-text-color="#ffd04b">
      <el-menu-item v-for="(item, index) in isShowList" 
      :key="index" :index="item.path">
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
    {name: '广告位管理', path: 'advertising', icon: 'el-icon-s-order'},
    {name: '赞助商管理', path: 'merchant', icon: 'el-icon-s-shop'},
    {name: '用户管理', path: 'userList', icon: 'el-icon-s-custom'},
    {name: '权限管理', path: 'jurisdiction', icon: 'el-icon-menu'},
  ];
  private iconList: any = {
    getGoodsInfo: 'el-icon-s-goods',
    fansList: 'el-icon-star-on',
    groupList: 'el-icon-s-goods',
    messageList: 'el-icon-s-promotion',
    advertising: 'el-icon-s-order',
    merchant: 'el-icon-s-shop',
    userList: 'el-icon-s-custom',
    jurisdiction: 'el-icon-menu',
  };
  private isShowList: any = [];
  get getUserinfo() {
    const userinfo = this.$store.state.userInfo;

    userinfo.privileges.forEach((item: any) => {
      const path = item.url.substring(1);
      this.isShowList.push({
        name: item.name,
        path,
        icon: this.iconList[path] || 'el-icon-s-tools',
      });
    });
    return userinfo;
  }
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
