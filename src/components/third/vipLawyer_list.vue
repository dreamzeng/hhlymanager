<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li>
                            <router-link :to="{name: 'index'}"><i class="icon-home"></i>Home</router-link>
                        </li>
                        <li class="active">第三方管理</li>
                        <li class="active">VIP律师</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">VIP律师</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <router-link class="btn btn-info btn-sm" :to="{name: 'lawyerUnallocated_list',params:{type:'vip'}}">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        添加VIP律师
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <form @submit.prevent="search">
                                            <div class="form-group">
                                                <label style="margin: 0 5px">职业证号</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="职业证号" v-model.trim="param.code">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">姓名</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="姓名" v-model.trim="param.realName">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">备用电话</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="备用电话" v-model.trim="param.sparePhone">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">律师所</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="律师所" v-model.trim="param.company">
                                            </div>
                                            <button type="submit" class="btn btn-danger">搜索</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <table class="table table-rest table-striped table-bordered border-top dataTable table-hover">
                                        <thead>
                                        <tr>
                                            <th style="width: 5%;">职业证件</th>
                                            <th style="width: 5%;">身份证件</th>
                                            <th>职业证号</th>
                                            <th>姓名</th>
                                            <th>备用电话</th>
                                            <th>认证状态</th>
                                            <th>从事年限</th>
                                            <th>最高费用</th>
                                            <th>律师所</th>
                                            <th>办公地址</th>
                                            <th style="width: 5%;"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td><div style="width: 42px;height: 42px;margin:auto 0;cursor: pointer;">
                                                    <picview :src="item.pic" width="42px" height="42px"></picview>
                                                </div></td>
                                            <td><div style="width: 42px;height: 42px;margin:auto 0;cursor: pointer;">
                                                    <picview :src="item.cardPic" width="42px" height="42px"></picview>
                                                </div></td>
                                            <td>{{item.code}}</td>
                                            <td>{{item.realName}}</td>
                                            <td>{{item.sparePhone}}</td>
                                            <td style="color: #FF6C60">{{(item.isAuth && item.isAuth.value) || '未知'}}</td>
                                            <td>{{item.workTime}}</td>
                                            <td>{{item.maxPrice||0}}</td>
                                            <td>{{item.company}}</td>
                                            <td>{{item.address}}</td>
                                            <td style="text-align: center">
                                                <button title="律师详情" class="btn btn-success btn-xs" @click="showInfo(item.id)"><i class="icon-external-link"></i></button>
                                                <button title="删除VIP律师" class="btn btn-danger btn-xs" @click="confirm(item)"><i class="glyphicon glyphicon-trash"></i></button>
                                            </td>
                                        </tr>
                                        <tr v-show="dataList.length<1">
                                            <td colspan="12">无数据。。。</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <page v-on:todoPage="getResource" :total="todopage.total" :limit="todopage.limit" :page="todopage.page"></page>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 删除确认 -->
            <confirm v-on:confirm="vipAction" :message="message" :title="title"></confirm>
            <!-- 律师详情 -->
             <el-dialog title="律师信息" :visible.sync="dialogVisible" size="small" @close="dialogClose">
                <div>
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="form-group">
                                <label>职业营照</label>
                                <div class="col-md-12" style="vertical-align: middle;padding: 5px;margin-bottom:5px;border: 1px solid #e2e2e4;">
                                    <span style="display:inline-block !important; padding: 5px;">
                                        <div class="warp"  @click="showPic(showMessage.pic)">
                                            <div class="d-img">  
                                                <img :src="showMessage.pic"></div>
                                            <div class="d-i">
                                                <i class="el-icon-view"></i>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>身份证件</label>
                                <div class="col-md-12" style="vertical-align: middle;padding: 5px;;margin-bottom:5px;border: 1px solid #e2e2e4;">
                                    <span style="display:inline-block !important; padding: 5px;">
                                        <div class="warp" @click="showPic(showMessage.cardPic)">
                                            <div class="d-img">  
                                                <img :src="showMessage.cardPic"></div>
                                            <div class="d-i">
                                                <i class="el-icon-view"></i>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="col-md-2" style="padding: 0;">姓名</div>
                                        <div class="col-md-10">
                                            <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.realName">
                                        </div>
                                    </div>
                                    <div class="col-md-6" style="padding: 0;">
                                        <div class="col-md-2" style="padding: 0;">联系方式</div>
                                        <div class="col-md-10">
                                            <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.sparePhone">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="col-md-2" style="padding: 0;">职业证号</div>
                                        <div class="col-md-10">
                                            <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.code">
                                        </div>
                                    </div>
                                    <div class="col-md-6" style="padding: 0;">
                                        <div class="col-md-2" style="padding: 0;">身份证</div>
                                        <div class="col-md-10">
                                            <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.idCard">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="col-md-2" style="padding: 0;">公司</div>
                                        <div class="col-md-10">
                                            <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.company">
                                        </div>
                                    </div>
                                    <div class="col-md-6" style="padding: 0;">
                                        <div class="col-md-2" style="padding: 0;">地址</div>
                                        <div class="col-md-10">
                                            <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.address">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="col-md-2" style="padding: 0;">认证状态</div>
                                        <div class="col-md-10">
                                            <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.isAuth && showMessage.isAuth.value">
                                        </div>
                                    </div>
                                    <div class="col-md-6" style="padding: 0;">
                                        <div class="col-md-2" style="padding: 0;">工作状态</div>
                                        <div class="col-md-10">
                                            <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.isWork?'在线':'下线'">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="col-md-2" style="padding: 0;">工作年限</div>
                                        <div class="col-md-10">
                                            <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.workTime">
                                        </div>
                                    </div>
                                    <div class="col-md-6" style="padding: 0;">
                                        <div class="col-md-2" style="padding: 0;">最高出场费</div>
                                        <div class="col-md-10">
                                            <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.maxPrice">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12" style="padding-right: 0;">
                                        <div class="col-md-1">案件描述</div>
                                        <div class="col-md-11">
                                            <textarea class="form-control" rows="3" disabled="disabled">{{showMessage.introduce}}</textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </div>
            </el-dialog>

            <picview :src="showMessage.pic" :isShow="false" ref="pic_picview" width="100px" height="100px"></picview>
        </div>

    </div>
    <!--main content end-->


</template>

<script>
    import Page from 'components/common/Page';
    import apiThird from 'api/third';
    import confirm from 'components/common/confirm';
    import picview from 'components/common/Picview';

    export default {
        name: 'hotLawyer_list',
        components: {Page: Page, confirm: confirm,picview},
        data: function () {
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    code: '', realName: '', sparePhone: '', company: ''
                },
                showMessage: {},
                rowItemId: -9999,
                message: '',
                title: '是否删除改条信息',
                dialogVisible:false
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {

            },
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;

                for (let k in this.param) {
                    param[k] = this.param[k];
                }
                $('#list-content').mLoading("show");
                apiThird.vipLawyerList(this, param).then(function (response) {
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
            search: function () {
                this.getResource(1, this.todopage.limit);
            },
            showInfo: function (id) {
                $('body').mLoading("show");
                apiThird.lawyerSingle(this, id).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.showMessage = {};
                        if (data) {
                            this.showMessage = data;
                        }
                        this.dialogVisible = true;
                        return;
                    }
                    apiThird.tips(this, {message: body.msg});
                }, function (response) {
                    console.log('error:', response);
                });
            },
            confirm: function (item) { //删除确认
                this.rowItemId = item.id;
                this.message = '姓名：' + item.realName;
                $('#myConfirm').modal();
            },
            vipAction: function () {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                apiThird.vipLawyerDel(this, this.rowItemId).then(function (response) {
                    let body = response.body;
                    apiThird.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            showPic: function(pic){
                 let picview = this.$refs.pic_picview;
                 picview.pictureTrue(pic);
            },
            dialogClose: function(){
                this.dialogVisible = false; 
            },
        }
    }

    //
</script>

<style lang="less" scoped>
.warp{
    position:relative;
    width:100px;
    height:100px;
    cursor: pointer;
    .d-img{
        width:100%;
        height:100%;
        position:relative;
        img{
            width:100%;
            height:100%;
        }
    }
    .d-i{
        position:absolute;
        bottom: -2px;
        right: 5px;
    }
}
</style>

