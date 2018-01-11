<template>
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li>
                            <router-link :to="{name: 'index'}"><i class="icon-home"></i>Home</router-link>
                        </li>
                        <li class="active">工具管理</li>
                        <li class="active">{{typeTitle}}</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4" style="line-height: 30px">{{typeTitle}}</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <a href="javascript:void (0)" @click="click('新增')" v-if="classify != 3" class="btn btn-info  btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        新增
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <el-radio-group  v-model="classify">
                                <el-radio-button label="1">单位管理</el-radio-button>
                                <el-radio-button label="2">联系人管理</el-radio-button>
                                <el-radio-button label="3">纠错管理</el-radio-button>
                            </el-radio-group>
                            <div class="table-content">
                                <div  v-if="classify==1">
                                    <div class="tab-option">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <el-form :inline="true" :model="param">
                                                    <el-form-item>
                                                        <el-radio-group  v-model="isState">
                                                            <el-radio-button label="0">可用</el-radio-button>
                                                            <el-radio-button label="1">禁用</el-radio-button>
                                                        </el-radio-group>
                                                    </el-form-item>
                                                    <el-form-item label="地区">
                                                        <v-distpicker style="margin-right: 20px"  wrapper="xaddress" @selected="onSelectedCity" @province="onProvince" @area="onArea"></v-distpicker>
                                                    </el-form-item>
                                                    <el-form-item label="类型">
                                                        <el-select v-model="param.categoryId" clearable>
                                                            <el-option :value="item.id" :label="item.name" :key="item.id" v-for="item in options">{{item.name}}</el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                    <el-form-item label="单位名称">
                                                        <el-input type="text" v-model="param.organName"></el-input>
                                                    </el-form-item>
                                                    <el-form-item>
                                                        <el-button type="primary" @click="click('搜索')">搜索</el-button>
                                                    </el-form-item>
                                                </el-form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div  v-if="classify==2">
                                    联系人名称:
                                    <el-input type="text" v-model="param.personName" class="el-input-wd input"></el-input>
                                    <el-button type="primary" @click="click('搜索')">搜索</el-button>
                                </div>
                                <div  v-if="classify==3">
                                    <el-radio-group  v-model="isState" size="small">
                                        <el-radio-button label="0">未处理</el-radio-button>
                                        <el-radio-button label="1">通过</el-radio-button>
                                        <el-radio-button label="2">未通过</el-radio-button>
                                    </el-radio-group>
                                </div>
                                    <tableList @isPage="isPage" :page_total="page_total" :limit="param.limit" :table_data="table_data" :index_list="index_list" :prop_name="prop_name">
                                        <el-table-column  label="操作" fixed="right" width="200">
                                            <template slot-scope="scope">
                                                <div>
                                                    <el-button :key="item.name" v-for="(item,index) in buttonName" size="small" @click="click(item.name,scope.row,scope.$index)">{{item.name}}</el-button>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </tableList>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-dialog v-model="isShow" size="tiny" :title="title" @close="Close">
                <el-form :model="form" label-width="100px" v-if="classify == 1 && !isSubs">
                    <el-form-item label="单位类型">
                        <el-select v-model="form.categoryId" :disabled="isLook">
                            <el-option :value="item.id" :label="item.name" :key="item.id" v-for="item in options">{{item.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="单位名称">
                        <el-input v-model="form.organName"  class="form-input" :disabled="isLook"></el-input>
                    </el-form-item>
                    <el-form-item label="地区">
                        <v-distpicker v-if="!isLook" style="margin-right: 20px"  :province="select.province" :city="select.city" :area="select.area" wrapper="xaddress" @selected="onSelectedCity" @province="onProvince" @area="onArea"></v-distpicker>
                        <div v-else style="display: flex;align-items: center;width: 80%">
                            <el-input v-model="form.province" style="margin-right: 10px" :disabled="isLook"></el-input>
                            <el-input v-model="form.city"  style="margin-right: 10px" :disabled="isLook"></el-input>
                            <el-input v-model="form.county"  :disabled="isLook"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="form.address" class="form-input" :disabled="isLook"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="form.telephone" class="form-input" :disabled="isLook"></el-input>
                    </el-form-item>
                    <el-form-item label="下属单位" >
                            <div v-if="isLook">
                                <el-button type="text" @click="click('单位')">{{form.subNum}} （点击这里查看）</el-button>
                            </div>
                            <div v-else>
                                <el-tag :key="tag" v-for="tag in dynamicTags" :closable="true" :close-transition="false" @close="handleClose(tag)">{{tag}}</el-tag>
                                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
                            </div>
                    </el-form-item>
                    <el-form-item label="联系人数量" v-if="isLook">
                        <el-button type="text" @click="click('数量')">{{form.personNum}} （点击这里查看）</el-button>
                    </el-form-item>
                    <el-form-item>
                        <div v-if="!isLook">
                            <el-button type="primary" @click="click('保存')">保存</el-button>
                            <el-button @click="isShow=false">取消</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <div v-if="classify == 1 && isSubs">
                    <el-button type="text" style="position: absolute;top:40px;left:15px"  @click="isSubs=false"><i class="el-icon-arrow-left">返回</i></el-button>
                    <el-table :data="subsData" style="margin-top: 7px" v-if="Render === 1">
                        <el-table-column property="fullName" label="单位名称"></el-table-column>
                        <el-table-column property="organName" label="下属单位"></el-table-column>
                    </el-table>
                    <el-table :data="subsData" style="margin-top: 7px" v-if="Render === 2">
                        <el-table-column property="personName" label="联系人名称"></el-table-column>
                        <el-table-column property="telephone" label="联系方式"></el-table-column>
                        <el-table-column property="position" label="职位"></el-table-column>
                        <el-table-column property="name1" label="单位"></el-table-column>
                        <el-table-column property="name2" label="下属单位"></el-table-column>
                    </el-table>
                </div>
                <el-form :model="form" label-width="100px" v-if="classify == 2">
                    <el-form-item label="单位">
                        <el-cascader clearable filterable :options="sel_options" change-on-select v-model="per_sub_list" @change="activeChange" :props="props"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="联系人名称">
                        <el-input v-model="form.personName" class="form-input"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="form.telephone" class="form-input"></el-input>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-input v-model="form.position" class="form-input"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="click('保存')">保存</el-button>
                        <el-button @click="isShow=false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<style scoped>
.table-content{
    margin-top: 20px;
}
.el-input-wd{
    width: 150px;
    margin-left: 5px;
    margin-right: 15px;
}
.form-input{
    width: 80%;
}

</style>
<script>
    import tableList from 'components/tool/Ele-table.vue'
    import VDistpicker from 'components/common/distpicker/Distpicker'
    import apiTool from 'api/tool';
    export default {
        data() {
            return {
                typeTitle:"通讯管理",
                classify: "",
                param:{
                    province:'',
                    city:'',
                    county:'',
                    organName:'',
                    categoryId:'',
                    parentUuid:'',
                    limit:5,
                    page:1
                },
                select:{
                    province: '省',
                    city: '市',
                    area: '区'
                },
                options:[],
                table_data:[],
                index_list: [],
                prop_name: [],
                buttonName:[],
                isShow:false,
                isEdit:false,
                isLook:false,
                isSubs:false,
                title:'',
                form:{},
                isState:'',
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                subsData:[],
                Render:0,// 1 渲染单位 2 渲染联系人
                sel_options:[
                ],
                props: {
                    value: 'label',
                    children: 'subList'
                },
                per_sub_list:[],
                isOne:false,
                page_total:0,
            }
        },
        methods:{
            isPage(data){
                this.param.page=data;
            },
            //选择联系人单位
            activeChange(val){
                this.per_sub_list=val;
            },
            init(){
                if(this.classify == 1){
                    this.index_list=[
                        {"label":"单位类型"},
                        {"label":"单位名称"},
                        {"label":"省"},
                        {"label":"市"},
                        {"label":"区"},
                        {"label":"单位联系方式"},
                        {"label":"单位地址"},
                        {"label":"单位下属数量"},
                        {"label":"联系人数量"},
                        {"label":"状态"}
                    ];
                    this.prop_name=[
                        "type","organName","province","city","county","telephone","address",
                        "subNum","personNum","stateName"
                    ];
                    if(this.isState == 0){
                        this.buttonName=[{name:"禁用"},{name:"编辑"},{name:"查看"}];
                    }else if(this.isState == 1){
                        this.buttonName=[{name:"启用"},{name:"编辑"},{name:"查看"}];
                    }
                    this.table_data=[];
                    if(this.param.province == "省"){
                        this.param.province="";
                        this.param.city="";
                        this.param.county="";
                    }
                }else if(this.classify == 2){
                    this.index_list=[
                        {"label":"联系人名称"},
                        {"label":"联系方式"},
                        {"label":"职位"},
                        {"label":"单位"},
                        {"label":"下属单位"},
                    ];
                    this.prop_name=[
                        "personName","telephone","position","name1","name2"
                    ];
                    this.buttonName=[{name:"编辑"},{name:"删除"}];
                    this.table_data=[];
                }else if(this.classify == 3){
                    this.index_list=[
                        {"label":"联系人名称"},
                        {"label":"联系方式"},
                        {"label":"职位"},
                        {"label":"单位"},
                        {"label":"下属单位"},
                    ];
                    this.prop_name=[
                        "personName","personTelephone","personPosition","name1","name2"
                    ];
                    if(this.isState == 0){
                        this.buttonName=[{name:"通过"},{name:"不通过"}];
                    }else if(this.isState == 1){
                        this.buttonName=[{name:"已处理"}];
                    }else if(this.isState == 2){
                        this.buttonName=[{name:"已处理"}];
                    }
                    this.table_data=[];
                }
                this.getList(this.classify,this.param);
            },
            //获取列表 type 为1 获取单位列表 为2 获取联系人列表 为3获取纠错管理列表
            getList(type,param){
                let _this=this;
                if(type == 1){
                    apiTool.contactList_list(this,param).then(response=> {
                        let list=[];
                        if(response.body.data.items){
                            response.body.data.items.forEach(function (v,k) {
                                _this.options.forEach(function (m,n) {
                                    if(v.categoryId == m.id){
                                        v.type=m.name;
                                    }
                                });
                                if(v.personList){
                                    v.personNum=v.personList.length
                                }else{
                                    v.personNum=0
                                }
                                if(v.subList){
                                    v.subNum=v.subList.length;
                                }else{
                                    v.subNum=0
                                }
                                if(v.organState === 0){
                                    v.stateName="已开启"
                                }else if(v.organState === 1){
                                    v.stateName="已关闭"
                                }
                                if(v.organState == _this.isState){
                                    list.push(v);
                                }
                            });
                        }
                        this.page_total=response.body.data.total;
                        this.table_data=list;
                    });
                }else if(type == 2){
                    apiTool.contactList_personList(this,param).then(response=>{
                        response.body.data.items.forEach(function (v,k) {
                            if(v.organName){
                                v.name1=v.organName.split("-")[0];
                                v.name2=v.organName.split("-")[1]
                            }
                        });
                        this.table_data=response.body.data.items;
                        this.page_total=response.body.data.total
                    });
                }else if(type == 3){
                    apiTool.contactList_correctiveList(this,'').then(response=> {
                        let list=[];
                        if(response.body.data.items){
                            response.body.data.items.forEach(function (v,k) {
                                if(v.personTelephone === ""){
                                    v.personTelephone = "未修改"
                                }
                                if(v.personName === ""){
                                    v.personName = "未修改"
                                }
                                if(v.personPosition === ""){
                                    v.personPosition = "未修改"
                                }
                                if(v.personOrganName === ""){
                                    v.personOrganName = "未修改"
                                }
                                if(v.personOrganName){
                                    v.name1=v.personOrganName.split("-")[0];
                                    v.name2=v.personOrganName.split("-")[1]
                                }
                                if(v.correctiveState == _this.isState){
                                    list.push(v);
                                }
                            });
                            this.table_data=list;
                            this.page_total=response.body.data.total
                        }
                    })
                }
            },
            //获取分类
            contactList_category(){
                apiTool.contactList_category(this,'').then(response=>{
                    this.options=response.body.data;
                })
            },
            //点击事件
            click(name,info,index){
                let user_type="",_this=this;
                if(this.classify == 1){
                    user_type="单位"
                }else{
                    user_type="联系人"
                }
                if(name === "禁用"){
                    this.updateState(1,1,info,name,index)
                }else if(name === "启用"){
                    this.updateState(0,1,info,name,index)
                }else if(name === "编辑"){
                    this.isShow=true;
                    this.isEdit=true;
                    this.isLook=false;
                    this.isSubs=false;
                    if(this.classify == 1){
                        if(info.subList){
                            let subList=[];
                            info.subList.forEach(function (v,k) {
                                subList.push(v.organName);
                            });
                            this.dynamicTags=subList;
                        }
                        this.form={
                            uuid:info.uuid,
                            categoryId:info.type,
                            organName:info.organName,
                            province:info.province,
                            city:info.city,
                            county:info.county,
                            address:info.address,
                            telephone:info.telephone,
                            subs:'',
                        };
                        this.select.province=info.province;
                        this.select.city=info.city;
                        this.select.area=info.county;
                    }else if(this.classify == 2){
                        this.form={
                            uuid:info.uuid,
                            personName:info.personName,
                            organId:info.organId,
                            position:info.position,
                            telephone:info.telephone
                        };
                        this.per_sub_list=[];
                        //请求列表
                        apiTool.contactList_list(this,'').then(response=> {
                            if(response.body.data.items){
                                response.body.data.items.forEach(function (v,k) {
                                    v.label=v.organName;
                                    v.value=v.organName;
                                    if(info.organName.split("-")[0] == v.organName){
                                           _this.per_sub_list.push(v.organName)
                                    }
                                    if(v.subList){
                                        v.subList.forEach(function (n,m) {
                                            n.value=n.uuid;
                                            n.label=n.organName;
                                            if(info.organName.split("-")[1] == n.organName){
                                                _this.per_sub_list.push(n.organName)
                                            }
                                        });
                                    }
                                });
                                this.sel_options=response.body.data.items;
                            }
                        });
                    }
                    this.title=name+user_type;
                }else if(name === "查看"){
                    this.isShow=true;
                    this.isLook=true;
                    this.isEdit=false;
                    this.form=info;
                    this.form.categoryId=info.type;
                    this.title=name+user_type;
                }else if(name === "新增"){
                    this.isShow=true;
                    this.isLook=false;
                    this.isEdit=false;
                    this.title=name+user_type;
                    if(this.classify == 1){
                        this.form={
                            categoryId:'',
                            organName:'',
                            province:'',
                            city:'',
                            county:'',
                            address:'',
                            telephone:'',
                            subs:'',
                            per_sub_uuid:'',
                        };
                        this.select={
                            province: '',
                                city: '',
                                area: ''
                        };
                    }else if(this.classify == 2){
                        this.form={
                            personName:'',
                            organId:'',
                            position:'',
                            telephone:''
                        };
                        this.per_sub_list=[];
                        //请求列表
                        apiTool.contactList_list(this,'').then(response=> {
                            if(response.body.data.items){
                                response.body.data.items.forEach(function (v,k) {
                                   v.label=v.organName;
                                   if(v.subList){
                                       v.subList.forEach(function (n,m) {
                                           n.value=n.uuid;
                                           n.label=n.organName;
                                       })
                                   }
                                });
                                this.sel_options=response.body.data.items
                            }
                        })
                    }

                }else if(name === "可用"){
                    this.updateState(0,1,info,name)
                }else if(name === "通过"){
                    this.updateState(1,3,info,name)
                }else if(name === "不通过"){
                    this.updateState(2,3,info,name)
                }else if(name === "保存"){
                    if(this.classify == 1){
                        this.form.subs=this.dynamicTags.join("-");
                    }else{
                        this.sel_options.forEach(function (v,k) {
                            if(_this.per_sub_list[0] == v.label){
                                if(_this.per_sub_list[1] == undefined){
                                    _this.form.organId = v.uuid
                                }else{
                                    v.subList.forEach(function (m,n) {
                                        if(_this.per_sub_list[1] == m.label){
                                            _this.form.organId = m.uuid
                                        }
                                    })
                                }
                            }
                        });
                    }
                    this.save(this.classify,name)
                }else if(name === "搜索"){
                    this.init()
                }else if(name === "删除"){
                    this.updateState(2,2,info,name,index)
                }else if(name === "单位" || name === "数量"){
                    this.Look(name,info)
                }
            },
            //Look查看
            Look(name,info){
                let param={
                    uuid:this.form.uuid
                };
                this.isSubs=true;
                this.subsData=[];
                if(name === "单位"){
                    this.Render=1;
                    apiTool.contactList_subs_organ(this,param).then(response=>{
                        if(response.body.data.items){
                            response.body.data.items.forEach(function (v,k) {
                                if(v.fullName){
                                    v.fullName=v.fullName.split('-')[0]
                                }
                            });
                            this.subsData=response.body.data.items;
                        }
                    })
                }else{
                    this.Render=2;
                    apiTool.contactList_persons_organ(this,param).then(response=>{
                        if(response.body.data.items){
                            response.body.data.items.forEach(function (v,k) {
                                if(v.organName){
                                    v.name1=v.organName.split('-')[0];
                                    v.name2=v.organName.split('-')[1];
                                }
                            });
                            this.subsData=response.body.data.items
                        }
                    })
                }
            },
            //新建 type 1为新建单位 2为新建联系人 isEdit判断为编辑还是新增
            save(type){
                if(type == 1){
                    let _this=this;
                    if(this.isEdit){
                        this.options.forEach(function (v,k) {
                           if(_this.form.categoryId == v.name){
                               _this.form.categoryId=v.id
                           }
                        });
                        apiTool.contactList_update(this,this.form).then(response=>{
                            this.isShow=false;
                            this.init();
                            this.isEdit=false;
                        })
                    }else{
                        apiTool.contactlist_save(this,this.form).then(response=>{
                            if(response.body.code === 1){
                                this.$message(response.body.msg);
                                this.isShow=false;
                                this.init();
                            }else{
                                this.$message("请填写完整的资料~!")
                            }
                        })
                    }
                }else if(type == 2){
                    if(this.isEdit){
                        apiTool.contactList_update_persons(this,this.form).then(response=>{
                            if(response.body.code === 1){
                                this.$message(response.body.msg);
                                this.isShow=false;
                                this.init();
                                this.isEdit=false;
                            }else{
                                this.$message("请填写完整的资料~!")
                            }
                        })
                    }else{
                        apiTool.contactList_save_persons(this,this.form).then(response=>{
                            if(response.body.code === 1){
                                this.$message(response.body.msg);
                                this.isShow=false;
                                this.init();
                            }else{
                                this.$message("请填写完整的资料~!")
                            }
                        })
                    }
                }
            },
            Close(){
                this.dynamicTags=[];
            },
            //选择区
            onArea(data){
                if(this.isShow){
                    this.form.county = data.value;
                }else{
                    this.param.county = data.value;
                }
            },
            //选择城市
            onSelectedCity(data){
                if(this.isShow){
                    this.form.city = data.city && data.city.value || '';
                }else{
                    this.param.city = data.city && data.city.value || '';
                }
            },
            //选择省份
            onProvince(data){
                if(this.isShow){
                    this.form.province = data.value
                }else{
                    this.param.province = data.value
                }
            },
            //更新状态 state需要更新的状态 type 1 2 3分别为单位、联系人、纠错管理 info传入点击事件的数据,name改变的提示，index修改哪行
            updateState(state,type,info,name,index){
                let _this=this,param;
                this.$confirm('确定'+name+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    param={
                        uuid:info.uuid,
                        organState:state,
                    };
                    if(type === 1){
                        apiTool.contactList_operate(this,param).then(response=>{
                            _this.table_data.splice(index,1);
                        });
                    }else if(type === 2){
                         param={
                            uuid:info.uuid,
                            personState:state,
                        };
                        apiTool.contactList_personOperate(this,param).then(response=>{
                            _this.table_data.splice(index,1);
                        })
                    }else if(type === 3){
                        param={
                            uuid:info.uuid,
                            correctiveState:state,
                        };
                        apiTool.contactList_correctiveOperate(this,param).then(response=>{
                            if(response.body.code === 1){
                                _this.table_data.splice(index,1);
                            }else{
                             _this.$message(response.body.msg)
                            }
                        })
                    }
                }).catch(() => {
                });
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            //获取URL参数
            getURLParam(paras) {
                var url = location.href;
                var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
                var paraObj = {};
                var i, j;
                for (i = 0; j = paraString[i]; i++) {
                    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
                }
                var returnValue = paraObj[paras.toLowerCase()];
                if (typeof(returnValue) == "undefined") {
                } else {
                    return returnValue;
                }
            },
        },
        mounted(){
            this.init();

            if(location.href.indexOf("?") === -1){
                this.classify="1";
                this.isState="0";
            }else{
                this.classify=this.getURLParam("classify");
                this.isState=this.getURLParam("state");
            }
            if(this.classify == 1) this.contactList_category();
            this.isOne=true
        },
        components: {tableList,VDistpicker},
        watch:{
            "classify"(to,from){
                this.init();
                if(this.classify == 1 && this.isState == 2){
                    this.isState="0"
                }
                 location.href=location.href.split("?")[0]+"?classify="+to+"&state="+this.isState;
            },
            "isState"(to,from){
                this.init();
                if(this.isOne){
                    this.isOne=false;
                }else{
                    location.href=location.href.split("?")[0]+"?classify="+this.classify+"&state="+to;
                }
            },
            "param.page"(to,from){
                this.init();
            }
        }
    }
</script>
