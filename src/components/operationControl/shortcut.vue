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
                        <li class="active">快捷入口</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">快捷入口</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <a href="javascript:;" @click="caseAddEdit('-1')" class="btn btn-info  btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        新建入口
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
                                            <el-form-item label="选择业务">
                                                <el-select v-model="param.categoryId" filterable placeholder="请选择">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="是否上架">
                                                <el-select v-model="param.state" placeholder="请选择" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option label="草稿" value="1"></el-option>
                                                    <el-option label="上架" value="2"></el-option>
                                                    <el-option label="下架" value="3"></el-option>
                                                </el-select>
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
                                        <el-table-column type="index"></el-table-column>
                                        <el-table-column prop="goodsId" label="业务ID">
                                        </el-table-column>
                                        <el-table-column prop="goodsName" label="服务名称">
                                        </el-table-column> ，。
                                        <el-table-column prop="categoryName" label="业务类型">
                                        </el-table-column>
                                        <el-table-column label="是否上架">
                                            <template slot-scope="item">
                                                <el-tag
                                                    :type="item.row.state && (item.row.state.code == '1' ? 'warning' : item.row.state.code == '2' ? 'success' : 'danger') || '' "
                                                    close-transition> {{item.row.state && item.row.state.value || ''  }}</el-tag>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="操作">
                                            <template slot-scope="item">
                                                <button title="编辑" class="btn btn-primary btn-xs" @click="caseAddEdit(item.row.goodsId)"><i class="icon-pencil"></i>编辑</button>
                                                <button title="删除" class="btn btn-danger btn-xs" @click="confirm(item.row.id,item.row.goodsName)"><i class="icon-trash"></i>移除</button>
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
                        <el-dialog :title="infoTitle" v-model="dialogVisible" size="tiny" >
                            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" onsubmit="return false">
                                <el-form-item label="图片预览">
                                    <span style="display:inline-block !important; padding: 5px;border: 1px solid #e2e2e4;">
                                            <img :src="ruleForm.pic" style="width: 100px;height: 100px">
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
                                            <input type="text" required class="form-control" placeholder="远程图片URL" v-model="ruleForm.pic">
                                        </el-col>
                                        <el-col :span="16" v-if="urlType == 2">
                                            <vue-core-image-upload
                                                text="分类展示图片"
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

                                <el-form-item label="跳转入口">
                                    <el-select placeholder="请选择" v-model="ruleForm.goodsId">
                                        <el-option
                                            v-for="item in goodsIds"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="是否显示">
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
                                <!-- <el-form-item label="提成比例">
                                    <el-row>
                                        <el-col :span="20"><el-input v-model.number="ruleForm.rate"></el-input></el-col>
                                        <el-col :span="4">%</el-input></el-col>
                                    </el-row>
                                </el-form-item> -->

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
        <!-- 删除确认 -->
        <confirm v-on:confirm="deleteItem()" :message="message" :title="title"></confirm>
    </div>
    <!--main content end-->
</template>

<script>
    import Page from 'components/common/Page';
    import apiOperaCon from 'api/operationControl';
    import confirm from 'components/common/confirm';
    import VueCoreImageUpload  from 'components/common/vue.core.file.upload';

    export default {
        name: 'operaTypeList',
        components: {Page: Page, confirm: confirm,'vue-core-image-upload': VueCoreImageUpload},
        data: function () {
            //number数量整数符合要求；
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
                options:[],
                dataList: [{
                "id": 1,
                "goodsId":2,
                "goodsName": "融资顾问",
                "categoryName": "企业法律顾问",
                "state":{
                "code":2,
                "value":"上架"
                },
                "pic": "http://localhost:8080/pic/1927.jpg",
                "orderNum": 1,
                "displayType":1,
            }, {
                "id": 1,
                "goodsId":3,
                "goodsName": "知识产权",
                "categoryName": "企业法律顾问",
                "state":{
                "code":2,
                "value":"上架"
                },
                "pic": "http://localhost:8080/pic/1927.jpg",
                "orderNum": 1,
                "displayType": 1,
            }],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                // param: {
                //     name: '',
                //     state:''//活动状态
                // },
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

                rules: {
                    // name: [
                    //     {required: true, message: '请输入名称', trigger: 'blur'}
                    // ],
                    // showName: [
                    //     {required: true, message: '请输入手机显示分类名称', trigger: 'blur'}
                    // ],
                    orderNum: [
                        {validator:checkNumber,trigger: 'blur'}
                    ],
                    // rate: [
                    //     {required: true,type:'number', message: '请输入提成比例', trigger: 'blur'}
                    // ],
                    // pic:[
                    //     { required: true, message: '请选择图片', trigger: 'blur' }
                    // ]
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
                infoTitle:'新增',
                addEdit:"",//用来判断是编辑还是新增，、、、、踩了elementui的坑，还是没有找到原因，留在以后解决，下拉框的数据如果是从后端获取的，选取的默认值也是从后端获取的，那么页面加载完成，选择框里面展示的是value，理应展示value对应的label才对，手动选择之后是正常的。
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


            //跳转入口下拉框获取
            // entry: function(){
            //     // this.parentIds = [];
            //     apiOperaCon.entry(this).then(function (response) {
            //         let body = response.body;
            //         if (body && body.code == 1) {
            //             this.goodsIds = body.data;
            //             return;
            //         }
            //     }, function (response) {
            //         console.log('error:', response);
            //     });
            // },

            //page:当前页 ,limit: 每页显示多少条
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
            confirm: function (itemId,itemName) { //删除确认
                this.rowItemId = itemId;
                this.message = '服务名称：' + itemName;
                $('#myConfirm').modal();
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
                // this.entry();
                this.dialogVisible = true;
                let goodsId=id==-1?"":id;
                // if(id==-1)
                // {
                //     let goodsId="";
                // }
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
                // if(id==-1)
                // {
                //     this.type = -1;
                //     this.infoTitle = '新增';
                //     this.ruleForm.id="";
                //     this.ruleForm.displayType="";
                //     this.ruleForm.pic="";
                //     this.ruleForm.orderNum="";
                //     this.ruleForm.goodsId="";
                // }
                // else
                // {
                //     this.infoTitle = '修改';
                //     this.type = 1;
                //     this.dataList.forEach((val,idx)=>{
                //         if(val.goodsId==id)
                //         {
                //             this.ruleForm=val;
                //             console.log(id);
                //             console.log(val);
                //         }
                //     });
                // }
            },
            handleSave: function(formName){
                let _this = this;
                // if (this.type==-1)
                // {
                //     this.ruleForm.goodsId="";
                // }

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
            // updateState: function(id,state){
            //     $("body").mLoading("show");
            //     apiOperaCon.caseUpdateState(this, {id:id,state:state}).then(function (response) {
            //         let body = response.body;
            //         this.$message(body.msg);
            //         this.getResource(1, this.todopage.limit);
            //     }, function (response) {
            //         console.log('error:', response);
            //     });
            // },
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
                    console.log(this.ruleForm.pic);
                    this.ruleForm.pic = data.url;
                    return;
                }
            }
        }
    }
    //
</script>
