<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <div class="scrollbar-hide">
            <div>
                <el-menu
                        default-active="/website/overview"
                        text-color="#fff"
                        background-color="#2c3e50"
                        style="width: 100%"

                >
                    <el-submenu index="/website">
                        <template slot="title">
                            <i class="el-icon-s-home"></i>
                            <span>首页</span>
                        </template>
                        <el-menu-item index="/website/overview">情况概要</el-menu-item>
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
                            <el-menu-item index="/content/article/overview">文章概览</el-menu-item>
                            <el-menu-item index="/content/article/write">文章攥写</el-menu-item>
                            <el-menu-item index="/content/article/manage">文章管理</el-menu-item>
                        </el-submenu>

                        <el-submenu index="/comment">
                            <template slot="title">
                                <i class="el-icon-chat-dot-square"></i>
                                评论
                            </template>
                            <el-menu-item index="/content/comment/overview">评论概览</el-menu-item>
                            <el-menu-item index="/content/comment/manage">评论管理</el-menu-item>
                        </el-submenu>

                        <el-submenu index="/books">
                            <template slot="title">
                                <i class="el-icon-notebook-2"></i>
                                图书
                            </template>
                            <el-menu-item index="/content/books/overview">图书概览</el-menu-item>
                            <el-menu-item index="/content/books/write">读后感攥写</el-menu-item>
                            <el-menu-item index="/content/books/manage">图书管理</el-menu-item>
                        </el-submenu>
                    </el-submenu>

                </el-menu>
            </div>
        </div>
    </el-scrollbar>
</template>

<script>
    export default {
        name: "BackStageSide"
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