<template>
    <!--main content start-->
    <order-common :orderType="type"></order-common>
    <!--main content end-->
</template>

<script>
    import OrderCommon from 'components/order/order_common';
    export default {
        name: 'haveClose',
        components: {OrderCommon:OrderCommon},
        data: function(){
            return {
                type:'4'
            }
        }
    }
    //
</script>
