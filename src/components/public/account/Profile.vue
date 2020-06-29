<template>
    <div class="user-inner">
        <div class="banner">

        </div>
        <div class="user-info">
            <div class="user-avatar">
                <el-avatar :src="user.userAvatar" :size="160"></el-avatar>
            </div>
            <div class="user-name">
                {{$route.params.username}}
            </div>
            <el-button type="text" style="position: absolute;left: 20.8%;" @click="showDetail">
                {{showText}}
            </el-button>
            <el-collapse-transition>
                <div class="user-detail" v-show="details">
                    <el-divider content-position="left">UID</el-divider>
                    <span>{{user.userId}}</span>
                    <el-divider content-position="left">昵称</el-divider>
                    <span>{{user.userNickName}}</span>
                    <el-divider content-position="left">注册时间</el-divider>
                    <span>{{user.registerTime}}</span>
                    <el-divider content-position="left">地区</el-divider>
                    <span>{{user.userLocation.provinceName+user.userLocation.cityName}}</span>
                    <el-divider content-position="left">用户组</el-divider>
                    <span>{{user.role}}</span>
                </div>
            </el-collapse-transition>

            <el-button type="danger" round @click="deleteUser"
                       style="position: relative;top: -20px;float: right;right: 110px;">删除账号
            </el-button>
            <el-button type="primary" round @click.native="$router.replace(updateUrl)"
                       style="position: relative;top: -20px;float: right;right: 130px;">修改资料
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                user: {
                    userId: '',
                    userAvatar: '',
                    userNickName: '',
                    registerTime: '',
                    role: '',
                    userLocation: ''
                },
                details: false,
                showText: '详细资料',
                updateUrl: ''
            }
        },
        beforeCreate() {
            document.title="个人中心"
            let username = this.$route.params.username;
            let _this = this;
            this.$axios
                .get('/api/user/' + username)
                .then(response => {
                    if (response.data.code === 1) {
                        _this.user = response.data.data
                        _this.updateUrl = '/account/update/' + username;
                        _this.user.role=response.data.data.roles[0].roleDescription
                    }
                })
        },
        methods: {
            deleteUser() {
                let username = this.$route.params.username;
                let _this = this;
                this.$prompt('本操作为不可逆操作，如确认删除账号，请输入密码：', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    inputPattern: /^([a-zA-Z0-9`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]){6,22}$/,
                    inputErrorMessage: '请输入正确密码！',
                    center: true
                }).then(({value}) => {
                    _this.$axios
                        .post('/api/user/delete/' + username, {
                            oldPassword: value
                        })
                        .then(r => {
                            console.log(r);
                            if (r.data.code === 1) {
                                this.$message.success(r.data.data);
                                _this.$store.commit('userStatus', null);
                                _this.$router.replace('/');
                            } else {
                                this.$message.error(r.data.message + '错误：' + r.data.code);
                            }
                        })
                        .catch(r => {
                            this.$message(r);
                        })
                }).catch(() => {
                    this.$message("已取消操作");
                })
            },
            showDetail() {
                let _this = this;
                this.details = !this.details;
                if (this.showText === '详细资料') {
                    _this.showText = '收起';
                } else if (this.showText === '收起') {
                    _this.showText = '详细资料';
                }
            }
        }
    }
</script>

<style scoped>
    .user-inner {
        flex: 1
    }

    .banner {
        position: relative;
        width: 100%;
        height: 520px;
        z-index: -5;
        margin-top: -81px;
        left: 0;
        top: 0;
        background: url("../../../assets/img/banner.png");
    }

    .user-info {
        position: relative;
        width: 100%;
        height: 150px;
    }

    .user-avatar {
        position: absolute;
        width: 160px;
        height: 160px;
        top: -80px;
        left: 200px;
    }

    .user-name {
        position: absolute;
        font-size: 24px;
        font-weight: 500;
        color: white;
        top: -35px;
        left: 400px;
    }

    .user-detail {
        width: 20%;
        position: relative;
        float: left;
        left: 21%;
        text-align: right;
        top: 40px;
    }

    .el-divider__text {
        background-color: rgba(1, 1, 1, 0);
    }
</style>