<template>
  <div class="FansList">
    <el-dialog
      title="礼品详细信息"
      class="dialog"
      :visible.sync="showGoodsInfo"
      width="30%">
      <div class="row">
        <p>名称:</p><span>{{goodsinfo.productName}}</span>
      </div>
      <!-- <div class="row">
        <p>数量:</p><span>{{goodsinfo.productCount}}</span>
      </div> -->
      <div class="row">
        <p>添加时间:</p><span>{{goodsinfo.gmtCreate}}</span>
      </div>
      <div class="row">
        <p>图片:</p><span><img class="goodInfo" :src="goodsinfo.productImage" alt=""></span>
      </div>
    </el-dialog>
    <el-dialog
      title="详细信息"
      class="dialog"
      :visible.sync="showInfo"
      width="30%">
      <div class="row">
        <p>赞助商:</p><span>{{info.aliasName}}</span>
      </div>
      <div class="row">
        <p>分组名:</p><span>{{info.groupName}}</span>
      </div>
      <div class="row">
        <p>昵称:</p><span>{{info.nickname}}</span>
      </div>
      <div class="row">
        <p>手机号:</p><span>{{info.phone}}</span>
      </div>
      <div class="row">
        <p>性别:</p><span>{{info.sex == 1 ? '男' : '女'}}</span>
      </div>
      <div class="row">
        <p>地址:</p><span>{{info.country + info.province + info.city}}</span>
      </div>
      <div class="row">
        <p>礼品:</p><span>{{info.productName}}</span>
      </div>
      <div class="row">
        <p>时间:</p><span>{{info.deliveryTime}}</span>
      </div>
      <div class="row">
        <p>领取详情:</p><a @click="subscriberIdHandler">点击查看</a>
      </div>
    </el-dialog>
    <el-dialog
      title="更改分组"
      class="dialog"
      :visible.sync="dialogGroup"
      width="30%">
        <el-select filterable clearable v-model="changeGroupObj.groupId" placeholder="分组" size="small">
          <el-option  v-for="(item, index) in groupList" :key="index"
           :label="item.groupName" :value="item.id"></el-option>
        </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogGroup = false">取 消</el-button>
        <el-button type="primary" @click="changeGroup">确 定</el-button>
      </span>
    </el-dialog>
    <el-form :inline="true" :model="searchValue" class="demo-form-inline">
      <el-form-item label="赞助商" v-if="this.getUserinfo.roleId === '1'">
        <el-select filterable @change="sponsorHandler" clearable v-model="searchValue.sponsorId" placeholder="赞助商" size="small">
          <el-option v-for="(item, index) in merchantList" :key="index" 
          :label="item.aliasName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="城市">
        <el-select filterable clearable v-model="searchValue.city" placeholder="城市" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="性别">
        <el-select filterable clearable v-model="searchValue.sex" placeholder="性别" size="small">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="searchValue.nickname" placeholder="昵称" size="small"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchValue.phone" placeholder="手机号" size="small"></el-input>
      </el-form-item>
      <el-form-item label="分组">
        <el-select filterable clearable v-model="searchValue.groupId" placeholder="分组" size="small">
          <el-option  v-for="(item, index) in groupAllList" :key="index"
           :label="item.groupName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领取时间">
        <el-date-picker
          @change="changeHandler"
          size="small"
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandler" size="small">查询</el-button>
        <el-button type="primary" @click="groupHandler" size="small">{{isGroup ? '更改' : '批量设置'}}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="fanList.records"
      @selection-change="handleSelectionChange"
      stripe
      style="width: 100%">
      <el-table-column
        v-if="isGroup"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        label="头像" width="80">
        <template slot-scope="scope">
          <img class="head" :src="scope.row.headimgUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号" width="110">
      </el-table-column>
      <el-table-column
        prop="aliasName"
        label="赞助商">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别" width="50">
        <template slot-scope="scope">
          <span>{{scope.row.sex == 1 ? '男' : '女'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="city"
        label="城市">
      </el-table-column>
      <el-table-column
        prop="groupId"
        label="分组" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.groupName || '未分组'}}</span>
          <a v-if="!isGroup" style="margin-left: 10px" @click="changeGroupHanlder(scope.row)">更改</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="productName"
        label="领取礼品" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.productName}}</span>
          <a style="margin-left: 10px" @click="productNameHandler(scope.row)">详情</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="deliveryTime"
        label="领取时间"  width="150">
      </el-table-column>
      <el-table-column
        label="操作" width="170">
        <template slot-scope="scope">
          <a @click="settingHandler(scope.row)">推送营销短信</a>
          <a @click="infoHandler(scope.row)">详情</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="page"
      @current-change="currentChange"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="Number(fanList.total)">
    </el-pagination>
  </div>
</template>

<style lang="less">
.FansList{
  padding: 20px;
  text-align: left;
  .head{
    width: 50px;
    height: 50px;
  }
  .dialog{
    .el-select{
      width: 100%;
    }
    .row{
      line-height: 24px;
    }
    p{
      display: inline-block;
      margin-right: 10px;
      width: 75px;
      text-align: right;
    }
    span{
      max-width: 100%;
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
  .goodInfo{
    max-width: 200px;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import net from '@/net/index';

@Component({
  components: {},
})
export default class FansList extends Vue {
  private page = 0;
  private time = [];
  private isGroup = false;
  private merchantList: any = [];
  private dialogGroup = false;
  private showInfo = false;
  private showGoodsInfo = false;
  private goodsinfo = {};
  private info: any = {};
  private groupList = [];
  private ids: any = [];
  private changeGroupObj: any = {};
  private searchValue: any = {
    sponsorId: undefined,
    city: undefined,
    sex: undefined,
    nickname: undefined,
    phone: undefined,
    groupId: undefined,
    deliveryTimeStart: '',
    deliveryTimeEnd: '',
    size: 10,
    current: 0,
  };
  private groupAllList: any = []
  private fanList = {
    total: 0,
    records: [],
  };
  private mounted() {
    this.getFanList();
    this.getMerchant();
    this.getAllGroupList();
  }
  get getUserinfo() {
    return this.$store.state.userInfo;
  }
  private groupHandler() {
    if (!this.isGroup || this.ids === []) {
      this.isGroup = true;
      this.ids = [];
    } else {
      let sponsorId = this.ids[0].sponsorId;
      let idList: any = [];
      const isOnesponsorId = this.ids.every((item: any) => {
        idList.push(item.subscriberId);
        return item.sponsorId === sponsorId;
      })
      if (isOnesponsorId) {
        this.changeGroupObj = {
          groupId: this.ids[0].groupId,
          sponsorId: this.ids[0].sponsorId,
          subscriberIds: idList,
        }
      } else {
        this.$message.error('请选择相同赞助商');
      }
      this.getGroupList(sponsorId);
      // this.getGroupList();
    }
  }
  private sponsorHandler(value: number) {
    console.log(value);
  }
  private handleSelectionChange(rowlist: any[]) {
    this.ids = rowlist;
  }
  private productNameHandler(row: any) {
    net.base.getsponsorProductInfo({id: row.productId}).then((data: any) => {
      if (data.data.code === 200) {
        this.goodsinfo = data.data.data;
        this.showGoodsInfo = true;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private currentChange(page: number) {
    this.searchValue.current = page;
    this.getFanList();
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
  private subscriberIdHandler() {
    this.$router.push({
      name: 'getGoodsInfo',
      query: {sponsorId: this.info.sponsorId, subscriberId: this.info.subscriberId},
    });
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
  private searchHandler(){
    this.getFanList();
  }
  private getFanList() {
    this.changeHandler();
    if (this.getUserinfo.roleId === '2') {
      this.searchValue.sponsorId = this.getUserinfo.sponsorId;
    }
    net.base.getFanList(this.searchValue).then((data: any) => {
      if (data.data.code === 200) {
        this.fanList = data.data.data;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private settingHandler(row: any){
    this.$router.push({
      name: 'messageList',
      query: {id: row.subscriberId, type: '0'},
    })
  }
  private infoHandler(row: any) {
    this.showInfo = true;
    this.info = row;
  }
  private changeGroupHanlder(row: any) {
    this.changeGroupObj = row;
    this.getGroupList();
  }
  private changeGroup() {
    this.dialogGroup = false;
    const data: any = {
      groupId: this.changeGroupObj.groupId,
      sponsorId: this.changeGroupObj.sponsorId,
    };
    if (this.changeGroupObj.subscriberIds) {
      data.subscriberIds = this.changeGroupObj.subscriberIds;
    } else {
      data.subscriberId = this.changeGroupObj.subscriberId;
    }
    net.base.updateGroup(data).then((data: any) => {
      if (data.data.code === 200) {
        this.getFanList();
        this.isGroup = false;
      } else {
        this.$message.error(data.data.msg);
      }
    });
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
  private getValueByObj(id: number) {
    return this.groupList.filter((item: any) => {
      return item.id === id;
    })
  }
  private getGroupList(sponsorId ?: any) {
    const data: any = {size: 500, current: 0};
    data.sponsorId = sponsorId || this.changeGroupObj.sponsorId;
    net.base.getGroup(data).then((data: any) => {
      if (data.data.code === 200) {
        this.dialogGroup = true;
        this.groupList = data.data.data.records;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private getAllGroupList(sponsorId ?: any) {
    const data: any = {size: 500, current: 0};
    if (this.getUserinfo.sponsorId !== '-1') {
      data.sponsorId = this.getUserinfo.sponsorId;
    }
    net.base.getGroup(data).then((data: any) => {
      if (data.data.code === 200) {
        this.groupAllList = data.data.data.records;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
}
</script>
