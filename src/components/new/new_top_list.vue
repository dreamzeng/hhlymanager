<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">圈子</li>
                        <li class="active">热门帖子</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">热门帖子</div>
                                <!-- 3.0需求去掉
                                    <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <router-link :to="{name: 'not_top_list'}"  class="btn btn-info btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        添加热门帖子
                                    </router-link >
                                </div> 
                                -->
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <table class="table table-rest table-striped table-bordered border-top dataTable table-hover">
                                        <thead>
                                        <tr>
                                            <th style="width: 1%">ID</th>
                                            <!-- <th>标题</th> -->
                                            <th>内容</th>
                                            <th>作者</th>
                                            <th>点赞数</th>
                                            <th>所属话题</th>
                                            <!-- <th>图片地址</th> -->
                                            <th>创建时间</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td>{{item.id}}</td>
                                            <!-- <td>{{item.title}}</td> -->
                                            <td :title="item.content || ''">{{getArticleContent(item.content)}}</td>
                                            <td>{{item.userName}}</td>
                                            <td>{{item.concernCount}}</td>
                                            <td>{{item.moduleName}}</td>
                                            <!-- <td v-html="(item.imageUrl) && (item.imageUrl).replace(/\,/ig,'<br>')"></td> -->
                                            <td>{{item.createTime}}</td>
                                            <td>
                                                <button title="查看文章" class="btn btn-success btn-xs" @click="showDetail(item)"><i class="icon-eye-open "></i></button>
                                                <button title="删除热门帖子" class="btn btn-danger btn-xs" @click="confirm(item)"><i class="icon-trash "></i></button>
                                            </td>
                                        </tr>
                                        <tr v-show="dataList.length<1">
                                            <td colspan="7">无数据。。。</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- <page v-on:todoPage="getResource" :total="todopage.total" :limit="todopage.limit" :page="todopage.page"></page> -->
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- 删除确认 -->
        <confirm v-on:confirm="deleteItem" :message="message" :title="title"></confirm>

        <!-- 文章详情 -->
        <el-dialog
            :visible.sync="articleDetailDialog"
            size="large"
            :show-close="articleDetailDialogCloseBtn"
            class="articleDialog"
            >
            <div class="article-content-container">
                <div class="content" v-html="renderContent(article.content)"></div>
                <!-- <div class="content">{{(!article.content || article.content)==""?"暂无内容":article.content}}</div> -->
                <div class="images">
                    <div class="row">
                        <div class="col-xs-6 col-md-3" style="margin-bottom:15px;" v-for="(url, index) in images" :key="index">
                            <a href="javascript:" class="thumbnail">
                                <img alt="图片加载失败" ref="silentbox-img" @click="showImg(index)" :index="index" :src="url" height="180px" style="height: 180px; width: 100%; display: block;cursor: pointer;">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="articleDetailDialog = false">关 闭</el-button>
            </span>
        </el-dialog>
        <img-light-box :images="images" :index="imgIndex" @close="imgIndex=-1"></img-light-box>
    </div>
    <!--main content end-->


</template>

<script>
    import Page from 'components/common/Page';
    import apiNew from 'api/new';
    import confirm from 'components/common/confirm';
    import imgLightBox from 'components/common/imgLightBox';

    export default {
        name: 'newTopList',
        components: {Page: Page, confirm: confirm, imgLightBox},
        data: function () {
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {

                },
                rowItemId: -9999,
                message: '',
                title: '是否删除该条信息? ',
                article:{},
                articleDetailDialog:false,
                articleDetailDialogCloseBtn:false,
                imgDialog:false,
                imgIndex:-1,
                images:[
                    
                ]
                
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                // console.log($('body'))
                this.getResource(1)
            },
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;

                for (let k in this.param) {
                    param[k] = this.param[k];
                }
                $('#list-content').mLoading("show");
                apiNew.topList(this, param).then(function (response) {
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
            getArticleContent(content){
                let str = ""
                if(content){
                    str = content.length > 50 ? content.substring(0,50) + '...' : content
                }
                return str
            },
            search: function () {
                this.getResource(1, this.todopage.limit);
            },
            confirm: function (item) { //删除确认
                this.rowItemId = item.id;
                this.message = 'ID：' + item.id;
                $('#myConfirm').modal();
            },
            deleteItem: function (id) {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                apiNew.hotDel(this, this.rowItemId).then(function (response) {
                 let body = response.body;
                 apiNew.tips(this, {message: body.msg});
                 if (body && body.code == 1) {
                 this.getResource(this.todopage.page, this.todopage.limit);
                 }
                 }, function (response) {
                 console.log('error:', response);
                 });
            },
            showDetail(article){
                this.article = article
                this.images = article.imageUrls
                this.articleDetailDialog = true
            },
            showImg(imgIndex){
                this.imgIndex = imgIndex
            },
            renderContent(content){
                let str = ""
                if(content){
                    str = content
                }else{
                    str = "暂无内容"
                }
                return str.replace(/(\n\n)+/g, '<br/>')
            }
        }
    }

    //
</script>
<style>
    .articleDialog .el-dialog__body{
        margin-top: -35px;
    }
    .article-content-container .content{
        /* max-height: 300px; */
        overflow: auto;
        margin-bottom: 15px;
    }
</style>
