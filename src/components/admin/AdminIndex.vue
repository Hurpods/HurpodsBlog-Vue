<template>
    <div style="position: relative;height: 100%;width: 100%;">
        <el-container>
            <el-aside style="width: 13%">
                <back-stage-side class="sidebar-container"/>
            </el-aside>
            <el-container class="right-panel">
                <el-header style="height: 60px;width: 100%;position: fixed;">
                    <BreadCrumb/>
                </el-header>
                <el-main style="margin-top: 60px;">Main</el-main>
            </el-container>
        </el-container>

        <router-view/>
    </div>
</template>

<script>
    import BackStageSide from "../framework/BackStageSide";
    import BreadCrumb from "../framework/BreadCrumb";

    export default {
        name: "AdminIndex",
        components: {
            BackStageSide,
            BreadCrumb
        }
    }
</script>

<style scoped>
    .sidebar-container {
        background-color: #2c3e50;
        position: fixed;
        width: 13% !important;
        z-index: 1000;
        overflow-y: hidden;
        height: 100%;
        transition: width .28s;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: left;
    }

    .right-panel {
        position: relative;
        margin-left: auto;
        width: 87%;
    }
</style>