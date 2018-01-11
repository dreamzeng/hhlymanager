<template>
    <!--main content start-->
    <user-common :userType="userType"></user-common>
    <!--main content end-->
</template>

<script>
    import UserCommon from 'components/third/user_common';
    export default {
        name: 'thirdUserList',
        components: {UserCommon:UserCommon},
        data: function(){
            return {
                userType:null
            }
        }
    }
    //
</script>
