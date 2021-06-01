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
            <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold;cursor:default"></span>
        </li>
        <el-submenu index="avatar" v-show="isLogin()" style="float:right">
            <template slot="title" style="padding:15px;">
                <el-avatar :size="45" :src="avatarUrl"></el-avatar>
            </template>
            <el-menu-item v-for="(item,i) in baseCommand" :key="i" :index="item.index" style="text-align: center">
                {{item.name}}
            </el-menu-item>
            <el-menu-item :index='account' style="text-align: center">个人中心</el-menu-item>
            <el-menu-item @click="logout" style="text-align: center">退出登录</el-menu-item>
        </el-submenu>
        <div class="loginUser" v-show="!isLogin()">
            <router-link to="/login">登录</router-link>
        </div>
    </el-menu>
</template>

<script>
    export default {
        inject: ['reload'],
        name: "NavMenu",
        data() {
            return {
                navList: [
                    {index: '/', navItem: '首页'},
                    {index: '/articles', navItem: '全部文章'},
                    {index: '/library', navItem: '图书馆'}
                ],
                baseCommand: [],
                avatarUrl: "",
                account: ''
            }
        },
        mounted() {
            if (this.$store.getters.isLogin) {
                this.$axios
                    .post('/auth/authBackStage')
                    .then(r => {
                        if (r.data.code === 1) {
                            this.baseCommand.push({index: '/website/logging', name: '进入后台'});
                        }
                    })
            }
        },
        methods: {
            logout() {
                this.$store.commit('userStatus', null);
                this.$router.go(0);
            },
            isLogin() {
                let _this = this;
                if (localStorage.getItem('userName') !== 'null') {
                    this.$store.commit('userStatus', localStorage.getItem('userName'));
                    _this.avatarUrl = localStorage.getItem('userAvatar');
                    _this.account = '/account/' + localStorage.getItem("userName");
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