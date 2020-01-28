<template>
  <div class="Merchant">
    <el-dialog
      title="赞助商品"
      class="dialog2"
      :visible.sync="createGoods"
      width="400px">
      <el-form :inline="true" :model="createGoodsValue" style="margin-bottom: -50px">
        <el-form-item label="赞助商家">
          <el-select clearable v-model="createGoodsValue.goodsid" placeholder="赞助商品" size="small">
            <el-option v-for="(item, index) in goodsAll" :key="index"
            :label="item.goodsName" :value="item.goodsId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="赞助数量">
          <el-input-number size="mini" v-model="createGoodsValue.productCount"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="createGoodsValueHanlder">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="赞助商品"
      class="dialog2"
      :visible.sync="goodsInfo"
      width="50%">
      <el-button type="primary" size="small" @click="createGoodsHandler">添加商品</el-button>
      <template>
        <el-table
          :data="this.goodsList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="id"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="productImage"
            label="图片">
            <template slot-scope="scope">
              <img style="height: 100px" :src="scope.row.productImage">
            </template>
          </el-table-column>
          <el-table-column
            prop="productName"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="productCount"
            label="数量"
            width="100">
          </el-table-column>
          <el-table-column
        label="操作" width="100">
        <template slot-scope="scope">
          <a @click="goodsUpdateHandler(scope.row)">修改</a>
        </template>
      </el-table-column>
        </el-table>
      </template>
    </el-dialog>
    <el-dialog
      title="详细信息"
      class="dialog2"
      :visible.sync="showInfo"
      width="30%">
      <div class="row">
        <p>序号:</p><span>{{info.id}}</span>
      </div>
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
        <p>性别:</p><span>{{info.sex === 1 ? '男' : '女'}}</span>
      </div>
      <div class="row">
        <p>国家:</p><span>{{info.country}}</span>
      </div>
      <div class="row">
        <p>省:</p><span>{{info.province}}</span>
      </div>
      <div class="row">
        <p>市:</p><span>{{info.city}}</span>
      </div>
      <div class="row">
        <p>礼品:</p><span>{{info.productName}}</span>
      </div>
      <div class="row">
        <p>时间:</p><span>{{info.deliveryTime}}</span>
      </div>
    </el-dialog>
    <el-dialog
      title="商户"
      class="dialog"
      :visible.sync="dialogMessage"
      width="500px">
      <el-form :inline="true" :model="createValue" class="demo-form-inline">
        <el-form-item label="赞助商">
          <el-input v-model="createValue.aliasName"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="createValue.companyName"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="createValue.contactName"></el-input>
        </el-form-item>
        <el-form-item label="联系手机">
          <el-input v-model="createValue.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <v-distpicker v-if="dialogMessage" :placeholders="placeholders" @province="province" @city="city" @area="area"></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="createValue.companyAddress"></el-input>
        </el-form-item>
        <el-form-item label="二维码">
          <el-upload
            action="/upload/img"
            :headers="headers"
            :on-success="successHandler"
            :limit="1"
            :file-list="fileList"
            list-type="picture-card">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMessage = false">取 消</el-button>
        <el-button type="primary" @click="addMerchant">确 定</el-button>
      </span>
    </el-dialog>
    <el-form :inline="true" :model="searchValue" class="demo-form-inline">
      <el-form-item label="赞助商">
        <el-input v-model="searchValue.aliasName" size="small"></el-input>
      </el-form-item>
      <el-button type="primary" size="small" @click="getMerchant">查询</el-button>
      <el-button type="primary" size="small" @click="createGroup">新增商户</el-button>
    </el-form>
    <el-table
      :data="merchantList.records"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号" width="100">
      </el-table-column>
      <el-table-column
        prop="aliasName"
        label="赞助商简称">
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="contactPhone"
        label="联系手机号" width="150">
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="入驻时间" width="200">
      </el-table-column>
       <el-table-column
        prop="c"
        label="赞助商品" width="100">
        <template slot-scope="scope">
          <a @click="settingHandler(scope.row.id)">编辑</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="c"
        label="操作" width="250">
        <template slot-scope="scope">
          <a @click="updateHandler(scope.row)">修改</a>
          <a @click="deletedHandler(scope.row)">删除</a>
          <!-- <a @click="infoHandler(scope.row)">查看详情</a> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="page"
      @current-change="currentChange"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="Number(merchantList.total)">
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
  .dialog2{
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
import VDistpicker from 'v-distpicker'
import net from '@/net/index';
import {getToken} from "@/net/common";

@Component({
  components: { VDistpicker },
})
export default class Merchant extends Vue {
  private page = 0;
  private dialogMessage = false;
  private merchantList2: any = [];
  private showInfo = false;
  private goodsInfo = false;
  private createGoods = false;
  private fileList: any = [];
  private createGoodsValue: any = {
    goodsid: undefined,
    productCount: undefined,
  };
  private selectedId = '';
  private info = {};
  private goodsAll = [];
  private merchantList = {
    total: 0,
    records: [],
  };
  private goodsList = [];
  private createValue: any = {
    aliasName: '',
    companyName: '',
    contactName: '',
    contactPhone: '',
    companyProvince: '',
    companyCity: '',
    companyDistrict: '',
    companyAddress: '',
    isDeleted: 0,
    companyQrcodeUrl: '',
  }
  private searchValue = {
    aliasName: '',
    size: 10,
    current: 0,
  };
  private headers = {
    token: getToken(),
  }
  private placeholders = {
    province: '',
    city: '',
    area: '',
  }
  private mounted() {
    this.getMerchant();
    this.getMerchant2();
    this.getGoodsAll();
  }
  private currentChange(page: number) {
    this.searchValue.current = page - 1;
    this.getMerchant();
  }
  private successHandler(result: any) {
    this.createValue.companyQrcodeUrl = result.data;
  }
  private createGoodsValueHanlder() {
    let create: any;
    this.goodsAll.forEach((item: any) => {
      if (item.goodsId === this.createGoodsValue.goodsid) {
        create = item;
      }
    });
    const data = {
      goodsId: create.goodsId,
      productCount: this.createGoodsValue.productCount,
      productImage: create.goodsPic,
      productName: create.goodsName,
      sponsorId: this.selectedId,
      id : this.createGoodsValue.id,
    }
    net.base.addSponsorProduct(data).then((data: any) => {
      if (data.data.code === 200) {
        this.settingHandler(this.selectedId);
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.createGoods = false;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private goodsUpdateHandler(row: any) {
    this.createGoods = true;
    this.createGoodsValue = {
      goodsid: row.goodsId,
      productCount: row.productCount,
      id: row.id,
    };
  }
  private province(companyProvince: any) {
    this.createValue.companyProvince = companyProvince.value;
  }
  private city(companyCity: any) {
    this.createValue.companyCity = companyCity.value;
  }
  private area(companyDistrict: any) {
    this.createValue.companyDistrict = companyDistrict.value;
  }
  private addMerchant() {
    net.base.addMerchant(this.createValue).then((data: any) => {
      if (data.data.code === 200) {
        this.getMerchant();
        this.dialogMessage = false;
        this.$message({
          message: this.createValue.id || this.createValue.id !== '' ? '修改成功' : '添加成功',
          // message: '添加成功',
          type: 'success'
        });
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private getMerchant() {
    net.base.getMerchant(this.searchValue).then((data: any) => {
      if (data.data.code === 200) {
        this.merchantList = data.data.data;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private createGoodsHandler() {
    this.createGoods = true;
    this.createGoodsValue = {
      goodsid: undefined,
      productCount: undefined,
    };
  }
  private getMerchant2() {
    net.base.getMerchant({size: 500, current: 0}).then((data: any) => {
      if (data.data.code === 200) {
        this.merchantList2 = data.data.data.records;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private settingHandler(id: any){
    this.goodsInfo = true;
    this.selectedId = id;
    net.base.getSponsorProduct({size: 500, current: 0, sponsorId: id}).then((data: any) => {
      if (data.data.code === 200) {
        this.goodsList = data.data.data.records;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private infoHandler(row: any) {
    this.showInfo = true;
    this.info = row;
  }
  private updateHandler(row: any) {
    this.createValue = row;
    if (this.createValue.companyQrcodeUrl && this.createValue.companyQrcodeUrl !== '') {
      this.fileList = [{
        name: this.createValue.companyQrcodeUrl,
        url: 'http://msbox.oss-cn-beijing.aliyuncs.com/' + this.createValue.companyQrcodeUrl,
      }];
    } else {
      this.fileList = [];
    }
    this.placeholders = {
      province: row.companyProvince,
      city: row.companyCity,
      area: row.companyDistrict,
    }
    this.dialogMessage = true;
  }
  private deletedHandler(id: number) {
    net.base.deletedMerchant(id).then((data: any) => {
      if (data.data.code === 200) {
        this.getMerchant();
        this.$message({
          message: '删除成功',
          type: 'success'
        });
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
  private createGroup() {
    this.createValue = {
      aliasName: '',
      companyName: '',
      contactName: '',
      contactPhone: '',
      companyProvince: '',
      companyCity: '',
      companyDistrict: '',
      companyAddress: '',
      isDeleted: 0,
    }
    this.placeholders = {
      province: '',
      city: '',
      area: '',
    }
    this.dialogMessage = true;
  }
}
</script>
