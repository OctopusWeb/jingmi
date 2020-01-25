<template>
  <div class="Merchant">
    <el-dialog
      title="新建推送"
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
          <v-distpicker @province="province" @city="city" @area="area"></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="createValue.companyAddress"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMessage = false">取 消</el-button>
        <el-button type="primary" @click="addMerchant">确 定</el-button>
      </span>
    </el-dialog>
    <el-form :inline="true" :model="searchValue" class="demo-form-inline">
      <el-form-item label="赞助商">
        <el-input v-model="searchValue.keyword" placeholder="输入赞助商名称"></el-input>
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
          <a @click="settingHandler(scope.row)">查看</a>
        </template>
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
      :current-page.sync="searchValue.current"
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

@Component({
  components: { VDistpicker },
})
export default class Merchant extends Vue {
  private dialogMessage = false;
  private merchantList = {
    total: 0,
    records: [],
  };
  private createValue = {
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
  private searchValue = {
    keyword: '',
    size: 10,
    current: 0,
  };
  private placeholders = {
    province: '------- 省 --------',
    city: '--- 市 ---',
    area: '--- 区 ---',
  }
  private mounted() {
    this.getMerchant();
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
        // this.merchantList = data.data.data;
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
