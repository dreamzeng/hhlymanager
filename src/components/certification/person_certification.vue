 <!--liangyingmei-2017-12-21 个人认证列表-->
<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li @click="back"> <a href="javascript:void(0)">认证管理</a></li>
                        <li click="active">个人认证列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">个人认证列表</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param" :rules="rules" @submit.prevent="">
                                        	<el-input v-model="param.name" placeholder="用户名称" style="width: 150px;"></el-input>
                                            <el-input v-model="param.phone" placeholder="手机号码" style="width: 150px;"></el-input>
                                            <el-form-item  label="时间：">
                                                <el-date-picker
                                                  v-model="timeRange"
                                                  type="datetimerange"
                                                  placeholder="选择时间范围" @change="changeTime">
                                                </el-date-picker>
                                            </el-form-item>
											<el-form-item  prop="authState">
												<el-select v-model="param.authState" filterable placeholder="请选择认证状态">
													<el-option v-for="item in options" :key="item.authState" :label="item.title" :value="item.authState" >
													</el-option>
												</el-select>
											</el-form-item>
                                            <el-button type="danger" @click="searchCou">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body">
                                    <el-table :data="dataList"  border tooltip-effect="dark" style="width:100%">
                                        <el-table-column type="index" align="center" label="序号"  width="80">
									    </el-table-column>
                                        <el-table-column align="center" prop="name" label="姓名">
                                        </el-table-column>
                                        <el-table-column width="250" align="center" prop="phone" label="手机号码">
                                        </el-table-column>
                                        <el-table-column width="250" align="center" prop="companyName" label="公司名称">
                                        </el-table-column>	
                                        <el-table-column align="center" prop="authTime" label="认证时间">
                                        </el-table-column>
                                        <el-table-column align="center" prop="authState" label="认证状态">
                                        	<template slot-scope="scope">
                                        		<p v-if="scope.row.authState==0" >审核不通过</p>
                                        		<p v-else="scope.row.authState==1" >审核通过</p>
                                            </template>
                                        </el-table-column>
                                        <el-table-column fixed="right" align="center" label="操作" prop="operate" width="250">
                                            <template slot-scope="scope">
                                                <el-button type="success" v-if="scope.row.authState==0" size="mini" @click="showHide(scope.row.phone,1)" >审核通过</el-button>
                                                <el-button type="danger" v-else size="mini" @click="showHide(scope.row.phone,0)">审核不通过</el-button>
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
    import certification from 'api/certification';
    export default {
        components: {Page: Page},
        data() {
          return {
            dataList: [],
            timeRange:[],//时间范围
            options: [
            	{"title":"全部"},
				{"title":"审核不通过",authState:0},
				{"title":"审核通过",authState:1}
			],
            param: {
                authTimeStart:'',
                authTimeEnd:'',
                name:'',
                phone:'',
                total: 0, 
                limit: 10,  //每页显示多少条 limit
                page: 1 //当前页码 page
            },
            rules: {
				authState: [
					{ trigger: 'change', type: "number" }
				]
			}
          }
        },
        methods: {
            init: function () {
                certification.pcertificationList(this,this.param).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1 && body.data) {
                        let dataList = body.data.items;
                        this.dataList = dataList;
                        this.param.total = body.data.total;
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
                this.param.authTimeStart=val.substring(0,19);
                this.param.authTimeEnd=val.substring(22);
            },
            //搜索查询按钮
            searchCou: function () {
            	this.init();
            },
            //个人认证--审核
            showHide(phone,authState){
                certification.showHide(this,phone,authState).then(function(response){
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
