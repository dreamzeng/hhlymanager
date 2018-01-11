<!-- 问题分类页面 -->
<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li @click="back"> <a href="javascript:void(0)">业务类型</a></li>
                        <li click="active">擅长领域</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <button type="button" class="btn" :class="{'btn-default': source!= 1,'btn-danger': source== 1}" @click="changesSource('1')">律   师</button>
                            <button type="button" class="btn" :class="{'btn-default': source== 1,'btn-danger': source!= 1}" @click="changesSource('3')">产权代理人</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">擅长领域</div>
                                <!-- <div class="col-md-4 col-md-offset-4 text-right">
                                    <a class="btn btn-primary icon icon-plus" @click="addEditType('-1')">新增分类</a>
                                </div> -->
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body">
                                    <el-table :data="dataList" border tooltip-effect="dark" style="width:100%" :row-class-name="tableRowClassName">
                                        <el-table-column align="center" label="序号" type="index" width="100">
                                        </el-table-column>
                                        <el-table-column align="center" prop="sortBy" label="排序" width="100">
                                        </el-table-column>
                                        <el-table-column align="center" prop="name" label="擅长领域名称">
                                        </el-table-column>
                                        <el-table-column align="center" label="对应角色">
                                            <template slot-scope="item">
                                                <span v-if="item.row.bizType.code==1">律师</span>
                                                <span v-if="item.row.bizType.code==3">产权代理人</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" label="分类等级">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.typeCode==1">一级分类</span>
                                                <span v-if="scope.row.typeCode==2">二级分类</span>
                                                <span v-if="scope.row.typeCode==3">三级分类</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="" label="父级名字">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.parentName">{{scope.row.parentName}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" label="操作" width="200">
                                            <template slot-scope="scope">
                                                <el-button type="info" @click="addEditType(scope.row.id)" size="mini">编辑</el-button>
                                                <el-button type="danger" @click="deleteId(scope.row.id)" size="mini">删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <!-- 备注弹框 -->
                                    <el-dialog
                                      title="提示："
                                      :visible.sync="dialogVisible1"
                                      size="tiny">
                                      <div style="text-align:center;font-size:16px">确认删除吗？</div>
                                      <span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogVisible1 = false">取 消</el-button>
                                        <el-button type="primary" @click="confirmAddRemarks">确 定</el-button>
                                      </span>
                                    </el-dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!--main content end-->
</template>

<style scoped>
.el-table .positive-row { background: #c9e5f5;}
.activeTag{color: #FFF;background: #2185D0}
</style>

<script>
    import Page from 'components/common/Page';
    import asking from 'api/asking';
    export default {
        name:'typeList',
        components: {Page: Page},
        data() {
          return {
                    //新添加内容都在上面
           /*  dataList: [
                {
                    "id": 10,
                    "name": "测试类别1",
                    "typeCode": 1,
                    "caseTypes": [
                        {
                            "id": 11,
                            "name": "测试类别1-子类1"
                        }
                    ]
                }
            ], */
            /* dataList: [], */
            dataList1:[],
            dataList3:[],
            todopage: {
                total: 1,
                limit: 10,  //每页显示多少条 limit
                page: 1 //当前页码 page
            },
            dialogVisible1:false,//备注弹窗开关
            typeId:'',//添加备注行的id临时存放处
            source:1
          }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        computed:{
            dataList(){
                if(this.source==1)
                {
                    return this.dataList1;
                }
                else return this.dataList3;
            }
        },
        methods: {
            //表格行颜色
            tableRowClassName(row,idx){
                if(row.typeCode==1)
                {
                    return 'positive-row';
                }
                return "";
            },
            //添加或者编辑案件分类
            addEditType:function(id){
                let source=this.source;
                this.$router.push({name:'be_good_edit',params:{id:id,source:source}});
            },
            init: function () {
                this.dataList1=[];
                this.dataList3=[];
                asking.typeList(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        //将数组的子元素拆分出来，方便表格使用
                        var arr=body.data;
                        //深层数组拆分出来
                        //添加一个字段
                        for(var i=0;i<arr.length;i++)
                        {
                            if(arr[i].caseTypes&&arr[i].caseTypes.length!=0)
                            {
                                for(let j=0;j<arr[i].caseTypes.length;j++)
                                {
                                    arr[i].caseTypes[j].parentName=arr[i].name;
                                    arr.splice(i+1+j,0,arr[i].caseTypes[j]);
                                }
                            }
                        }
                        /* console.log("下面是处理后的完整数据"); */
                        /* console.table(arr); */
                        for(var i=0;i<arr.length;i++)
                        {
                            if(arr[i].bizType.code==1)
                            {
                                this.dataList1.push(arr[i]);
                            }
                            else if(arr[i].bizType.code==3)
                            {
                                this.dataList3.push(arr[i]);
                            }
                        }
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },

            //备注弹窗按钮
            deleteId: function (id) {
                this.dialogVisible1 = true;
                this.typeId=id;
            },
            //备注弹窗确认按钮
            confirmAddRemarks:function(id){
                var id=this.typeId;
                let param={id:id};
                asking.deleteType(this,param).then(function(response){
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.init();
                    }
                },function(res){
                    console.log('error:',res);
                });
                this.dialogVisible1 = false;
            },
            back:function(){
                this.$router.go(-1);
            },
            changesSource:function(num){
                this.source=num;
            },
        }
    }
</script>
