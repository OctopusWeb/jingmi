<template>
  <div class="GetGoodsInfo">
    <el-form :inline="true" :model="searchValue" class="demo-form-inline">
      <el-form-item label="赞助商" v-if="getUserinfo.roleId === '1'">
        <el-select filterable clearable v-model="searchValue.sponsorId" placeholder="赞助商" size="small">
          <el-option v-for="(item, index) in merchantList" :key="index" 
          :label="item.aliasName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="赞助商品">
        <el-select filterable clearable v-model="searchValue.productId" placeholder="赞助商品" size="small">
          <el-option v-for="(item, index) in goodsAll" :key="index"
          :label="item.goodsName" :value="item.goodsId"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="投放城市">
        <el-select filterable v-model="searchValue.city" placeholder="投放城市" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投放路线">
        <el-select filterable v-model="searchValue.busRoute" placeholder="投放路线" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备">
        <el-select filterable v-model="searchValue.deviceNo" placeholder="设备" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="状态">
        <el-select filterable clearable v-model="searchValue.status" placeholder="状态" size="small">
          <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领取时间">
        <el-date-picker
          @change="changeHandler"
          v-model="time"
          size="small"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getGoodsList" size="small">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="goodsTable.records"
      stripe
      style="width: 100%">
      <el-table-column
        prop="aliasName"
        label="赞助商">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="赞助商品">
      </el-table-column>
      <el-table-column
        prop="city"
        label="投放城市">
      </el-table-column>
      <el-table-column
        prop="busRoute"
        label="投放路线">
      </el-table-column>
      <el-table-column
        prop="deviceNo"
        label="货格号">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号" width="150">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="领取人" width="150">
      </el-table-column>
      <el-table-column
        prop="deliveryTime"
        label="领取时间" width="150">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态" width="150">
        <template slot-scope="scope">
          {{statusList[scope.row.status].label}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="page"
      @current-change="currentChange"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="Number(goodsTable.total)">
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
import net from '@/net/index';

@Component({
  components: {},
})
export default class GetGoodsInfo extends Vue {
  private page = 0;
  private goodsAll = [];
  private statusList = [
    {value: 0, label: '未领取'},
    {value: 1, label: '成功'},
    {value: 2, label: '失败'},
  ];
  private time: any = [];
  private merchantList: any = [];
  private searchValue: any = {
    sponsorId: undefined,
    productId: undefined,
    city: undefined,
    deviceNo: undefined,
    status: undefined,
    deliveryTimeEnd: undefined,
    deliveryTimeStart: undefined,
    size: 10,
    current: 1,
  };
  private goodsTable = {
    total: 0,
    records: [],
  };
  get getUserinfo() {
    return this.$store.state.userInfo;
  }
  private mounted() {
    this.getGoodsList();
    this.getMerchant();
    this.getGoodsAll();
  }
  private currentChange(page: number) {
    this.searchValue.current = page;
    this.getGoodsList();
  }
  private changeHandler() {
    if (this.time && this.time[0]) {
      this.searchValue.deliveryTimeStart = this.format(this.time[0],'yyyy-MM-dd');
      this.searchValue.deliveryTimeEnd = this.format(this.time[1],'yyyy-MM-dd');
    } else {
      this.searchValue.deliveryTimeStart = undefined;
      this.searchValue.deliveryTimeEnd = undefined;
    }
  }
  private format(data: Date, fmt: string){
    const o: any = {
      'M+': data.getMonth()+1,
      'd+': data.getDate(),
      'H+': data.getHours(),
      'm+': data.getMinutes(),
      's+': data.getSeconds(),
      'S+': data.getMilliseconds()
    };
    if(/(y+)/.test(fmt)){
      fmt=fmt.replace(RegExp.$1,(data.getFullYear()+"").substr(4-RegExp.$1.length));
    }
    for(var k in o){
      if (new RegExp('(' + k +')').test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(String(o[k]).length)));
      }
    }
    return fmt;
  };
  private getGoodsList() {
    this.changeHandler();
    if (this.getUserinfo.roleId === '2') {
      this.searchValue.sponsorId = this.getUserinfo.sponsorId;
    }
    net.base.getGoodsList(this.searchValue).then((data: any) => {
      if (data.data.code === 200) {
        this.goodsTable = data.data.data;
      } else {
        this.$message.error(data.data.msg);
      }
    })
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
  private getGoodsAll() {
    net.base.getGoodsAll().then((data: any) => {
      if (data.data.code === 200) {
        this.goodsAll = data.data.data;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
}
</script>
