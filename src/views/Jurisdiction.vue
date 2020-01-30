<template>
  <div class="Jurisdiction">
    <h3>赞助商权限</h3>
    <div class="menuList" v-for="(item, index) in jurisdiction" :key="index">
      <label class="label">{{item.name}}</label>
      <el-radio-group v-model="item.isActive" @change="changeHanlder(item)">
        <el-radio-button :label="1">开启</el-radio-button>
        <el-radio-button :label="0">关闭</el-radio-button>
      </el-radio-group>
    </div>

  </div>
</template>

<style lang="less">
.Jurisdiction{
  padding: 20px;
  text-align: left;
  .menuList{
    width: 100%;
    .label{
      width: 100px;
      display: inline-block;
      font-size: 14px;
      line-height: 60px;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import net from '@/net/index';

@Component({
  components: {},
})
export default class UserList extends Vue {
  private searchValue = {
    size: 10,
    current: 0,
    roleId: '2',
  }
  private jurisdiction = [];
  private mounted() {
    this.getJurisdiction();
  }
  private changeHanlder(item: any) {
    const id = item.id;
    net.base.setSysRoleMenu(item.id, item.isActive).then((data: any) => {
      if (data.data.code === 200) {
        this.$message({
          message: '设置成功',
          type: 'success'
        });
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private getJurisdiction() {
    net.base.getSysRoleMenu(this.searchValue).then((data: any) => {
      if (data.data.code === 200) {
        this.jurisdiction = data.data.data.records;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
}
</script>
