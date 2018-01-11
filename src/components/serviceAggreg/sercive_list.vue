<template>
    <div id="serviceList">
        <!--搜索-->
        <div class="panel-body searchBox">
            <form @submit.prevent="getServiceList">
                <label class="el-form-item__label">标题</label>
                <input type="text" class="form-control" value="" placeholder="按标题检索" v-model="searchKey">
                <button type="submit" class="btn btn-danger">搜索</button>
            </form>
        </div>
        <!--列表-->
        <div class="table-scrollable">
            <div class="panel-body">
                <el-table :data="serviceList" border align="center" style="width: 100%;" id="tb">
                    <!--<el-table-column prop="logo" label="图片" align="center">
                        <template slot-scope="item">
                            <div style="margin: 5px;text-align: center">
                                <img :src="item.row.logo" height="36px">
                            </div>
                        </template>
                    </el-table-column>-->
                    <el-table-column prop="name" label="服务名称" align="center">
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" align="center">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="200" align="center">
                        <template slot-scope="scope">
                            <button title="编辑" class="btn btn-primary btn-xs" @click="editFn(scope.row.uuid, scope.row.goodsId)"><i class="icon-pencil"></i>编辑</button>
                            <button title="删除" class="btn btn-danger btn-xs" @click="removeDialogFn(scope.row.uuid)"><i class="icon-trash"></i>移除</button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--删除提示框-->
                <el-dialog title="提示" :visible.sync="removeDialogVisible" size="tiny" center>
                    <div style="text-align:center;font-size:16px">确认删除吗？</div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="removeDialogVisible = false">取 消</el-button>
                     <el-button type="primary" @click="removeConfirmFn">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
        <!--添加按钮-->
        <div class="panel" v-show="addFlag">
            <div class="row">
                <div class="col-md-4 col-md-offset-4" style="text-align: center">
                    <a href="javascript:;" @click="editFn('-1')" class="btn btn-info  btn-sm">
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        新增服务
                    </a>
                </div>
            </div>
        </div>
        <!--添加 修改-->
        <div class="row">
            <div class="col-lg-12">
                <div class="panel-body">
                    <el-dialog :title="infoTitle" v-model="dialogVisible" size="tiny" >
                        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" onsubmit="return false">
                            <el-form-item label="图片预览">
                                <span style="display:inline-block !important; padding: 5px;border: 1px solid #e2e2e4;">
                                    <img :src="ruleForm.logo" style="width: 100px;height: 100px">
                                </span>
                            </el-form-item>
                            <el-form-item label="分类展示图片" id="form-data-case"  prop="logo">
                                <el-row>
                                    <el-col :span="8">
                                        <el-select placeholder="请选择" v-model="urlType">
                                            <el-option label="远程图片URL" value="1"></el-option>
                                            <el-option label="本地上传" value="2"></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="16" v-if="urlType == 1">
                                        <input type="text" required class="form-control" placeholder="远程图片URL" v-model="ruleForm.logo">
                                    </el-col>
                                    <el-col :span="16" v-if="urlType == 2">
                                        <vue-core-image-upload
                                            text="点击上传图片"
                                            inputOfFile="file"
                                            v-bind:class="['btn','btn-primary','btn-sm']"
                                            v-bind:crop="false"
                                            v-bind:url="uploadUrl"
                                            v-bind:isXhr="true"
                                            v-bind:data="{type:3}"
                                            extensions="png,gif,jpeg,jpg"
                                            v-on:imageuploaded="imageuploaded"
                                            v-on:imageuploading="imageuploading">
                                        </vue-core-image-upload>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="跳转入口" prop="goodsId">
                                <el-select placeholder="请选择" v-model="ruleForm.goodsId">
                                    <el-option v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="是否显示"  prop="displayType">
                                <el-switch on-text="是"
                                           off-text="否"
                                           v-model="ruleForm.displayType"
                                           on-value="1"
                                           off-value="0">
                                </el-switch>
                            </el-form-item>
                            <el-form-item label="排序" prop="orderNum">
                                <el-input v-model="ruleForm.orderNum"></el-input>
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
</template>

<script>
  import VueCoreImageUpload  from 'components/common/vue.core.file.upload';
  import apiService from 'api/serviceAggreg';
  export default {
    props: {
        serviceType: {
            type: Number,
            default: null //1:创业专场 2:法律服务 3:合同定制 4:知识产权 5:个人业务
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.init();
        }); 
    },
    data() {
        var checkNumber = (rule, value, callback) => {
          if (!value) return callback();
          setTimeout(() => {
            var reg=/^\d+$/;
            if (!reg.test(value)) {
              callback(new Error('请输入正整数'));
            } else callback();
          }, 1000);
        };
        return {
            appType: '',
            removeDialogVisible: false,
            searchKey: '',
            serviceList: [],
            ruleForm:{
                uuid: '',
                logo: '',
                goodsId: '',
                displayType:'1',
                orderNum: ''
            },
            rules: {
                orderNum: [
                    {validator:checkNumber, trigger: 'blur', message: '请选择正整数',}
                ],
                //logo:[
                //    {required: true, message: '请上传图片', trigger: 'change' }
                //],
                goodsId:[
                    {required: true, message: '请选择跳转入口', trigger: 'blur', type: 'number'}
                ]
            },
            editId:'',
            deleteId:'', //删除行的uuid
            urlType:'2',
            uploadUrl:'',
            dialogVisible: false,
            editLoading: false,
            infoTitle:'新增',
            goodsList: [], //所有服务
            addFlag: false //是否有新增服务按钮
        }
    },
    methods: {
        init() {
            this.appType = this.$route.matched[1].name == 'service_app'? '1' : '2'  //视真实路由调整
            this.uploadUrl = apiService.upload;
            this.getServiceList(); 
        },
        //检测是否有可添加的服务
        addFlagFn() {
            let param = {
                appType: parseInt(this.appType),
                integrationType: parseInt(this.serviceType)  // 接口修改 新增参数
            };
            apiService.checkService(this, param).then(function(response){
                $('#serviceList').mLoading('hide');
                let body = response.body;
                this.addFlag = body && body.code == 1 && body.data && body.data.length > 0 ? true : false;
                return;
            },function(response){
                this.addFlag = false;
            });
        },
        //获取列表数据
        getServiceList() {
            let param = {
                appType: parseInt(this.appType),
                type: parseInt(this.serviceType),
                name: this.searchKey
            };
            $('#serviceList').mLoading('show');
            apiService.serviceList(this, param).then(function(response){
                $('#serviceList').mLoading('hide');
                let body = response.body;
                if (body && body.code == 1) {
                    let data = body.data;
                    this.serviceList = data;
                    if (data && data.length >= 15) {
                        this.addFlag = false;
                        return;
                    }
                    this.addFlagFn();
                    return;
                } else {
                    this.addFlag = false;
                }
            },function(response){
                console.log('error:', response);
            });
        },
        //编辑 新增
        editFn(uuid, goodsId) {
            var _this = this;
            _this.editId = uuid==-1?"":uuid;
            _this.ruleForm.goodsId = goodsId || '';
            let param = {
                goodsId: goodsId,
                appType: parseInt(this.appType),
                integrationType: parseInt(this.serviceType)  // 接口修改 新增参数
            };
            apiService.checkService(this, param).then(function(response){
                $('#serviceList').mLoading('hide');
                let body = response.body;
                if (body && body.code == 1) {
                    let data = body.data;
                    _this.goodsList = data;
                    if (uuid == -1) {
                        _this.type = -1;
                        _this.infoTitle = '新增';
                        _this.ruleForm.uuid="";
                        _this.ruleForm.displayType= "1";
                        _this.ruleForm.logo="";
                        _this.ruleForm.orderNum="";
                        _this.ruleForm.goodsId="";
                    }else{
                        _this.infoTitle = '修改';
                        _this.type = 1;
                        var arr = _this.serviceList;
                        arr.forEach((v,i)=>{
                            if(v.uuid==uuid) {
                                //_this.ruleForm= Object.assign({},v);
                                _this.ruleForm.displayType= JSON.stringify(v.displayType);
                                _this.ruleForm.uuid = v.uuid;
                                _this.ruleForm.logo = v.logo;
                                _this.ruleForm.orderNum = v.orderNum;
                                _this.ruleForm.goodsId = v.goodsId;
                            }
                        });
                    }
                    _this.dialogVisible = true; 
                }
                return;
            },function(response){
                console.log('error:', response);
            });
        },
        //删除（弹出对话框）
        removeDialogFn(id) {
            this.removeDialogVisible = true;
            this.deleteId = id;
        },
        //确认删除
        removeConfirmFn() {
            this.removeDialogVisible = false;
            var delId = this.deleteId;
            var _this = this;
            apiService.delService(_this, delId).then(function (response) {
                let body = response.body;
                _this.editLoading = false;
                if(body && body.code==0) {
                    _this.$message.error(body.msg);
                }
                if (body && body.code == 1) {
                    _this.$message(body.msg);
                    _this.init();
                    return;
                }
            }, function (response) {
                console.log('error:', response);
            });
        },
        //保存
        handleSave(ruleForm) {
            let _this = this;
            this.$refs[ruleForm].validate(function(valid){
                if (valid) {
                    _this.editLoading = true;
                    var params = {
                        uuid: _this.ruleForm.uuid,
                        logo: _this.ruleForm.logo,
                        goodsId: _this.ruleForm.goodsId,
                        displayType: parseInt(_this.ruleForm.displayType),
                        orderNum: _this.ruleForm.orderNum,
                        appType: parseInt( _this.appType),
                        integrationType: _this.serviceType
                    };
                    apiService.addService(_this,params).then(function (response) {
                        let body = response.body;
                        _this.editLoading = false;
                        if(body && body.code==0)
                        {
                            _this.$message.error(body.msg);
                        }
                        if (body && body.code == 1) {
                            _this.$message(body.msg);
                            _this.dialogVisible=false;
                            _this.ruleForm.uuid= '';
                            _this.ruleForm.logo= '';
                            _this.ruleForm.goodsId= '';
                            _this.ruleForm.orderNum= '';
                            _this.ruleForm.displayType= '1';
                            _this.init();
                            return;
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //上传图片
        imageuploaded(response) {
            $('#form-data-case').mLoading("hide");
            this.$message(response.msg);
            if (response && response.code == 1) {
                let data = response.data;
                this.ruleForm.logo = data.url;
                return;
            }
        },
        //图片上传中
        imageuploading(response) {
            $('#form-data-case').mLoading({
                text:'正在上传，请稍后...'
            });
        }
    },
    components: {
        VueCoreImageUpload
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .searchBox{
        width:100%; max-width:600px; padding: 20px 60px; position:relative;
        input{width:100%;}
        label, button{position: absolute;}
        label {left:20px; top: 15px;}
        button {right:0; top: 20px;}
    }
</style>