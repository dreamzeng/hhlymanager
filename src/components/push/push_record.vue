<template>
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">推送管理</li>
                        <li class="active">推送记录</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">推送记录</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <router-link to="./app_push"><el-button type="primary">App消息<i class="el-icon-plus el-icon--right"></i></el-button></router-link>
                                    <router-link to="./news_push"><el-button type="primary">短信消息<i class="el-icon-plus el-icon--right"></i></el-button></router-link>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <el-radio-group  v-model="isState" size="small">
                                        <el-radio-button label="2">APP推送记录</el-radio-button>
                                        <el-radio-button label="1">短信推送记录</el-radio-button>
                                        <el-radio-button label="0">定时推送记录</el-radio-button>
                                    </el-radio-group>
                                    <div class="row" style="margin-top: 20px">
                                        <div class="col-lg-12">
                                            <el-form :inline="true" :model="param">
                                                <el-form-item label="标题" v-if="isState == 2">
                                                    <el-input @keyup.13.native="search" type="text" v-model="param.msgTitle"></el-input>
                                                </el-form-item>
                                                <el-form-item label="发送内容" v-else>
                                                    <el-input @keyup.13.native="search" type="text" v-model="param.msgContent"></el-input>
                                                </el-form-item>
                                                <el-form-item label="发送状态">
                                                    <el-select v-model="param.sendState">
                                                        <el-option value="" label="全部">全部</el-option>
                                                        <el-option value="1" label="已发送">已发送</el-option>
                                                        <el-option value="0" label="未发送">未发送</el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item label="开始时间">
                                                    <el-date-picker
                                                        v-model="param.SendTimeStart"
                                                        type="datetime"
                                                        placeholder="推送时间"
                                                        align="right"
                                                        @change="changeTime"
                                                        :picker-options="pickerOptions1">
                                                    </el-date-picker>
                                                </el-form-item>
                                                <el-form-item label="结束时间">
                                                    <el-date-picker
                                                        v-model="param.SendTimeEnd"
                                                        type="datetime"
                                                        placeholder="推送时间"
                                                        align="right"
                                                        @change="changeTime1"
                                                        :picker-options="pickerOptions1">
                                                    </el-date-picker>
                                                </el-form-item>
                                                <el-form-item>
                                                    <button type="submit" @click="search" class="btn btn-danger">搜索</button>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </div>
                                    <tableList @isPage="isPage" ref="table" :indexNo="indexNo" :select="select"  :page_total="page_total" :limit="param.limit" :table_data="table_data" :index_list="index_list" :prop_name="prop_name">
                                        <el-table-column  label="操作">
                                            <template slot-scope="scope">
                                                <div>
                                                    <el-button type="text" v-if="isState==0 && scope.row.sendState.code === 0" @click="click(scope.row.isClose.code,scope.row.uuid,scope.row.isClose.value)">{{scope.row.isClose.value}}</el-button>
                                                    <el-button type="text" v-if="scope.row.sendState.code === 0" @click="edit(scope.row.uuid,scope.row.msgType.code)">编辑</el-button>
                                                    <el-button type="text" @click="detail(scope.row.uuid)">查看</el-button>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </tableList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-dialog v-model="isShow">
                <div class="maxH">
                    <el-form :model="formLabelAlign" label-position="right" label-width="80px">
                        <el-form-item label="标题:" v-if="isState == 2">
                            {{formLabelAlign.msgTitle}}
                        </el-form-item>
                        <el-form-item label="内容:">
                            {{formLabelAlign.msgContent}}
                        </el-form-item>
                        <el-form-item label="通知形式:" v-if="isState == 2">
                            {{formLabelAlign.appMsgForm.value}}
                        </el-form-item>
                        <el-form-item label="操作:" v-if="isState == 2">
                            {{formLabelAlign.appClickType.value}}
                        </el-form-item>
                        <el-form-item label="url地址:" v-if="isState == 2 && formLabelAlign.appClickType.code>1">
                            <div v-if="formLabelAlign.appClickType.code == 3">
                                {{formLabelAlign.linkUrl}}
                            </div>
                            <div v-else>
                                安卓:{{formLabelAlign.linkUrlAndroid}}
                                IOS:{{formLabelAlign.linkUrlIos}}
                            </div>
                        </el-form-item>
                        <el-form-item label="推送对象:" v-if="isState == 2">
                            {{formLabelAlign.msgReceiveEnd.value}}/{{formLabelAlign.msgReceiveUserType.value}}/{{formLabelAlign.msgReceiveCustom.value}}
                        </el-form-item>
                        <el-form-item label="发送方式:">
                            {{formLabelAlign.sendTimeType.value}}
                        </el-form-item>
                        <el-form-item label="发送时间:">
                            {{formLabelAlign.createTime}}
                        </el-form-item>
                        <el-form-item label="发送状态:">
                            {{formLabelAlign.sendState.value}}
                        </el-form-item>
                    </el-form>
                    <tableList @isPage="isPage2" ref="table" :indexNo="indexNo2" :select="select2"  :page_total="page_total2" :limit="param2.limit" :table_data="table_data2" :index_list="index_list2" :prop_name="prop_name2">
                    </tableList>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<style scoped>
    .flex {
        display: flex;
        text-align: right;
        width: 80%;
        margin-top: 20px;
    }
    .flex-title{
        min-width: 150px;font-size: 16px
    }
    .maxH{
        max-height: 700px;
        overflow-y: scroll;
        width: 100%;
    }
</style>
<script>
    import tableList from 'components/common/Ele-table.vue'
    import apiPush from 'api/push';
    import news_push from './news_push.vue'
    export default {
        data() {
            return {
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                formLabelAlign:{
                    msgTitle:'',
                    msgContent:'',
                    appMsgForm:'',
                    linkUrl:'',
                    linkUrlAndroid:'',
                    linkUrlIos:'',
                    msgReceiveEnd:'',
                    msgReceiveUserType:'',
                    msgReceiveCustom:'',
                    appClickType:'',
                    sendTimeType:'',
                    createTime:'',
                    sendState:''
                },
                isStatus:'edit',
                isShow:false,
                indexNo:false,
                select:false,
                page_total:0,
                isState:'',
                param:{
                    sendTimeType:1,
                    msgType:'',
                    msgTitle:'',
                    msgContent:'',
                    sendState:'',
                    SendTimeStart:'',
                    SendTimeEnd:'',
                    limit:10,
                    page:1,
                },
                table_data:[],
                index_list:[],
                prop_name:[],
                table_data2:[],
                index_list2:[
                    {"label":"用户名"},
                    {"label":"姓名"},
                    {"label":"类型"},
                ],
                prop_name2:["userName","realName","userType.value"],
                indexNo2:false,
                select2:false,
                page_total2:0,
                msgId:'',
                param2:{
                    limit:8,
                    page:1,
                },
            }
        },
        methods:{
            edit(id,isState){
                if(isState === 1){
                    this.$router.push({path: './news_push', query:{uuid:id,isState:this.isState}})
                }else{
                    this.$router.push({path: './app_push', query:{uuid:id,isState:this.isState}})
                }
            },
            changeTime(data){
              this.param.SendTimeStart=data;
            },
            changeTime1(data){
                this.param.SendTimeEnd=data;
            },
            search(){
                this.init();
            },
            detail(id){
                this.isShow=true;
                this.msgId=id;
                apiPush.schedule_MsgGet(this,id).then(res=>{
                        this.formLabelAlign=res.body.data;
                });
                this.msg_userPage();
            },
            msg_userPage(){
                let data={
                    msgId:this.msgId,
                    page:this.param2.page,
                    limit:this.param2.limit
                };
                apiPush.msg_userPage(this,data).then(res=>{
                    if(res.body.code === 1){
                        this.table_data2=res.body.data.items;
                        this.page_total2=res.body.data.total;
                    }
                })
            },
            click(type,id,name){
                this.$confirm('确认'+name+'该条定时推送消息？','提示')
                    .then(_ => {
                        if(type === 0 ){
                            apiPush.schedule_MsgEnable(this,id).then(res=>{
                                this.$message(res.body.msg);
                                this.init();
                            })
                        }else{
                            apiPush.schedule_MsgDisable(this,id).then(res=>{
                                this.$message(res.body.msg);
                                this.init();
                            })
                        }
                    })
                    .catch(_ => {});
            },
            isPage(data){
                this.param.page=data;
            },
            isPage2(data){
                this.param2.page=data;
            },
            init(){
                this.param.msgType = this.isState;
                if(this.isState == 1){
                    delete this.param.sendTimeType;
                    this.param.msgTitle='';
                    this.index_list=[
                        {"label":"发送内容"},
                        {"label":"发送用户数"},
                        {"label":"发送时间"},
                        {"label":"状态"},
                    ]
                    this.prop_name=["msgContent","msgUserNum","sendTime","sendState.value"]
                }else if(this.isState == 0){
                    this.param.sendTimeType = 1;
                    this.param.msgTitle='';
                    this.index_list=[
                        {"label":"发送内容"},
                        {"label":"发送用户数"},
                        {"label":"类型"},
                        {"label":"发送时间"},
                        {"label":"状态"},
                    ];
                    this.prop_name=["msgContent","msgUserNum","msgType.value","sendTime","sendState.value"]
                }else if(this.isState == 2){
                    delete this.param.sendTimeType;
                    this.param.msgContent='';
                    this.index_list=[
                        {"label":"标题"},
                        {"label":"发送用户数"},
                        {"label":"推送时间"},
                        {"label":"创建时间"},
                        {"label":"状态"},
                    ];
                    this.prop_name=["msgTitle","msgUserNum","sendTime","createTime","sendState.value"]
                }
                apiPush.schedule_page(this,this.param).then(response=>{
                    if(response.body.data.items){
                        response.body.data.items.forEach(function (v,k) {
                            if(v.isClose.code == 0){
                                v.isClose.value="启用"
                            }else{
                                v.isClose.value="关闭"
                            }
                        })
                    }
                        this.table_data=response.body.data.items;
                        this.page_total=response.body.data.total;
                })
            }
        },
        mounted(){
            if(this.$route.params.isState){
                this.isState=this.$route.params.isState
            }else{
                this.isState='2'
            }
            console.log(this.$route.params.isState);
              this.init();
        },
        components:{
            tableList,news_push
        },
        watch:{
            "param.page"(to,from){
                this.init();
            },
            "param2.page"(to,from){
                this.msg_userPage();
            },
            "isState"(to,from){
                this.init();
                if(from){
                    if(to == 2){
                        this.formLabelAlign.appMsgForm='';
                        this.formLabelAlign.appClickType='';
                    }
                }
            }
        }
    }
</script>
