 <!--liangyingmei-2017-12-21 企业认证列表-->
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
                        <li click="active">企业认证列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">企业认证列表</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
									<a href="javascript:;" @click="showInfo('1')" class="btn btn-info  btn-sm">
										<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> 新增企业信息
									</a>
								</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param" @submit.prevent="">
                                        	<el-input v-model="param.companyName" placeholder="公司名称" style="width: 150px;"></el-input>
                                            <el-input v-model="param.contactTel" placeholder="手机号码" style="width: 150px;"></el-input>
                                            <el-form-item  label="认证时间：">
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
                                    <el-table :data="dataList" border tooltip-effect="dark" style="width:100%">
                                    	
                                        <el-table-column type="index" align="center" label="序号"  width="80">
									    </el-table-column>
                                        <el-table-column width="150" align="center" prop="companyStage.value" label="企业目前处于">
                                        </el-table-column>
                                        <el-table-column width="250" align="center" prop="companyName" label="企业名称">
                                        </el-table-column>
                                        <el-table-column align="center" prop="contactName" label="联系人">
                                        </el-table-column>	
                                        <el-table-column align="center" prop="contactTel" label="联系电话">
                                        </el-table-column>	
                                        <el-table-column width="250" align="center" prop="address" label="企业地址">
                                        </el-table-column>
                                        <el-table-column align="center" prop="authTime" label="认证时间">
                                        </el-table-column>
                                        <el-table-column align="center" prop="authState" label="认证状态">
                                        	<template slot-scope="scope">
                                        		<p v-if="scope.row.authState.code==3" >审核不通过</p>
                                        		<p v-else="scope.row.authState.code==2" >审核通过</p>
                                            </template>
                                        </el-table-column>
                                         <el-table-column fixed="right" align="center" label="操作" prop="operate" width="250">
                                            <template slot-scope="scope">
                                                <el-button type="success" v-if="scope.row.authState.code==3" size="mini" @click="enshowHide(scope.row.uuid)" >审核通过</el-button>
                                                <el-button type="danger" v-else size="mini" @click="enshowHide(scope.row.uuid)">审核不通过</el-button>
                                                <el-button type="success"  size="mini" @click="showInfo(scope.row.uuid)">查看</el-button>
                                                <!--<router-link :to="{name: 'staff_member',params:{uuid:scope.row.uuid}}">
			                                        <el-button type="success"  size="mini" >员工</el-button>
			                                    </router-link>-->
			                                    <el-button type="success"  size="mini" @click="showUserList(scope.row.uuid)">员工</el-button>
			                                    
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
				{"title":"审核不通过",authState:3},
				{"title":"审核通过",authState:2}
			],
            param: {
            	companyName:'',//公司名称
            	contactTel:'',//联系电话
            	businessLicenseNo:'',//企业营业编码
            	address:'',//公司地址
            	businessLicenseImage:'',//企业营业执照复印件
                authTimeStart:'',//审核开始时间
                authTimeEnd:'',//审核结束时间
                phone:'',
                total: 1, 
                limit: 10,  //每页显示多少条 limit
                page: 1 //当前页码 page
            },
            infoTitle:'新增',
            urlType: '2',
			uploadUrl: '',
			dialogVisible: false,
			editLoading: false,
			type: 1
          }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                certification.encertificationList(this,this.param).then(function (response) {
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
            //企业认证--审核
            enshowHide(uuid){
                certification.enshowHide(this,uuid).then(function(response){
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
            },
			//查看跳转按钮
            showInfo: function (uuid) {
            	this.$router.push({name:"show_certification",query:{uuid:uuid}});
            },
			//员工跳转按钮
            showUserList: function (uuid) {
            	this.$router.push({name:"staff_member",query:{uuid:uuid}});
            }
        }
    }
</script>
