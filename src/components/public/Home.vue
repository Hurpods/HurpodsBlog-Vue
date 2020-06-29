<template>
    <div class="bg">
        <nav-menu></nav-menu>
        <content-list></content-list>
    </div>
</template>

<script>

    import ContentList from "./content/ContentList";
    import NavMenu from "../publicComponents/NavMenu";

    export default {
        name: "Home",
        components: {NavMenu, ContentList},
        beforeCreate() {
            document.title="HurpodsBlog——成长的道路"
        }
    }
</script>

<style scoped>

</style>