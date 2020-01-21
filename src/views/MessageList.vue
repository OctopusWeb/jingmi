<template>
  <div class="MessageList">
    <el-dialog
      title="新建推送"
      class="dialog"
      :visible.sync="dialogMessage"
      width="450px">
      <el-form :inline="true" :model="searchValue" class="demo-form-inline">
        <el-form-item label="推送类型">
          <el-radio-group v-model="searchValue.name">
            <el-radio label="及时推送"></el-radio>
            <el-radio label="定时推送"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="推送时间">
          <el-date-picker
            v-model="searchValue.name"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="推送对象">
          <el-radio-group v-model="searchValue.name">
            <el-radio label="个人"></el-radio>
            <el-radio label="组"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="对象选择">
          <el-select v-model="searchValue.name" placeholder="设备" size="small">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推送内容">
          <el-input type="textarea" v-model="searchValue.name"></el-input>
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
      <el-button type="primary" size="small" @click="createGroup">新增推送任务</el-button>
    </el-form>
    <div class="goodsInfo">
      <p>全部:<span>2000</span>个</p>
      <p>成功:<span>2000</span>个</p>
      <p>失败:<span>2000</span>个</p>
      <p>待推送:<span>2000</span>个</p>
    </div>
    <el-table
      :data="goodsTable"
      stripe
      style="width: 100%">
      <el-table-column
        prop="a"
        label="短信流水号">
      </el-table-column>
      <el-table-column
        prop="b"
        label="推送类型">
      </el-table-column>
      <el-table-column
        prop="c"
        label="推送对象(用户/分组)">
      </el-table-column>
      <el-table-column
        prop="c"
        label="推送时间">
      </el-table-column>
      <el-table-column
        prop="c"
        label="推送内容">
      </el-table-column>
       <el-table-column
        prop="c"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="c"
        label="操作" width="250">
        <template slot-scope="scope">
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
.MessageList{
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
export default class MessageList extends Vue {
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
