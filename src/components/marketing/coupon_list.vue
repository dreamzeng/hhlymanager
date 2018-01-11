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
                        <li click="active">码库明细</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">码库明细</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <el-button type="primary" size="small" @click="forbiddenBatchId">批量禁用</el-button>
                                    <el-button type="primary" size="small" @click="enableBatchId">批量激活</el-button>
                                    <el-button type="primary" size="small" @click="triggerForm">导出所有</el-button>
                                    <!-- <a class="btn btn-info" @click="triggerForm">导出所有</a> -->
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param" @submit.prevent="">
                                            <el-form-item  label="优惠券状态：">
                                                <el-select v-model="param.status" placeholder="请选择" style="width: 150px;">
                                                    <el-option label="全部" value="">全部</el-option>
                                                    <el-option value="1"  label="未使用"></el-option>
                                                    <el-option value="2"  label="已使用"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item  label="领取人手机号：">
                                                <el-input v-model="param.receiveUser" placeholder="请输入手机号" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="使用时间：">
                                                <el-date-picker
                                                  v-model="timeRange"
                                                  type="datetimerange"
                                                  placeholder="选择时间范围" @change="changeTime">
                                                </el-date-picker>
                                                <!-- <el-date-picker
                                                  type="datetime"
                                                  v-model="param.startUsetime"
                                                  placeholder="开始时间" @change="startTime">
                                                </el-date-picker>
                                                <el-date-picker
                                                    v-model="param.endUsetime"
                                                  type="datetime"
                                                  placeholder="结束时间" @change="endTime">
                                                </el-date-picker> -->
                                            </el-form-item>
                                            <el-button type="danger" @click="searchCou">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body">
                                    <el-table :data="dataList" border tooltip-effect="dark" @selection-change="handleSelectionChange" style="width:100%">

                                        <el-table-column align="center" prop="id" label="序号" type="selection" fixed  width="60">
                                        </el-table-column>
                                        <el-table-column align="center" prop="couponCode" label="编码" width="130" fixed> <!-- 未支付订单 这里不显示 -->
                                        </el-table-column>
                                        <el-table-column align="center" prop="money" label="优惠券面额" width="110">
                                        </el-table-column>
                                        <el-table-column align="center" prop="discountMoney" label="折扣额度" width="110">
                                        </el-table-column>
                                        <el-table-column align="center" prop="createTime" label="创建时间" width="180">
                                        </el-table-column>
                                        <el-table-column align="center" prop="receiveTime" label="领取时间" width="180">
                                        </el-table-column>
                                        <el-table-column align="center" prop="receiveUser" label="领取人" width="130">
                                        </el-table-column>
                                        <el-table-column align="center" prop="useTime" label="使用时间" width="180">
                                        </el-table-column>
                                        <el-table-column align="center" label="订单编号" prop="orderNo" width="200">
                                        </el-table-column>
                                        <el-table-column align="center" label="订单金额" prop="orderMoney" width="100"></el-table-column>
                                        <el-table-column align="center" label="抵扣金额"  prop="deductionMoney" width="100"></el-table-column>
                                        <el-table-column align="center" label="备注" prop="remarks" width="250"> </el-table-column>
                                        <el-table-column align="center" label="状态" prop="status" width="105">
                                        </el-table-column>
                                        <el-table-column align="center" label="是否激活" prop="activateStatus" width="105">
                                        </el-table-column>
                                        <el-table-column align="center" label="操作" prop="operate" width="113" fixed="right">
                                            <template slot-scope="scope">
                                                <el-button type="info" @click="addRemarksId(scope.row.id)" size="mini">备注</el-button>
                                                <el-button type="success" v-if="scope.row.activateStatus=='否'" size="mini" @click="enableSingleId(scope.row.id)" >激活</el-button>
                                                <el-button type="danger" v-if="scope.row.activateStatus=='是'" size="mini" @click="forbiddenSingleId(scope.row.id)">禁用</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <!-- 备注弹框 -->
                                    <el-dialog
                                      title="添加备注"
                                      :visible.sync="dialogVisible1"
                                      size="tiny"
                                      :before-close="handleClose">
                                      <el-input
                                        type="textarea"
                                        placeholder="请输入15字以内的备注" :maxlength="15"
                                        v-model.trim="remark" resize=none>
                                      </el-input>
                                      <span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogVisible1 = false">取 消</el-button>
                                        <el-button type="primary" @click="confirmAddRemarks">确 定</el-button>
                                      </span>
                                    </el-dialog>
                                </div>
                            </div>
                            <page v-on:todoPage="getResource" :total="todopage.total" :limit="todopage.limit" :page="todopage.page"></page>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- <form method="get" :action="exportList()" id="exportDramForm">
            <input name="couponId"  type="hidden" :value="couponId">
        </form> -->
    </div>
    <!--main content end-->
</template>

<style scoped>
    .live-details-s {
        padding: 10px 15px;
        border-radius: 0;
        color: #89817f;
        border-left: 5px solid #fff
    }
    .live-details-s .label{
        margin-right: 15px; width: 100px;display: inline-block;
    }

    .panel h4{line-height:75px;}
    .panel li{border-bottom:none;line-height:60px;}
    .el-table_1_column_15 .cell{width:150px;}
    .cell .el-button--mini{padding:4px 2px;}
</style>

<script>
    import Page from 'components/common/Page';
    import marketing from 'api/marketing';
    export default {
        name:'couponList',
        components: {Page: Page},
        data() {
          return {
            dataList: [
                // {
                //     "id":1,
                //     "couponCode":"优惠券编码",
                //     "money": "满减券额度",
                //     "discountMoney":"折扣面额2",
                //     "createTime": "创建时间",
                //     "receiveTime": "领取时间",
                //     "receiveUser": "领取人",
                //     "useTime":"使用时间",
                //     "orderNo": "订单编号",
                //     "orderMoney": "订单金额",
                //     "deductionMoney":"抵扣金额",
                //     "remarks":"备注",
                //     "status":1,//未使用 2：已使用 3：已过期,4:已绑定,
                //     "activateStatus":"已激活"//已激活 false：未激活
                // },
            ],
            multipleSelection: [],//el表格复选框选中后的行 组成的数组
            todopage: {
                total: 1,
                limit: 10,  //每页显示多少条 limit
                page: 1 //当前页码 page
            },
            dialogVisible1:false,//备注弹窗开关
            remark:"hehe",//备注临时存放处
            remarkId:'',//添加备注行的id临时存放处
            onoff:1,
            timeRange:[],//时间范围
            param: {
                status:'',//1：未使用 2：已使用
                receiveUser:'',
                startUsetime:'',
                endUsetime:'',
            },
            couponId:'',
          }
        },
        computed:{
            // 将选取值拼成新的数组，用于批量更改状态的时候传给后端
            multipleSelect:function(){
                var arr=[];
                this.multipleSelection.forEach(function(val){
                    arr.push(val.id);
                });
                return arr.toString();
            }
        },
        mounted: function () {
            // this.couponId= this.$route.params.id;
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            //添加备注弹窗关闭按钮方法
            handleClose(done) {
                this.$confirm('确认关闭？')
               .then(_ => {
                 done();
               })
               .catch(_ => {});
            },
            init: function () {
                this.couponId= this.$route.params.id;
                // let id = this.$route.params.id;
                // $('#list-content').mLoading("show");
                // marketing.conponList(this, id).then(function (response) {
                //     let body = response.body;
                //     if (body && body.code == 1 && body.data) {
                //         this.dataList = body.data.items;
                //         this.todopage.total = data.total;
                //         return;
                //     }
                // }, function (response) {
                //     console.log('error:', response);
                // });
                // this.getResource(1, this.todopage.limit);

            },
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit,
                };
                this.todopage.limit = limit;
                this.todopage.page = page;
                for (let k in this.param) {
                    param[k] = this.param[k];
                }
                let couponId=this.$route.params.id;
                let idO={couponId};
                $('#list-content').mLoading("show");
                marketing.conponList(this,couponId, param).then(function (response) {
                    let body = response.body;
                    // this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.dataList = body.data.items;
                        this.todopage.total = body.data.total;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });

            },
            // 日期插件开始时间和结束时间的数组分配给两个参数
            changeTime:function(val){
                this.param.startUsetime=val.substring(0,19);
                this.param.endUsetime=val.substring(22);
            },
            // el表格复选框点击选择功能
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 批量禁用方法
            forbiddenBatchId:function() {
                let ids=this.multipleSelect;
                if(ids.length!=0){
                    let params={ids,ids};
                    $('#list-content').mLoading("show");
                    marketing.forbiddenBatch(this, params).then(function (response) {
                        let body = response.body;
                        this.$message(body.msg);
                        if (body && body.code == 1) {
                            this.getResource(this.todopage.page, this.todopage.limit);
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }
                else
                {
                    console.log("请选择要禁用的对象");
                }
            },
            // 单个禁用方法
            forbiddenSingleId:function(id) {
                let ids=id;
                let params={ids,ids};
                $('#list-content').mLoading("show");
                marketing.forbiddenBatch(this, params).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            // 批量激活方法
            enableBatchId:function() {
                let ids=this.multipleSelect;
                if(ids.length!=0)
                {
                    let params={ids,ids};
                    $('#list-content').mLoading("show");
                    marketing.enableBatch(this, params).then(function (response) {
                        let body = response.body;
                        this.$message(body.msg);
                        if (body && body.code == 1) {
                            this.getResource(this.todopage.page, this.todopage.limit);
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }
                else
                {
                    console.log("请选择要激活的对象");
                }
            },
            // 单个启用方法
            enableSingleId:function(id) {
                let ids=id;
                let params={ids,ids};
                $('#list-content').mLoading("show");
                marketing.enableBatch(this, params).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            //搜索查询按钮
            searchCou: function () {
                console.log("这是查询按钮的点击事件");

                this.getResource(1, this.todopage.limit);
            },
            //备注弹窗按钮
            addRemarksId: function (id) {
                this.remark="";
                this.dialogVisible1 = true;
                this.remarkId=id;
            },
            //备注弹窗确认按钮
            confirmAddRemarks:function(id){
                if(!this.remark.length==0)
                {
                    var id=this.remarkId;
                    var content=this.remark;
                    let param={id:id,content:content};
                    marketing.addRemarks(this,param).then(function(response){
                        let body = response.body;
                        this.$message(body.msg);
                        if (body && body.code == 1) {
                            this.getResource(this.todopage.page, this.todopage.limit);
                        }
                    },function(res){
                        console.log('error:',res);
                    });
                    this.dialogVisible1 = false;
                }
            },
            // 导出excel
            triggerForm:function(){
                var couponId=this.couponId;
                var url=marketing.exportByUrl(this,couponId);
                window.open(url);
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
    //
</script>
s