<template>
    <div class="bg">
        <auth-side-swipper></auth-side-swipper>
        <div class="auth-title">
            <img src="@/assets/img/logo/black_64.png" alt="logo" style="vertical-align: middle"/>
            <span><a href="/">HurpodsBlog</a></span>
        </div>
        <el-form class="register-container" label-width="80px" label-position="left" :model="registerForm"
                 :rules='rules'>
            <el-form-item style="margin-top: 30px" label="用户名" prop="username">
                <el-input type="text" v-model="registerForm.username" placeholder="请输入用户名" auto-complete="off"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" auto-complete="off"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
                <el-input type="password" v-model="registerForm.rePassword" placeholder="请再次输入密码" auto-complete="off"/>
            </el-form-item>
            <el-form-item label="手机号" prop="telephone">
                <el-input type="text" v-model="registerForm.telephone" placeholder="请输入手机号" auto-complete="off"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="registerForm.email" placeholder="请输入邮箱" auto-complete="off"/>
            </el-form-item>
            <el-form-item style="margin-left: -80px;margin-top: 30px;">
                <el-button type="primary" style="width: 100px">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import AuthSideSwipper from "@/components/framework/AuthSideSwipper";

    export default {
        name: "Register",
        data() {
            let validateUsername = (rule, value, callback) => {
                defaultValidator(rule, value, callback)
            };
            let validateTelephone = (rule, value, callback) => {
                defaultValidator(rule, value, callback)
            };
            let validateEmail = (rule, value, callback) => {
                defaultValidator(rule, value, callback)
            };
            let validatePassword = (rule, value, callback) => {
                if (value !== this.registerForm.password) {
                    callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                registerForm: {
                    username: '',
                    password: '',
                    rePassword: '',
                    telephone: '',
                    email: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 6, max: 20, message: '用户名长度在6-20个字符之间', trigger: 'change'},
                        {
                            required: true,
                            pattern: /^[a-zA-Z][a-zA-Z0-9]+$/,
                            message: '用户名仅由字母和数字组成，且仅以字母开头',
                            trigger: 'change'
                        },
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 22, message: '密码长度在6-22个字符之间', trigger: 'change'}
                    ],
                    rePassword: [
                        {required: true, message: '请再次密码', trigger: 'blur'},
                        {validator: validatePassword, trigger: 'change'}
                    ],
                    telephone: [
                        {min: 11, max: 11, message: '手机号位数错误', trigger: 'change'},
                        {
                            required: false,
                            pattern: /^[1](([3|5|8][\\d])|([4][4,5,6,7,8,9])|([6][2,5,6,7])|([7][^9])|([9][1,8,9]))[\\d]{8}$/,
                            message: '手机号格式错误',
                            trigger: 'change'
                        }
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {
                            required: true,
                            pattern: /[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}/,
                            message: '邮箱地址格式错误',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        components: {
            AuthSideSwipper
        }
    }

    function defaultValidator(rule, value, callback) {
        this.$axios
            .post('/validate',
                this.$qs.stringify({
                    value: value
                })
            ).then(resp => {
            if (resp.data.code === 1000) {
                callback();
            } else if (resp.data.code === 1001) {
                callback(new Error(resp.data.message))
            }
        });
    }
</script>

<style scoped>
    .register-container {
        border-radius: 15px;
        background-clip: padding-box;
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