<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">报名管理</li>
                        <li class="active">报名管理</li>

                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">咨询业务</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                         <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param" @submit.prevent="">
                                            <el-form-item class="el-form-item-rest" label="开始时间">
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="datatime.validTimeStart" @change="starTimeChang"></el-date-picker>
                                            </el-form-item>
                                                  <el-form-item  label="输入关键字">
                                                <el-input v-model="param.contact" placeholder="输入关键字" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <el-button type="danger" @click="searchCou">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column label="序号">
                                            <template slot-scope="item">
                                                <span>{{item.row.consultName}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="id" label="活动名称" width="100px">
                                            <template slot-scope="item">
                                                <img alt="" :src="item.row.imageUrls" style="width: 42px;height: 42px;margin:5px;">
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="用户名">
                                            <template slot-scope="item">
                                                <span v-if="item.row.fieldStatus==0"></span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column  label="联系方式">
                                            <template slot-scope="item">
                                                {{parseInt(item.row.defaultPrice).toFixed(2)}} / 元
                                            </template>
                                        </el-table-column>
                                        <el-table-column  label="公司名称" >
                                            <template slot-scope="item">
                                                <span>{{item.row.consultName}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="所属行业">
                                        </el-table-column>
                                         <el-table-column prop="createTime" label="来源">
                                        </el-table-column>
                                        <el-table-column prop="updateTime" label="提交时间">
                                        </el-table-column>
                                    
                                    </el-table>
                                </div>
                            </div>
                            <page v-on:todoPage="getResource" :total="todopage.total" :limit="todopage.limit" :page="todopage.page"></page>
                        </div>
                    </div>
                </div>
            </div>
            <!--新建类型-->
     
        </div>

    </div>
    <!--main content end-->
</template>
<style scoped>
.el-table .cell{text-align: center;}
</style>
<script>
    import Page from 'components/common/Page';
    import apiConsult from 'api/consult';
    import VueCoreImageUpload  from 'components/common/vue.core.file.upload';
    export default {
        name: 'consultEdit',
        components: {Page: Page,'vue-core-image-upload': VueCoreImageUpload},
        data: function () {
            var checkPrice = (rule, value, callback) => {
              if (!value) {
                return callback(new Error('输入不能为空'));
              }
              setTimeout(() => {
                var reg=/^\d+(\.\d+)?$/;
                var reg2=/^\d+(\.\d{1,2})?$/;
                if (!reg.test(value))
                {
                  callback(new Error('请确保输入的是数字（非负数）'));
                }
                else if(!reg2.test(value))
                {
                  callback(new Error('小数位数不要过2位'));
                }
                else callback();
              }, 1000);
            };
            const comparePrice = (rule, value, callback) => {
                //判断最小值是否大于最大值
                if(rule['field'] == 'priceEnd' && this.ruleForm.priceStart > 0 && (parseFloat(this.ruleForm.priceStart) > parseFloat(value))){
                    callback(new Error('价格区间最大值不能小于最小值'));
                }
                if(rule['field'] == 'priceStart' && this.ruleForm.priceEnd > 0 && (parseFloat(value) > parseFloat(this.ruleForm.priceEnd))){
                    callback(new Error('价格区间最小值不能大于最大值'));
                }
                callback()
            }
            return {
                 datatime: {
                    validTimeStart:''
                },
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                ruleForm:{
                    day:0,//天
                    hour:'', //小时
                    min:'',//分钟
                    consultName:'',
                    defaultPrice:0,//默认价格
                    figureCaptions:'',//展示图片
                    priceStart:'',//最低价格
                    priceEnd:'',//最高价格
                },
                param: {
                    contact:'',
                    userName:'',
                    content:'',
                    createTimeStart:'',
                    createTimeEnd:'',

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
                this.uploadUrl = apiConsult.upload;
            },
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;
                $('#list-content').mLoading("show");
                apiConsult.list(this, param).then(function (response) {
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
            starTimeChang:function (val) {
                this.datatime.validTimeStart = val;
            },
            searchCou:function(){
                this.getResource(1,this.todopage.limit);
            },
        }
    }
    //
</script>
