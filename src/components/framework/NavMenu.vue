<template>
    <el-menu
            :default-active="this.$route.path"
            class="el-menu-demo"
            mode="horizontal"
            v-bind:router="true"
            background-color="#FFFFFF"
            text-color="#222"
            active-text-color="lightseagreen"
            style="margin: 10px"
    >
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.index">
            {{item.navItem}}
        </el-menu-item>
        <li>
            <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold;cursor:default">HurpodsBlog——成长的道路</span>
        </li>
        <el-submenu index="5" v-show="isLogin()" style="float:right">
            <template slot="title" style="padding:15px;">
                <el-avatar :size="45" :src="avatarUrl"></el-avatar>
            </template>
            <el-menu-item v-for="(item,i) in baseCommand" :key="i" :index="item.index">
                {{item.name}}
            </el-menu-item>
        </el-submenu>
        <div class="loginUser" v-show="!isLogin()">
            <router-link to="/login">登录</router-link>
        </div>
    </el-menu>
</template>

<script>
    export default {
        name: "NavMenu",
        data() {
            return {
                navList: [
                    {index: '/', navItem: '首页'},
                    {index: '/talking', navItem: '碎碎念'},
                    {index: '/library', navItem: '图书馆'}
                ],
                baseCommand: [
                    {index: '/account/profile', name: '个人中心'},
                    {index: '/', name: '退出登录'}
                ],
                activeIndex: '1',
                avatarUrl: ""
            }
        },
        methods: {
            logout() {
                let _this = this;
                this.$axios.get('/auth/logout').then(resp => {
                    if (resp.data.code === 1) {
                        this.$message.success(resp.data.message);
                        _this.$router.replace('/');
                    }
                })
            },
            isLogin() {
                let _this = this;
                if (localStorage.getItem('userName')) {
                    this.$store.commit('userStatus', localStorage.getItem('userName'));
                    _this.avatarUrl = localStorage.getItem("userAvatar");
                }
                return this.$store.getters.isLogin
            }
        }
    }
</script>

<style scoped>
    .loginUser {
        width: fit-content;
        position: relative;
        float: right;
        padding: 20px;
        font-size: 14px;
    }
</style>