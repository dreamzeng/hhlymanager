<!-- 客服与帮助 -->
<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li click="active">问答管理</li>
                        <li click="active">客服与帮助</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">客服与帮助</div>
                                <div class="col-md-4 col-md-offset-4 text-right">
                                    <a class="btn btn-primary icon icon-plus" @click="addEditType('-1')">新增问答</a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="table-scrollable">
                                <div class="panel-body">
                                    <el-table :data="dataList" border tooltip-effect="dark" style="width:100%">
                                        <el-table-column align="center" prop="id" label="序号" type="index" width="100">
                                        </el-table-column>
                                        <el-table-column align="center" prop="levels" label="目录级别">
                                        </el-table-column>
                                        <el-table-column align="center" prop="title" label="问题标题">
                                        </el-table-column>
                                        <!-- <el-table-column align="center" prop="parentId" label="一级分类">
                                        </el-table-column> -->
                                        <el-table-column align="center" prop="createTime" label="时间">
                                        </el-table-column>
                                        <el-table-column align="center" label="操作" prop="operate" width="200">
                                            <template slot-scope="scope">
                                                <el-button type="info" @click="addEditType(scope.row.helpCenterId)" size="mini">编辑</el-button>
                                                <el-button type="danger" @click="deleteId(scope.row.helpCenterId)" size="mini">删除</el-button>
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
                                        <el-button type="primary" @click="confirmDelete">确 定</el-button>
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
        name:'faqList',
        components: {Page: Page},
        data() {
          return {
                    //新添加内容都在上面
            dataList: [
                {
                    "id": 1,
                    "title": "平台安全",
                    "sort": 1,
                    "parentId": 0,
                    "levels": 1,
                    "createTime": "2017-09-06 18:06:33",
                    "updateTime": "2017-09-06 18:06:33"
                },
            ],
            todopage: {
                total: 1,
                limit: 10,  //每页显示多少条 limit
                page: 1 //当前页码 page
            },
            dialogVisible1:false,//备注弹窗开关
            deleteTempId:'',//添加备注行的id临时存放处
            // param: {
            //     status:'',//1：未使用 2：已使用
            //     receiveUser:'',
            //     startUsetime:'',
            //     endUsetime:'',
            // },
            // couponId:'',
          }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            // handleChange(value) {
            //     console.log(value);
            // },
            //添加或者编辑案件分类
            addEditType:function(id){
                this.$router.push({name:'add_edit_faq',params:{id:id}});
            },


            //新添加方法都在上面
            //添加备注弹窗关闭按钮方法
            // handleClose(done) {
            //     this.$confirm('确认关闭？')
            //    .then(_ => {
            //      done();
            //    })
            //    .catch(_ => {});
            // },
            init: function () {
                this.getResource(1,this.todopage.limit);
            },
            getResource: function (page, limit) {
                $('#list-content').mLoading("show");
                let param = {
                    page: page, limit: limit,
                };
                this.todopage.limit = limit;
                this.todopage.page = page;
                // for (let k in this.param) {
                //     param[k] = this.param[k];
                // }
                asking.listFAQ(this, param).then(function (response)
                {
                    let body = response.body;
                    // this.$message(body.msg);
                    if (body && body.code == 1 && body.data) {
                        this.dataList = body.data.items;
                        this.todopage.total = body.data.total;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            // 日期插件开始时间和结束时间的数组分配给两个参数
            // changeTime:function(val){
            //     this.param.startUsetime=val.substring(0,19);
            //     this.param.endUsetime=val.substring(22);
            // },
            // el表格复选框点击选择功能
            // handleSelectionChange(val) {
            //     this.multipleSelection = val;
            // },

            //搜索查询按钮
            // searchCou: function () {
            //     console.log("这是查询按钮的点击事件");

            //     this.getResource(1, this.todopage.limit);
            // },
            //删除弹窗按钮
            deleteId: function (id) {
                this.dialogVisible1 = true;
                this.deleteTempId=id;
            },
            //备注弹窗确认按钮
            confirmDelete:function(id){
                var id=this.deleteTempId;
                asking.deleteFAQ(this,id).then(function(response)
                {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1)
                    {
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