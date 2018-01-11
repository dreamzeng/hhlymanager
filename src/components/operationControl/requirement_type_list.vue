<!-- 规格属性列表 -->
<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li click="active">业务管理</li>
                        <li click="active">规格属性</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">规格属性</div>
                                <div class="col-md-4 col-md-offset-4 text-right">
                                    <a class="btn btn-primary icon icon-plus" @click="addEditType('-1')">新增规格属性</a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body">
                                    <el-table :data="dataList" border tooltip-effect="dark" style="width:100%">
                                        <el-table-column align="center" label="序号" type="index" width=150>
                                        </el-table-column>
                                        <el-table-column align="center" prop="specId" label="规格属性ID">
                                        </el-table-column>
                                        <el-table-column align="center" prop="specName" label="规格属性名称">
                                        </el-table-column>
                                        <el-table-column align="center" label="操作" prop="" width="200">
                                            <template slot-scope="scope">
                                                <el-button type="info" @click="addEditType(scope.row.specId)" size="mini">编辑</el-button>
                                                <el-button type="danger" @click="deleteId(scope.row.specId)" size="mini">删除</el-button>
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
        name:'typeList',
        components: {Page: Page},
        data() {
          return {
            dataList: [
                {
                    "specId": "4fc6281591f6428b91d4111f5dbb183b",
                    "specName": "轮次",
                    "specDesc": "轮次",
                    "specSort": 9,
                    "state": 1
                }
            ],
            todopage: {
                total: 1,
                limit: 10,  //每页显示多少条 limit
                page: 1 //当前页码 page
            },
            dialogVisible1:false,//备注弹窗开关
            typeId:'',//添加备注行的id临时存放处
            // param: {
            //     status:'',//1：未使用 2：已使用
            //     receiveUser:'',
            //     startUsetime:'',
            //     endUsetime:'',
            // },
          }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            //添加或者编辑案件分类
            addEditType:function(id){
                this.$router.push({name:'add_edit_requirement',params:{id:id}});
            },
            init: function () {
            },
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit,
                };
                this.todopage.limit = limit;
                this.todopage.page = page;
                // for (let k in this.param) {
                //     param[k] = this.param[k];
                // }
                asking.specList(this, param).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        this.dataList = body.data.items;
                        this.todopage.total = body.data.total;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });

            },
            //备注弹窗按钮
            deleteId: function (id) {
                this.dialogVisible1 = true;
                this.typeId=id;
            },
            //备注弹窗确认按钮
            confirmAddRemarks:function(id){
                var id=this.typeId;
                asking.deleteId(this,id).then(function(response){
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