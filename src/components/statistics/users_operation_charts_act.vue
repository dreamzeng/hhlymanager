<template>
    <div>
        <charts-common :apiAct="userActive" text="活跃度"></charts-common>
    </div>
</template>
<script>
    import {userActive} from 'api/usersOperation';
    import chartsCommon from 'components/statistics/charts_common';
    export default {
        name: 'userOperChartsAct',
        components: {chartsCommon},
        data() {
            return {
                userActive
            };
        }
    }
</script>
