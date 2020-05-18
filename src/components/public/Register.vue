<template>
    <div class="bg">
        <auth-side-swipper></auth-side-swipper>
        <div class="auth-title">
            <img src="@/assets/img/logo/black_64.png" alt="logo" style="vertical-align: middle"/>
            <span><a href="/">HurpodsBlog</a></span>
        </div>
        <el-form
                class="register-container"
                label-width="80px"
                label-position="right"
                :model="registerForm"
                :rules='rules'
                ref='registerForm'
                @keyup.enter.native="register('registerForm')"
        >
            <router-link to="/login" style="float: right;font-size: 14px;">
                去登陆<i class="el-icon-arrow-right"></i>
            </router-link>
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
                <el-button type="primary" style="width: 100px" @click="register('registerForm')">注册</el-button>
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
                this.myValidate(rule, value, callback, 'username')
            };
            let validateTelephone = (rule, value, callback) => {
                this.myValidate(rule, value, callback, 'telephone')
            };
            let validateEmail = (rule, value, callback) => {
                this.myValidate(rule, value, callback, 'email')
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
                        {required: true, validator: validateUsername, trigger: 'blur'}
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
                        {required: false, min: 11, max: 11, message: '手机号码位数错误', trigger: 'change'},
                        {
                            required: false,
                            pattern: /^[1](([3|5|8][\\d])|([4][4,5,6,7,8,9])|([6][2,5,6,7])|([7][^9])|([9][1,8,9]))[\\d]{8}$/,
                            message: '手机号码格式错误',
                            trigger: 'change'
                        },
                        {required: false, validator: validateTelephone, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {
                            required: true,
                            pattern: /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,5}$/,
                            message: '邮箱地址格式错误',
                            trigger: 'change'
                        },
                        {required: true, validator: validateEmail, trigger: 'blur'}
                    ]
                }
            }
        },
        components: {
            AuthSideSwipper
        },
        methods: {
            register(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this;
                        this.$axios
                            .post('/auth/register',
                                this.$qs.stringify({
                                    username: this.registerForm.username,
                                    password: this.registerForm.password,
                                    rePassword: this.registerForm.rePassword,
                                    telephone: this.registerForm.telephone,
                                    email: this.registerForm.email
                                })
                            ).then(resp => {
                            if (resp.data.code === 1) {
                                this.$message.success('注册成功');
                                _this.$router.replace('/login')
                            } else {
                                this.$message.warning(resp.data.message)
                            }
                        }).catch(failResponse => {
                            this.$message.error(failResponse);
                        })
                    } else {
                        this.$message.warning('请按照指示完成必填项！');
                        return false;
                    }
                });
            }
        }
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