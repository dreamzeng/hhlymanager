<template>
    <div>
        <service-list :serviceType="type"></service-list>
    </div>
</template>
<script>
    import ServiceList from 'components/serviceAggreg/sercive_list'
    export default {
        data: function(){
            return {
                type:5
            }
        },
        components: {
            ServiceList
        }
    }
</script>