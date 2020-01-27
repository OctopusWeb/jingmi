<template>
  <div class="Advertising">
    <el-dialog
      title="规则设置"
      class="dialog"
      :visible.sync="dialogMessage"
      width="30%">
      <el-form :inline="true" :model="createValue" class="demo-form-inline">
        <el-form-item label="规则名称">
          <el-input v-model="createValue.name" size="small"></el-input>
        </el-form-item>

      <el-form-item label="赞助商">
        <el-select clearable v-model="createValue.sponsorId" placeholder="赞助商" size="small">
          <el-option v-for="(item, index) in merchantList" :key="index" 
          :label="item.aliasName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="赞助商品">
        <el-select clearable v-model="createValue.productId" placeholder="赞助商品" size="small">
          <el-option v-for="(item, index) in goodsAll" :key="index"
          :label="item.goodsName" :value="item.goodsId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优先级">
        <el-input v-model="createValue.priority" size="small"></el-input>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMessage = false">取 消</el-button>
        <el-button type="primary" @click="addHandler">确 定</el-button>
      </span>
    </el-dialog>
    <el-button type="primary" size="small" @click="createGroup">新增广告规则</el-button>
    <el-table
      :data="advertisinglist.records"
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
      @current-change="currentChange"
      :current-page.sync="page"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="Number(advertisinglist.total)">
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
import net from '@/net/index';

@Component({
  components: {},
})
export default class Advertising extends Vue {
  private dialogMessage = false;
  private page = 0;
  private merchantList: any = [];
  private goodsAll = [];
  private createValue: any = {
    name: undefined,
    priority: undefined,
    productId: undefined,
    sponsorId: undefined,
  }
  private searchValue: any = {
    current: 0,
    size: 10,
    sponsorId: 2,
  };
  private advertisinglist = {
    total: 0,
    records: [],
  };
  private mounted() {
    this.getSponsorPosterList();
    this.getMerchant();
    this.getGoodsAll();
  }
  private getSponsorPosterList(){
    net.base.getSponsorPosterList(this.searchValue).then((data: any) => {
      if (data.data.code === 200) {
        this.advertisinglist = data.data.data;
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
  private getGoodsAll() {
    net.base.getGoodsAll().then((data: any) => {
      if (data.data.code === 200) {
        this.goodsAll = data.data.data;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private currentChange(page: number) {
    this.searchValue.current = page - 1;
    this.getSponsorPosterList();
  }
  private addHandler(row: any){
    net.base.addSponsorPoster(this.createValue).then((data: any) => {
      if (data.data.code === 200) {
        this.dialogMessage = false;
        this.getSponsorPosterList();
        this.$message({
          message: this.createValue.id || this.createValue.id !== '' ? '修改成功' : '添加成功',
          type: 'success'
        });
      } else {
        this.$message.error(data.data.msg);
      }
    });
    console.log(row)
  }
  private createGroup() {
    this.dialogMessage = true;
  }
}
</script>
