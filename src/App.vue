<template>
  <div id="app">
    <div class="login" v-if="getUserInfo.type === -1">
      <div class="loginBox">
        <p>登录</p>
        <el-form ref="form" :model="loginInfo" label-width="80px">
          <el-form-item label="用户名称">
            <el-input v-model="loginInfo.username"></el-input>
          </el-form-item>
            <el-form-item label="密码">
            <el-input v-model="loginInfo.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginHandler">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-else>
      <Menu/>
      <User/>
      <div class="wrap">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style lang="less">
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.loginBox{
  width: 400px;
  height: 240px;
  padding: 20px;
  border: 1px #ccc solid;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -250px;
  .el-button{
    width: 100px;
    margin-left: -80px;
  }
}
.wrap{
  position: absolute;
  left: 200px;
  bottom: 0;
  top: 50px;
  right: 0;
}
</style>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/views/base/Menu.vue';
import User from '@/views/base/User.vue';
import net from '@/net/index';

@Component({
  components: { Menu, User },
})
export default class App extends Vue {
  private loginInfo = {
    username: localStorage.username,
    password: localStorage.password,
  }
  private mounted() {
    this.$store.dispatch('setMenuName', this.$route.name);
    if(this.loginInfo.username !== '' && this.loginInfo.password !== '') {
      this.login();
    }
  }
  private login() {
    net.base.login(this.loginInfo).then((data: any) => {
      if (data.data.code === 200) {
        const demo = {
          username: 'admin',
          type: 1,
        }
        this.$store.dispatch('setUserInfo', demo);
        window.localStorage["token"] = JSON.stringify(data.data.data);
        window.localStorage["username"] = this.loginInfo.username;
        window.localStorage["password"] = this.loginInfo.password;
        this.$message({
          message: '登陆成功',
          type: 'success'
        });
      } else {
        this.$message.error(data.data.msg);
      }
    })
  }
  get getUserInfo() {
    return this.$store.state.userInfo;
  }
  private loginHandler() {
    if(this.loginInfo.username !== '' && this.loginInfo.password !== '') {
      this.login();
    } else {
      this.$message.error('请完善信息');
    }
  }
}
</script>
