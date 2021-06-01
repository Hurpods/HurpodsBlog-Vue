<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <div class="scrollbar-hide">
            <div style="width: 100%;padding-top: 40px;padding-bottom: 20px;text-align: center">
                <el-avatar :size="160" :src="avatarUrl"></el-avatar>
                <br><br><span style="color: whitesmoke;">{{userName}}</span>
            </div>
            <div>
                <el-menu
                        :default-active="this.$route.path"
                        text-color="#fff"
                        background-color="#2c3e50"
                        style="width: 100%"
                        v-bind:router="true"
                >
                    <el-submenu index="/website">
                        <template slot="title">
                            <i class="el-icon-s-home"></i>
                            <span>首页</span>
                        </template>
                        <el-menu-item index="/website/logging">站点日志</el-menu-item>

                    </el-submenu>
                    <el-submenu index="/user">
                        <template slot="title" style="padding: 0">
                            <i class="el-icon-s-custom"></i>
                            用户管理
                        </template>
                        <el-menu-item index="/user/overview">用户概要</el-menu-item>
                        <el-menu-item index="/user/manage">用户管理</el-menu-item>
                        <el-menu-item index="/user/permission">权限管理</el-menu-item>
                    </el-submenu>

                    <el-submenu index="/content">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            内容管理
                        </template>
                        <el-submenu index="/article">
                            <template slot="title">
                                <i class="el-icon-edit"></i>
                                文章
                            </template>
                            <el-menu-item index="/content/articles/write">文章攥写</el-menu-item>
                            <el-menu-item index="/content/articles/manage">文章管理</el-menu-item>
                        </el-submenu>

                        <el-submenu index="/comment">
                            <template slot="title">
                                <i class="el-icon-chat-dot-square"></i>
                                评论
                            </template>
                            <el-menu-item index="/content/comment/manage">评论管理</el-menu-item>
                        </el-submenu>

                        <el-submenu index="/books">
                            <template slot="title">
                                <i class="el-icon-notebook-2"></i>
                                图书
                            </template>
                            <el-menu-item index="/content/books/overview">图书概览</el-menu-item>
                            <el-menu-item index="/content/reporters/write">书评攥写</el-menu-item>
                            <el-menu-item index="/content/reporters/manage">书评管理</el-menu-item>
                        </el-submenu>
                    </el-submenu>

                </el-menu>
            </div>
        </div>
    </el-scrollbar>
</template>

<script>
    export default {
        name: "BackStageSide",
        data() {
            return {
                userName: '',
                avatarUrl: ''
            }
        },
        mounted() {
            this.userName=localStorage.getItem("userName");
            this.avatarUrl=localStorage.getItem("userAvatar");
        }
    }
</script>

<style scoped>


    .el-scrollbar {
        overflow: hidden;
        position: relative;
        height: 100%;
    }

    .scrollbar-hide {
        margin-right: -17px;
        position: relative;
        overflow-y: scroll;
        overflow-x: hidden !important;
        height: 100%;
    }

    .el-menu-item.is-active {
        outline: 0 !important;
        border-left: 6px solid #337AFC;
    }

    .el-menu-item:hover {
        outline: 0 !important;
        background-color: #001522 !important;
    }

    .el-menu-item {
        outline: 0 !important;
        background-color: #1f2d3d !important;
    }


</style>