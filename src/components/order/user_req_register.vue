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
                        <li class="active">订单管理</li>
                        <li class="active">H5用户需求登记</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                       <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">H5用户需求登记</div>
                                <div class="col-md-4 col-md-offset-4 text-right">
                                    <a class="btn btn-primary icon icon-plus" @click="showInfo('-1')">新增</a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true"  @submit.prevent="" :model="param">
                                          <el-form-item label="状态">
                                            <el-select v-model="param.value" placeholder="筛选状态"  style="width: 250px;">
                                                <el-option
                                                  v-for="item in options"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="开始时间">
                                               <el-date-picker
                                                  v-model="param.createTimeStart"
                                                  type="date"
                                                  placeholder="选择日期"
                                                  @change="changeDate">
                                                </el-date-picker>
                                            </el-form-item>
                                                  <el-form-item  label="用户名称">
                                                <el-input v-model="param.nickName" placeholder="用户名称" style="width: 250px;"></el-input>
                                            </el-form-item>
                                             </el-form-item>
                                                  <el-form-item  label="用户手机号">
                                                <el-input v-model="param.userMobile" placeholder="用户手机号" style="width: 250px;"></el-input>
                                            </el-form-item>
                                             </el-form-item>
                                                  <el-form-item  label="律师手机号">
                                                <el-input v-model="param.lawyerMobile" placeholder="律师手机号" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            </el-form-item>
                                                  <el-form-item  label="律师名称">
                                                <el-input v-model="param.lawyerName" placeholder="律师名称" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            </el-form-item>
                                                  <el-form-item  label="需求内容">
                                                <el-input v-model="param.demandDescr" placeholder="需求内容" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <el-button type="danger" @click="searchCou">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                              <div class="table-scrollable">
                                <div class="panel-body">
                                    <el-table :data="dataList" border tooltip-effect="dark" style="width:100%" >
                                        <el-table-column align="center" label="序号"  prop="index"  width="100">
                                             <template slot-scope="item">
                                                 <span>{{item.$index}}</span>
                                             </template>
                                        </el-table-column>
                                        <el-table-column align="center" label="用户名"  prop="nickName" width="100">
                                        </el-table-column>
                                        <el-table-column align="center"  label="联系方式"  prop="userMobile">
                                        </el-table-column>
                                        <el-table-column align="center"  label="选择的律师"  prop="lawyerName">
                                        </el-table-column>
                                          <el-table-column align="center"  label="律师联系方式"  prop="lawyerMobile">
                                        </el-table-column>
                                          <el-table-column align="center"  label="服务"  prop="serviceName">
                                        </el-table-column>
                                          <el-table-column align="center"  label="需求描述"  prop="demandDescr">
                                        </el-table-column>
                                          <el-table-column align="center"  label="来源"  prop="source">
                                        </el-table-column>
                                         <el-table-column align="center"  label="提交时间"  prop="createTime">
                                        </el-table-column>
                                          <el-table-column align="center"  label="状态"  prop="state.value">
                                        </el-table-column>
                                        <el-table-column align="center" label="操作" width="200">
                                            <template slot-scope="item">
                                                <el-button type="info" @click="showInfo(item.row.uuid,item.row)" size="mini">查看</el-button>
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
<style scoped>
</style>

<script>
    import Page from 'components/common/Page';
    import apiUser from 'api/order';
    export default {
        name: 'user_req_register',
        components: {Page: Page},
        data: function () {
            return {
                options: [{
                  value: '',
                  label: '全部'
                },{
                  value: '1',
                  label: '待处理'
                }, {
                  value: '2',
                  label: '律师服务中'
                }, {
                  value: '3',
                  label: '再考虑'
                }, {
                  value: '4',
                  label: '需求作废'
                },{
                  value: '5',
                  label: '结束'
                }],
                param:{
                   value: '',
                   createTimeStart:'',
                   nickName:'',
                   userMobile:'',
                   lawyerName:'',
                   lawyerMobile:'',
                   demandDescr:'',
                   remark:''
                },
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  
                    page: 1
                }
            }
        },
        methods: {
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
                apiUser.userReqList(this, param).then(function (response) {
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
            //搜索按钮
            searchCou(){
                this.getResource(1, this.todopage.limit);
            },
            changeDate:function(val){
              this.param.createTimeStart = val
            },
            //查看跳转按钮
            showInfo: function (id,list) {
                if(id=='-1'){
                  this.$router.push({name:"user_req_register_select",params:{id:id}});  
                }else{
                    let params={
                       id:id,
                       remark:list.remark
                    };
                     this.$router.push({name:"user_req_register_select",params:params});  
                }
                
            },
        }
    }
</script>

