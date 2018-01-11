<template>

    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">

            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">数据统计</li>
                        <li class="active">用户运营</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="panel">
                <div class="panel-body">
                    <a href="javascript:;" @click="changeUser('act','actCharts')">
                        <el-tag :class="{ activeTag : userType=='act' }">活跃度</el-tag>
                    </a>
                    <a href="javascript:;" @click="changeUser('keep','keepCharts')">
                        <el-tag :class="{ activeTag : userType=='keep' }">留存率</el-tag>
                    </a>
                </div>
            </div>

            <component v-bind:is="current"> </component>
        </div>
    </div>
    <!--main content end-->
</template>
<style scoped>
    .activeTag{
        color: #FFF;background: #2185D0
    }
</style>
<script>

    import actCharts from 'components/statistics/users_operation_charts_act';
    import keepCharts from 'components/statistics/users_operation_charts_keep';

    export default {
        name: 'userOperCharts',
        components: {actCharts,keepCharts},
        data() {
            return {
                userType:'act',
                current: 'actCharts'
            };
        },
        methods: {
            changeUser(type,comp){
                this.userType = type;
                this.current =comp;
            },
        }
    }
</script>
