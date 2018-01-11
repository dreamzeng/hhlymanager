<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">通讯录</li>
                        <li class="active">律所通讯录</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">律所通讯录</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <a href="javascript:;" @click="caseAddEdit('-1')" class="btn btn-info  btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        新建
                                    </a>
                                    <a href="javascript:;" @click="caseImport" class="btn btn-info  btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        批量导入
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param">
                                            <el-form-item label="地区">
                                                <v-distpicker hide-area wrapper="xaddress" @selected="onSelectedCity" @province="onProvince"></v-distpicker>
                                            </el-form-item>
                                            <el-form-item label="律所名称">
                                                <el-input v-model="param.realName" placeholder="律所名称" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-button type="danger" @click="search">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column prop="province" label="所在省份">
                                        </el-table-column>
                                        <el-table-column prop="area" label="所在市区">
                                        </el-table-column>
                                        <el-table-column prop="officeName" label="律所名称">
                                        </el-table-column>
                                        <el-table-column prop="address" label="详细地址">
                                        </el-table-column>
                                        <el-table-column label="操作">
                                            <template slot-scope="item">
                                                <button title="编辑" class="btn btn-primary btn-xs" @click="caseAddEdit('0')"><i class="icon-pencil"></i>编辑</button>
                                                <button title="删除" class="btn btn-danger btn-xs" @click="deleteId(item.row.id,item.row.goodsName)"><i class="icon-trash"></i>移除</button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <!-- 备注弹框 -->
                                    <el-dialog
                                      title="提示"
                                      :visible.sync="dialogVisible1"
                                      size="tiny">
                                      <div style="text-align:center;font-size:16px">确认要删除这条内容吗？</div>
                                      <span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogVisible1 = false">取 消</el-button>
                                        <el-button type="primary" @click="handleSave('ruleForm')">确 定</el-button>
                                      </span>
                                    </el-dialog>
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
                        <el-dialog :title="infoTitle" v-model="dialogVisible"  size="tiny">
                            <el-form ref="ruleForm" :model="ruleForm"  label-width="120px" onsubmit="return false">
                                 <el-form-item label="律所名称" prop="orderNum">
                                    <el-input v-model="ruleForm.orderNum"></el-input>
                                </el-form-item>
                                <el-form-item label="所在城市">
                                    <v-distpicker hide-area wrapper="xaddress" @selected="onSelectedCity" @province="onProvince"></v-distpicker>
                                </el-form-item>
                                <el-form-item label="详细地址" prop="orderNum">
                                    <el-input v-model="ruleForm.orderNum"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="handleSave('ruleForm')" :loading="editLoading">确认</el-button>
                                    <el-button @click="dialogVisible = false">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </el-dialog>
                           <el-dialog :title="infoTitle" v-model="dialogVisibleImport" size="tiny" >
                            <el-form ref="ruleForm" :model="ruleForm" label-width="120px" onsubmit="return false">
                                 <el-form-item label="导入文件" prop="orderNum">
                                    <upload-file 
                                       :fileFormat="fileFormat"
                                       :flength="3"
                                       :file-list="fileList"
                                       listType="text"
                                       ref="fileBox"
                                    ></upload-file>
                                </el-form-item>
                                <el-form-item label="模板下载">
                                  <a href=""><span>《律师名单导入模板》下载</span></a>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="handleSave1()" :loading="editLoading" >确认</el-button>
                                    <el-button @click="dialogVisibleImport = false">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </el-dialog>
                          <!-- 备注弹框 -->
                        <el-dialog
                          title="提示"
                          :visible.sync="dialogVisible2"
                          size="tiny">
                          <div style="text-align:center;font-size:16px" v-html="importTip"></div>
                          <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible2 = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
                          </span>
                        </el-dialog>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--main content end-->
</template>

<script>
    import VDistpicker from 'components/common/distpicker/Distpicker'
    import Page from 'components/common/Page';
    import apiOperaCon from 'api/operationControl';
    import {UploadFile} from 'components/common/upload';

    export default {
        components: {VDistpicker:VDistpicker,Page: Page,'upload-file': UploadFile},
        data: function () {
            return {
                importTip:'',
                fileList:[],
                fileFormat:['.xls','.xlsx'],
                flength:3,
                dialogVisible1:false,
                dialogVisible2:false,
                dialogVisibleImport:false,
                options:[],
                dataList: [{
                "id": 2,
                "province":'广东省',
                "area": "深圳市",
                "officeName": "企业法律顾问1",
                "address": '11123123123',
                "displayType":1,
            }, {
                "id": 3,
                "province":'广东省',
                "area": "汕头市",
                "officeName": "企业法律顾问2",
                "address": 'asdfsdfwewr',
                "displayType": 1,
            }],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    state:'',
                    categoryId:''
                },
                defOpt:0,
                ruleForm:{
                    id:'',
                    goodsId:'', //快捷入口
                    displayType:'1',//是否显示 1:是 .-1:否
                    pic:'',//展示图片
                    orderNum:'',//排序
                },
                goodsIds:[],
                urlType:'2',
                uploadUrl:'',
                dialogVisible: false,
                editLoading: false,
                type:-1,//用来并判断是新增还是编辑
                rowItemId: -9999,
                message: '',
                title: '是否删除该条信息? ',
                infoTitle:'',
                addEdit:"",
                goodsIdTemp:"",//临时存储ID ，暂时使用笨方法保存value对应的label，提交的时候判断更换。
                categoryNameTemp:"",//临时存储暂时使用笨方法保存value对应的label，提交的时候判断更换。
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                this.uploadUrl = apiOperaCon.upload;
                //获取级联参数
                let _this = this;
                this.gradeCategory2(0,function(opt){
                    _this.options = opt;
                });
                // this.entry();
            },
             onSelectedCity: function(data){
                this.param.city = data.city && data.city.value || '';
            },
            onProvince: function(data){
                this.param.city = '';
            },
            search: function () {
                this.getResource(1, this.todopage.limit);
            },
         
            // 列表页获取级联信息
            gradeCategory2: function(id,cb=function(opt){console.log(opt)}){
                apiOperaCon.gradeCategory(this, id).then(function (response) {
                    let body = response.body;
                    let opt = [];
                    if (body && body.code == 1) {
                        let data = body.data;
                        for (let i= 0,l = data.length;i<l;i++) {
                            opt.push({
                                value: data[i]['id']+'',
                                label: data[i]['name']
                            });
                        }
                        cb(opt);
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
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
                apiOperaCon.shortcutList(this, param).then(function (response) {
                    let body = response.body;
                    if (body.data&&body && body.code == 1) {
                        let data = body.data;
                        this.todopage.total = data.total;
                        this.dataList = data.items;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            deleteId:function(itemId,itemName){//删除确认
                this.dialogVisible1 = true
                this.rowItemId = itemId;
                this.message = '服务名称：' + itemName;
                
            },
            deleteItem: function (itemId) {
                // if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                let id=this.rowItemId;
                let params={id};
                console.log(params);
                apiOperaCon.hideDel(this, params).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                        this.init();
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            caseAddEdit: function(id){
                this.dialogVisible = true;
                let goodsId=id==-1?"":id;
                let params={goodsId};
                apiOperaCon.entry(this,params).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        this.goodsIds = body.data;
                        if(id==-1)
                        {
                            this.type = -1;
                            this.infoTitle = '新增';
                            this.ruleForm.id="";
                            this.ruleForm.displayType="1";
                            this.ruleForm.pic="";
                            this.ruleForm.orderNum="";
                            this.ruleForm.goodsId="";
                        }
                        else
                        {
                            this.infoTitle = '修改';
                            this.type = 1;
                            this.dataList.forEach((val,idx)=>{
                                if(val.goodsId==id)
                                {
                                    this.ruleForm=val;
                                    console.log(id);
                                    console.log(val);
                                }
                            });
                        }
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            caseImport: function(id){
                   this.dialogVisibleImport = true;

            },
            confirmAddRemarks:function(){

            },
            handleSave: function(formName){
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.editLoading = true;
                        apiOperaCon.addEditEntry(_this, _this.ruleForm).then(function (response) {
                            let body = response.body;
                            // _this.$message(body.msg);
                            _this.editLoading = false;
                            if(body &&body.code==0)
                            {
                                _this.$message.error(body.msg);
                            }
                            if (body && body.code == 1) {
                                _this.dialogVisible=false;
                                _this.getResource(1, _this.todopage.limit);
                                _this.ruleForm.id= '';
                                _this.ruleForm.pic= '';
                                _this.ruleForm.goodsId= '';
                                _this.ruleForm.orderNum= '';
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
            handleSave1:function(){
                   
                if(this.$refs.fileBox.fileList.length == 0){
                   this.$message({
                     message: '加班就加班，神马都不要说，说了也是浮云',
                     type: 'warning'
                   });
                }else{
                   this.dialogVisibleImport = false;
                   this.dialogVisible2 = true;
                   this.importTip = '姐，你实在太给力了' 
                }
                 
            }
           
        }
    }
    //
</script>
