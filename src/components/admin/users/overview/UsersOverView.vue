<template>
    <div>
        <edit-form ref="userEdit" @onSubmit="loadUser()"></edit-form>
        <el-row>
            <el-table
                    ref="multipleTable"
                    tooltip-effect="dark"
                    :data="users"
                    style="width: 100%;border-radius: 15px"
                    height="840px"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="userId"
                        label="UID"
                        width="100px"
                >
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="用户名"
                        width="100px"
                >
                </el-table-column>
                <el-table-column
                        prop="userNickName"
                        label="昵称"
                        width="200px"
                >
                </el-table-column>
                <el-table-column
                        prop="userLocation"
                        label="地区"
                        width="250px"
                >
                    <template slot-scope="scope">
                        {{users[scope.$index].userLocation.provinceName+users[scope.$index].userLocation.cityName}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="userTel"
                        label="手机号"
                        width="150px"
                >
                </el-table-column>
                <el-table-column
                        prop="userEmail"
                        label="邮箱"
                >
                </el-table-column>
                <el-table-column
                        prop="roles"
                        label="权限"
                >
                    <template slot-scope="scope">
                        {{users[scope.$index].roles[0].roleDescription}}
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        prop="operation"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="deleteUser(users[scope.$index].userId)"
                                size="mini"
                                type="danger"
                        >
                            删除
                        </el-button>
                        <el-button
                                @click.native.prevent="updateUser(users[scope.$index])"
                                size="mini"
                                type="primary"
                        >
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row style="position: fixed;bottom: 15px;left: 49%;">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="users.length"
            >
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    import EditForm from "./EditForm";

    export default {
        name: "UsersOverView",
        components: {EditForm},
        data() {
            return {
                users: [],
                currentPage: 1,
                pageSize: 13,
                multipleSelection: []
            }
        },
        mounted() {
            this.loadUser();
        },
        methods: {
            loadUser() {
                let _this = this;
                this.$axios
                    .get('/api/users')
                    .then(r => {
                        if (r.data.code === 1) {
                            _this.users = r.data.data;

                        } else if (r.data.code !== 1) {
                            _this.$message.error(r.data.message + '，错误代码：' + r.data.code);
                        }
                    })
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
                console.log(this.multipleSelection)
            },
            deleteUser(val) {
                console.log(val)
            },
            updateUser(user) {
                this.$refs.userEdit.userDialog = true
                this.$refs.userEdit.userForm = {
                    userId: user.userId,
                    userName: user.userName,
                    userNickName: user.userNickName,
                    userLocate: user.locate,
                    userTel: user.userTel,
                    userEmail: user.userEmail,
                    roles: Number(user.roles[0].roleId)
                }
            }
        }
    }
</script>

<style scoped>

</style>