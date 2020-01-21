<template>
  <div class="Advertising">
    <el-button type="primary" size="small" @click="createGroup">新增广告规则</el-button>
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
        label="规则名称">
      </el-table-column>
      <el-table-column
        prop="c"
        label="赞助商">
      </el-table-column>
      <el-table-column
        prop="c"
        label="礼品">
      </el-table-column>
      <el-table-column
        prop="c"
        label="优先级">
      </el-table-column>
      <el-table-column
        prop="c"
        label="状态">
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
.Advertising{
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
export default class Advertising extends Vue {
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
