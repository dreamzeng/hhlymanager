<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li>
                            <a href="javascript:;"  @click="back">业务管理</a>
                        </li>
                        <li>业务详情增编</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <span class="tab" :class="{active:tabActive}" @click="tabActive=true">基础信息</span>
                            <span class="tab" :class="{active:!tabActive}" @click="tabActive=false">规格属性</span>
                        </div>
                        <div class="panel-body" v-show="tabActive">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" label-position="right">
                                <el-form-item label="选择分类：" prop="parentIds">
                                    <!-- 必须选择二级，一级不能单选 -->
                                    <el-cascader
                                        expand-trigger="click"
                                        :options="options"
                                        v-model="ruleForm.parentIds"
                                        @change="cascaderChange"
                                        :show-all-levels="false">
                                    </el-cascader>
                                </el-form-item>
                                <el-form-item label="业务名称：" prop="name">
                                    <el-input v-model="ruleForm.name" style="width:205px"></el-input>
                                </el-form-item>

                                <el-form-item label="业务说明：" prop="descr">
                                    <el-input v-model="ruleForm.descr" style="width:205px"></el-input>
                                </el-form-item>
                                <el-form-item label="市场价：" prop="originalPrice">
                                    <el-input v-model="ruleForm.originalPrice" style="width:205px"></el-input>
                                </el-form-item>

                                <el-form-item label="是否直接支付：">
                                    <el-switch on-text="是"
                                               off-text="否"
                                               v-model="ruleForm.payType"
                                               on-value="1"
                                               off-value="0">
                                    </el-switch>
                                </el-form-item>

                                <el-form-item label="价格名称：" prop="">
                                    <el-input v-model="ruleForm.pricePrefix" placeholder="例如：一口价" style="width:205px"></el-input>
                                </el-form-item>

                                <el-form-item label="价格确定：">
                                    <el-switch on-text="是"
                                               off-text="否"
                                               v-model="ruleForm.priceConfirm"
                                               on-value="0"
                                               off-value="1">
                                    </el-switch>
                                </el-form-item>
                                <el-form-item label="价格：" required>
                                    <el-row v-if="ruleForm.priceConfirm == 0">
                                        <el-col :span="6">
                                            <div class="grid-content bg-purple">
                                                <el-form-item prop="priceStart">
                                                    <el-input placeholder="500" v-model="ruleForm.priceStart"></el-input>
                                                </el-form-item>
                                            </div>
                                        </el-col>
                                        <!-- <el-col :span="1" style="padding:0 5px 0 100px;font-size:25px;font-weight:100;">/</el-col> -->
                                        <el-col :span="3">
                                            <div class="grid-content bg-purple-light" style="width: 100px;padding: 0 15px">
                                                <el-form-item prop="">
                                                    <el-input placeholder="/年" v-model="ruleForm.unit"></el-input>
                                                </el-form-item>
                                            </div>
                                        </el-col>
                                        <el-col :span="12"><div class="grid-content bg-purple">填写价格和单位，客户端显示全部，比如“666元/项”</div></el-col>
                                    </el-row>
                                    <el-row v-else>
                                        <el-col :span="6">
                                            <el-row>
                                                <el-col :span="11">
                                                    <el-form-item prop="priceStart">
                                                        <el-input placeholder="100" v-model="ruleForm.priceStart"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="2"><div style="text-align: center">~</div></el-col>
                                                <!-- <el-col :span="11"><el-input placeholder="2000" v-model="ruleForm.priceEnd"></el-input></el-col> -->
                                                <el-col :span="11">
                                                    <el-form-item prop="priceEnd">
                                                        <el-input placeholder="2000" v-model="ruleForm.priceEnd"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                        <!-- <el-col :span="1" style="padding:0 5px 0 100px;font-size:25px;font-weight:100;">/</el-col> -->
                                        <el-col :span="3">
                                            <div class="grid-content bg-purple-light" style="width: 100px;padding: 0 15px">
                                                <el-form-item prop="">
                                                    <el-input placeholder="/年" v-model="ruleForm.unit"></el-input>
                                                </el-form-item>
                                            </div>
                                        </el-col>
                                        <el-col :span="12"><div class="grid-content bg-purple">如果只填最低价格则客户端显示xx元起</div></el-col>
                                    </el-row>
                                </el-form-item>

                                <el-form-item label="官价：" prop="govermentPrice">
                                    <el-input v-model="ruleForm.govermentPrice" placeholder="非必填，小数位数不超过2位" style="width:205px"></el-input>
                                </el-form-item>

                                <el-form-item label="首页业务封面：" prop="">
                                    <el-upload class="upload-demo" :action="upload"
                                               :file-list="fileListBizi"
                                               :data="{type:3}"
                                               :with-credentials="true"
                                               :on-remove="handleRemoveBizi"
                                               :before-upload="beforeAvatarUpload"
                                               :on-change="handleChangeBizi"
                                               list-type="picture">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，仅限1张（图片大小不超过 12MB!）</div>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="服务详情轮转图：">
                                    <el-upload class="upload-demo" :action="upload"
                                               :file-list="fileList"
                                               :data="{type:3}"
                                               :with-credentials="true"
                                               :on-remove="handleRemove"
                                               :before-upload="beforeAvatarUpload"
                                               :on-change="handleChange"
                                               list-type="picture">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，数量为1~5张（图片大小不超过 12MB!）</div>
                                    </el-upload>
                                </el-form-item>

                                <el-form-item label="文本编辑：">
                                    <div class="tabBtn">
                                        <!-- goodsInfoList.content 是服务详情 bizFaq是常见问答-->
                                        <button type="button" class="btn" :class="{active2:btnActive=='content'}" @click="changeAct('content')">服务详情</button>
                                        <!-- afterSaleService  -->
                                        <!-- <button type="button" class="btn" :class="{active2:btnActive}" @click="changeAct(true)">售后服务</button> -->
                                                <!-- serviceTimeDesc -->
                                        <button type="button" class="btn" :class="{active2:btnActive=='serviceTimeDesc'}" @click="changeAct('serviceTimeDesc')">服务时间</button>
                                        <!-- submitInformation  -->
                                        <button type="button" class="btn" :class="{active2:btnActive=='submitInformation'}" @click="changeAct('submitInformation')">提交材料</button>
                                        <!-- disclaimer  -->
                                        <button type="button" class="btn" :class="{active2:btnActive=='disclaimer'}" @click="changeAct('disclaimer')">免责声明</button>

                                        <button type="button" class="btn" :class="{active2:btnActive=='bizFaq'}" @click="changeAct('bizFaq')">常见问答</button>
                                    </div>
                                    <div>
                                        <webEditor editorId="serInfoEditor" ref="serInfoEditor"></webEditor>
                                    </div>

                                </el-form-item>
                                <el-form-item label="是否上架">
                                    <el-switch on-text="是"
                                               off-text="否"
                                               v-model="ruleForm.state"
                                               on-value="2"
                                               off-value="3">
                                    </el-switch>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="info" @click="submitForm('ruleForm')">提交</el-button>
                                    <el-button @click="back">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>

                        <!-- 选项卡第二页-规格属性 -->
                        <div class="panel-body" v-show="!tabActive">
                            <!-- <el-form :model="ruleForm" ref="ruleForm" label-width="160px" label-position="right"> -->
                            <el-form  label-width="160px" label-position="right">
                                <el-form-item label="选择配置项：" prop="">
                                    <el-select v-model="specIds" multiple placeholder="请选择，支持多选">
                                        <el-option
                                          v-for="item in multiSelection"
                                          :key="item.specId"
                                          :label="item.specName"
                                          :value="item.specId">
                                        </el-option>
                                    </el-select>
                                    <el-button type="primary" size="samll" @click="combination">开始组合</el-button>
                                </el-form-item>

                                <div class="wrap" v-for="(item,index) in combinationData">
                                    <el-form-item label="组合名称：" style="margin-top:-5px"><span>{{item.specAttrsCombName}}</span></el-form-item>
                                    <!-- <el-form-item label="价格名称：" prop="">
                                        <el-input v-model="item.pricePrefix" placeholder="例如：一口价" style="width:205px;"></el-input>
                                    </el-form-item> -->
                                    <!-- 自己手写 开始-->
                                    <el-form-item label="价格确定：" style="margin-top:-15px">
                                        <el-switch on-text="是"
                                                   off-text="否"
                                                   v-model="item.amountConfirm"
                                                   on-value="1"
                                                   off-value="0"
                                                   @change='changeSwitch'>
                                        </el-switch>
                                    </el-form-item>
                                    <el-form-item label="价格：" style="margin-top:-15px">
                                        <el-row >
                                            <el-col :span="8">
                                                <el-col :span="10">
                                                    <el-form-item>
                                                        <el-input placeholder="请输入数字" v-model="item.amountMin"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12" v-if="item.amountConfirm ==0">
                                                    <el-col :span="2"><div style="text-align: center">~</div></el-col>
                                                    <el-col :span="20"><el-input placeholder="请输入数字" v-model="item.amountMax"></el-input></el-col>
                                                </el-col>
                                            </el-col>
                                            <el-col :span="5">
                                                <div class="grid-content bg-purple-light" style="width: 100px;padding: 0 15px">
                                                    <el-form-item prop="unit">
                                                        <el-input placeholder="/项" v-model="item.priceUnit"></el-input>
                                                    </el-form-item>
                                                </div>
                                            </el-col>
                                            <button class="btn btn-primary" data-toggle="modal" data-target="#myModalYWL" @click.prevent="popWebE(index,item.specCombId,item.specAttrsCombName)">增编服务详情</button>
                                        </el-row>
                                    </el-form-item>

                                    <!-- 自己手写 结束-->

                                    <el-button type="info" @click="submitForm2('ruleForm',index)" style="margin-left:100px;">提交</el-button>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="myModalYWL" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="min-width:800px;max-width:80%;width:auto;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            {{webEditorTitle}}
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="tabBtn">
                            <!-- goodsInfoList.content 是服务详情 bizFaq是常见问答-->
                            <button type="button" class="btn" :class="{active2:btnActive2=='content'}" @click="changeAct2('content')">服务详情</button>
                            <!-- serviceTimeDesc -->
                            <button type="button" class="btn" :class="{active2:btnActive2=='serviceTimeDesc'}" @click="changeAct2('serviceTimeDesc')">服务时间</button>
                            <!-- submitInformation  -->
                            <button type="button" class="btn" :class="{active2:btnActive2=='submitInformation'}" @click="changeAct2('submitInformation')">提交材料</button>
                        </div>
                        <div>
                            <webEditor editorId="webEditorPop" ref="webEditorPop" :isInit="webEditorPopInit"></webEditor>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消
                        </button>
                        <button type="button" class="btn btn-primary" @click="popSubmit">
                            提交
                        </button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    </div>
    <!--main content end-->
</template>
<style scoped>
    .panel-heading {padding:8px 0 0;height:46px;clear:both;}
    .panel-heading .tab{display:inline-block;width:100px;border:1px solid #dedede;background:#fff;line-height:36px;text-align:center;border-radius: 10px 10px 0 0;float:left;margin-left:-1px;cursor:pointer;}
    .panel-heading>.active{border-bottom:none;line-height:37px;font-weight:bolder;}
    .tabBtn{margin-bottom:5px;}
    .tabBtn .active2{background:#20A0FF;color:#fff;}
    .wrap{margin-top:20px;border-top:1px solid #dedede;padding-top:15px;margin-left:80px;margin-right:80px;}
</style>

<script>
    import apiOperaCon from 'api/operationControl';
    import webEditor from 'components/common/webEditor';
    import VueCoreImageUpload from 'components/common/vue.core.file.upload';

    export default {
        components:{webEditor,VueCoreImageUpload},
        name: 'goodsEdit',
        data: function () {
            //起始价格
            var checkMoney = (rule, value, callback) => {
              if (!value) {
                return callback(new Error('输入不能为空'));
              }
              setTimeout(() => {
                var reg=/^\d+(\.\d+)?$/;
                var reg2=/^\d+(\.\d{1,2})?$/;
                if (!reg.test(value))
                {
                  callback(new Error('请输入数字'));
                }
                else if(!reg2.test(value))
                {
                  callback(new Error('小数位数不超过2位'));
                }
                else callback();
              }, 1000);
            };
            var checkMoney2 = (rule, value, callback) => {
              if (!value) {
                return callback();
              }
              setTimeout(() => {
                var reg=/^\d+(\.\d+)?$/;
                var reg2=/^\d+(\.\d{1,2})?$/;
                if (!reg.test(value))
                {
                  callback(new Error('请输入数字'));
                }
                else if(!reg2.test(value))
                {
                  callback(new Error('小数位数不超过2位'));
                }
                else callback();
              }, 1000);
            };
            return {
                content:'',
                serviceTimeDesc:'',
                submitInformation:'',
                webEditorPopInit:false,
                webEditorTitle:"",//弹窗标题
                dialogVisible:false,//是否展示
                webEditorPop:null,//弹窗的编辑器ref
                specCombId:"",//保存临时id
                popContent:"",//弹窗编辑器内容
                idx:"",//数组的第几个元素


                commitType:'goodsAdd',
                forever:[],//编辑页面选中组合的永久保存区，用于判断组合是否改变，决定组合按钮是否可以点击
                serInfoEditor:'',
                FAQEditor:'',
                // combinationDataTemp:[],
                combinationData: [],//编辑页面规格属性选项卡内容
                tabActive:true,//判断选项卡哪个为开
                btnActive:'content',//富文本选项卡哪个为开
                btnActive2:'content',//富文本选项卡哪个为开
                multiSelection:[
                    {
                        "specId": "4fc6281591f6428b91d4111f5dbb183b",
                        "specName": "轮次",
                        "specAttrs": []
                    },
                ],//参与组合的属性
                specIds: [],//多选的结果

                type: 1, // type 为1时为添加，为2时修改
                id:'',
                urlType:'1',
                liveId:'', //活动id
                liveTitle:'', //活动标题
                options:[],//原来是下拉框的数据源，现在改成级联框的数据源
                optionsTask:[],
                fileList: [],
                fileListBizi: [],

                taskId:'',
                upload:'',
                ruleForm:{
                    shortcutType :0, // 业务说明
                    descr :'', // 业务说明
                    originalPrice :'', // 市场价
                    categoryId:'', //分类id 第二级id
                    name:'', //服务名称
                    descr:'',//服务简介
                    priceConfirm:'0', //价格是否确定 0:确定.1:不确定
                    priceStart:'',//最低价格
                    priceEnd:'',//最高价格
                    unit:'',//单位
                    // originalPrice:'',//原价
                    imageUrls:'', //展示图片,多张以逗号隔开
                    // bizLogo:'', //接口新加字段，业务封面图片
                    parentIds:[],//级联菜单选择后的数组
                    content:'',//服务详情描述
                    bizFaq:'',//服务详情描述
                    state:'2',//是否上架 1:草稿, 2:上架 , 3:下架
                    govermentPrice:'',//官价
                    pricePrefix:"",
                    payType:1,
                    serviceTimeDesc:"",
                    submitInformation:"",
                    disclaimer:"",
                },
                rules: {
                    typeId:[{required: true, message: '请选择业务类型', trigger: 'change',type:'number'}],
                    name:[{required: true, message: '请输入业务名称', trigger: 'blur' }],
                    descr:[{required: true, message: '请输入业务名称', trigger: 'blur' }],
                    priceStart:[{required: true, message: '请输入价格', trigger: 'blur' },
                    { validator: checkMoney, trigger: 'blur' }],
                    // unit:[{required: true, message: '请输入项', trigger: 'blur' }],
                    // imageUrls:[{required: true, message: '至少选择一张图片', trigger: 'blur'  }],
                    priceEnd:[{ validator: checkMoney2, trigger: 'blur' }],
                    govermentPrice:[{ validator: checkMoney2, trigger: 'blur' }],
                    originalPrice:[{required:true, validator: checkMoney2, trigger: 'blur' }],
                    parentIds:[{ required: true, message: '请选择类型', trigger: 'blur',type:'array' }],
                }
            }
        },
        watch:{
            btnActive:function(newValue,oldValue){
                this.ruleForm[oldValue]=this.$refs['serInfoEditor'].getContent();
                this.$refs['serInfoEditor'].setContent(this.ruleForm[newValue]);
            },
            btnActive2:function(newValue,oldValue){
                this[oldValue]=this.$refs['webEditorPop'].getContent();
                this.$refs['webEditorPop'].setContent(this[newValue]);
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            changeAct(value){
                this.btnActive=value;
            },
            changeAct2(value){
                this.btnActive2=value;
            },

            // 规格属性里面的价格开关
            changeSwitch(val){
                // console.log(val);
            },
            //弹窗编辑器按钮
            popWebE(idx,specCombId,name){
                this.idx=idx;
                this.specCombId=specCombId;
                this.webEditorTitle='';
                this.webEditorTitle='组合名称：'+name;
                // this.dialogVisible=true;
                this.content=this.combinationData[idx].content?this.combinationData[idx].content:"";
                this.serviceTimeDesc=this.combinationData[idx].serviceTimeDesc?this.combinationData[idx].serviceTimeDesc:"";
                this.submitInformation=this.combinationData[idx].submitInformation?this.combinationData[idx].submitInformation:"";


                let _this = this;
                setTimeout(()=>{
                    _this.$refs.webEditorPop.init();
                    //console.log(this.$refs);
                    // console.log(this.$refs.webEditorPop);
                    //这里很奇葩必须点击两次才能正确找到文本Editorpop
                    //如果是编辑页面而且内容存在的话
                    _this.$refs.webEditorPop.setContent(_this[this.btnActive2]);
                },0);

            },
            // 弹窗提交按钮
            popSubmit(){
                // this.combinationData[this.idx][this.btnActive2]=this.$refs['webEditorPop'].getContent();
                this[this.btnActive2]=this.$refs['webEditorPop'].getContent();
                let specCombId=this.specCombId;
                let content=this.content;
                let serviceTimeDesc=this.serviceTimeDesc;
                let submitInformation=this.submitInformation;
                // let _content =this.$refs.webEditorPop.getContent();
                if(content == '<p><br></p>') content = '';
                if(serviceTimeDesc == '<p><br></p>') serviceTimeDesc = '';
                if(submitInformation == '<p><br></p>') submitInformation = '';

                let param={specCombId,content,serviceTimeDesc,submitInformation}
                // console.log(param);
                apiOperaCon.popSubmit(this,param).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body&& body.code == 1) {
                        // this.dialogVisible=false;
                         $('#myModalYWL').modal('hide');
                        // this.combinationData[this.idx].content=this.$refs.webEditorPop.getContent();
                        this.combinationData[this.idx].content=this.content;
                        this.combinationData[this.idx].serviceTimeDesc=this.serviceTimeDesc;
                        this.combinationData[this.idx].submitInformation=this.submitInformation;
                        // console.log(this.combinationData[this.idx].content());
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },

            //Cascader 级联选择器，change事件
            cascaderChange(value) {
              this.ruleForm.categoryId=value[value.length-1];
              console.log(this.ruleForm.categoryId);
            },
            init: function () {
                this.upload = apiOperaCon.upload;
                this.type = this.$route.params.type;

                // 基础信息-选择分类下拉框
                apiOperaCon.optionList(this).then(function (response) {
                    let body = response.body;
                    if (body&&body.data && body.code == 1) {
                        let str =JSON.stringify(body.data) ;
                        this.options=JSON.parse(str.replace(/id/gi,'value').replace(/name/gi,'label').replace(/categories/gi,'children'));
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });

                // 规格属性-组合多选下拉框
                apiOperaCon.multiSelection(this,-1).then(function (response) {
                    let body = response.body;
                    if (body&&body.data && body.code == 1) {
                        this.multiSelection=body.data;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });

                // 子组件对象进行关联
                this.serInfoEditor=this.$refs.serInfoEditor;
                this.FAQEditor=this.$refs.FAQEditor;
                this.webEditorPop=this.$refs.webEditorPop;

                if (this.type == 2) {
                    // this.typeTitle = '修改活动';
                    // 这个猜测是左侧基础信息的拉取信息接口
                    this.id = this.$route.params.id;
                    $("body").mLoading("show");
                    apiOperaCon.getRowGoodsItem(this, this.id).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            let data = body.data;
                            Object.assign(this.ruleForm, data);
                            this.ruleForm.priceConfirm = data.priceConfirm+'';
                            this.ruleForm.state = data.state && data.state.code+'' || '3';
                            this.ruleForm.content = (data.goodsInfoList && data.goodsInfoList[0] && data.goodsInfoList[0]['content']) || '';
                            this.ruleForm.bizFaq = (data.goodsInfoList && data.goodsInfoList[0] && data.goodsInfoList[0]['bizFaq']) || '';
                            this.ruleForm.serviceTimeDesc = data.serviceTimeDesc|| '';
                            this.ruleForm.submitInformation = (data.goodsInfoList && data.goodsInfoList[0] && data.goodsInfoList[0]['submitInformation']) || '';
                            this.ruleForm.disclaimer = (data.goodsInfoList && data.goodsInfoList[0] && data.goodsInfoList[0]['disclaimer']) || '';
                            this.$refs['serInfoEditor'].setContent(this.ruleForm.content);
                            // console.log(this.$refs);

                            // 因为两个webEditor相互干扰，这里用一个webEditor，点击切换的时候把值赋给data里面的不同参数
                           // this.$refs['FAQEditor'].setContent(this.ruleForm.bizFaq);
                            this.ruleForm.goodsInfoList &&  delete this.ruleForm.goodsInfoList;

                            // let typeId = this.ruleForm.parentId;
                            this.ruleForm.parentIds=[this.ruleForm.parentId,this.ruleForm.categoryId];
                            //这里有问题，我要知道数组的第一个元素，上级
                            // this.ruleForm.parentIds[0]=this.typeId;

                            // this.taskId = body.data.categoryId+'';
                            // this.ruleForm.typeId = typeId+'';

                            // if(typeId == '0'){
                            //     this.ruleForm.typeId = this.ruleForm.categoryId+'';
                            //     this.ruleForm.categoryId = '';
                            // }


                            let urls = data.imageUrls || '';
                            urls = urls.split(',');
                            for(let i= 0,l=urls.length;i<l;i++){
                                let o = urls[i];
                                let temp = o.split('/');
                                let name = temp[temp.length-1];
                                this.fileList.push({name,url:o});
                            }
                            //下面我是我模仿上面写的代码
                            let urls2 = data.bizLogo || '';
                            urls2 = urls2.split(',');
                            for(let i= 0,l=urls2.length;i<l;i++){
                                let o = urls2[i];
                                let temp = o.split('/');
                                let name = temp[temp.length-1];
                                this.fileListBizi.push({name,url:o});
                            }
                            return;
                        }
                        if (body && body.code == 0) {
                            this.$message.error({message: body.msg});
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                    //规格属性编辑组合选中框的值，包括规格属性编辑拉取信息接口
                    apiOperaCon.multiEditSelection(this,this.id).then(function (response) {
                        let body = response.body;
                        if (body&&body.data && body.code == 1) {
                            var _this=this;
                            let arr=body.data.specs;
                            arr.forEach(function(val,idx){
                                _this.specIds.push(val.specId);// 组合选中值
                            });
                            this.combinationData=[];
                            this.combinationData=body.data.specCombs;//组合框每一项里面文本值
                            //为什么会有下面这个多余的循环，原来ele的switch的值必须是字符串，1和'1'是不同的，这个大坑浪费我一下午时间！！！！！！！！！！！！！！！！！！！！！！！
                            this.combinationData.forEach(function(val,idx){
                                if(val.amountConfirm==1)
                                {
                                    val.amountConfirm="1";
                                }
                            });
                            return;
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }
            },
            // 点击事件开始组合
            combination(){
                let specIds=this.specIds;
                let goodsId=this.id;
                let param={goodsId,specIds}
                if(this.id!="")
                {
                    apiOperaCon.combination(this,param).then(function (response) {
                        let body = response.body;
                        // $("body").mLoading("show");
                        if (body&&body.data && body.code == 1) {
                            this.combinationData=[];
                            let _this=this;
                            // this.combinationData=body.data;
                            let arr=body.data;
                            arr.forEach(function(val,idx){
                                val.idx="webE"+idx;
                                _this.combinationData.push(val);

                                // console.log(_this.$refs);
                            });
                            // Object.assign(this.combinationDataTemp,this.combinationData);
                            // console.log(this.combinationData);
                            return;
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }
                else
                {
                    this.$message("请先填写基础信息选项卡并提交之后，再编辑规格属性选项卡");
                }
            },

            // 表单提交---规格属性
            // 改成单个提交，
            submitForm2:function(formName,idx) {
                let params=[];
                var _this=this;
                //表单验证开始
                var reg=/^\d+(\.\d+)?$/;
                var reg2=/^\d+(\.\d{1,2})?$/;
                var reg3=/^\//;
                var true1=false;

                if(this.combinationData[idx].amountMin=="")
                {
                    this.combinationData[idx].amountMin=0;
                }
                if(this.combinationData[idx].amountMax=="")
                {
                    this.combinationData[idx].amountMax=0;
                }
                //上面是如果为空，就让其转为0，变相的将必填改为非必填

                if(this.combinationData[idx].amountConfirm==1)
                {

                    if(!reg.test(this.combinationData[idx].amountMin))
                    {
                        this.$message.error('价格请输入数字');
                    }
                    else if(!reg2.test(this.combinationData[idx].amountMin))
                    {
                        this.$message.error('价格小数位数不超过2位');
                    }
                    else
                    {
                        true1=true;
                    }
                }
                else
                {
                    if(!reg.test(this.combinationData[idx].amountMin))
                    {
                        this.$message.error('最低价格请输入数字');
                    }
                    else if(!reg2.test(this.combinationData[idx].amountMin))
                    {
                        this.$message.error('最低价格小数位数不超过2位');
                    }

                    else if(!reg.test(this.combinationData[idx].amountMax))
                    {
                        this.$message.error('最高价格请输入数字');
                    }
                    else if(!reg2.test(this.combinationData[idx].amountMax))
                    {
                        this.$message.error('最高价格小数位数不超过2位');
                    }

                    else if(parseFloat(this.combinationData[idx].amountMin)>parseFloat(this.combinationData[idx].amountMax))
                    {
                        this.$message.error('最低价格要小于最高价格');
                    }
                    else
                    {
                        true1=true;
                    }
                }

                //表单验证结束
                if(true1)
                {
                    params.push(this.combinationData[idx]);
                    $("body").mLoading("show");
                    apiOperaCon.saveNewEditSpec(_this,params).then(function (response) {
                        let body = response.body;
                        this.$message(body.msg);
                        if (body && body.code == 1) {
                            // this.$router.go(-1);
                            return;
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }
            },
            submitForm:function(formName) {
                // if(this.btnActive){
                //     this.ruleForm.content=this.$refs['serInfoEditor'].getContent();
                // }
                // else
                // {
                //     this.ruleForm.bizFaq=this.$refs['serInfoEditor'].getContent();
                // }
                this.ruleForm.shortcutType=0;
                this.ruleForm[this.btnActive]=this.$refs['serInfoEditor'].getContent();
                // let _content = this.$refs['serInfoEditor'].getContent();
                // if(_content == '<p><br></p>') _content = '';
                // this.ruleForm.content = _content;
                if(this.ruleForm.content == '<p><br></p>') this.ruleForm.content = '';
                if(this.ruleForm.bizFaq == '<p><br></p>') this.ruleForm.bizFaq = '';
                if(this.ruleForm.serviceTimeDesc == '<p><br></p>') this.ruleForm.serviceTimeDesc = '';
                if(this.ruleForm.submitInformation == '<p><br></p>') this.ruleForm.submitInformation = '';
                if(this.ruleForm.disclaimer == '<p><br></p>') this.ruleForm.disclaimer = '';


                //下面是模仿
                // let _content2 = this.$refs['FAQEditor'].getContent();
                // if(_content2 == '<p><br></p>') _content2 = '';
                // this.ruleForm.bizFaq = _content2;

                let fileList = this.fileList;
                let urls = [];
                for(let i = 0,l = fileList.length;i<l;i++){
                    let o = fileList[i];
                    if(o['response'] && o['response']['data'] && o['response']['data']['url']){
                        urls.push(o['response']['data']['url']);
                    }else{
                        o['url'] && urls.push(o['url']);
                    }
                }
                this.ruleForm.imageUrls = urls.join(',');

                //下面是模仿
                let fileList2 = this.fileListBizi;
                let urls2 = [];
                for(let i = 0,l = fileList2.length;i<l;i++){
                    let o = fileList2[i];
                    if(o['response'] && o['response']['data'] && o['response']['data']['url']){
                        urls2.push(o['response']['data']['url']);
                    }else{
                        o['url'] && urls2.push(o['url']);
                    }
                }
                this.ruleForm.bizLogo = urls2.join(',');
                //判断是新增还是编辑，使用不同的提交接口函数
                // let this.commitType = 'goodsAdd';
                if (this.type == 2) {
                    this.commitType = 'goodsPut';
                }
                // if(this.ruleForm.categoryId == ''){
                //     this.ruleForm.categoryId = this.ruleForm.typeId;
                // }
                // if(this.ruleForm.categoryId == ''){
                    // this.ruleForm.categoryId = this.ruleForm.typeId;
                // }
                // if(this.ruleForm.parentIds.length!=0)
                // {
                //     this.ruleForm.categoryId=this.ruleForm.parentIds[this.ruleForm.parentIds.length-1];
                // }
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        if(_this.ruleForm.content == '')
                        {
                            _this.$message.error("服务内容不能为空");
                            return;
                        }
                        if(_this.ruleForm.serviceTimeDesc == '')
                        {
                            _this.$message.error("服务时间不能为空");
                            return;
                        }
                        if(_this.ruleForm.submitInformation == '')
                        {
                            _this.$message.error("提交材料不能为空");
                            return;
                        }
                        if(_this.ruleForm.disclaimer == '')
                        {
                            _this.$message.error("免责申明不能为空");
                            return;
                        }
                        $("body").mLoading("show");
                        apiOperaCon[_this.commitType](_this, _this.ruleForm).then(function (response) {
                            let body = response.body;
                            this.$message(body.msg);
                            if (body && body.code == 1) {
                                _this.commitType = 'goodsPut';

                                if(body.data)
                                {
                                    this.id=body.data;
                                    this.ruleForm.id=body.data;
                                }
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                    return false;
                });
            },
            handleRemove:function(file, fileList) {
                this.fileList = fileList;
            },
            handleRemoveBizi:function(file, fileListBizi) {
                this.fileListBizi = fileListBizi;
            },
            beforeAvatarUpload:function(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt12M = file.size / 1024 / 1024 < 12;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传图片只能是 JPG,PNG 格式!');
                    return false;
                }
                if (!isLt12M) {
                    this.$message.error('上传图片大小不能超过 12MB!');
                    return false;
                }
                return true;
            },
            handleChange:function(file, fileList) {
                // console.log("文件开始");
                // console.log(fileList);
                // console.log(file);
                // console.log("文件结束");


                if(file.response && file.response.code !=1){
                    this.$message.error(file.response.msg);
                    let _l = fileList.length-1;
                    fileList.splice(_l, 1);
                    this.fileList = fileList;
                    return;
                }
                if(file.response && file.response.code ==1){
                    let len = fileList.length;
                    if(len>5)
                    {
                        this.$message.error("最多只能上传5张照片");
                        fileList.splice(0,1);
                        console.log(fileList);
                    }
                    this.fileList = fileList;
                    return;
                }
                this.fileList = fileList;
            },
            handleChangeBizi:function(file, fileListBizi) {
                if(file.response && file.response.code !=1){
                    this.$message.error(file.response.msg);
                    let _l = fileListBizi.length-1;
                    fileListBizi.splice(_l, 1);
                    this.fileListBizi = fileListBizi;
                    return;
                }
                if(file.response && file.response.code ==1){
                    let len = fileListBizi.length;
                    if(len>1)
                    {
                        this.$message.error("最多只能上传一张照片");
                        fileListBizi.splice(0,1);
                        // console.log(fileListBizi);
                    }
                    this.fileListBizi = fileListBizi;
                    return;
                }
                // console.log("fileListBizi...====");
                // console.log(...fileListBizi);
                // console.log("fileListBizi===="+fileListBizi.toString());
                this.fileListBizi = fileListBizi;
            },
            back:function(){
                this.$router.go(-1);
            },
        }
    }
    //
</script>
