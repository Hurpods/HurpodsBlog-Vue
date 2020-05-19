<template>
    <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="index">
            <span>{{item.name}}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: "BreadCrumb",
        data() {
            return {
                levelList: [
                    {path: '/books', name: 'boo'}
                ]
            }
        },
        watch: {},
        created() {

        },
        methods: {}
    }
</script>

<style scoped>

</style>