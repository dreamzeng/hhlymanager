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
                        <li click="active">成员列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">成员列表</div>
                                <div class="col-md-4 col-md-offset-4 text-right">
                                    <a class="btn btn-primary icon icon-plus" @click="addEditLawyer('-1')">新增成员</a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param">
                                            <el-form-item  label="姓名：" style="margin-bottom:0">
                                                <el-input v-model="param.empName" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="手机号码：" style="margin-bottom:0">
                                                <el-input v-model="param.phone" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="执业证号：" style="margin-bottom:0">
                                                <el-input v-model="param.practiceNo" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <el-button type="danger" @click="searchCou">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable img">
                                <div class="panel-body">
                                    <el-table :data="dataList" border tooltip-effect="dark" style="width:100%">
                                        <!-- <el-table-column align="center" label="序号" type="index" width=150></el-table-column> -->
                                        <el-table-column align="center" prop="specName" label="头像">
                                            <template slot-scope="scope">
                                                <img :src="scope.row.logo" alt="">
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="empName" label="姓名"></el-table-column>
                                        <el-table-column align="center" label="级别">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.leve==1">带团律师</span>
                                                <span v-if="scope.row.leve==2">专职律师</span>
                                                <span v-if="scope.row.leve==3">律师助理</span>
                                                <span v-if="scope.row.leve==4">实习律师</span>
                                                <!-- 律师等级 1.带团律师 2.专职律师 3.律师助理 4.实习律师 -->
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
                                        <el-table-column align="center" prop="practiceNo" label="执业证号"></el-table-column>
                                        <el-table-column align="center" label="执业证">
                                            <template slot-scope="scope">
                                                <img v-if="scope.row.practiceNoImage" :src="scope.row.practiceNoImage" alt="" @click="showPic(scope.row.practiceNoImage)">
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" label="身份证正面">
                                            <template slot-scope="scope">
                                                <img v-if="scope.row.idcardFrontImage" :src="scope.row.idcardFrontImage" alt="" @click="showPic(scope.row.idcardFrontImage)">
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" label="身份证背面">
                                            <template slot-scope="scope">
                                                <img v-if="scope.row.idcardBackImage" :src="scope.row.idcardBackImage" alt="" @click="showPic(scope.row.idcardBackImage)">
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="idCard" label="身份证号"></el-table-column>

                                        <el-table-column align="center" label="操作" prop="" width="180">
                                            <template slot-scope="scope">
                                                <el-button type="info" @click="addEditLawyer(scope.row.uuid)" size="mini">编辑</el-button>
                                                <el-button :disabled="!scope.row.isEdit" type="danger" @click="deleteId(scope.row.uuid)" size="mini">删除</el-button>
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
        name:'laywerList',
        components: {Page: Page},
        data() {
          return {
            dialogTableVisible:false,
            srcTemp:'',
            dataList: [
                {
                    "uuid":"唯一业务ID",
                   "empName": "姓名",
                   "idCard": "身份证号",
                   "idcardBackImage": "身份证图片路径背面",
                   "idcardFrontImage": "身份证图片路径正面",
                   "leve": 1,//注释：1.带团律师 2.专职律师 3.律师助理 4.实习律师
                   "logo": "头像图片地址",
                   "phone": "手机号码",
                   "practiceNo": "执业证号",
                   "practiceNoImage": "执业证图片地址",
                   isEdit: true
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

            param: {
                empName:'',
                phone:'',
                practiceNo:'',
                lawofficeUuid:'',
            },
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
            addEditLawyer:function(id){
                let firmid=this.$route.params.id;//这个是律所的uuid,lid为律师uuid
                this.$router.push({name:'firm_law_addEdit',params:{id:firmid,lid:id}});
            },
            init: function () {
                this.getResource(1,this.todopage.limit);
            },
            searchCou: function (id) {
                this.init();
            },
            getResource: function (page, limit) {
                this.todopage.limit = limit;
                this.todopage.page = page;
                this.param.lawofficeUuid=this.$route.params.id;
                // let uuid=this.$route.params.id;
                let param = {
                    page: page, limit: limit
                };
                for (let k in this.param) {
                    param[k] = this.param[k];
                }
                asking.lawerList(this,param).then(function (response) {
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
            searchCou: function (id) {
                this.$router.push({name:"firm_law_manage",params:{id:id}});
            },
            //备注弹窗确认按钮
            confirmAddRemarks:function(id){
                var id=this.typeId;
                asking.deleteLawyer(this,id).then(function(response){
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
            // back:function(){
            //     this.$router.go(-1);
            // }
        }
    }
    //
</script>
