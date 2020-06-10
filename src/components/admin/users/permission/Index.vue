<template>
    <div class="backstage-main">
        <permission-manage></permission-manage>
    </div>
</template>

<script>
    import PermissionManage from "./PermissionManage";

    export default {
        name: "Index",
        components: {PermissionManage}
    }
</script>

<style scoped>

</style>