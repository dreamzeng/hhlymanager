<template>
    <!--main content start-->
    <div  id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">营销管理</li>
                        <li @click="back"> <a href="javascript:void(0)">优惠券</a></li>
                        <li class="active">优惠券编辑</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">全部优惠券</div>
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
                                              <el-radio :label="1" :disabled="params.couponType==2">折扣券
                                                  <div v-if="params.couponType==1">
                                                      <el-form-item label="折扣额度：" prop="discountMoney" style="margin-bottom:20px">
                                                          <el-input v-model="params.discountMoney" @change="changeDiscountMoney"  :maxlength="12" placeholder="0-9.9之间的只有一位小数的数字"></el-input>&ensp;折
                                                      </el-form-item>
                                                      <el-form-item label="数量：" prop="number" style="margin-bottom:20px">
                                                          <el-input v-model="params.number" :maxlength="6" @change="changeNumber" disabled></el-input>&ensp;张
                                                      </el-form-item>
                                                      <el-form-item label="最高抵扣：">
                                                          <el-input v-model="params.couponRules[0].maxDiscountMoney" class="onlyNum" placeholder="此项不填代表没有限制"></el-input>&ensp;元
                                                      </el-form-item>
                                                  </div>
                                              </el-radio>
                                              <br/>
                                              <el-radio :label="2" style="line-height:40px;" :disabled="params.couponType==1">固定金额抵扣券
                                                <div v-if="params.couponType==2">
                                                     <el-form-item label="面额：" prop="money" style="margin-bottom:20px">
                                                        <el-input v-model="params.money"  :maxlength="12" @change="changeMoney"></el-input>&ensp;元
                                                     </el-form-item>
                                                    <el-form-item label="数量：" prop="number" style="margin-bottom:20px">
                                                        <el-input v-model="params.number" :maxlength="6" @change="changeNumber" disabled></el-input>&ensp;张
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
                                          <el-form-item label="生效时间范围：">
                                            <!-- <el-date-picker id="timeSet"
                                              v-model="timeRange"
                                              type="datetimerange"
                                              placeholder="选择时间范围" @change="changeTime">
                                            </el-date-picker> -->
                                            <el-date-picker
                                              v-model="params.startUsetime"
                                              type="datetime"
                                              placeholder="选择开始时间" @change="changeStartTime" :disabled="timeSelectionControl.startOnoff">
                                            </el-date-picker>--
                                            <el-date-picker
                                              v-model="params.endUsetime"
                                              type="datetime"
                                              placeholder="选择结束时间" @change="changeEndTime" :disabled="timeSelectionControl.endOnoff">
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
                                                       size="small">删除</el-button>
                                                   </template>
                                                 </el-table-column>
                                                </el-table>
                                                <!-- 选中制定服务后的小表格 结束 -->
                                                <el-button v-if="params.couponRules[0].usableServerType=='2'" icon="plus" type="primary" size="small" @click="addService">添加服务</el-button>
                                              </el-radio>
                                            </el-radio-group>
                                          </el-form-item>
                                          <!-- 已有备注 -->
                                          <el-form-item label="备注：">
                                            <div>
                                              <div v-for="item in params.couponRemarks">{{item.remarkstime}}&emsp;{{item.content}}</div>
                                            </div>
                                            <el-button v-if="remarkOnoff" icon="plus" type="primary" size="small" @click="remarkOnoff=false">添加备注</el-button>
                                          </el-form-item>
                                          <!-- 添加备注 -->
                                          <el-form-item label="新增备注：" v-if="!remarkOnoff">
                                            <el-input :maxlength=100 type="textarea" v-model="couponRemark.content" @change="changeNum" style="width:500px;" resize="none"></el-input>
                                            <h5 style="text-align:right;width:500px;"><el-button type="primary" size="mini" @click="saveRemark">保存</el-button>&emsp;&emsp;还可以输入<span style="color:#0099FF">{{remainNum}}</span>个</h5>

                                          </el-form-item>
                                          <el-form-item style="margin-top:50px;">
                                            <el-button @click="back">取消</el-button>
                                            <el-button type="primary" @click="couponEditUpdate('rules')" style="margin-left:60px;">确定</el-button>
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
                <el-input v-model="queryServiceSubmitParams.name" placeholder="服务名称"></el-input>
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
            <page v-on:todoPage="getResource" :total="todopage.total" :limit="todopage.limit" :page="todopage.page" style="margin-top:25px;" id="page"></page>
            <div slot="footer" class="dialog-footer" style="margin-top:-15px;">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="makeSure" >确 定</el-button>
            </div>
          </el-dialog>
        </div>
    </div>
    <!--main content end-->
</template>

<style scoped>
</style>

<script>
    import Page from 'components/common/Page';
    import marketing from 'api/marketing';
    export default {
        name: 'marketingCouponEdit',
        components: {Page: Page},
        data() {
          //money面额的验证规则，小数或者整数都符合要求；
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
            //时间控件控制
            timeSelectionControl:
            {
              startOnoff:false,
              endOnoff:true
            },
            //服务类型下拉框数据
            typeList:[
              {
               "id":"",   //分类id
               "name":"",  //分类名称
               "showName":""
              }
            ],
            // 从后端获取的服务表格
            serviceTable:[
              {
                id:"",
                name:"",
                categoryName:"",
                priceStart:"",
                priceEnd:"",
              },
            ],
            // 从后端获取的优惠券信息
            params:{
            "couponName": "优惠券名称",
            "couponRemarks": [
                {
                    "content": "备注内容1",
                    "remarkstime": 1502448476684
                }
            ],
            "couponRules": [
              {
                "couponUsableServers": [
                    // {
                    //   "serverId": 1001,
                    //   "serverName": "法律服务"
                    // },
                    // {
                    //   "serverId": 1002,
                    //   "serverName": "合同定制"
                    // }
                ],
                "discountMoney":0,//折扣券
                "limitMoney": 0,
                "maxDiscountMoney": 0,
                "money": 5,//固定圈面额
                "number": 50,
                "usableServerType": 2
              }
            ],
            "couponType": 1,
            "denominationType": 1,//暂时这样设置，以后有多面额再更改
            "endUsetime": '',
            "startUsetime": '',
            //以下三个值不是后端数据里面的，前端表单验证添加的this.params.couponRules[0].money=this.params.money
            "discountMoney":"",
            "money":"",
            "number":"",
            },
            //验证规则
            rules: {
              couponName: [
                  { required: true,message: '名字必填，请输入优惠券名称', trigger: 'blur' },{ min: 0, max: 50, message: '名字不能超过50个字符', trigger: 'blur' }
              ],
              discountMoney: [
                  { validator: checkDiscountMoney, trigger: 'blur' },
              ],
              money: [
                  { validator: checkMoney, trigger: 'blur' },
              ],
              number: [
                  { validator: checkNumber, trigger: 'blur' },
              ],
            },
            // timeRange:[],//时间范围
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
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        computed:{
          // 将选取值拼成新的数组，用于批量更改状态的时候传给后端
          multipleSelect:function(){
              var arr=[];
              this.multipleSelection.forEach(function(val){
                  let serverId=val.id;
                  let serverName=val.name;
                  // let serverName=val.categoryName;
                  let item={serverId,serverName};
                  arr.push(item);
              });
              return arr;
          },
        },
        methods: {
          //请求优惠券详情，数据给this.params
            init: function () {
                let id = this.$route.params.id;
                // $('#list-content').mLoading("show");
                marketing.conponInfo(this, id).then(function (response) {
                    let body = response.body;
                    if (body && body.code==1) {
                        this.params = body.data;
                        // 从后端读取数据放到日期控件上面展示
                        // this.timeRange[0]=this.strToGMT(this.params.startUsetime);
                        // this.timeRange[1]=this.strToGMT(this.params.endUsetime);
                        // 上下区别是input能否展示从后端拿到的日期
                        // this.timeRange=[this.strToGMT(this.params.startUsetime),this.strToGMT(this.params.endUsetime)];
                        this.params.number=this.params.couponRules[0].number;
                        this.params.discountMoney=Number(this.params.couponRules[0].discountMoney)
                        this.params.money=Number(this.params.couponRules[0].money);
                        let now=new Date().getTime();
                        //时间开关控制
                        if(now<=new Date(this.params.startUsetime).getTime())
                        {
                          this.timeSelectionControl.startOnoff=false;
                          this.timeSelectionControl.endOnoff=false;
                        }
                        else if(now>=new Date(this.params.endUsetime).getTime())
                        {
                          this.timeSelectionControl.startOnoff=true;
                          this.timeSelectionControl.endOnoff=true;
                        }
                        else
                        {
                          this.timeSelectionControl.startOnoff=true;
                          this.timeSelectionControl.endOnoff=false;
                        }
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
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
                    if (body && body.code == 1&& body.data) {
                        this.serviceTable = body.data.items;
                        this.todopage.total =body.data.total;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            //将后端获取的时间字符串转成date格式
            strToGMT(time){
              return new Date(time);
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
            changeStartTime(val){
              this.params.startUsetime=val;
            },
            changeEndTime(val){
              this.params.endUsetime=val;
            },
            //返回上个页面
            back:function(){
                this.$router.go(-1);
            },
            // 更改剩余字数
            changeNum(val){
              this.remainNum=100-val.length;
            },
            // el表格复选框点击选择功能
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 现有指定服务列表的删除方法
            deleteRow(index, rows) {
              rows.splice(index, 1);
            },
            // 新增备注保存按钮，如果没有点击，总的确定按钮也会执行此方法
            saveRemark:function(){
              if(this.couponRemark.content.length!=0)
              {
                this.remarkOnoff=true;
                this.couponRemark.remarkstime=new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
                // let remarkstime=this.couponRemark.remarkstime;
                // let content=this.couponRemark.content;
                // let item={remarkstime,content};
                //这里不能直接把this.couponRemark这个对象push到数组中，内存指向问题
                let item=Object.assign({},this.couponRemark);
                if(!this.params.couponRemarks)//防止后端没有评论数据，此数组不存在，所以要加判断。
                {
                  this.params.couponRemarks=[item];
                }
                else
                {
                  this.params.couponRemarks.push(item);
                }
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
              if(!this.params.couponRules[0].couponUsableServers)
              {
                this.params.couponRules[0].couponUsableServers=this.multipleSelect;
              }
              else
              {
                this.params.couponRules[0].couponUsableServers=this.params.couponRules[0].couponUsableServers.concat(this.multipleSelect);
              }
              this.multipleSelection.length=0;//为了让弹窗打开的时候上次选中的数据消失

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
            //编辑完成提交
            couponEditUpdate:function(formName){
              let couponNameOnoff=this.params.couponName.length!=0;
              let moneyOnoff=this.params.couponType==1?this.params.discountMoney.length!=0:this.params.money.length!=0;
              let numberOnoff=this.params.number.length!=0;
              let timeOnoff=this.params.startUsetime&&this.params.endUsetime;
              if(couponNameOnoff&&moneyOnoff&&numberOnoff&&timeOnoff)
              {
                if(new Date(this.params.startUsetime).getTime()>=new Date(this.params.endUsetime).getTime())
                {
                  this.$message("结束时间不能早于开始时间");
                }
                else
                {
                  var param=this.params;
                  // this.params.couponRules[0].couponUsableServers.length==0
                  if((!this.params.couponRules[0].couponUsableServers||this.params.couponRules[0].couponUsableServers.length==0)&&this.params.couponRules[0].usableServerType==2)
                  {
                    this.$message.error("选中指定服务不能为空！！");
                  }
                  else
                  {
                    this.saveRemark();//防止新增评论忘记保存
                    marketing.couponEdit(this,param).then(function(res){
                      let body = res.body;
                      // $('#list-content').mLoading({text:"请刷新页面，将必填信息以正确格式填写完整！！！"});
                      this.$message("请将必填信息以正确格式填写完整！！");
                      if (body && body.code == 1) {
                          this.$message(body.msg);
                          this.$router.push({name:'marketing_coupon'});
                          return;
                      }
                    },function(res){
                      console.log('error:', res);
                    });
                  }
                  // marketing.couponEdit(this,param).then(function(res){
                  //   let body = res.body;
                  //   // $('#list-content').mLoading({text:"请刷新页面，将必填信息以正确格式填写完整！！！"});
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
              }
              else
              {
                this.$message("请将必填信息填写完全！！！");
              }
            },
        },
    }
</script>
