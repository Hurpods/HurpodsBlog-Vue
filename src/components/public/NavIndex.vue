<template>
    <div class="bg">
        <nav-menu></nav-menu>
        <router-view/>
    </div>
</template>

<script>
    import NavMenu from "../publicComponents/NavMenu";
    export default {
        name: "NavIndex",
        components: {NavMenu},
        comments:{
            NavMenu
        }
    }
</script>

<style scoped>

</style>