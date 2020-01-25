<template>
  <div class="GroupList">
     <el-dialog
      title="分组设置"
      class="dialog"
      :visible.sync="dialogGroup"
      width="450px">
      <el-form :inline="true" :model="createGroup" class="demo-form-inline">
        <el-form-item label="分组名称">
          <el-input v-model="createGroup.groupName"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="createGroup.remark"></el-input>
        </el-form-item>
        <el-form-item label="赞助商">
          <el-select clearable v-model="createGroup.sponsorId" placeholder="赞助商" size="small">
            <el-option v-for="(item, index) in merchantList" :key="index" 
            :label="item.aliasName" :value="item.id"></el-option>
          </el-select>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogGroup = false">取 消</el-button>
        <el-button type="primary" @click="addGroup">确 定</el-button>
      </span>
    </el-dialog>
    <el-form :inline="true" :model="searchValue" class="demo-form-inline">
      <el-form-item label="赞助商">
        <el-select clearable v-model="searchValue.sponsorId" placeholder="赞助商" size="small">
          <el-option v-for="(item, index) in merchantList" :key="index" 
          :label="item.aliasName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" size="small" @click="getGroupList">查询</el-button>
      <el-button type="primary" size="small" @click="createGroupHandler">新建分组</el-button>
    </el-form>
    <el-table
      :data="groupList.records"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号" width="100">
      </el-table-column>
      <el-table-column
        prop="groupName"
        label="分组名称">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
        <el-table-column
        prop="sponsorName"
        label="赞助商名称">
      </el-table-column>
      <el-table-column
        prop="c"
        label="操作" width="250">
        <template slot-scope="scope">
          <a @click="updataHandler(scope.row)">修改</a>
          <a @click="deletedHandler(scope.row.id)">删除</a>
          <a @click="settingHandler(scope.row)">推送营销短信</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="searchValue.current"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
</template>

<style lang="less">
.GroupList{
  padding: 20px;
  text-align: left;
  .dialog{
    label{
      width: 70px;
    }
    .el-input{
      width: 300px;
    }
  }
  .el-button{
    margin-top: 3px;
    margin-left: 10px;
  }
  a{
    color: #409EFF;
    cursor: pointer;
    margin-right: 10px;
  }
  .el-pagination{
    text-align: right;
    margin: 20px;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import net from '@/net/index';

@Component({
  components: {},
})
export default class GroupList extends Vue {
  private dialogGroup = false;
  private merchantList: any = [];
  private searchValue = {
    sponsorId: '',
    current: 0,
    size: 10,
  };
  private createGroup: any = {
    id: undefined,
    groupName: '',
    remark: '',
    sponsorId: '2',
    isDeleted: 0,
  }
  private groupList = {
    total: 0,
    records: [],
  };
  private mounted() {
    this.getGroupList();
    this.getMerchant();
  }
  private getMerchant() {
    net.base.getMerchant({size: 500, current: 0}).then((data: any) => {
      if (data.data.code === 200) {
        this.merchantList = data.data.data.records;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private getGroupList() {
    net.base.getGroup(this.searchValue).then((data: any) => {
      if (data.data.code === 200) {
        this.groupList = data.data.data;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private settingHandler(row: any){
    console.log(row)
  }
  private deletedHandler(id: number) {
    net.base.deletedGroup(id).then((data: any) => {
      if (data.data.code === 200) {
        this.getGroupList();
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private addGroup() {
    net.base.addGroup(this.createGroup).then((data: any) => {
      if (data.data.code === 200) {
        this.dialogGroup = false;
        this.getGroupList();
        this.$message({
          message: this.createGroup.id || this.createGroup.id !== '' ? '修改成功' : '添加成功',
          type: 'success'
        });
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private createGroupHandler() {
    this.createGroup = {
      id: undefined,
      groupName: '',
      remark: '',
      sponsorId: '',
      isDeleted: 0,
    }
    this.dialogGroup = true;
  }
  private updataHandler(row: any) {
    this.createGroup = row;
    this.dialogGroup = true;
  }
}
</script>
