<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">首页内容管理</li>
                        <li class="active">热门文章</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">热门文章</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <!-- <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param">
                                            <el-form-item  label="文章标题：" style="margin-bottom:0">
                                                <el-input v-model="param.name" placeholder="文章标题" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <el-button type="danger" @click="search">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div> -->
                            <!-- 搜索结束 -->
                            <div class="table-scrollable" style="padding-bottom:20px;">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column type="index"></el-table-column>
                                        <el-table-column prop="title" label="标题"></el-table-column>
                                        <!-- <el-table-column prop="goodsId" label="状态"></el-table-column> -->
                                        <el-table-column prop="createTime" label="创建时间"></el-table-column>
                                        <el-table-column prop="publishTime" label="发布时间"></el-table-column>
                                        <el-table-column label="操作" width="200">
                                            <template  slot-scope="item">
                                                <el-button size="mini" type="primary" @click="upDown('1',1,item.row.uuid)">上移</el-button>
                                                <el-button size="mini" type="primary" @click="upDown('-1',1,item.row.uuid)">下移</el-button>
                                                <el-button size="mini" type="danger" @click="confirm(item.row.uuid,item.row.title)">移除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <!-- <page v-on:todoPage="getResource" :total="todopage.total" :limit="todopage.limit" :page="todopage.page"></page> -->
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- 删除确认 -->
        <confirm v-on:confirm="deleteItem()" :message="message" :title="title"></confirm>
    </div>
    <!--main content end-->
</template>
<style>
</style>

<script>
    // import Page from 'components/common/Page';
    import apiOperaCon from 'api/userPlatform';
    import confirm from 'components/common/confirm';

    export default {
        name: 'operaTypeList',
        components: { confirm: confirm},
        data: function () {
            return {
                dataList: [{
                "id": 1,
                "uuid": "1234567890",
                "title": "中国",
                "publishTime": "2017-11-23 14:14:14",
                "categoryUuid": "1",
                "pic": "http://c.hiphotos.baidu.com/image/pic/item/4a36acaf2edda3cc4673b8ea08e93901203f9260.jpg",
                "readNum": 5,
                "categoryName": "合同定制"
            }],
                param: {
                    name:'',
                    type:1
                },

                // dialogVisible: false,
                message: '',
                title: '是否删除该条信息? ',

            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                this.getResource();
            },
            // search: function () {
            //     this.getResource();
            // },
            //page:当前页 ,limit: 每页显示多少条
            getResource: function () {


                $('#list-content').mLoading("show");
                apiOperaCon.homeConList(this, this.param).then(function (response) {
                    let body = response.body;
                    if (body.data&&body && body.code == 1) {
                        let data = body.data;
                        // this.todopage.total = data.total;
                        this.dataList = data.items;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            confirm: function (itemId,itemName) { //删除确认
                this.rowItemId = itemId;
                this.message = '服务名称：' + itemName;
                $('#myConfirm').modal();
            },
            deleteItem: function (itemId) {
                // if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                let uuid=this.rowItemId;

                let type=1;
                apiOperaCon.delHomeList(this,type,uuid).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource();
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            upDown: function (type,rtype,uuid) {
                $("body").mLoading("show");
                apiOperaCon.upDownList(this, type,rtype,uuid).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource();
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
        }
    }
</script>
