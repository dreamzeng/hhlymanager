<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">营销管理</li>
                        <li @click="back"> <a href="javascript:void(0)">优惠券</a></li>
                        <li class="active">添加优惠券</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">添加优惠券</div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="profile-nav alt green-border">
                                <div class="panel">
                                    <div class="top" style="padding-left:93px; color:#4D4D4D;border-bottom: 1px solid #EFF2F7;">
                                        <el-form :model="params" :rules="rules" label-width="130px" ref="params">
                                          <el-form-item label="优惠券名称："  prop="couponName">
                                            <el-input v-model="params.couponName" style="width:193px;"></el-input>
                                          </el-form-item>
                                          <el-form-item label="优惠券金额：">
                                            <el-radio-group v-model="params.couponType" style="margin-top:10px;">
                                              <el-radio :label="1">折扣券
                                                  <div v-if="params.couponType=='1'">
                                                      <el-form-item label="折扣额度：" prop="discountMoney" style="margin-bottom:20px" :required="params.couponType==1">
                                                          <!-- <el-input v-model="params.money" @change="changeMoney"  :maxlength="12"></el-input>&ensp;折 -->
                                                          <el-input v-model="params.discountMoney" @change="changeDiscountMoney"  :maxlength="12" placeholder="0-9.9之间的只有一位小数的数字"></el-input>&ensp;折
                                                      </el-form-item>
                                                      <el-form-item label="数量：" prop="number" style="margin-bottom:20px">
                                                          <el-input v-model="params.number" :maxlength="6" @change="changeNumber"></el-input>&ensp;张
                                                      </el-form-item>
                                                      <el-form-item label="最高抵扣：">
                                                          <el-input v-model="params.couponRules[0].maxDiscountMoney" class="onlyNum" placeholder="此项不填代表没有限制"></el-input>&ensp;元
                                                      </el-form-item>
                                                  </div>
                                              </el-radio>
                                              <br/>
                                              <el-radio :label="2" style="line-height:40px;" >固定金额抵扣券
                                                <div v-if="params.couponType=='2'">
                                                     <el-form-item label="面额：" prop="money" style="margin-bottom:20px" :required="params.couponType==2">
                                                        <el-input v-model="params.money"  :maxlength="12" @change="changeMoney"></el-input>&ensp;元
                                                     </el-form-item>
                                                    <el-form-item label="数量：" prop="number" style="margin-bottom:20px">
                                                        <el-input v-model="params.number" :maxlength="6" @change="changeNumber"></el-input>&ensp;张
                                                    </el-form-item>
                                                    <el-form-item label="满减条件：">
                                                        <el-input v-model="params.couponRules[0].limitMoney" placeholder=""></el-input>&ensp;元
                                                    </el-form-item>
                                                    <el-form-item label="累计金额：">
                                                        <span>{{(params.couponRules[0].money*params.couponRules[0].number).toFixed(2)}}</span>元
                                                    </el-form-item>
                                                </div>
                                              </el-radio>
                                            </el-radio-group>
                                          </el-form-item>
                                          <h4 style="border-top:solid 1px #EFF2F7;line-height:75px;">基本信息</h4>
                                          <el-form-item label="生效时间范围：" prop="time">
                                            <el-date-picker
                                              v-model="params.time"
                                              type="datetimerange"
                                              placeholder="选择时间范围" @change="changeTime">
                                            </el-date-picker>
                                          </el-form-item>

                                          <el-form-item label="可适用的服务：">
                                            <el-radio-group v-model="params.couponRules[0].usableServerType">
                                              <el-radio :label="1" style="vertical-align:top;line-height: 38px;">全部服务</el-radio>
                                              <br/>
                                              <el-radio :label="2" style="line-height:40px;">指定服务
                                                <!-- 选中定制服务后的小表格 开始-->
                                                <el-table v-if="params.couponRules[0].usableServerType=='2'"
                                                 :data="params.couponRules[0].couponUsableServers"
                                                 style="width: 100%">
                                                 <el-table-column
                                                   prop="serverName"
                                                   label="服务名称"
                                                   width="180"></el-table-column>

                                                 <el-table-column
                                                   prop=""
                                                   label="操作"
                                                   width="180">
                                                   <template slot-scope="scope">
                                                     <el-button
                                                       @click.native.prevent="deleteRow(scope.$index, params.couponRules[0].couponUsableServers)"
                                                       type="text"
                                                       size="small">
                                                       删除
                                                     </el-button>
                                                   </template>
                                                 </el-table-column>
                                                </el-table>
                                                <!-- 选中制定服务后的小表格 结束 -->
                                                <el-button v-if="params.couponRules[0].usableServerType=='2'" icon="plus" type="primary" size="small" @click="addService">添加服务</el-button>
                                              </el-radio>
                                            </el-radio-group>
                                          </el-form-item>
                                          <el-form-item label="备注：">
                                            <el-input :maxlength=100 type="textarea" v-model="couponRemark.content" @change="changeNum" style="width:500px;" resize="none" placeholder="非必填"></el-input>
                                            <h5 style="text-align:right;width:500px;">还可以输入<span style="color:#0099FF">{{remainNum}}</span>个</h5>
                                          </el-form-item>
                                          <el-form-item>
                                            <el-button @click="back">取消</el-button>
                                            <el-button type="primary" @click="couponAddSubmit(rules)">确定</el-button>
                                          </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- dialog对话框 -->
        <div id="list-content">
          <el-dialog title="选择服务" :visible.sync="dialogFormVisible">
            <el-form :inline="true" :model="queryServiceSubmitParams" class="demo-form-inline">
              <el-form-item label="服务名称：">
                <el-input v-model.trim="queryServiceSubmitParams.name" placeholder="服务名称"></el-input>
              </el-form-item>
              <el-form-item label="所属业务：" style="margin-left:10px;">
                <el-select v-model="queryServiceSubmitParams.categoryId" placeholder="全部">
                  <el-option label="全部" value=""></el-option>
                  <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item><el-form-item>
                <el-button type="primary" @click="queryService">搜索</el-button>
              </el-form-item>
            </el-form>
            <!-- <el-table :data="serviceTable" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column prop="" label="" align=center type="selection">
                </el-table-column>
                <el-table-column prop="id" label="服务ID" align=center>
                </el-table-column>
                <el-table-column prop="name" label="服务名称" align=center>
                </el-table-column>
                <el-table-column prop="categoryName" label="所属业务" align=center>
                </el-table-column>
                <el-table-column prop="" label="定价">
                  <template scope="scope" align=center>
                    <span>{{scope.row.priceStart}}-{{scope.row.priceEnd}}</span>
                  </template>
                </el-table-column>
            </el-table> -->
            <el-table :data="serviceTable" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column prop="" label="" align="center" type="selection" width="90">
                </el-table-column>
                <el-table-column type="index" label="序号" align="center" width="90">
                </el-table-column>
                <el-table-column prop="id" label="服务ID" align="center" width="90">
                </el-table-column>
                <el-table-column prop="name" label="服务名称" align="center" >
                </el-table-column>
                <el-table-column prop="categoryName" label="所属业务" align="center" width="130">
                </el-table-column>
                <el-table-column prop="" label="定价" align=center >
                  <template slot-scope="scope">
                    <span v-if="scope.row.priceConfirm">{{scope.row.priceStart}}-{{scope.row.priceEnd}}{{scope.row.unit}}</span>
                    <span v-if="!scope.row.priceConfirm">{{scope.row.priceStart}}{{scope.row.unit}}</span>
                  </template>
                </el-table-column>
            </el-table>
            <page v-on:todoPage="getResource" :total="todopage.total" :limit="todopage.limit" :page="todopage.page" style="margin-top:25px;"></page>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="makeSure">确 定</el-button>
            </div>
          </el-dialog>
        </div>
    </div>
    <!--main content end-->
</template>

<style scoped>
    /* .live-details-s {
        padding: 10px 15px;
        border-radius: 0;
        color: #89817f;
        border-left: 5px solid #fff
    }
    .live-details-s .label{
        margin-right: 15px; width: 100px;display: inline-block;
    }*/
    /* .panel h4{line-height:75px;} */
    /* .panel li{border-bottom:none;line-height:60px;}
    .dataTables_paginate.paging_bootstrap.pagination li a {color: #797979;padding: 5px 10px;display: inline-block;border-left:none;height:18px;}
    .dataTables_paginate.paging_bootstrap.pagination li a:hover {border-left:none;}  */

</style>

<script>
    import Page from 'components/common/Page';
    import marketing from 'api/marketing';


    export default {
        name: 'marketingCouponAdd',
        components: {Page: Page},
        data() {
          //money折扣或者面额的验证规则，小数或者整数都符合要求；
          var checkMoney = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('输入不能为空'));
            }
            setTimeout(() => {
              var reg=/^\d+(\.\d+)?$/;
              var reg2=/^\d+(\.\d{1,2})?$/;
              if (!reg.test(value))
              {
                callback(new Error('请输入数字'));
              }
              else if(!reg2.test(value))
              {
                callback(new Error('小数位数不超过2位'));
              }
              else callback();
            }, 1000);
          };
          //discountMoney折扣小数或者整数都符合要求；
          var checkDiscountMoney = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('输入不能为空'));
            }
            setTimeout(() => {
              var reg=/^\d+(\.\d{1})?$/;
              if (!reg.test(value)) {
                callback(new Error('请输入没有或者只有一位小数的数字'));
              }else if (Number(value)>9.9) {
                callback(new Error('输入数字不能大于9.9'));
              }
              else callback();
            }, 1000);
          };
          //number数量整数符合要求；
          var checkNumber = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('输入不能为空'));
            }
            setTimeout(() => {
              var reg=/^\d+$/;
              if (!reg.test(value)) {
                callback(new Error('请输入正整数'));
              } else callback();
            }, 1000);
          };
          return {
            multipleSelection: [],//el表格复选框选中后的行 组成的数组
            todopage: {
                total: 1,
                limit: 10,  //每页显示多少条 limit
                page: 1 //当前页码 page
            },
            //服务类型下拉框数据
            typeList:[
              {
               "id":11,   //分类id
               "name":1992,  //分类名称
               "showName":"手机显示分类名称"
              }
            ],
            // 从后端获取的服务表格
            serviceTable:[
              // {
              //   id:"1",
              //   name:"hehe",
              //   categoryName:"法律服务",
              //   priceStart:"100",
              //   priceEnd:"700",
              // },
            ],
            // 从后端获取的优惠券信息
            params:{
              "couponName": "",
              "couponRemarks": [
                  // {
                  //     "content": "",
                  //     "remarkstime": ""
                  // }
              ],
              "couponRules": [
                {
                  "couponUsableServers": [
                      // {
                      //   "serverId": "",
                      //   "serverName": ""
                      // },
                  ],
                  "discountMoney":0,//折扣券
                  "limitMoney": 0,
                  "maxDiscountMoney": 0,
                  "money":"",
                  "number":"",
                  "usableServerType":1
                }
              ],
              "couponType": 1,
              "denominationType":1,//暂时这样设置，以后有多面额再更改
              "endUsetime": '',
              "startUsetime": '',
              //以下三个值不是后端数据里面的，前端表单验证添加的this.params.couponRules[0].money=this.params.money
              "discountMoney":"",//折扣面额，后端不拆，前端自己拆开验证
              "money":"",
              "number":"",
              "time":[],
            },
            //验证规则
            rules: {
              couponName: [
                  { required: true, message: '名字必填，请输入优惠券名称', trigger: 'blur' },{ min: 0, max: 50, message: '名字不能超过50个字符', trigger: 'blur' }
              ],
              money: [
                  { validator: checkMoney, trigger: 'blur' },
              ],
              discountMoney: [
                  { validator: checkDiscountMoney, trigger: 'blur' },
              ],
              number: [
                  { validator: checkNumber, trigger: 'blur' },
              ],
              time: [
                  {type: 'array',required: true, message: '日期必填，请选择日期', trigger: 'change' }
              ]
            },
            // timeRange:'1502448476684',//时间范围
            remainNum:100,//新加备注的字数限制
            dialogFormVisible:false,//弹窗显示隐藏开关
            remarkOnoff:true,//添加评论按钮显示隐藏开关
            "couponRemark"://新增评论暂时存放的对象，后面加入到数组中
            {
                "content": "",
                "remarkstime": ""
            },
            // 服务查询需要提交的数据
            queryServiceSubmitParams:{
              categoryId:"",
              name:"",
            },
          }
        },
        computed:{
          // 将选取值拼成新的数组，用于批量更改状态的时候传给后端
          multipleSelect:function(){
              var arr=[];
              this.multipleSelection.forEach(function(val){
                  let serverId=val.id;
                  // let serverName=val.categoryName;
                  let serverName=val.name;
                  let item={serverId,serverName};
                  arr.push(item);
              });
              return arr;
          }
        },
        methods: {
          init: function () {
          },
          //请求弹窗里面的服务列表
          getResource: function (page, limit) {
              let param = {
                  page: page, limit: limit,
              };

              this.todopage.limit = limit;
              this.todopage.page = page;

              for (let k in this.queryServiceSubmitParams) {
                  if(this.queryServiceSubmitParams[k])
                  {
                    param[k] = this.queryServiceSubmitParams[k];
                  }
              }
              $('#list-content').mLoading("show");
              marketing.serviceQuery(this, param).then(function (response) {
                  let body = response.body;
                  // marketing.tips(this,{message:body.msg});
                  if (body && body.code == 1&&body.data) {
                      this.serviceTable = body.data.items;
                      this.todopage.total = body.data.total;
                      return;
                  }
              }, function (response) {
                  console.log('error:', response);
              });
          },
          //将外部的数据放到params里面
          changeMoney(val){
            this.params.couponRules[0].money=val;
          },
          changeDiscountMoney(val){
            this.params.couponRules[0].discountMoney=val;
          },
          changeNumber(val){
            this.params.couponRules[0].number=val;
          },
          // 时间range拆分
          changeTime(val){
            // this.params.startUsetime=this.params.time[0];
            // this.params.endUsetime=this.params.time[1];
            this.params.startUsetime=val.substring(0,19);
            this.params.endUsetime=val.substring(22);
          },
          //返回上个页面
          back:function(){
              this.$router.go(-1);
          },
          // 更改剩余字数
          changeNum(val){
            this.remainNum=100-val.length;
          },
          pushMark(){
            this.marks.push(this.mark);
            this.mark='';
            this.markOnoff = false;
          },
          // el表格复选框点击选择功能
          handleSelectionChange(val) {
              this.multipleSelection = val;
          },
          // 现有指定服务列表的删除方法
          deleteRow(index, rows) {
            rows.splice(index, 1);
          },
          // 保存按钮，总的确定按钮会执行此方法
          saveRemark:function(){
            // console.log(this.couponRemark.content);
            if(this.couponRemark.content.length!=0)
            {
              this.remarkOnoff=true;
              this.couponRemark.remarkstime=new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
              // let remarkstime=this.couponRemark.remarkstime;
              // let content=this.couponRemark.content;
              // let item={remarkstime,content};
              //这里不能直接把this.couponRemark这个对象push到数组中，内存指向问题
              let item=Object.assign({},this.couponRemark);
              this.params.couponRemarks.push(item);
              this.couponRemark.remarkstime="";
              this.couponRemark.content="";
            }
          },
          //添加服务按钮点击事件
          addService:function(){
            this.dialogFormVisible = true;//弹窗开关打开
            let parentId=0;
            // 首选请求服务分类
            marketing.serviceType(this,parentId).then(function(res){
              let body = res.body;
              if (body && body.code == 1 && body.data) {
                  this.typeList = body.data;
                  return;
              }
            },function(res){
              console.log('error:', res);
            });
            // 以上代码为请求服务类型的下拉框
            this.getResource(1, this.todopage.limit);
          },
          //点击搜索按钮事件
          queryService:function(){
            this.getResource(1, this.todopage.limit);
          },
          //弹窗确定按钮-服务选择后的确认按钮
          makeSure:function(){
            // 拼接
            this.params.couponRules[0].couponUsableServers=this.params.couponRules[0].couponUsableServers.concat(this.multipleSelect);
            this.dialogFormVisible = false;
            // 去重
            var arr=this.params.couponRules[0].couponUsableServers;
            var newArr=[];
            var json={};
            arr.forEach(function(val,idx){
                if(!json[val.serverId])
                {
                  newArr.push(val);
                  json[val.serverId]=true;
                }
            });
            this.params.couponRules[0].couponUsableServers=newArr;
          },
          //填写完成所有页面内容确定提交
          couponAddSubmit:function(formName){

            let couponNameOnoff=this.params.couponName.length!=0;
            // if(this.params.couponType==1)
            // {
            //   let moneyOnoff=this.params.money.length!=0;
            // }
            // else
            // {
            //   let moneyOnoff=this.params.discountMoney.length!=0

            // }
            let moneyOnoff=this.params.couponType==1?this.params.discountMoney.length!=0:this.params.money.length!=0;
            console.log(moneyOnoff);
            let numberOnoff=this.params.number.length!=0;
            let timeOnoff=this.params.time.length!=0;
            if(couponNameOnoff&&moneyOnoff&&numberOnoff&&timeOnoff)
            {
              var param=this.params;
              if(this.params.couponRules[0].couponUsableServers.length==0&&this.params.couponRules[0].usableServerType==2)
              {
                this.$message.error("选中指定服务不能为空！！");
              }
              else
              {
                this.saveRemark();//防止新增评论忘记保存
                marketing.couponAdd(this,param).then(function(res){
                  let body = res.body;
                  // $('#list-content').mLoading({text:"请刷新页面，将必填信息以正确格式填写完整！！！"});
                  // this.$message("请将必填信息以正确格式填写完整！！");
                  if (body && body.code == 1) {
                      this.$message(body.msg);
                      this.$router.push({name:'marketing_coupon'});
                      return;
                  }
                },function(res){
                  console.log('error:', res);
                });
              }
              // marketing.couponAdd(this,param).then(function(res){
              //   let body = res.body;
              //   this.$message("请将必填信息以正确格式填写完整！！");
              //   if (body && body.code == 1) {
              //       this.$message(body.msg);
              //       this.$router.push({name:'marketing_coupon'});
              //       return;
              //   }
              // },function(res){
              //   console.log('error:', res);
              // });
            }
            else
            {
              this.$message("请将必填信息填写完全！！！");
            }
            // 表单验证,提示validate未定义
            // this.$refs[formName].validate(function(valid){
            //   if (valid) {
            //     alert('submit!');
            //   }
            //   else
            //   {
            //     console.log('error submit!!');
            //     return false;
            //   }
            // });
          },
      }
    }
    //
</script>
