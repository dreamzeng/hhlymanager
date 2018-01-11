<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li @click="back"> <a href="javascript:void(0)">用户端内容管理</a></li>
                        <li click="active">问答管理</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">问答社区</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align:right;">
                                    <a class="btn btn-primary icon icon-plus" @click="showInfo('-1')">新增问答</a>
                                </div>

                            </div>

                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param" @submit.prevent="">
                                            <el-form-item  label="问题状态：">
                                                <el-select v-model="param.finishStatus" placeholder="请选择">
                                                    <el-option
                                                      key="0"
                                                      label="未接单"
                                                      value="0">
                                                    </el-option>
                                                    <el-option
                                                      key="1"
                                                      label="已接单"
                                                      value="1">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item  label="用户名：">
                                                <el-input v-model="param.userName" placeholder="用户昵称或者问题描述" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="供应商：">
                                                <el-input v-model="param.lawyerName" placeholder="供应商名字" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="关键字：">
                                                <el-input v-model="param.contentKey" placeholder="问题描述关键字" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <!-- <el-form-item  label="案件类型：">
                                                <el-cascader
                                                    expand-trigger="click"
                                                    :options="options"
                                                    v-model="param.caseIds"
                                                    @change="handleChange"
                                                    change-on-select>
                                                </el-cascader>
                                            </el-form-item> -->

                                            <el-form-item  label="案件类型：">
                                                <el-select v-model="param.caseId" placeholder="请选择">
                                                    <el-option
                                                      v-for="item in options"
                                                      :key="item.id"
                                                      :label="item.name"
                                                      :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item  label="使用时间：">
                                                <el-date-picker
                                                  v-model="timeRange"
                                                  type="datetimerange"
                                                  placeholder="选择时间范围" @change="changeTime">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-form-item  label="推荐状态：">
                                                <el-select v-model="param.hotStatus" placeholder="请选择">
                                                    <el-option
                                                      key="0"
                                                      label="全部"
                                                      value="0">
                                                    </el-option>
                                                    <el-option
                                                      key="1"
                                                      label="已推荐"
                                                      value="1">
                                                    </el-option>
                                                    <el-option
                                                      key="2"
                                                      label="未推荐"
                                                      value="2">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-button type="danger" @click="searchCou">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body">
                                    <el-table :data="dataList" border tooltip-effect="dark" style="width:100%">
                                        <el-table-column align="center" prop="id" label="序号" type="index" width="100">
                                        </el-table-column>
                                        <el-table-column align="center" prop="userId" label="问答ID"> <!-- 未支付订单 这里不显示 -->
                                        </el-table-column>
                                        <el-table-column align="center" prop="userName" label="用户昵称">
                                        <el-table-column align="center" prop="lawyerName" label="供应商">
                                        </el-table-column>
                                        <el-table-column align="center" prop="subCaseName" label="问题类型">
                                        </el-table-column>
                                        </el-table-column>
                                        <el-table-column align="center" prop="question" label="问题描述">
                                        </el-table-column>
                                        <el-table-column align="center" prop="amount" label="金额">
                                        </el-table-column>

                                        <el-table-column align="center" prop="createDate" label="提问时间">
                                        </el-table-column>
                                        <el-table-column align="center" prop="finishDate" label="结单时间">
                                        </el-table-column>
                                        <el-table-column align="center" label="是否公开">
                                            <template slot-scope="item">
                                                <span>{{item.publicStatus==0?"不公开":"公开"}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="readQuantity" label="阅读量">
                                        </el-table-column>
                                        <el-table-column label="操作" prop="operate" width="300">
                                            <template slot-scope="scope">
                                                <!-- //查看功能下期再做 -->
                                                <el-button type="info" @click="showInfo(scope.row.uuid)" size="mini">编辑</el-button>
                                                <el-button type="success" v-if="scope.row.publicStatus==0" size="mini" @click="showHide(scope.row.id,scope.row.publicStatus)" >使其显示</el-button>
                                                <el-button type="danger" v-else size="mini" @click="showHide(scope.row.id,scope.row.publicStatus)">取消显示</el-button>
                                                <el-button type="danger" @click="deleteIdFun(scope.row.id)" size="mini">删除</el-button>
                                                <el-button type="warning" @click="popFun(scope.row.id)" size="mini" v-if="scope.row.hotStatus==0" >推荐至首页</el-button>
                                                <el-button type="primary" size="mini" :disabled="true" v-if="scope.row.hotStatus==1">推荐至首页</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <!-- 备注弹框 -->
                                    <el-dialog
                                      title="提示："
                                      :visible.sync="dialogVisible1"
                                      size="tiny">
                                      <div style="text-align:center;font-size:16px">确认删除吗？</div>
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
    </div>
    <!--main content end-->
</template>

<style scoped>
</style>

<script>
    import Page from 'components/common/Page';
    import asking from 'api/asking';
    export default {
        name:'couponList',
        components: {Page: Page},
        data() {
          return {
            options: [],
            //新添加内容都在上面
            dataList: [
                {
                    // "createDate": "2017-08-21 16:36:20",
                    // "id": 1,
                    // "question": "婚内个人财产分割协议怎么写",
                    // "readQuantity": 1,
                    // "subCaseName": "一般民事",
                    // "userId": 1926,
                    // "userName": "毛祥",
                    // "publicStatus ":0,//0不显示，1显示
                    // "hotStatus":1,
                }
            ],
            // multipleSelection: [],//el表格复选框选中后的行 组成的数组
            todopage: {
                total: 1,
                limit: 10,  //每页显示多少条 limit
                page: 1 //当前页码 page
            },
            dialogVisible1:false,//删除确认弹窗
            deleteId:'',//删除行的id临时存放处
            timeRange:[],//时间范围
            param: {
                startDate:'',
                endDate:'',
                userName:'',
                lawyerName:'',
                contentKey:'',
                finishStatus:'',
                // caseIds:[],
                // subCaseId:'',
                caseId:'',
            },
          }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            // handleChange(value) {
            //     this.param.subCaseId=value[value.length-1];
            // },
            init: function () {
                asking.typeList(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1 && body.data) {
                        this.options=body.data;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
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
                asking.interlocutionList(this,param).then(function (response) {
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
                this.param.startDate=val.substring(0,19);
                this.param.endDate=val.substring(22);
            },
            //搜索查询按钮
            searchCou: function () {
                this.getResource(1, this.todopage.limit);
            },
            //查看详情按钮
            showInfo: function (id) {
                this.$router.push({name:'asking_info',params:{id:id}});
            },

            //显示隐藏
            showHide(id,publicStatus){
                if(publicStatus==1)
                {
                    var status=0;
                }
                else if(publicStatus==0)
                {
                    var status=1;
                }
                console.log(status);
                let param={id:id,publicStatus:status};
                asking.showHide(this,param).then(function(response){
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                },function(res){
                    console.log('error:',res);
                });
            },
            // 删除按钮
            deleteIdFun: function (id) {
                this.deleteId=id;
                this.dialogVisible1=true;
            },
            // 推荐至首页
            popFun: function (popId) {
                let id=popId;
                let hotStatus=1;
                let param={id,hotStatus};
                asking.popHot(this,param).then(function(response){
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                },function(res){
                    console.log('error:',res);
                });
            },
            //备注弹窗确认按钮
            confirmAddRemarks:function(id){
                var id=this.deleteId;
                let param={id:id};
                asking.deleteInt(this,param).then(function(response){
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                },function(res){
                    console.log('error:',res);
                });
                this.dialogVisible1 = false;
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
    //
</script>
s