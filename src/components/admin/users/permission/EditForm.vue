<template>
    <div>
        <el-dialog
                title="添加权限用户"
                :visible.sync="specialDialog"
                @close="clear"
                width="20%"
                style="border-radius: 15px"
        >
            <el-form
                    v-model="specialForm"
                    label-width="80px"
                    label-position="right"
            >
                <div class="topSide">
                    <el-avatar :size="100" :src="user.userAvatar"></el-avatar>
                    <br>
                    <span style="font-weight: bolder">{{user.userName}}/{{user.userNickName}}</span>
                    <hr style="border:0;background-color: #9c9c9c;height: 2px">
                    <span>加入HB:{{new Date(user.registerTime)|timeFilter()}}天</span>
                </div>

                <el-form-item label="UID" prop="userId">
                    <el-select v-model="specialForm.userId" style="width: 100%" @change="getUser">
                        <el-option
                                v-for="item in users"
                                :key="item.userId"
                                :label="item.userId"
                                :value="item.userId"
                        >

                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="权限组" prop="roles">
                    <el-select v-model="specialForm.roles" style="width: 100%">
                        <el-option
                                v-for="item in roleOption"
                                :key="item.roleId"
                                :label="item.roleDescription"
                                :value="item.roleId"
                        >

                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button
                        type="primary"
                        style="position: relative;left: 79.5%"
                        @click="changeRole"
                >
                    确认
                </el-button>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "EditForm",
        data() {
            return {
                user: {
                    userAvatar: '',
                    userName: '',
                    userNickName: '',
                    registerTime: ''
                },
                specialDialog: false,
                specialForm: {
                    userId: '',
                    roles: ''
                },
                roleOption: [],
                users: []
            }
        },
        mounted() {
            this.getRole()
            this.loadUser()
        },
        filters: {
            timeFilter: function (value) {
                let nowTime = new Date();
                let time = nowTime - value;
                return Math.floor(time / (24 * 3600 * 1000));
            }
        },
        methods: {
            clear() {
                this.specialForm = {
                    userId: '',
                    roles: ''
                }
                this.user = {
                    userAvatar: '',
                    userName: '',
                    userNickName: '',
                    registerTime: ''
                }
            },
            getRole() {
                this.$axios
                    .get('/auth/roles')
                    .then(r => {
                        this.roleOption = r.data.data
                    })
            },
            loadUser() {
                let _this = this;
                this.$axios
                    .get('/api/users')
                    .then(r => {
                        if (r.data.code === 1) {
                            _this.users = r.data.data["userList"];
                        }
                    })
            },
            getUser(val) {
                let _this = this;
                this.$axios
                    .get('/api/user/' + val)
                    .then(r => {
                        if (r.data.code === 1) {
                            _this.user = r.data.data;
                            _this.specialForm.roles = r.data.data.roles[0].roleId
                        }
                    })
            },
            changeRole() {
                console.log(this.specialForm)
            }
        }
    }
</script>

<style scoped>
    .topSide {
        text-align: center;
        padding: 20px;

    }
</style>