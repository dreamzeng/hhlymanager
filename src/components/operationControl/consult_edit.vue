<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">业务管理</li>
                        <li class="active">咨询业务</li>
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
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column label="服务名称">
                                            <template slot-scope="item">
                                                <span>{{item.row.consultName}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="id" label="配图" width="100px">
                                            <template slot-scope="item">
                                                <img alt="" :src="item.row.imageUrls" style="width: 42px;height: 42px;margin:5px;">
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="有效期">
                                            <template slot-scope="item">
                                                <span>{{showTime(item.row.termOfValidity)}}</span>
                                                <!-- <span v-if="item.row.fieldStatus==0">{{showTime(item.row.termOfValidity)}}</span> -->
                                            </template>
                                        </el-table-column>
                                        <el-table-column  label="默认价格">
                                            <template slot-scope="item"  >
                                                {{(parseInt(item.row.defaultPrice)/100).toFixed(2)}} / 元
                                            </template>
                                        </el-table-column>
                                        <el-table-column  label="价格区间" >
                                            <template slot-scope="item" >
                                                <span v-if="item.row.consultName!='服务沟通'">
                                                 {{(parseInt(item.row.priceStart)/100).toFixed(2)}} / 元 ~ {{(parseInt(item.row.priceEnd)/100).toFixed(2)}} / 元
                                                 </span>
                                                <span v-else>-</span>
                                               
                                            </template>
                  

                                        </el-table-column>
                                        <el-table-column prop="createTime" label="创建时间">
                                        </el-table-column>
                                        <el-table-column prop="updateTime" label="修改时间">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作">
                                            <template slot-scope="item">
                                                <button title="编辑" class="btn btn-primary btn-xs" @click="modify(item.row)"><i class="icon-pencil"></i>编辑</button>
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
            <!--新建类型-->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel-body">
                        <el-dialog :title="infoTitle" v-model="dialogVisible" size="small" >
                            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" onsubmit="return false">
                                <!-- <el-form-item label="设置有效期" v-if="statusType == 0"> -->
                                 <el-form-item label="设置有效期">
                                    <el-row>
                                        <el-col :span="5" style="margin-right: 5px">
                                            <el-form-item prop="day">
                                                <el-input v-model.number="ruleForm.day" placeholder="天"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="2" style="margin-right: 5px">天</el-col>
                                        <el-col :span="5" style="margin-right: 5px">
                                            <el-form-item prop="hour">
                                                <el-input v-model.number="ruleForm.hour" placeholder="小时"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="2" style="margin-right: 5px">小时</el-col>
                                        <el-col :span="5">
                                            <el-form-item prop="min">
                                                <el-input v-model.number="ruleForm.min" placeholder="分钟"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="2" style="margin:0 5px">分钟</el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item label="默认价格" prop="defaultPrice">
                                    <el-row>
                                        <el-col :span="7">
                                        <el-input v-model="ruleForm.defaultPrice"></el-input>
                                       </el-col>
                                        <el-col :span="5" style="margin:0 5px"> 元 / 次</el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item label="价格区间" prop="consultName"  v-if="ruleForm.consultName !='服务沟通'">
                                    <el-row>
                                        <el-col :span="5">
                                            <el-form-item prop="priceStart">
                                                <el-input v-model="ruleForm.priceStart"></el-input>
                                            </el-form-item>
                                       </el-col>
                                       <el-col :span="1">&nbsp;</el-col>
                                       <el-col :span="5">
                                           <el-form-item prop="priceEnd">
                                            <el-input v-model="ruleForm.priceEnd"></el-input>
                                          </el-form-item>
                                       </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item label="图片预览">
                                    <span style="display:inline-block !important; padding: 5px;border: 1px solid #e2e2e4;">
                                        <img :src="ruleForm.imageUrls" style="width: 100px;height: 100px;">
                                    </span>
                                </el-form-item>
                                <el-form-item label="分类展示图片" id="form-data-case">
                                    <el-row>
                                        <el-col :span="8">
                                            <el-select placeholder="请选择" v-model="urlType">
                                                <el-option label="远程图片URL" value="1"></el-option>
                                                <el-option label="本地上传" value="2"></el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="16" v-if="urlType == 1">
                                            <input type="text" class="form-control" placeholder="远程图片URL" v-model="ruleForm.imageUrls">
                                        </el-col>
                                        <el-col :span="16" v-if="urlType == 2">
                                            <vue-core-image-upload
                                                text="分类展示图片"
                                                inputOfFile="file"
                                                v-bind:class="['btn','btn-primary','btn-sm']"
                                                v-bind:crop="false"
                                                v-bind:url="uploadUrl"
                                                v-bind:isXhr="true"
                                                v-bind:data="{type:4}"
                                                extensions="png,gif,jpeg,jpg"
                                                v-on:imageuploaded="imageuploaded"
                                                v-on:imageuploading="imageuploading">
                                            </vue-core-image-upload>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="handleSave('ruleForm')" :loading="editLoading">确认</el-button>
                                    <el-button @click="dialogVisible = false">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </el-dialog>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!--main content end-->
</template>
<style>
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
                rules: {
                    day: [
                        {required: true,type:'number', message: '只能为整型', trigger: 'blur'}
                    ],
                    hour: [
                        {required: true,type:'number', message: '只能为整型', trigger: 'blur'}
                    ],
                    min: [
                        {required: true,type:'number', message: '只能为整型', trigger: 'blur'}
                    ],
                    defaultPrice: [
                        { validator: checkPrice, trigger: 'blur' }
                    ],
                    priceStart: [
                        {required: true, trigger: 'blur',message: '价格区间最低价不能为空'},
                        { validator: checkPrice, trigger: 'blur' },
                        { validator: comparePrice, trigger: 'blur' }
                    ],
                    priceEnd: [
                        {required: true, trigger: 'blur',message: '价格区间最高价不能为空'},
                        { validator: checkPrice, trigger: 'blur' },
                        { validator: comparePrice, trigger: 'blur' }
                    ]
                },
                urlType:"2",
                uploadUrl:'',
                dialogVisible: false,
                editLoading: false,
                infoTitle:'新增',
                statusType: 0, //属性类型 0 时效性  1 单次
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
            formatTime: function(value){
                let _temp = value;
                let day = parseInt(_temp/1440);
                _temp = parseInt(_temp%1440);
                let hour = parseInt(_temp/60);
                _temp = parseInt(_temp%60);
                let min = _temp;

                return {
                    day:day,
                    hour:hour,
                    min:min
                }
            },
            showTime: function(value){
                let _temp = this.formatTime(value);
                return _temp.day+'天'+_temp.hour+'小时'+_temp.min+'分钟'
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
            modify: function(item){
                this.dialogVisible = true;
                let status = item.fieldStatus || 0 //默认时效性
                this.statusType = status
                console.log(item.consultName);
                this.infoTitle = '修改（'+item.consultName+')';

                let _temp = this.formatTime(item.termOfValidity);
                this.ruleForm =Object.assign({}, {
                    day:_temp.day,//天
                    hour:_temp.hour, //小时
                    min:_temp.min,//分钟
                    id:item.id,
                    consultName:item.consultName,//服务名称
                    imageUrls:item.imageUrls,//展示图片
                    defaultPrice:(parseInt(item.defaultPrice)/100).toFixed(2),//默认价格
                    priceStart:(parseInt(item.priceStart)/100).toFixed(2),
                    priceEnd:(parseInt(item.priceEnd)/100).toFixed(2),
                    termOfValidity:''// 有效期
                });
            },
            handleSave: function(formName){
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        let param = {
                            id:_this.ruleForm.id,
                            imageUrls:_this.ruleForm.imageUrls,
                            termOfValidity:(parseInt(_this.ruleForm.day)*24*60)+(parseInt(_this.ruleForm.hour)*60)+parseInt(_this.ruleForm.min),
                            defaultPrice :_this.ruleForm.defaultPrice * 100, //价格以分为单位
                            priceStart : _this.ruleForm.priceStart * 100,
                            priceEnd : _this.ruleForm.priceEnd * 100
                        };
                        _this.editLoading = true;
                        apiConsult['modify'](_this, param).then(function (response) {
                            let body = response.body;
                            _this.$message(body.msg);
                            _this.editLoading = false;
                            if (body && body.code == 1) {
                                _this.dialogVisible=false;
                                _this.getResource(1, _this.todopage.limit);
                                _this.init();
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                    return false;
                });
            },
            imageuploading:function(response) {
                $('#form-data-case').mLoading({
                    text:'正在上传，请稍后...'
                });
            },
            imageuploaded:function(response) {
                $('#form-data-case').mLoading("hide");
                this.$message(response.msg);
                if (response && response.code == 1) {
                    let data = response.data;
                    this.ruleForm.imageUrls = data.url;
                    return;
                }
            }
        }
    }
    //
</script>
