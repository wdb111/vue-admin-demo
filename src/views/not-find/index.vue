<template>
    <div class="not-found-box">
        <img src="../../assets/img/not-found.jpg" alt="">
        <el-button class="button" @click="goback">返回</el-button>
    </div>
</template>
<script>
export default {
    name:"NotFind",
    data () {
        return {
            
        }
    },
    methods: {
        goback(){
            this.$router.go(-1)
        }
    },
}
</script>
<style lang="less" scoped>
@import "./not-found.less";
</style>