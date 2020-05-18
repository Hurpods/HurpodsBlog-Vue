<template>
    <div class="update">
        <el-page-header @back="goBack" content="修改资料"></el-page-header>
        <el-tabs
                v-model="activeName"
                style="width: 95%;margin: 60px auto;height: fit-content"
        >
            <el-tab-pane label="基础资料" name="first" style="height: 500px">
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-form
                        class="update-common"
                        label-width="80px"
                        label-position="right"
                        :model="commonForm"
                        :rules="updateRule"
                        ref="commonForm"
                        style="position: relative;width:45%;float: left;left: 16%;top: 60px"
                >
                    <el-form-item label="昵称" prop="nickName">
                        <el-input type="text" v-model="commonForm.nickName" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="地区" prop="city">
                        <el-cascader
                                :props="defaultParams"
                                style="width: 100%"
                                :options="options"
                                v-model="selectedOptions"
                        >
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="手机号" prop="telephone">
                        <el-input type="text" v-model="commonForm.telephone" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱地址" prop="email">
                        <el-input type="text" v-model="commonForm.email" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-button type="primary" style="position: relative;float: right;width: 100px">提交</el-button>
                    <el-button @click="resetForm('commonForm')"
                               style="position: relative;float: right;width: 100px;right: 35px">重置
                    </el-button>
                </el-form>
            </el-tab-pane>

            <el-tab-pane label="修改密码" name="second">

            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "Update",
        data() {
            return {
                activeName: 'first',
                imageUrl: '',
                commonForm: {
                    nickName: '',
                    province: '',
                    city: '',
                    telephone: '',
                    email: '',
                },
                options: [],
                selectedOptions: [],
                defaultParams: {
                    label: 'name',
                    value: 'name',
                    children: 'cityList',
                    expandTrigger: 'hover'
                },
                updateRule: {
                    nickName: [
                        {min: 2, max: 22, message: '昵称长度在2-22个字符之间', trigger: 'change'},
                        {
                            required: false,
                            pattern: /^[\u4e00-\u9fa5A-Za-z0-9_]+$/,
                            message: '昵称不能包含特殊字符',
                            trigger: 'change'
                        }
                    ],
                    telephone: [
                        {required: false, min: 11, max: 11, message: '手机号码位数错误', trigger: 'blur'},
                        {
                            required: false,
                            pattern: /^[1](([3|5|8][\\d])|([4][4,5,6,7,8,9])|([6][2,5,6,7])|([7][^9])|([9][1,8,9]))[\\d]{8}$/,
                            message: '手机号码格式错误',
                            trigger: 'change'
                        }
                    ],
                    email: [
                        {
                            required: false,
                            pattern: /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,5}$/,
                            message: '邮箱地址格式错误',
                            trigger: 'change'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.imageUrl = localStorage.getItem('userAvatar');
            this.$axios
                .get('/api/city')
                .then(resp => {
                    this.options = resp.data.data;
                });
            console.log(this.selectedOptions[0] + this.selectedOptions[1]);
        },
        methods: {
            goBack() {
                let username = this.$route.params.username;
                this.$router.replace('/account/' + username);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .update {
        position: relative;
        width: 60%;
        margin: 60px auto;
    }

    /*  头像上传  */

    .avatar-uploader {
        width: 160px;
        position: relative;
        float: left;
        margin-top: 60px;
    }

    .avatar {
        width: 160px;
        height: 160px;
        display: block;
        border-radius: 50%;
        background: RGBA(155, 155, 155, 0.3);
        transition: .5s;
    }

    .avatar:hover {
        background: rgba(0, 0, 0, 0);
        transition: .5s;
    }

</style>