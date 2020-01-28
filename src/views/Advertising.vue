<template>
  <div class="Advertising">
    <el-dialog
      title="设置广告位"
      class="dialog2"
      :visible.sync="showAdvertisingImage"
      width="400px">
      <el-form :inline="true" :model="createGoodsValue" style="margin-bottom: -50px">
        <el-form-item label="广告标语">
          <el-input size="mini" placeholder="广告标语" v-model="createGoodsValue.slogan"></el-input>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input size="mini" placeholder="连接地址" v-model="createGoodsValue.refUrl"></el-input>
        </el-form-item>
         <el-form-item label="广告图片">
          <el-upload
            action="http://49.233.92.117:8001/upload/"
            :headers="headers"
            :limit="1"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="createGoodsValueHanlder">确认</el-button>
      </span>
    </el-dialog>
     <el-dialog
      title="广告位设置"
      class="dialog"
      :visible.sync="showAdvertising"
      width="50%">
      <template>
        <el-button v-if="advertisingList.length < 3"
        type="primary" size="small" @click="createGoodsHandler(advertisingList.length + 1)">添加广告位</el-button>
        <el-table
          :data="advertisingList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="displayPage"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="imageUrl"
            label="图片">
            <template slot-scope="scope">
              <img style="height: 100px" :src="scope.row.imageUrl">
            </template>
          </el-table-column>
          <el-table-column
            prop="slogan"
            label="广告语">
          </el-table-column>
          <el-table-column
            prop="refUrl"
            label="链接">
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
      title="规则设置"
      class="dialog"
      :visible.sync="dialogMessage"
      width="30%">
      <el-form :inline="true" :model="createValue" class="demo-form-inline">
        <el-form-item label="规则名称">
          <el-input v-model="createValue.name" size="small"></el-input>
        </el-form-item>
      <el-form-item label="赞助商" v-show="getUserinfo.roleId === '1'">
        <el-select @change="sponsorHandler" clearable :disabled="Boolean(createValue.id)"
        v-model="createValue.sponsorId" placeholder="赞助商" size="small">
          <el-option v-for="(item, index) in merchantList" :key="index" 
          :label="item.aliasName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="赞助商品">
        <el-select clearable :disabled="Boolean(createValue.id)" 
        v-model="createValue.productId" placeholder="赞助商品" size="small">
          <el-option v-for="(item, index) in goodsAll" :key="index"
          :label="item.productName" :value="item.id"></el-option>
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
     <el-form :inline="true" :model="searchValue" class="demo-form-inline">
      <el-form-item label="赞助商" v-if="getUserinfo.roleId === '1'">
        <el-select clearable v-model="searchValue.sponsorId" placeholder="赞助商" size="small">
          <el-option v-for="(item, index) in merchantList" :key="index" 
          :label="item.aliasName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" size="small" @click="getSponsorPosterList" v-if="getUserinfo.roleId === '1'">查询</el-button>
      <el-button type="primary" size="small" @click="createGroup">新增广告规则</el-button>
    </el-form>
    <el-table
      :data="advertisinglist.records || [,,]"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="规则名称">
      </el-table-column>
      <el-table-column
        prop="sponsorId"
        label="赞助商">
      </el-table-column>
      <el-table-column
        prop="productId"
        label="礼品">
      </el-table-column>
      <el-table-column
        prop="priority"
        label="优先级">
      </el-table-column>
      <el-table-column
        prop="isActive"
        label="状态">
        <template slot-scope="scope">
          {{scope.row.isActive !== 0 ? '已启用' : '已禁用'}}
          <a @click="isOpenHandler(scope.row)">{{scope.row.isActive === 0 ? '启用' : '禁用'}}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="广告位">
        <template slot-scope="scope">
          <a @click="getPosterItem(scope.row.id)">设置</a>
        </template>
      </el-table-column>
      <el-table-column
        label="操作" width="150">
        <template slot-scope="scope">
          <a @click="updateHanlder(scope.row)">修改</a>
          <a @click="deletedHandler(scope.row)">删除</a>
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
  .dialog2{
    .el-input{
      width: 250px;
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
  private fileList = [];
  private dialogMessage = false;
  private showAdvertising = false;
  private showAdvertisingImage = false
  private page = 0;
  private selectedId: any;
  private merchantList: any = [];
  private goodsAll = [];
  private advertisingList = [];
  private createGoodsValue: any = {
    id: undefined,
    imageUrl: undefined,
    refUrl: undefined,
    slogan: undefined,
    sponsorPosterId: undefined,
  }
  private createValue: any = {
    name: undefined,
    priority: undefined,
    productId: undefined,
    sponsorId: undefined,
    isActive: 1,
  }
  private headers = {
    token: localStorage.token,
  }
  private searchValue: any = {
    current: 0,
    size: 10,
    sponsorId: undefined,
  };
  private advertisinglist = {
    total: 0,
    records: [],
  };
  get getUserinfo() {
    return this.$store.state.userInfo;
  }
  private mounted() {
    this.getSponsorPosterList();
    this.getMerchant();
  }
  private getSponsorPosterList() {
    if (this.getUserinfo.roleId === '2') {
      this.searchValue.sponsorId = this.getUserinfo.sponsorId;
    }
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
  private sponsorHandler(id: number) {
    net.base.getSponsorProduct({size: 500, current: 0, sponsorId: id}).then((data: any) => {
      if (data.data.code === 200) {
        this.goodsAll = data.data.data.records;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private currentChange(page: number) {
    this.searchValue.current = page - 1;
    this.getSponsorPosterList();
  }
  private createGoodsHandler(displayPage: number) {
    this.showAdvertisingImage = true;
    this.createGoodsValue = {
      id: undefined,
      imageUrl: 'demo.png',
      refUrl: undefined,
      slogan: undefined,
      sponsorPosterId: this.selectedId,
      displayPage,
    }
  }
  private addHandler(row: any){
    net.base.addSponsorPoster(this.createValue).then((data: any) => {
      if (data.data.code === 200) {
        this.dialogMessage = false;
        this.getSponsorPosterList();
        this.$message({
          message: this.createValue.id && this.createValue.id !== '' ? '修改成功' : '添加成功',
          type: 'success'
        });
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private createGroup() {
    this.dialogMessage = true;
    this.createValue = {
      name: undefined,
      priority: undefined,
      productId: undefined,
      sponsorId: undefined,
      isActive: 1,
    }
    if (this.getUserinfo.roleId === '2') {
      this.createValue.sponsorId = this.getUserinfo.sponsorId;
    }
  }
  private updateHanlder(row: any) {
    this.dialogMessage = true;
    this.createValue = {
      id: row.id,
      name: row.name,
      priority: row.priority,
      productId: row.productId,
      sponsorId: row.sponsorId,
      isActive: 1,
    }
  }
  private deletedHandler(row: any) {
    const id = row.id;
    net.base.deletedAdvertising(id).then((data: any) => {
      if (data.data.code === 200) {
        this.getSponsorPosterList();
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private isOpenHandler(row: any) {
    net.base.isOpenHandler(row.id, row.isActive === 0).then((data: any) => {
      if (data.data.code === 200) {
        this.getSponsorPosterList();
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private getPosterItem(id: any) {
    this.selectedId = id;
    net.base.getPosterItem({size: 500, current: 0, sponsorPosterId: id}).then((data: any) => {
      if (data.data.code === 200) {
        this.showAdvertising = true;
        this.advertisingList = data.data.data.records;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private goodsUpdateHandler(row: any) {
    this.showAdvertisingImage = true;
    this.createGoodsValue = {
      id: row.id,
      imageUrl: row.imageUrl,
      refUrl: row.refUrl,
      slogan: row.slogan,
      sponsorPosterId: row.sponsorPosterId,
      displayPage: row.displayPage,
    }
  }
  private createGoodsValueHanlder() {
    net.base.addSponsorItemPoster(this.createGoodsValue).then((data: any) => {
      if (data.data.code === 200) {
        this.showAdvertisingImage = false;
        this.getPosterItem(this.selectedId);
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
}
</script>
