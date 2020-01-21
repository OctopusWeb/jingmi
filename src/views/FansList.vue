<template>
  <div class="FansList">
    <el-dialog
      title="更改分组"
      class="dialog"
      :visible.sync="dialogGroup"
      width="30%">
        <el-select v-model="searchValue.sponsor" placeholder="赞助商" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogGroup = false">取 消</el-button>
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
      <el-form-item label="城市">
        <el-select v-model="searchValue.city" placeholder="城市" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="searchValue.city" placeholder="性别" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="searchValue.city" placeholder="昵称" size="small"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchValue.city" placeholder="手机号" size="small"></el-input>
      </el-form-item>
      <el-form-item label="分组">
        <el-select v-model="searchValue.city" placeholder="分组" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领取时间">
        <el-date-picker
          size="small"
          v-model="searchValue.city"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandler" size="small">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="goodsInfo">
      <p>全部:<span>2000</span>个</p>
      <p>男性:<span>2000</span>个</p>
      <p>女性:<span>2000</span>个</p>
    </div>
    <el-table
      :data="goodsTable"
      stripe
      style="width: 100%">
      <el-table-column
        prop="a"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="b"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="c"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="d"
        label="城市">
      </el-table-column>
      <el-table-column
        prop="a"
        label="分组">
        <template slot-scope="scope">
          <span>{{scope.row.a}}</span>
          <a @click="changeGroupHanlder(scope.row)">更改</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="c"
        label="领取礼品" width="250"/>
      <el-table-column
        prop="c"
        label="操作" width="250">
        <template slot-scope="scope">
          <a @click="settingHandler(scope.row)">推送营销短信</a>
          <a @click="settingHandler(scope.row)">详情</a>
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
.FansList{
  padding: 20px;
  text-align: left;
  .dialog{
    .el-select{
      width: 100%;
    }
  }
  a{
    color: #409EFF;
    cursor: pointer;
    margin-right: 10px;
  }
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
export default class FansList extends Vue {
  private dialogGroup = false;
  private page = 0;
  private searchValue = {
    sponsor: '',
    goods: '',
    city: '',
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
  private changeGroupHanlder(row: any) {
    console.log(row);
    this.dialogGroup = true;
  }
  private changeGroup() {
    this.dialogGroup = false;
    console.log('change');
  }
}
</script>
