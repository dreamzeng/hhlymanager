<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">业务管理</li>
                        <li class="active">业务角色列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">业务角色列表</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <router-link class="btn btn-info btn-sm" :to="{name: 'operationControl_bizroleAdd'}">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        添加
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column
                                            type="index"
                                            width="100"
                                            label="序号">
                                        </el-table-column>
                                        <el-table-column prop="name" label="名称">
                                        </el-table-column>
                                        <el-table-column label="编码">
                                            <template slot-scope="item">
                                                {{item.row.code}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="状态">
                                            <template slot-scope="item">
                                                {{item.row.state == 0 ? '启用' : item.row.state == 1 ? '禁用' :'删除' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="300" v-if="superMan" >
                                            <template slot-scope="item">
                                                <button title="编辑"  class="btn btn-primary btn-xs" @click="modify(item.row.uuid)">编辑</button>
                                                <button title="删除"  class="btn btn-danger btn-xs" @click="handleDel(item.row)">删除</button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
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

<script>
    import Page from 'components/common/Page';
    import {cookieTools} from 'lib/utils';

    import {bizroleApi} from 'api/operationControl';

    export default {
        name: 'BizroleList',
        components: {Page: Page},
        data: function () {
            let _todopage = cookieTools.get('todopage') || '{}';
            let todopage = JSON.parse(_todopage);
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: todopage['limit'] || 10,  //每页显示多少条 limit
                    page: todopage['page'] || 1 //当前页码 page
                },
                superMan:false //是否是超级管理员
            }
        },
        watch: {
            todopage:{
                handler:function(curVal,oldVal){
                    cookieTools.set('todopage',JSON.stringify(curVal));
                },
                deep:true
            }
        },
        mounted: function () {
            this.$nextTick(function () {
               
            });
        },
        methods: {
            search: function () {
                this.getResource(1, this.todopage.limit);
            },
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;
             
                $('#list-content').mLoading("show");
                bizroleApi.list(this,param).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.todopage.total = data.total;
                        this.dataList = data.items;
                        this.superMan = data.superMan;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            modify: function (id) {
                this.$router.push({name: 'operationControl_bizroleModify', params: {id: id}});
            },
            handleDel: function(row){
                let _this = this;
                this.$confirm('确认删除 名称：'+row.name+'？', '确定删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    bizroleApi.del(this,{
                        uuid:row.uuid,
                        state:'2'
                    }).then(response=>{
                        _this.search();
                        let res = response.data;
                        if(res.code == 1){
                        _this.$notify({
                            title: '成功',
                            message: res.message,
                            type: 'success',
                            duration: 2000
                        });
                        }
                    });
                }).catch(() => {

                });
            }
        }
    }
    //
</script>
