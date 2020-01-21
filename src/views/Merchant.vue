<template>
  <div class="Merchant">
    <el-dialog
      title="新建推送"
      class="dialog"
      :visible.sync="dialogMessage"
      width="450px">
      <el-form :inline="true" :model="searchValue" class="demo-form-inline">
        <el-form-item label="赞助商">
          <el-input v-model="searchValue.name"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="searchValue.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="searchValue.name"></el-input>
        </el-form-item>
        <el-form-item label="联系手机">
          <el-input v-model="searchValue.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMessage = false">取 消</el-button>
        <el-button type="primary" @click="changeGroup">确 定</el-button>
      </span>
    </el-dialog>
    <el-form :inline="true" :model="searchValue" class="demo-form-inline">
      <el-form-item label="赞助商">
        <el-select v-model="searchValue.sponsor" placeholder="赞助商" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" size="small" @click="createGroup">新增商户</el-button>
    </el-form>
    <el-table
      :data="goodsTable"
      stripe
      style="width: 100%">
      <el-table-column
        prop="a"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="b"
        label="赞助商简称">
      </el-table-column>
      <el-table-column
        prop="c"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="c"
        label="联系手机号">
      </el-table-column>
      <el-table-column
        prop="c"
        label="入驻时间">
      </el-table-column>
      <el-table-column
        prop="c"
        label="操作" width="250">
        <template slot-scope="scope">
          <a @click="settingHandler(scope.row)">修改</a>
          <a @click="settingHandler(scope.row)">删除</a>
          <a @click="settingHandler(scope.row)">查看详情</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
</template>

<style lang="less">
.Merchant{
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

@Component({
  components: {},
})
export default class Merchant extends Vue {
  private dialogMessage = false;
  private page = 0;
  private searchValue = {
    name: '',
  };
  private goodsTable = [{
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
  }];
  private searchHandler(){
    console.log(this.searchValue);
  }
  private handleCurrentChange(page: number) {
    console.log(page);
  }
  private settingHandler(row: any){
    console.log(row)
  }
  private changeGroup() {
    this.dialogMessage = false;
  }
  private createGroup() {
    this.dialogMessage = true;
  }
}
</script>
