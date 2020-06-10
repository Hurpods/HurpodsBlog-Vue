<template>
    <div class="backstage-main">
        <users-manage></users-manage>
    </div>
</template>

<script>
    import UsersManage from "./UsersManage";

    export default {
        name: "Index",
        components: {UsersManage}
    }
</script>

<style scoped>

</style>