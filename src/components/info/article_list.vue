<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">资讯管理</li>
                        <li class="active">内容管理</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <button type="button" :class="{'btn':true,'btn-default': param['source'] != 1,'btn-danger': param['source'] == 1}" @click="changesSource('1','自建内容')">自建内容</button>
                            <button type="button" :class="{'btn':true, 'btn-default': param['source'] == 1,'btn-danger': param['source'] != 1}" @click="changesSource('2','爬虫内容')" >爬虫内容</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row"  v-if="param.source == 2">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <a href="javascript:;" @click="changesCrawlerSource('1')">
                                <el-tag :class="{ activeTag : crawlerSource == '1' }" >网站内容</el-tag>
                            </a>
                            <a href="javascript:;" @click="changesCrawlerSource('2')">
                                <el-tag :class="{ activeTag : crawlerSource == '2' }" >微信公众号内容</el-tag>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">{{sourceName}}</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right" v-if="param.source == 1">
                                    <router-link class="btn btn-info btn-sm" :to="{name: 'info_article_add'}">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        添加
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="panel">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-md-12">
                                        <a href="javascript:;" @click="changeState()">
                                            <el-tag :class="{ activeTag : state == '0' }" >全部</el-tag>
                                        </a>
                                        <a href="javascript:;" @click="changeState('publishState','0','1')">
                                            <el-tag :class="{ activeTag : state == '1' }" >未发布</el-tag>
                                        </a>
                                        <a href="javascript:;" @click="changeState('publishState','1','2')">
                                            <el-tag :class="{ activeTag : state == '2' }">已发布</el-tag>
                                        </a>
                                        <a href="javascript:;" @click="changeState('delFlag','1','3')">
                                            <el-tag :class="{ activeTag : state == '3' }">已删除</el-tag>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param">
                                            <el-form-item class="el-form-item-rest" label="开始时间">
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="param.createTimeStart" @change="starTimeChang"></el-date-picker>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="结束时间">
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="param.createTimeEnd" @change="endTimeChang"></el-date-picker>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="标题">
                                                <el-input v-model="param.title" placeholder="标题" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-button type="danger" @click="search">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div  class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column
                                            type="index"
                                            width="100"
                                            label="序号">
                                        </el-table-column>
                                        <el-table-column prop="title" label="标题">
                                        </el-table-column>

                                        <el-table-column  v-if="isSeeker" label="抓取日期">
                                            <template slot-scope="item">
                                                {{item.row.crawlerTime || '' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column  v-if="isSeeker" label="作者">
                                            <template slot-scope="item">
                                                {{item.row.source || '' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column  v-if="isSeeker" label="原文链接">
                                            <template slot-scope="item">
                                                <a :href="item.row.originalUrl" target="_blank">原文链接</a>
                                            </template>
                                        </el-table-column>
                                        <el-table-column  v-if="isSeeker" label="状态">
                                            <template slot-scope="item">
                                                {{item.row.editStatus ? '已编辑' : '未编辑' }}
                                            </template>
                                        </el-table-column>


                                        <el-table-column v-if="!isSeeker" label="分类">
                                            <template slot-scope="item">
                                                {{item.row.categoryName || '' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column v-if="!isSeeker" label="作者">
                                            <template slot-scope="item">
                                                {{item.row.realName || '' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column v-if="!isSeeker" label="创建日期">
                                            <template slot-scope="item">
                                                {{item.row.createTime || '' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column v-if="!isSeeker" label="发布状态">
                                            <template slot-scope="item">
                                                {{item.row.publishState && item.row.publishState.value }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="删除状态" v-if="state == 0 && !isSeeker">
                                                <template slot-scope="item">
                                                {{item.row.delFlag && item.row.delFlag.value }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="是否热门" v-if="state == 2 && !isSeeker">
                                            <template slot-scope="item">
                                                {{item.row.hotFlag && item.row.hotFlag.value }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="是否置顶" v-if="state == 2 && !isSeeker">
                                            <template slot-scope="item">
                                                {{item.row.isTop == 1 ? '是' : '否'}}
                                            </template>
                                        </el-table-column>

                                        <el-table-column fixed="right" label="操作" width="260">
                                            <template slot-scope="item">
                                                <button title="发布" v-if="state == 1" class="btn btn-success btn-xs" @click="doAction({id:item.row.id,publishState:1},'publish','是否发布?')">发布</button>
                                                <button title="下架" v-if="state == 2" class="btn btn-warning btn-xs" @click="doAction({id:item.row.id,publishState:0},'publish','下架后该内容不在显示，您可以在未发布管理查看内容')">下架</button>
                                                <button title="删除" v-if="state == 1" class="btn btn-danger btn-xs" @click="doAction({id:item.row.id,delFlag:1},'delete','是否删除?')">删除</button>
                                                <button title="恢复" v-if="state == 3" class="btn btn-success btn-xs" @click="doAction({id:item.row.id,delFlag:0},'delete','恢复该内容后，将在未发布管理内查看内容')">恢复</button>
                                                <button title="编辑" v-if="state == 1" class="btn btn-primary btn-xs" @click="modify(item.row.articleId)">编辑</button>
                                                <button title="编辑" v-if="isSeeker" class="btn btn-primary btn-xs" @click="seekerModify(item.row.id)">编辑</button>
                                                <button title="预览" v-if="!isSeeker" class="btn btn-info btn-xs" @click="showInfo(item.row.id,item.row.title)">预览</button>
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
        <!-- 详情 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document" style="width: 850px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="myModalLabel">标题：{{showTitle}}</h4>
                    </div>
                    <div class="modal-body">
                        <div v-html="showContent"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
                        <button type="button" id="btn_submit" class="btn btn-primary" data-dismiss="modal"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--main content end-->
</template>

<style scoped>
    .activeTag{
        color: #FFF;background: #2185D0
    }
</style>

<script>
    import Page from 'components/common/Page';
    import {article} from 'api/info';
    import {cookieTools} from 'lib/utils'

    export default {
        name: 'advertCentreList',
        components: {Page: Page},
        data: function () {
            let _serialize =  cookieTools.get('paramFrom') || '{}';
            let paramFrom = JSON.parse(_serialize);
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    createTimeStart: paramFrom['createTimeStart'] ||'',
                    createTimeEnd: paramFrom['createTimeEnd'] ||'',
                    title: paramFrom['title'] ||'',
                    source: paramFrom['source'] || '1', //来源：1 后台；2 爬虫；3 律师
                    publishState:paramFrom['publishState'] ||'',//发布状态 0 未发布；1 已发布
                    delFlag:paramFrom['delFlag'] ||''// 删除状态：0 未删除；1 已删除
                },
                sourceName:'自建内容',
                state: cookieTools.get('advertCentreListState') || '0',
                showTitle:'',
                showContent:'',
                crawlerSource: cookieTools.get('advertCentreListCrawlerSource') || '1' //爬虫来源（当SOURCE=2时有效）：1 网址内容；2 微信公众号内容
            }
        },
        computed: {
            isSeeker:function() {
                if(this.param.source == 2 && this.state == '0'){
                    return true;  //爬虫为全部时
                }
                return false;
            }
        },
        watch: {
            param:{
                //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
                handler:function(curVal,oldVal){
                    cookieTools.set('paramFrom',JSON.stringify(curVal));
                },
                deep:true
            },
            state:function(curVal,oldVal){
                cookieTools.set('advertCentreListState',curVal);
            },
            crawlerSource:function(curVal,oldVal){
                cookieTools.set('advertCentreListCrawlerSource',curVal);
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {

            },
            changesSource: function(value,sourceName){
                this.param['source'] = value;
                cookieTools.set('advertCentreListSource',value);
                this.sourceName = sourceName;
                this.search();
            },
            changesCrawlerSource: function(value=''){
                this.crawlerSource = value;
                this.search();
            },
            changeState: function(key='',value='',state=''){
                this.restParam();
                this.state= '0';
                if(key!=''){
                    this.param[key] = value;
                    this.state= state;
                }
                if(key == 'publishState'){
                    this.param['delFlag'] = '0';
                }
                this.search();
            },
            restParam: function(){
               this.param = Object.assign(this.param,{
                   createTimeStart:'',
                   createTimeEnd: '',
                   title:'',
                   state:'',//发布状态 0 未发布；1 已发布
                   delFlag:'',// 删除状态：0 未删除；1 已删除
                   publishState:''
               });
            },
            starTimeChang: function (val) {
                this.param.createTimeStart = val;
            },
            endTimeChang: function(val) {
                this.param.createTimeEnd = val;
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
                if(this.param.source == 2 && this.crawlerSource != ''){
                    param['crawlerSource']=this.crawlerSource;
                }
                let doAction = 'list';
                if(this.param.source == 2 && this.state == '0'){
                    doAction = 'seekerList';
                }
                $('#list-content').mLoading("show");
                this.dataList = [];
                article[doAction](this, param).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.todopage.total = data.total;
                        this.dataList = data.items;
                        return;
                    }
                    this.$message(body.msg);
                }, function (response) {
                    console.log('error:', response);
                });
            },
            modify: function (id) {
                this.$router.push({name: 'info_article_modify', params: {id: id}});
            },
            seekerModify: function (id) {
                this.$router.push({name: 'info_seeker_modify', params: {id: id}});
            },
            showInfo: function (id) {
                this.$router.push({name: 'advert_centre_showInfo', params: {id: id}});
            },
            doAction: function(param,action,msg){
                let _this = this;
                this.$confirm(msg, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    article[action](_this,param).then(function (response) {
                        let body = response.body;
                        _this.$message(body.msg);
                        if (body && body.code == 1) {
                            _this.getResource(_this.todopage.page, _this.todopage.limit);
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }).catch(() => {

                });
            },
            showInfo: function (id,title) {
                this.showTitle = title;
                $('body').mLoading("show");
                article.getContent(this, id).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.showContent = '';
                        if (data) {
                            this.showContent = data;
                        }
                        $('#myModal').modal();
                        return;
                    }
                    this.$message(body.msg);
                }, function (response) {
                    console.log('error:', response);
                });
            }
        }
    }
    //
</script>
