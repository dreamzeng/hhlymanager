<template>
    <div id="main-content">
    <div class="wrapper">
        <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">数据统计</li>
                        <li class="active">资讯统计</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
        <div class="panel">
            <div class="panel-body">
                <el-form :inline="true">
                    <el-form-item label="应用选择">
                        <el-select  v-model="param.userType" @change="selectChange" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="律师端" value="1"></el-option>
                            <el-option label="用户端" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属模块">
                        <el-select  v-model="param.categoryId" @change="selectChange" placeholder="请选择">
                             <el-option label="全部" value=""></el-option>
                            <el-option
                                v-for="item in articleCategorys"
                                :key="item.code"
                                :label="item.value"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="panel">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-lg-4">资讯统计</div>
                            <div class="col-lg-8" style="text-align: right">
                               <a :href="exportArticle" target="_blank" class="btn btn-info"><i class="icon-location-arrow"></i>&nbsp;&nbsp;导出</a>
                            </div>
                        </div>
                    </div>
                    <div  class="dataTables_wrapper form-inline" id="list-content">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="panel-body">
                                    <el-form :inline="true" :model="param">
                                        <el-form-item label="标题">
                                            <el-input v-model="param.title" placeholder="标题"></el-input>
                                        </el-form-item>
                                        <el-form-item label="创建者">
                                            <el-input v-model="param.realName" placeholder="创建者"></el-input>
                                        </el-form-item>
                                        <el-button type="danger" @click="search">搜索</el-button>
                                    </el-form>

                                </div>
                            </div>
                        </div>

                        <div class="table-scrollable">
                            <div class="panel-body panel-body-rest">
                                <!--表格-->
                                <el-table :data="dataList" border style="width: 100%">
                                    <el-table-column prop="articleTitle" label="文章标题" ></el-table-column>
                                    <el-table-column prop="articleCategoryName" label="所属模块" ></el-table-column>
                                    <el-table-column prop="readNum" label="阅读量" ></el-table-column>
                                    <el-table-column prop="commentNum" label="评论数" ></el-table-column>
                                    <el-table-column prop="collectNum" label="收藏数" ></el-table-column>
                                    <el-table-column prop="shareNum" label="分享数" ></el-table-column>
                                    <el-table-column prop="createTime" label="创建时间" ></el-table-column>
                                    <el-table-column prop="updateTime" label="最后修改时间" ></el-table-column>
                                    <el-table-column prop="createUser" label="创建者" ></el-table-column>
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
</template>
<script>
    import apiCanalCharts from 'api/canalCharts';
    import {article}  from 'api/info';
    import { Loading } from 'element-ui';
    import Page from 'components/common/Page';

    export default {
        name: 'userOperChartsKeep',
        components: {Page},
        data() {
            return {
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page:  1 //当前页码 page
                },
                dataList:[],
                param:{
                    title:'',
                    realName:'',
                    userType :'', //应用选择
                    categoryId:''
                },
                articleCategorys:[],//所属资讯分类
                listLoading: false,
               
               
            };
        },
        computed:{
            exportArticle(){
                let url = apiCanalCharts.exportArticle();
                let param = Object.assign({},this.param);
                let temp = [];
                Object.keys(param).map(key => {
                    if(param[key]){
                        temp.push(key+'='+param[key]);
                    }
                });
                param  = temp.length > 0 ? '?'+temp.join('&') :'';
                return url+param;
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.articleCategorys.length == 0 && this.getArticleCategorys();
            });
        },
        methods: {
            getArticleCategorys: function(){
                article.articleCategory(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        for(let i = 0,l=data.length;i<l;i++){
                            this.articleCategorys.push({
                                code:data[i]['categoryId'],
                                value:data[i]['categoryName']
                            });
                        }
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            getResource(page, limit) {
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
                apiCanalCharts.articleList(this, param).then(function (response) {
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
            search(){
                 this.getResource(1, this.todopage.limit);
            },
            selectChange(value){
               this.getResource();
            }
        }
    }
</script>
