<template>
    <div style="position: relative;height: 100%;width: 100%;">
        <back-stage-side class="sidebar-container"/>
        <div class="right-panel">
            <Header/>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import BackStageSide from "./BackStageSide";
    import Header from "./Header";

    export default {
        name: "AdminIndex",
        components: {
            BackStageSide,
            Header
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