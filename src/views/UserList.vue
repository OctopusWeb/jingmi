<template>
  <div class="UserList">
    <el-dialog
      :title="userInfo.id ? '编辑用户' : '新建用户'"
      class="dialog"
      :visible.sync="dialogMessage"
      width="450px">
      <el-form :inline="true" :model="userInfo" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" placeholder="2-10位中英文"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userInfo.nickname" placeholder="2-10位英文"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input show-password v-model="userInfo.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="userInfo.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-radio-group v-model="userInfo.roleId">
            <el-radio label="1">管理员</el-radio>
            <el-radio label="2">赞助商</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="赞助商" v-if="userInfo.roleId !== '1'">
          <el-select filterable clearable v-model="userInfo.sponsorId" placeholder="赞助商" size="small">
          <el-option v-for="(item, index) in merchantList" :key="index" 
          :label="item.aliasName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMessage = false">取 消</el-button>
        <el-button type="primary" @click="addUserhandler">确 定</el-button>
      </span>
    </el-dialog>
    <el-button type="primary" size="small" @click="createUser">新增用户</el-button>
    <el-table
      :data="userList.records"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号" width="100">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="roleId"
        label="类型">
        <template slot-scope="scope">
          {{scope.row.roleId === '1' ? '管理员' : '赞助商'}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作" width="200">
        <template slot-scope="scope">
          <a @click="updateHandler(scope.row)">修改</a>
          <a @click="deletedHandler(scope.row)">删除</a>
          <!-- <a @click="updateHandler(scope.row)">详情</a> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="current"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="Number(userList.total)">
    </el-pagination>
  </div>
</template>

<style lang="less">
.UserList{
  padding: 20px;
  text-align: left;
  .goodsInfo{
    width: 100%;
    float: left;
    border-top: 1px #ccc solid;
    p{
      float: left;
      font-size: 12px;
      margin-right: 20px;
      span{
        color: #5cb87a;
      }
    }
  }
  .dialog{
    label{
      width: 70px;
    }
    .el-input, .el-textarea{
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
export default class UserList extends Vue {
  private dialogMessage = false;
  private merchantList: any = [];
  private current = 0;
  private userList = {
    records: [],
    total: 0,
  };
  private userInfo: any = {
    id: undefined,
    nickname: '',
    password: '',
    remark: '',
    username: '',
    roleId: '1',
  };
  private searchValue = {
    name: '',
  };
  private mounted() {
    this.getUserList();
    this.getMerchant();
  }
  private getUserList() {
    net.base.getUserList({size: 10, current: this.current}).then((data: any) => {
      if (data.data.code === 200) {
        this.userList = data.data.data;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private deletedHandler(row: any) {
    net.base.deletedUser(row.id).then((data: any) => {
      if (data.data.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success',
          });
          this.getUserList();
        } else {
          this.$message.error(data.data.msg);
        }
    });
  }
  // private userInfoHandler(row: any) {
  //   net.base.userInfo(row.id).then((data: any) => {
  //     if (data.data.code === 200) {
  //     } else {
  //       this.$message.error(data.data.msg);
  //     }
  //   });
  // }
  private updateHandler(row: any) {
    this.dialogMessage = true;
    this.userInfo = row;
  }
  private createUser() {
    this.dialogMessage = true;
    this.userInfo = {
      id: undefined,
      nickname: '',
      password: '',
      remark: '',
      username: '',
      roleId: '1',
      sponsorId: '',
    };
  }
  private addUserhandler() {
    if (this.userInfo.nickname && this.userInfo.nickname.length >= 2 &&
    this.userInfo.password && this.userInfo.password.length >= 2 &&
    this.userInfo.username && this.userInfo.username.length >= 2
    ) {
      net.base.addUser(this.userInfo).then((data: any) => {
        if (data.data.code === 200) {
          this.$message({
            message: this.userInfo.id || this.userInfo.id !== '' ? '修改成功' : '添加成功',
            type: 'success',
          });
          this.dialogMessage = false;
          this.getUserList();
        } else {
          this.$message.error(data.data.msg);
        }
      });
    } else {
      this.$message.error('请完善信息');
    }
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
}
</script>
