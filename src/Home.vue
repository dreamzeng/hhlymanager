<template>
    <div id="container" class="container-fluid">
        <myHeader></myHeader>
        <sidebar></sidebar>
        <!--<transition>
            <router-view></router-view>
        </transition>-->
        <router-view></router-view>
        <globalDialog></globalDialog>
    </div>
</template>

<script>
    //组件
    import myHeader from 'components/common/Header';
    import Sidebar from 'components/common/Sidebar';
    import globalDialog from 'components/common/globalDialog';

    export default {
        name: 'app',
        components: {
            myHeader: myHeader,
            Sidebar: Sidebar,
            globalDialog: globalDialog
        },
        data: function () {
            return {}
        },
        mounted: function () {
            this.$nextTick(function () {

            })
        },
        methods: {}
    };
</script>
