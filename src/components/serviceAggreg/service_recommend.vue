<template>
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li>
                            <router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link>
                        </li>
                        <li class="active">服务聚合页管理</li>
                        <li class="active">推荐服务({{appName}})</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="panel">
                <div class="panel-body">
                    <router-link :to="{path: 'service_startBusiness'}">
                        <el-tag >创业专场</el-tag>
                    </router-link>
                    <router-link :to="{path: 'service_legal'}">
                        <el-tag>法律服务</el-tag>
                    </router-link>
                    <router-link :to="{path: 'service_contract'}">
                        <el-tag>合同定制</el-tag>
                    </router-link>
                    <router-link :to="{path: 'service_intellectual'}">
                        <el-tag>知识产权</el-tag>
                    </router-link>
                    <router-link :to="{path: 'service_personal'}">
                        <el-tag>个人业务</el-tag>
                    </router-link>
                </div>
            </div>
            <div class="whitebg">
                <!--<keep-alive>-->
                    <router-view></router-view>
                <!--</keep-alive>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            appType: {
                type: Number,
                default: ''
            },
            appName: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
    .whitebg{
        background:#fff; border-radius: 5px;
    }
    .router-link-active span{
        color: #FFF;background: #2185D0;
    }
</style>