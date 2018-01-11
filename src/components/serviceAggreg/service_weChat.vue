<template>
    <div><recommend :appType="appType" :appName="appName"></recommend></div>
</template>
<script>
    import Recommend from 'components/serviceAggreg/service_recommend'
    export default {
        data() {
            return {
                appType: 2,
                appName: '微信公众号'
            }
        },
        components: {
            Recommend
        }
    }
</script>