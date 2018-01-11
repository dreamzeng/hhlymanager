<template>
    <!--main content start-->
    <knowledge-list :userType="userType" titleName="律师"></knowledge-list>
    <!--main content end-->
</template>

<script>
    import knowledgeList from 'components/third/knowledge_list';
    export default {
        name: 'thirdUserList',
        components: {knowledgeList:knowledgeList},
        data: function(){
            return {
                userType:'1'
            }
        }
    }
    //
</script>
