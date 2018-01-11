<!-- 问题分类页面 -->
<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li> 过往案例</li>
                        <li click="active">过往案例</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">过往案例</div>
                                <div class="col-md-4 col-md-offset-4 text-right">
                                    <a class="btn btn-primary icon icon-plus" @click="addEditType('-1')">新增</a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                           <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <form @submit.prevent="search" :model="param">
                                            <div class="form-group">
                                                <input type="text" style="width: 250px" class="form-control" placeholder="搜索律师名字" v-model.trim="param.lawyerName"  >
                                            </div>
                                            <button type="submit" class="btn btn-danger" @click="search">搜索</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body">
                                    <el-table :data="dataList" border tooltip-effect="dark" style="width:100%" >
                                        <el-table-column align="center" label="案例名称" prop="caseName">
                                        </el-table-column>
                                        <el-table-column align="center" label="案例年份"  prop="caseYear" width="180">
                                        </el-table-column>
                                        <el-table-column align="center"  label="审理法院"  prop="courtName">
                                        </el-table-column>
                                        <el-table-column align="center"  label="关联律师"  prop="lawyerName" width="180">
                                        </el-table-column>
                                        <el-table-column align="center" label="操作" width="200">
                                            <template slot-scope="item">
                                                 <el-button type="info" @click="addEditType(item.row.uuid,item.row)" size="mini">编辑</el-button>
                                                <el-button type="danger" @click="deleteId(item.row.uuid)" size="mini">删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <!-- 弹框 -->
                                    <el-dialog
                                      title="提示："
                                      :visible.sync="dialogVisible1"
                                      size="tiny">
                                      <div style="text-align:center;font-size:16px">确定删除该条信息?</div>
                                      <span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogVisible1 = false">取 消</el-button>
                                        <el-button type="primary" @click="confirmAddRemarks()">确 定</el-button>
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
    import apiCase from 'api/case';
    export default {
        name:'typeList',
        components: {Page: Page},
        data() {
          return {
            dataList: [],
            param:{
                lawyerName:'',  
            },
            todopage: {
                total: 1,
                limit: 10,  
                page: 1 
            },
            dialogVisible1:false,
            typeId:''
          }
        },
        methods: {
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;
                 for (let k in this.param) {
                    if(this.param[k]){
                        param[k] = this.param[k];
                    }
                }
                $('#list-content').mLoading("show");
                apiCase.caseList(this, param).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.todopage.total = data.total;
                        this.dataList = data.items.items;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            //添加案件
            addEditType:function(id,list){
                console.log(list);
                if(id == -1){
                    this.$router.push({name:'pase_cases_add',params:{id:id}});
                }else{
                    let params = {
                        id:list.id,
                        uuid:list.uuid,
                        caseName:list.caseName,
                        caseYear:list.caseYear,
                        office:list.courtName,
                        lawyerId:list.lawyerId,
                        lawyerName:list.lawyerName
                    }
                    this.$router.push({name:'pase_cases_edit',params});
                }
            },
            //弹窗按钮
            deleteId: function (id) {
                this.dialogVisible1 = true;
                this.typeId=id;
            },
            //弹窗确认按钮
            confirmAddRemarks:function(){
                let _this = this,
                    params = {
                        uuid:_this.typeId
                    };
                _this.dialogVisible1 = false;
                apiCase.deteleCase(_this,params).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                         _this.getResource(1, _this.todopage.limit);
                         _this.$message({
                          message: body.msg
                        });
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            search: function () {
                this.getResource(1, this.todopage.limit);
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
</script>
