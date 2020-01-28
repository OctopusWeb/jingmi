<template>
  <div class="user">
    <p class="title">{{menuList[menuname]}}</p>
    <div class="userInfo">
      <i class="el-icon-s-custom"></i>
      <p class="userName">{{userinfo.nickname}}</p>
      <span @click="logout">退出</span>
    </div>
  </div>
</template>

<style lang="less">
.user{
  height: 50px;
  line-height: 50px;
  position: absolute;
  left: 200px;
  top: 0;
  right: 0;
  border-bottom: 1px #ccc solid;
  text-align: left;
  padding: 0 20px;
  .title{
    margin: 0;
    padding: 0;
    font-size: 16px;
    display: inline;
  }
  .userInfo{
    position: relative;
    float: right;
    cursor: pointer;
    width: 150px;
    p,i{
      display: inline-block;
      line-height: 50px;
      margin: 0;
      padding: 0;
      margin-right: 10px;
      font-size: 16px;
    }
    .el-icon-s-custom{
      border: 1px #000 solid;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      cursor: pointer;
    }
    span{
    //   position: absolute;
    //   display: none;
    //   left: 0;
    //   top: 40px;
    //   width: 100px;
    //   height: 30px;
    //   background: #545c64;
    //   color: #fff;
      font-size: 12px;
      color: #409EFF;
    //   line-height: 30px;
    //   text-align: center;
    }
  }
  // .userInfo:hover{
  //   span{
  //     display: block;
  //   }
  // }
}
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import net from '@/net/index';

@Component({
  components: {},
})
export default class User extends Vue {
  private menuList: any = {
    getGoodsInfo: '领取详情',
    fansList: '粉丝管理',
    groupList: '粉丝分组',
    messageList: '短信营销',
    merchant: '商户管理',
    advertising: '广告位管理',
    userList: '用户管理',
  };
  get menuname() {
    return this.$store.state.menuname;
  }
  get userinfo() {
    return this.$store.state.userInfo;
  }
  private logout() {
    net.base.logout().then((data: any) => {
      if (data.data.code === 200) {
        this.$store.dispatch('setUserInfo', {type: -1});
        window.localStorage["username"] = '';
        window.localStorage["password"] = '';
        window.localStorage["token"] = '';
      } else {
        this.$message.error(data.data.msg);
      }
    })
  }
}
</script>
