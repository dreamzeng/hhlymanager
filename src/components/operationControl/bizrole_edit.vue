<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li>
                            <router-link :to="{name: 'index'}">
                                <i class="icon-home"></i> Home</router-link>
                        </li>
                        <li>
                            <a href="javascript:;" @click="back">业务管理</a>
                        </li>
                        <li>{{typeTitle}}</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">{{typeTitle}}</div>
                        <div class="panel-body">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" label-position="right">
                                <el-form-item label="角色名称" prop="name">
                                    <el-input placeholder="业务角色名称" v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="角色编码" prop="code">
                                    <el-input placeholder="业务角色编码" v-model="ruleForm.code"></el-input>
                                </el-form-item>
                                <el-form-item label="状态" prop="advertType">
                                    <el-select v-model.number="ruleForm.state" placeholder="请选择" @change="changeSel">
                                        <el-option key="0" label="启用" value="0"></el-option>
                                        <el-option key="1" label="禁用" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                                
                                <el-form-item label="业务权限" prop="goodIds">
                                   <div style="margin-bottom:15px;">
                                        <el-input
                                            placeholder="输入关键字进行过滤"
                                            v-model="filterText">
                                        </el-input>
                                    </div>    
                                    <el-tree
                                        :data="resList"
                                        show-checkbox
                                        default-expand-all
                                        node-key="id"
                                        ref="treeRes"
                                        highlight-current
                                        :check-strictly="checkStrictly"
                                        :filter-node-method="filterNode"
                                        :default-checked-keys="defKeys"
                                        :props="defaultProps">
                                    </el-tree>
                                </el-form-item>
                                
                                <el-form-item>
                                    <el-button type="info" @click="submitForm('ruleForm')">提交</el-button>
                                    <el-button @click="back">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!--main content end-->
</template>
<style scoped>
.normal {
    font-weight: normal;
}
</style>
<script>
import {bizroleApi} from 'api/operationControl';

export default {
    name: 'bizroleEdit',
    components: {  },
    data: function() {
        return {
            ruleForm: {
                name: '', 
                code: '',
                goodIds:'',
                state:'0'
            },
            rules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                ],
                code: [{ required: true, message: '请选择角色标识', trigger: 'blur' }],
                goodIds: [{ required: true, message: '请选择业务权限', trigger: 'blur' }],
            },

            resList:[],
            filterText: '',
            checkStrictly:false,
            defKeys:[], // 初始化时，传入的数据
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            autoKey:0
        }
    },
    watch: {
        filterText(val) {
            this.$refs.treeRes.filter(val);
        }
    },
    computed: {
        isEdit: function() {
            return this.$route.meta.isEdit; // 根据meta判断
        },
        typeTitle: function(){
            return this.$route.meta.title; 
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.init();
        });
    },
    methods: {
        init: function() {
            $("body").mLoading("show");
            if (this.isEdit) {
                let id = this.$route.params.id;
                this.getItem(id);
            }else{
                this.getGoods();
            }
            
        },
        getGoods: function(){
             bizroleApi.goodsList(this).then(function(response) {
               let res = response.data;
                if(res.code == 1){
                    this.resList =  this.formatObj(res.data.goods);
                    let tepmArr = [];
                    for(let i = 0,l = this.resList.length;i < l; i++){
                        if(this.resList[i].children.length > 0){
                            tepmArr.push(this.resList[i]);
                        }
                    }
                    this.resList = tepmArr;
                }
             },function(response) {

             });
        },
        formatObj(obj){
            let arr = [];
            for(let i = 0,l=obj.length;i<l;i++){
                let temp = { 
                    id:obj[i]['goodId'] || this.autoKey+'categoryId',
                    label:obj[i]['categoryName'] || obj[i]['goodName'],
                    children:[]
                };
                this.autoKey++;
                if(obj[i]['goods'] && obj[i]['goods'].length > 0){
                    temp.children = this.formatObj(obj[i]['goods']);
                }
                arr.push(temp);
            }
            return arr;
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        getNodes: function(){
           let nodes = this.$refs.treeRes.getCheckedNodes();
           let uuids = [];
           for(let i = 0,_l = nodes.length;i<_l; i++){
                if(nodes[i]['id'] && nodes[i]['id'].indexOf('categoryId') == -1){
                    uuids.push(nodes[i]['id']);
                }
           }
           uuids = uuids.length > 0 ? uuids.join(',') : '';
           return uuids;
        },
        getItem:function(id){
            bizroleApi.getItem(this, {uuid:id}).then(function (response) {
                let body = response.body;
                if (body && body.code == 1 && body.data) {
                    if(body.data['goodIds']){
                        for(let i = 0 ,l = body.data['goodIds'].length; i < l ;i++){
                                this.defKeys.push(parseInt( body.data['goodIds'][i]))
                        }
                    }
                    this.ruleForm= {
                        uuid:id,
                        name: body.data['name'], 
                        code: body.data['code'],
                        goodIds: body.data['goodIds'] && body.data['goodIds'].join(',') || '',
                        state: body.data['state']+''
                    }
                    this.getGoods();
                    return;
                }
                if (body && body.code == 0) {
                    this.$message.error({message: body.msg});
                }
            }, function (response) {
                console.log('error:', response);
            });
        },
        submitForm: function(formName) {
            let _this = this;
            let commitType = 'add';
            if (this.isEdit) {
                commitType = 'modify';
            }
            this.ruleForm['goodIds'] = this.getNodes();
           
            this.$refs[formName].validate(function(valid) {
                if (valid) {
                    $("body").mLoading("show");
                    bizroleApi[commitType](_this, _this.ruleForm).then(function(response) {
                        let body = response.body;
                        this.$message(body.msg);
                        if (body && body.code == 1) {
                            this.$router.go(-1);
                            return;
                        }
                    }, function(response) {
                        console.log('error:', response);
                    });
                }
                return false;
            });
        },
        changeSel: function(v){
            this.ruleForm.state = v+'';
        },
        back: function() {
            this.$router.go(-1);
        }
    }
}
    //
</script>