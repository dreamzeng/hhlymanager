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
                        <li click="active">第三方管理</li>
                        <li click="active">律所管理</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">律所管理</div>
                                <div class="col-md-4 col-md-offset-4 text-right">
                                    <a class="btn btn-primary icon icon-plus" @click="addEditType('-1')">新增律所</a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param">
                                            <el-form-item  label="律所名称：" style="margin-bottom:0">
                                                <el-input v-model="param.lawofficeName" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="带团律师名称：" style="margin-bottom:0">
                                                <el-input v-model="param.leaderLawyerName" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="律师执业证号：" style="margin-bottom:0">
                                                <el-input v-model="param.practiceNo" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <el-button type="danger" @click="searchCou">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body img">
                                    <el-table :data="dataList" border tooltip-effect="dark" style="width: 100%">
                                        <!-- <el-table-column align="center" label="序号" type="index" width=150></el-table-column> -->
                                        <el-table-column align="center" prop="lawofficeName" label="律所名称" fixed width="150"></el-table-column>
                                        <el-table-column align="center" label="律所logo" width="160">
                                            <template slot-scope="item">
                                                <img style="max-width:100%" v-if="item.row.logo" :src="item.row.logo" @click="showPic(item.row.logo)">
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="leaderLawyerName" label="带团律师" width="100"></el-table-column>
                                        <el-table-column align="center" prop="leaderLawyerPhone" label="注册账号" width="200"></el-table-column>
                                        <el-table-column align="center" label="执业证" width="160">
                                            <template slot-scope="item">
                                                <img v-if="item.row.practiceNoImage" :src="item.row.practiceNoImage" @click="showPic(item.row.practiceNoImage)">
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="practiceNo" label="执业证号" width="200"></el-table-column>
                                        <el-table-column align="center" label="税务登记证" width="160">
                                            <template slot-scope="item">
                                                <img v-if="item.row.taxRegistrationnoImage" :src="item.row.taxRegistrationnoImage" @click="showPic(item.row.taxRegistrationnoImage)">
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="taxRegistrationno" label="税务登记证号" width="200"></el-table-column>
                                        <el-table-column align="center" label="开户许可证" width="160">
                                            <template slot-scope="item">
                                                <img v-if="item.row.openAccountnoImage" :src="item.row.openAccountnoImage" @click="showPic(item.row.openAccountnoImage)">
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="openAccountno" label="开户许可证号" width="200"></el-table-column>
                                        <!-- <el-table-column align="center" prop="specName" label="合伙人" width="200"></el-table-column> -->
                                        <el-table-column align="center" prop="lawofficeAddress" label="律所详细地址" width="200"></el-table-column>
                                        <el-table-column align="center" label="操作" prop="" width="210" fixed="right">
                                            <template slot-scope="scope">
                                                <el-button type="success" @click="lawyerList(scope.row.uuid)" size="mini">成员列表</el-button>
                                                <el-button type="info" @click="addEditType(scope.row.uuid)" size="mini">编辑</el-button>
                                                <el-button type="danger" @click="deleteId(scope.row.uuid)" size="mini">删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <!-- 备注弹框 -->
                                    <el-dialog
                                      title="提示："
                                      :visible.sync="dialogVisible1"
                                      size="tiny">
                                      <div style="text-align:center;font-size:16px">确认删除{{lawName}}吗？</div>
                                      <span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogVisible1 = false">取 消</el-button>
                                        <el-button type="primary" @click="confirmAddRemarks">确 定</el-button>
                                      </span>
                                    </el-dialog>
                                </div>
                            </div>
                            <page v-on:todoPage="getResource" :total="todopage.total" :limit="todopage.limit" :page="todopage.page"></page>
                        </div>
                        <el-dialog title="图片预览" :visible.sync="dialogTableVisible" class="dialog">
                            <img class="showImg" :src="srcTemp" alt="没有图片或者图片未展示">
                        </el-dialog>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--main content end-->
</template>

<style scoped>
.img img{max-width:160px;max-height:35px;}
.dialog{text-align:center;vertical-align:middle;}
.showImg{max-width:100%;max-height:100%;}
</style>

<script>
    import Page from 'components/common/Page';
    import asking from 'api/third';
    export default {
        name:'typeList',
        components: {Page: Page},
        data() {
          return {
            dialogTableVisible:false,
            srcTemp:'',
            param:{
                lawofficeName:"",
                leaderLawyerName:"",
                practiceNo:"",
            },
            dataList: [
                {
                    "lawofficeAddress": "律所地址",
                   "lawofficeName": "律所名称",
                   "leaderLawyerName": "带团律师名称",
                   "leaderLawyerPhone": "带团律师注册帐号",
                   "logo": "律所logo图片地址",
                   "openAccountno": "开户许可证号",
                   "openAccountnoImage": "开户许可证",
                   "practiceNo": "执业证号",
                   "practiceNoImage": "执业证",
                   "taxRegistrationno": "税务登记证号",
                   "taxRegistrationnoImage": "税务登记证",
                   uuid:3

                }
            ],
            todopage: {
                total: 1,
                limit: 10,  //每页显示多少条 limit
                page: 1 //当前页码 page
            },
            dialogVisible1:false,//备注弹窗开关
            typeId:'',//添加备注行的id临时存放处
            lawName:'',//删除律所名字临时存放处
          }
        },
        mounted: function () {
            this.$nextTick(function () {
                // this.init();
            });
        },
        methods: {
            //预览图片
            showPic(src)
            {
                this.srcTemp=src;
                this.dialogTableVisible=true;
            },
            //添加或者编辑案件分类
            addEditType:function(id){
                this.$router.push({name:'law_firm_addEdit',params:{id:id}});
            },
            searchCou: function () {
                this.getResource(1,this.todopage.limit);
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
                asking.layFirmList(this, param).then(function (response) {
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
            //备注弹窗按钮
            lawyerList: function (id) {
                this.$router.push({name:"firm_law_manage",params:{id:id}});
            },
            //备注弹窗确认按钮
            confirmAddRemarks:function(id){
                var id=this.typeId;
                asking.deleteFirm(this,id).then(function(response){
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
