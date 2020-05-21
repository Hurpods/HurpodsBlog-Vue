<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    export default {
        name: 'App',
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                isRouterAlive: true
            }
        },
        methods: {
            reload() {
                this.isRouterAlive = false
                this.$nextTick(function () {
                    this.isRouterAlive = true
                })
            }
        }
    }
</script>
<style>
    #app {
        height: 100%;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .bg {
        background: url("assets/img/bg.png");
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow-y: auto;
        z-index: -50;
    }

    body {
        margin: 0;
        background: rgb(245, 245, 245);
    }

    a {
        color: black;
        text-decoration: none;
        position: relative;
    }

    a:after {
        content: "";
        width: 0;
        height: 2px;
        background: #337AFC;
        position: absolute;
        top: 100%;
        left: 50%;
        transition: all 0.3s ease 0s;
    }

    a:hover:after {
        left: 0;
        width: 100%;
    }

    .scrollbar-wrapper {
        overflow-x: hidden !important;
    }

    .sidebar-container .is-horizontal {
        display: none;
    }

    .backstage-main{
        position: relative;
        width: 85%;
        float: right;
        padding: 16px 19px 0 19px;
    }
</style>
