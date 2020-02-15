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
          <el-select filterable clearable v-model="createValue.recipientsVo.recipients" multiple
          value-key="id"
           placeholder="对象" size="small" v-if="createValue.recipientsVo.type === '0'">
            <el-option v-for="(item) in fanList" :key="item.id"
            :label="item.name" :value="item"></el-option>
          </el-select>
          <el-select filterable clearable v-model="createValue.recipientsVo.recipients" multiple
          value-key="id"
          placeholder="对象" size="small" v-if="createValue.recipientsVo.type === '1'">
            <el-option v-for="(item) in groupList" :key="item.id"
            :label="item.name" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推送内容">
          <el-input type="textarea" v-model="createValue.content"></el-input>
        </el-form-item>
        <el-form-item label="提示">
          <span class="tip">模板短信推送，请将{}替换为您要推送的短信内容，{10}代表最多替换为10个汉字，请勿修改其他内容，否则无法提交。例如：尊敬的用户您好！{S30}更多活动请咨询{S20}，可以替换为：尊敬的用户您好！本店将推出新春买一送一大礼包活动，请到各门店参与！更多活动请咨询010-88886666。</span>
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
    <div class="messageTotal">
      <p>全部: <span>{{messageTotal.total}}</span></p>
      <p>成功: <span>{{messageTotal.success}}</span></p>
      <p>失败: <span>{{messageTotal.fail}}</span></p>
      <p>未发送: <span>{{messageTotal.pre}}</span></p>
    </div>
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
          {{getValueById(scope.row.recipientsVo.recipients || [])}}
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
  .tip{
    font-size: 10px;
    line-height: 16px !important;
    width: 300px;
    margin-left: 70px;
    display: inline-block;
    margin-top: -30px;
    color: #909399;
  }
  .messageTotal{
    width: 100%;
    float: left;
    margin-left: 10px;
    p{
      font-size: 14px;
      float: left;
      margin-right: 20px;
      color: #606266;
    }
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
      recipients: [],
    },
    content: undefined,
    status: 0,
  }
  private searchValue: any = {
    sponsorId: undefined,
    current: 0,
    size: 10,
  };
  private messageTotal = {
    total: 0,
    success: 0,
    fail: 0,
    pre: 0,
  };
  get getUserinfo() {
    return this.$store.state.userInfo;
  }
  private mounted() {
    this.getMessageList();
    this.getMerchant();
    this.getMessageTotal();
    if (this.getUserinfo.roleId === '2') {
      this.getFanList();
    }
    this.getGroupList();
    this.getTemplete();
    const id = Number(<string> this.$route.query.id);
    const type = <string> this.$route.query.type;
    if (id) {
      this.dialogMessage = true;
      this.createValue.recipientsVo.recipients = [{id, name}];
      this.createValue.recipientsVo.type = type;
    }
  }
  private templeteChangeHandler(value: string) {
    this.createValue.content = value;
  }
  private changeHandler() {
    this.getGroupList();
    this.getFanList();
  }
  private typeHandler() {
    this.createValue.recipientsVo.recipients = [];
  }
  private currentChange(page: number) {
    this.searchValue.current = page;
    this.getMessageList();
  }
  private getValueById(recipients: any[] = []) {
    let nameList: any = [];
    recipients.forEach(item => {
      nameList.push(item.name);
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
  private getMessageTotal() {
    // console.log(this.getUserinfo);
    // if (this.getUserinfo.roleId === '2') {
    //   this.createValue.sponsorId = this.getUserinfo.sponsorId;
    // }
    const sponsorId = this.searchValue.sponsorId;
    net.base.getSmsLog({sponsorId}).then((data: any) => {
      if (data.data.code === 200) {
        this.messageTotal = data.data.data;
      } else {
        this.$message.error(data.data.msg);
      }
    });
  }
  private getFanList() {
    const data: any = {current: 0, size: 500};
    if (this.getUserinfo.roleId === '2') {
      this.createValue.sponsorId = this.getUserinfo.sponsorId;
    }
    data.sponsorId = this.createValue.sponsorId;
    net.base.getFansList(data).then((data: any) => {
      if (data.data.code === 200) {
        const fanList = data.data.data;
        this.fanList = fanList.map((item: any) => {
          return {id: item.id, name: item.nickname};
        });
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
        const groupList = data.data.data.records;
        this.groupList = groupList.map((item: any) => {
          return {id: item.id, name: item.groupName};
        });
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
    this.getMessageTotal();
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
        recipients: [],
      },
      content: undefined,
      status: 0,
      sponsorId: this.getUserinfo.sponsorId === '-1' ? '' : this.getUserinfo.sponsorId,
    }
  }
}
</script>
