<template>
  <div class="GetGoodsInfo">
    <el-form :inline="true" :model="searchValue" class="demo-form-inline">
      <el-form-item label="赞助商">
        <el-select v-model="searchValue.sponsor" placeholder="赞助商" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="赞助商品">
        <el-select v-model="searchValue.goods" placeholder="赞助商品" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投放城市">
        <el-select v-model="searchValue.city" placeholder="投放城市" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投放路线">
        <el-select v-model="searchValue.city" placeholder="投放路线" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备">
        <el-select v-model="searchValue.city" placeholder="设备" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchValue.city" placeholder="状态" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投放时间">
        <el-date-picker
          size="small"
          v-model="searchValue.city"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="领取时间">
        <el-date-picker
          v-model="searchValue.city"
          size="small"
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
      <p>已投放:<span>2000</span>个</p>
      <p>已领取:<span>2000</span>个</p>
    </div>
    <el-table
      :data="goodsTable"
      stripe
      style="width: 100%">
      <el-table-column
        prop="a"
        label="赞助商">
      </el-table-column>
      <el-table-column
        prop="b"
        label="赞助商品">
      </el-table-column>
      <el-table-column
        prop="c"
        label="投放城市">
      </el-table-column>
      <el-table-column
        prop="d"
        label="投放路线">
      </el-table-column>
      <el-table-column
        prop="a"
        label="货格号">
      </el-table-column>
      <el-table-column
        prop="b"
        label="领取时间" width="250">
      </el-table-column>
      <el-table-column
        prop="c"
        label="领取人" width="250">
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
.GetGoodsInfo{
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
export default class GetGoodsInfo extends Vue {
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
}
</script>
