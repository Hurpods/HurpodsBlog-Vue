<template>
    <div class="header-right">
        <span style="font-size: 13px;position: relative;width: fit-content;float: left;padding: 22px 16px;">
            {{this.$route.meta.title}}
        </span>
    </div>
</template>

<script>

    export default {
        name: "Header",
        components: {}
    }
</script>

<style scoped>
    .header-right {
        height: 60px;
        background-color: #eaeaea;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
    }
</style>