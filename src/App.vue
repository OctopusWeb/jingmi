<template>
  <div id="app">
    <Menu/>
    <User/>
    <div class="wrap">
      <router-view/>
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

@Component({
  components: { Menu, User },
})
export default class App extends Vue {
  private mounted() {
    this.$store.dispatch('setMenuName', this.$route.name);
  }
}
</script>
