<template>
    <div class="bg">
        <auth-side-swipper></auth-side-swipper>
        <div class="auth-title">
            <img src="@/assets/img/logo/black_64.png" alt="logo" style="vertical-align: middle"/>
            <span><a href="/">HurpodsBlog</a></span>
        </div>
        <el-form
                class="login-container"
                label-width="80px"
                label-position="right"
                :rules="rules"
                :model="loginForm"
                ref="loginForm"
                @keyup.enter.native="login('loginForm')"
        >
            <router-link to="/register" style="float: right;font-size: 14px;">
                立即注册<i class="el-icon-arrow-right"></i>
            </router-link>
            <el-form-item label="用户名" style="margin-top: 30px" prop="username">
                <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" auto-complete="off"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" auto-complete="off"/>
            </el-form-item>
            <el-switch
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="lightseagreen"
                    active-text="记住密码"
                    style="width: fit-content;margin-left: -238px;"
            >
            </el-switch>
            <el-form-item style="margin-left: -80px;margin-top: 15px">
                <el-button type="primary" v-on:click="login('loginForm')" style="width: 100px">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import AuthSideSwipper from "@/components/publicComponents/AuthSideSwipper";

    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                responseResult: [],
                value: false,
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {required: true, min: 6, max: 20, message: '用户名长度在6-20个字符之间', trigger: 'change'},
                        {
                            required: true,
                            pattern: /^[a-zA-Z][a-zA-Z0-9]+$/,
                            message: '用户名仅由字母和数字组成，且仅以字母开头',
                            trigger: 'change'
                        }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {required: true, min: 6, max: 22, message: '密码长度在6-22个字符之间', trigger: 'change'}
                    ]
                }
            }
        },
        components: {
            AuthSideSwipper
        },
        methods: {
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this;
                        this.$axios.post(
                            '/auth/login',
                            {
                                username: this.loginForm.username,
                                password: this.loginForm.password,
                                rememberMe: this.value
                            }
                        )
                            .then(successResponse => {
                                if (successResponse.data.code === 1) {
                                    localStorage.setItem("userName", successResponse.data.data.username);
                                    localStorage.setItem("userAvatar", successResponse.data.data.userAvatar);
                                    localStorage.setItem("token", successResponse.headers.authorization);

                                    this.$store.dispatch('setUser', successResponse.data.data.username);
                                    this.$store.dispatch('setAvatar', successResponse.data.data.userAvatar);
                                    this.$store.dispatch('setToken', successResponse.headers.authorization);

                                    _this.$message.success("登录成功");
                                    let path = this.$route.query.redirect
                                    this.$router.replace({path: path === '/' || path === undefined ? '/' : path})
                                } else {
                                    _this.$message.error(successResponse.data.message);
                                }
                            })
                            .catch(failResponse => {
                                console.log(failResponse)
                                _this.$alert(failResponse);
                            });
                    } else {
                        this.$message.warning('请按照指示完成必填项！');
                        return false;
                    }
                });
            }
        },
        beforeMount() {
            if (localStorage.getItem('userName')) {
                this.$router.replace("/");
            }
        }
    }
</script>

<style scoped>
    .login-container {
        border-radius: 15px;
        margin: 90px auto;
        width: 22%;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        position: relative;
        left: 9%;
        top: 145px;
    }

    .auth-title {
        width: fit-content;
        position: relative;
        left: 55%;
        top: 190px;
    }
</style>