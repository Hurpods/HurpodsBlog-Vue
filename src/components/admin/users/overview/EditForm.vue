<template>
    <div>
        <el-dialog
                title="编辑用户"
                :visible.sync="userDialog"
                @close="clear"
                width="24%"
        >
            <el-form
                    v-model="userForm"
                    label-width="80px"
                    label-position="right"
                    ref="userForm"
            >
                <el-form-item prop="userId" style="height: 0">
                    <el-input type="hidden" v-model="userForm.userId" autocomplete="off" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="userForm.userName" autocomplete="off" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="userNickName">
                    <el-input v-model="userForm.userNickName" autocomplete="off" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="地区" prop="userLocate">
                    <el-cascader
                            :props="defaultParams"
                            style="width: 300px"
                            :options="options"
                            v-model="userForm.userLocate"
                    >
                    </el-cascader>
                </el-form-item>
                <el-form-item label="电话" prop="userTel">
                    <el-input v-model="userForm.userTel" autocomplete="off" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="userEmail">
                    <el-input v-model="userForm.userEmail" autocomplete="off" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="权限组" prop="roles">
                    <el-select v-model="userForm.roles" filterable placeholder="请选择" style="width: 300px">
                        <el-option
                                v-for="item in roleOption"
                                :key="item.roleId"
                                :label="item.roleDescription"
                                :value="item.roleId"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-button
                    type='primary'
                    @click="submitUser"
                    style="position: relative;left: 74%"
            >
                提交
            </el-button>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "EditForm",
        data() {
            return {
                userDialog: false,
                userForm: {
                    userId: '',
                    userName: '',
                    userNickName: '',
                    userLocate: '',
                    userTel: '',
                    userEmail: '',
                    roles: ''
                },
                options: [],
                roleOption: [],
                defaultParams: {
                    label: 'name',
                    value: 'name',
                    children: 'cityList',
                    expandTrigger: 'hover'
                },
            }
        },
        mounted() {
            this.getLocation();
            this.getRole();
        },
        methods: {
            getRole() {
                this.$axios
                    .get('/auth/roles')
                    .then(r => {
                        this.roleOption = r.data.data
                    })
            },
            getLocation() {
                this.$axios
                    .get('/api/city')
                    .then(resp => {
                        this.options = resp.data.data;
                    });
            },
            clear() {
                this.userForm = {
                    userName: '',
                    nickName: '',
                    userLocate: '',
                    userTel: '',
                    userEmail: '',
                    roles: ''
                }
            },
            submitUser() {
                let _this = this;
                this.$axios
                    .put('/api/user/' + this.userForm.userId,
                        {
                            userId:this.userForm.userId,
                            userName:this.userForm.userName,
                            nickName:this.userForm.userNickName,
                            locate:this.userForm.userLocate,
                            telephone:this.userForm.userTel,
                            email:this.userForm.userEmail,
                            roles:this.userForm.roles
                        })
                    .then(r => {
                        if (r.data.code===1){
                            _this.$message.success('修改成功')
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>