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
                        <li class="active">业务列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">业务列表</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <router-link :to="{name: 'operation_goods_edit',params: {type:1,id:1}}" class="btn btn-info  btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        新建业务
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param">
                                            <el-form-item label="选择业务">
                                                <el-select v-model="param.categoryId" filterable placeholder="请选择">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="是否上架">
                                                <el-select v-model="param.state" placeholder="请选择" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option label="草稿" value="1"></el-option>
                                                    <el-option label="上架" value="2"></el-option>
                                                    <el-option label="下架" value="3"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-button type="danger" @click="search">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column type="index" width="60">
                                        </el-table-column>
                                        <el-table-column prop="id" label="业务ID">
                                        </el-table-column>
                                        <el-table-column prop="name" label="服务名称">
                                        </el-table-column>
                                        <el-table-column prop="categoryName" label="业务类型">
                                        </el-table-column>
                                        <el-table-column label="价格">
                                            <template slot-scope="item">
                                                {{item.row.priceConfirm == 0 ? item.row.priceStart : item.row.priceStart + '-' + item.row.priceEnd  }}{{item.row.unit}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="是否上架">
                                            <template slot-scope="item">
                                                <el-tag
                                                    :type="item.row.state && (item.row.state.code == '1' ? 'warning' : item.row.state.code == '2' ? 'success' : 'danger') || '' "
                                                    close-transition> {{item.row.state && item.row.state.value || ''  }}</el-tag>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="快捷入口">
                                            <template slot-scope="item">
                                                <!-- <el-tag
                                                    :type="item.row.state && (item.row.state.code == '1' ? 'warning' : item.row.state.code == '2' ? 'success' : 'danger') || '' "
                                                    close-transition> {{item.row.state && item.row.state.value || ''  }}</el-tag> -->
                                                    <el-tag type="success" v-if="item.row.shortcutType&&item.row.shortcutType.code">{{item.row.shortcutType.value}}</el-tag>
                                            </template>
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作">
                                            <template slot-scope="item">
                                                <button title="修改" class="btn btn-primary btn-xs" @click="modify(item.row.id)"><i class="icon-pencil"></i>修改</button>
                                                <!-- <button title="删除" v-if="1!=1" class="btn btn-danger btn-xs" @click="confirm(item.row)"><i class="icon-trash"></i>删除</button> -->
                                                <button title="删除" class="btn btn-danger btn-xs" @click="confirm(item.row)"><i class="icon-trash"></i>删除</button>
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
        <!-- 删除确认 -->
        <confirm v-on:confirm="deleteItem" :message="message" :title="title"></confirm>
    </div>
    <!--main content end-->
</template>

<script>
    import Page from 'components/common/Page';
    import apiOperaCon from 'api/operationControl';
    import confirm from 'components/common/confirm';

    export default {
        name: 'goodsList',
        components: {Page: Page, confirm: confirm},
        data: function () {
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    state:'',
                    categoryId:''
                },
                options:[],
                rowItemId: -9999,
                message: '',
                title: '是否删除该条信息? '
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                //获取级联参数
                let _this = this;
                this.gradeCategory(0,function(opt){
                    _this.options = opt;
                });
            },
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
                for (let k in this.param) {
                    if(this.param[k]){
                        param[k] = this.param[k];
                    }
                }
                $('#list-content').mLoading("show");
                apiOperaCon.goodsList(this, param).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.todopage.total = data.total;
                        this.dataList = data.items;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            // 获取级联信息
            gradeCategory: function(id,cb=function(opt){console.log(opt)}){
                apiOperaCon.gradeCategory(this, id).then(function (response) {
                    let body = response.body;
                    let opt = [];
                    if (body && body.code == 1) {
                        let data = body.data;
                        for (let i= 0,l = data.length;i<l;i++) {
                            opt.push({
                                value: data[i]['id']+'',
                                label: data[i]['name']
                            });
                        }
                        cb(opt);
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            confirm: function (item) { //删除确认
                this.rowItemId = item.id;
                this.message = '标题：' + item.name;
                $('#myConfirm').modal();
            },
            deleteItem: function (id) {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                apiOperaCon.goodsDel(this, this.rowItemId).then(function (response) {
                    let body = response.body;
                    apiOperaCon.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            modify: function (id) {
                this.$router.push({name: 'operation_goods_edit', params: {type: 2, id: id}});
            }
        }
    }
    //
</script>
