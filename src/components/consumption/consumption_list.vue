<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li>
                            <router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link>
                        </li>
                        <li class="active">用户需求</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="panel">
            	<div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">统计</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                </div>
                            </div>
                </div>
                <div class="panel-body">
                    <div class="statisticsBox">
                    	<div class="statisticsTitle" style="padding:10px 0px 30px 0px;">
                    		<div style="float:left; width:10%;">{{statisLeftTitle}}</div>
                    		<div style="float:left; width:40%;"><el-progress :text-inside="true" :stroke-width="18" :percentage="parseFloat(statisLeftRate)"></el-progress></div>
                    		<div style="float:left; padding-left:10px; width:10%;">{{leftQuantity}}</div>
                    	</div>
                    	<div>
                    		<li v-for="(item, index) in statisLeftList">
                    			<div><b>{{item.question}}</b></div>
                    			<div class="optList" v-for="(optItem, optIndex) in item.questionOptions">
                    				<div style="float:left; width:35%;">{{optItem.questionOption}} </div>
                    				<div style="float:left; width:40%;"><el-progress :text-inside="true" :stroke-width="18" :percentage="parseFloat(optItem.rate)"></el-progress></div>
                    				<div style="float:left; padding-left:10px; width:10%;">{{optItem.quantity}}</div>
                    			</div>
                    		</li>
                    	</div>
                    </div>
                    <div class="statisticsBox">
                    	<div class="statisticsTitle">
	                    	<div class="statisticsTitle">
	                    		<div style="float:left; width:10%;">{{statisRightTitle}}</div>
	                    		<div style="float:left; width:40%;"><el-progress :text-inside="true" :stroke-width="18" :percentage="parseFloat(statisRightRate)"></el-progress></div>
	                    		<div style="float:left; padding-left:10px; width:10%;">{{rightQuantity}}</div>
	                    	</div>
                    	</div>
                    	<div>
                    		<li v-for="(item, index) in statisRightList">
                    			<div><b>{{item.question}}</b></div>
                    			<div class="optList" v-for="(optItem, optIndex) in item.questionOptions">
                    				<div style="float:left; width:35%;">{{optItem.questionOption}} </div>
                    				<div style="float:left; width:40%;"><el-progress :text-inside="true" :stroke-width="18" :percentage="parseFloat(optItem.rate)"></el-progress></div>
                    				<div style="float:left; padding-left:10px; width:10%;">{{optItem.quantity}}</div>
                    			</div>
                    		</li>
                    	</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">详细记录</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="table-scrollable">
                                <div class="panel-body">
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column prop="userId" label="用户ID"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="nickName" label="用户昵称"   width="180">
                                        </el-table-column>
                                        <el-table-column label="选项" >
                                        	<template slot-scope="scope">
										          <span> {{ scope.row.question }}  </span>
										          <span class="optTable"> {{ scope.row.questionOption }}</span>
									        </template>
                                        </el-table-column>
                                        <el-table-column prop="time" label="时间"   width="180">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <page v-on:todoPage="getResource" :total="todopage.total" :limit="todopage.limit"
                                  :page="todopage.page"></page>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
    <!--main content end-->
</template>
<style scoped>
	li{ padding:10px 0px 15px 0px; list-style-type:none;}
	.optTable {color:#2222BB;}
    .activeTag{ color: #FFF;background: #2185D0;}
    .statisticsBox { width:50%; float:left; }
    .statisticsTitle { width:100%; padding:5px 0px 15px 0px; font-weight:bold; font-size:14px; color:#ff2222 }
    .optList {padding:10px 0px 20px 0px;}
</style>
<script>
    import Page from 'components/common/Page';
    import apiConsumption from 'api/consumption';

    export default {
        name: 'consumptionList',
        components: {Page: Page},
        props: {
        },
        data: function () {
            return {
            	statisLeftTitle:'',
            	statisRightTitle:'',
            	statisLeftRate:0,
            	statisRightRate:0,
            	leftQuantity:0,
            	rightQuantity:0,
            	statisLeftList:[],
            	statisRightList:[],
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    
                }
            }
        },
        mounted: function () {
            this.$nextTick(function () { 
                this.init();
            });
        },
        methods: {
            init: function () {
				apiConsumption.statistics(this, {}).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        
						if(data.length>0){
							this.statisLeftList = data[0].questions;
							this.statisLeftTitle = data[0].requireTypeName;
							this.statisLeftRate = data[0].rate;
							this.leftQuantity = data[0].quantity;
						}
						if(data.length>1){
							this.statisRightList = data[1].questions;
							this.statisRightTitle = data[1].requireTypeName;
							this.statisRightRate = data[1].rate;
							this.rightQuantity = data[1].quantity;
						}
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;

                for (let k in this.param) {
                    if(this.param[k] != ''){
                        param[k] = this.param[k];
                    }
                }
                $('#list-content').mLoading("show");
                apiConsumption.records(this, param).then(function (response) {
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
            }
        }
    }
    //
</script>
