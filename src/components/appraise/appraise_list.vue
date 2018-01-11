 <!--liangyingmei-2017-12-20 评价管理列表-->
<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li @click="back"> <a href="javascript:void(0)">评价管理</a></li>
                        <li click="active">评价列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">评价列表</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param" @submit.prevent="">
                                            <el-form-item  label="时间：">
                                                <el-date-picker
                                                  v-model="timeRange"
                                                  type="datetimerange"
                                                  placeholder="选择时间范围" @change="changeTime">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-input v-model="param.commentUserName" placeholder="搜索用户" style="width: 250px;"></el-input>
                                            <el-input v-model="param.lawyerName" placeholder="搜索律师" style="width: 150px;"></el-input>
                                            <el-button type="danger" @click="searchCou">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body">
                                    <el-table :data="dataList" border tooltip-effect="dark" style="width:100%">
                                        <el-table-column align="center" prop="orderUuid" label="订单号" width="200">
                                        </el-table-column>
                                        <el-table-column align="center" prop="commentUserName" label="用户"> <!-- 未支付订单 这里不显示 -->
                                        </el-table-column>
                                        <el-table-column align="center" prop="star" label="总体评价">
                                        </el-table-column>
                                        <el-table-column width="250" align="center" prop="processCommentLabels" label="服务过程">
                                        </el-table-column>
                                        <el-table-column width="250" align="center" prop="attitudeCommentLabels" label="律师态度">
                                        </el-table-column>
                                        <el-table-column align="center" prop="subject" label="服务">
                                        </el-table-column>
                                        <el-table-column align="center" prop="lawyerName" label="服务提供方">
                                        </el-table-column>
                                        <el-table-column align="center" prop="createTime" label="评论时间">
                                        </el-table-column>
                                        <el-table-column align="center" prop="ip" label="IP地址">
                                        </el-table-column>
                                        <el-table-column align="center" label="操作" prop="operate" width="100">
                                            <template slot-scope="scope">
                                                <el-button type="success" v-if="scope.row.state==0" size="mini" @click="showHide(scope.row.orderUuid,1)" >显示</el-button>
                                                <el-button type="danger" v-else size="mini" @click="showHide(scope.row.orderUuid,0)">取消显示</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <page v-on:todoPage="getResource" :total="param.total" :limit="param.limit" :page="param.page"></page>
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
    import appraise from 'api/appraise';
    export default {
        components: {Page: Page},
        data() {
          return {
            dataList: [],
            timeRange:[],//时间范围
            param: {
                createTimeStart:'',
                createTimeEnd:'',
                lawyerName:'',
                commentUserName:'',
                total: 1, 
                limit: 10,  //每页显示多少条 limit
                page: 1 //当前页码 page
            },
          }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                appraise.appraiseList(this,this.param).then(function (response) {
                    let body = response.body;
                    let processCommentLabels = [];
                    let attitudeCommentLabels = [];
                    if (body && body.code == 1 && body.data) {
                        let dataList = body.data.items;
                        for(let i=0; i< dataList.length;i++){
                        	let processArr = dataList[i].processCommentLabels;//服务过程评论标签数组
                        	let processArrName = '';
                        	let attitudeArr = dataList[i].attitudeCommentLabels ;//服务态度评论标签数组
                        	let attitudeName = '';
                        	if(processArr){
                        		processCommentLabels = [];
                        		for (let j= 0,l = processArr.length;j<l;j++) {
	                            	processArrName = processArr[j].name;
		                            processCommentLabels.push(processArrName);
		                        }
                        	}
                            if(attitudeArr){
                            	attitudeCommentLabels = [];
                            	for (let j= 0,l = attitudeArr.length;j<l;j++) {
	                            	attitudeName = attitudeArr[j].name;
		                            attitudeCommentLabels.push(attitudeName);
		                        }
                            }
	                        let processArrStr= processCommentLabels.join(",");
							dataList[i]['processCommentLabels'] = processArrStr;//赋值给dataList中的processCommentLabelsdataList
							let attitudeArrStr= attitudeCommentLabels.join(",");
							dataList[i]['attitudeCommentLabels'] = attitudeArrStr;//赋值给dataList中的attitudeCommentLabels
                        }
                        this.dataList = dataList;
                        this.param.total = body.data.total;
                        console.log('body.data.total==',body.data.total);
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit,
                };
                this.param.limit = limit;
                this.param.page = page;
                this.init();
            },
            // 日期插件开始时间和结束时间的数组分配给两个参数
            changeTime:function(val){
                this.param.createTimeStart=val.substring(0,19);
                this.param.createTimeEnd=val.substring(22);
            },
            //搜索查询按钮
            searchCou: function () {
            	this.init();
            },
            //显示隐藏
            showHide(orderUuid,state){
            	if(state==1)
                {
                    var status=0;
                }
                else if(state==0)
                {
                    var status=1;
                }
                appraise.showHide(this,orderUuid,state).then(function(response){
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                    	this.init();
                    }
                },function(res){
                    console.log('error:',res);
                });
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
</script>
