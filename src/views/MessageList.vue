<template>
  <div class="MessageList">
    <el-dialog
      title="新建推送"
      class="dialog"
      :visible.sync="dialogMessage"
      width="450px">
      <el-form :inline="true" :model="createValue" class="demo-form-inline">
      <el-form-item label="赞助商" v-show="getUserinfo.roleId === '1'">
        <el-select filterable clearable @change="changeHandler"
        v-model="createValue.sponsorId" placeholder="赞助商" size="small">
          <el-option v-for="(item, index) in merchantList" :key="index" 
          :label="item.aliasName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="推送类型">
          <el-radio-group v-model="createValue.deliveryType">
            <el-radio label="0">及时推送</el-radio>
            <el-radio label="1">定时推送</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="推送时间" v-if="createValue.deliveryType === '1'">
          <el-date-picker
            v-model="createValue.deliveryTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="推送对象">
          <el-radio-group v-model="createValue.recipientsVo.type" @change="typeHandler">
            <el-radio label="0">个人</el-radio>
            <el-radio label="1">组</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="模板选择">
          <el-select @change="templeteChangeHandler" clearable v-model="createValue.template"
           placeholder="模板选择" size="small">
            <el-option v-for="(item, index) in templete" :key="index"
            :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对象选择">
          <el-select filterable clearable v-model="createValue.recipientsVo.ids" multiple
           placeholder="对象" size="small" v-if="createValue.recipientsVo.type === '0'">
            <el-option v-for="(item, index) in fanList" :key="index"
            :label="item.nickname" :value="item.subscriberId"></el-option>
          </el-select>
          <el-select filterable clearable v-model="createValue.recipientsVo.ids" multiple
          placeholder="对象" size="small" v-if="createValue.recipientsVo.type === '1'">
            <el-option v-for="(item, index) in groupList" :key="index"
            :label="item.groupName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推送内容">
          <el-input type="textarea" v-model="createValue.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMessage = false">取 消</el-button>
        <el-button type="primary" @click="addMessageList">确 定</el-button>
      </span>
    </el-dialog>
   <el-form :inline="true" :model="searchValue" class="demo-form-inline">
      <el-form-item label="赞助商" v-if="getUserinfo.roleId === '1'">
        <el-select filterable clearable v-model="searchValue.sponsorId" placeholder="赞助商" size="small">
          <el-option v-for="(item, index) in merchantList" :key="index" 
          :label="item.aliasName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" size="small" @click="getMessageList" v-if="getUserinfo.roleId === '1'">查询</el-button>
      <el-button type="primary" size="small" @click="createMessageHandler">新建推送任务</el-button>
    </el-form>
    <el-table
      :data="messageList.records"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="短信流水号"
        width="150">
        <template slot-scope="scope">
          {{scope.row.deliveryNo || '无'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="recipientsVo"
        label="推送对象(用户/分组)">
        <template slot-scope="scope">
          {{scope.row.recipientsVo.type == '0' ? '个人:' : '组:'}}
          {{getValueById(scope.row.recipientsVo.ids, scope.row.recipientsVo.type)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="deliveryTime"
        label="推送时间" width="150">
      </el-table-column>
      <el-table-column
        prop="content"
        label="推送内容">
        <template slot-scope="scope">
          {{scope.row.content || '空'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="deliveryType"
        label="推送类型"
        width="100">
        <template slot-scope="scope">
          {{type[scope.row.deliveryType]}}
        </template>
      </el-table-column>
       <el-table-column
        prop="status"
        label="状态" width="200">
        <template slot-scope="scope">
          {{scope.row.statusDesc}}
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="deliveryType"
        label="推送类型"
        width="100">
        <template slot-scope="scope">
          <a @click="settingHandler(scope.row)">详情</a>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      :current-page.sync="page"
      @current-change="currentChange"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="Number(messageList.total)">
    </el-pagination>
  </div>
</template>

<style lang="less">
.el-select{
  overflow: hidden;
}
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
import net from '@/net/index';

@Component({
  components: {},
})
export default class MessageList extends Vue {
  private dialogMessage = false;
  private page = 0;
  private messageList = [];
  private type = ['及时推送', '定时推送'];
  private status = ['未发送', '发送成功', '发送失败'];
  private fanList = [];
  private groupList = [];
  private templete = [];
  private templateid = '';
  private merchantList: any = {
    total: 0,
    records: [],
  };
  private createValue: any = {
    deliveryType: '0',
    deliveryTimeStr: undefined,
    recipientsVo: {
      type: '0',
      ids: [],
    },
    content: undefined,
    status: 0,
  }
  private searchValue: any = {
    sponsorId: undefined,
    current: 0,
    size: 10,
  };
  get getUserinfo() {
    return this.$store.state.userInfo;
  }
  private mounted() {
    this.getMessageList();
    this.getMerchant();
    this.getFanList();
    this.getGroupList();
    this.getTemplete();
    const id = Number(<string> this.$route.query.id);
    const type = <string> this.$route.query.type;
    if (id) {
      this.dialogMessage = true;
      this.createValue.recipientsVo.ids = [id];
      this.createValue.recipientsVo.type = type;
    }
  }
  private templeteChangeHandler(value: string) {
    this.createValue.content = value;
  }
  private changeHandler() {
    this.getGroupList();
  }
  private typeHandler() {
    this.createValue.recipientsVo.ids = [];
  }
  private currentChange(page: number) {
    this.searchValue.current = page;
    this.getMessageList();
  }
  private getValueById(ids: string[], type: number) {
    const list = type == 0 ?  this.fanList : this.groupList;
    let nameList: any = [];
    ids.forEach(id => {
      list.forEach((item: any) => {
        if (id == item.subscriberId || id == item.id) {
          nameList.push(item.nickname || item.groupName);
        }
      });
    });
    return nameList.join(',');
  }
  // private getFanList() {
  //   net.base.getFansList({current: 0, size: 500}).then((data: any) => {
  //     if (data.data.code === 200) {
  //       this.fanList = data.data.data.records;
  //     } else {
  //       this.$message.error(data.data.msg);
  //     }
  //   });
  // }
  private getFanList() {
    const data: any = {current: 0, size: 500};
    if (this.getUserinfo.roleId === '2') {
      this.createValue.sponsorId = this.getUserinfo.sponsorId;
    }
    data.sponsorId = this.createValue.sponsorId;
    net.base.getFansList(data).then((data: any) => {
      if (data.data.code === 200) {
        this.fanList = data.data.data.records;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private getTemplete() {
    net.base.getTemplete(null).then((data: any) => {
      if (data.data.code === 200) {
        this.templete = data.data.data;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private getGroupList() {
    const data: any = {current: 0, size: 500};
    if (this.getUserinfo.roleId === '2') {
      this.createValue.sponsorId = this.getUserinfo.sponsorId;
    }
    data.sponsorId = this.createValue.sponsorId;
    net.base.getGroup(data).then((data: any) => {
      if (data.data.code === 200) {
        this.groupList = data.data.data.records;
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
  private getMessageList() {
    if (this.getUserinfo.roleId === '2') {
      this.searchValue.sponsorId = this.getUserinfo.sponsorId;
    }
    net.base.getMessageList(this.searchValue).then((data: any) => {
      if (data.data.code === 200) {
        this.messageList = data.data.data;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private addMessageList() {
    if (this.createValue.deliveryType === '0') {
      this.createValue.deliveryTime = new Date();
    }
    net.base.addMessageList(this.createValue).then((data: any) => {
      if (data.data.code === 200) {
        this.getMessageList();
        this.$message({
          message: '创建成功',
          type: 'success'
        });
        this.dialogMessage = false;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private createMessageHandler() {
    this.dialogMessage = true;
    this.createValue = {
      deliveryType: '0',
      deliveryTime: undefined,
      recipientsVo: {
        type: '0',
        ids: [],
      },
      content: undefined,
      status: 0,
      sponsorId: this.getUserinfo.sponsorId === '-1' ? '' : this.getUserinfo.sponsorId,
    }
  }
}
</script>
