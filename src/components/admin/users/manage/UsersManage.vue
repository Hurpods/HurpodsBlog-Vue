<template>
    <div>
        <edit-form ref="userEdit" @onSubmit="loadUser(this.currentPage)"></edit-form>
        <el-row>
            <el-table
                    ref="userTable"
                    tooltip-effect="dark"
                    :data="users"
                    style="width: 100%;border-radius: 15px;;box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);"
                    height="701px"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        type="selection"
                        width="55"
                >
                </el-table-column>
                <el-table-column
                        fixed
                        prop="userId"
                        label="UID"
                        width="50px"
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
                        width="200px"
                >
                    <template slot-scope="scope">
                        {{users[scope.$index].userLocation.provinceName+users[scope.$index].userLocation.cityName}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="registerTime"
                        label="注册时间"
                        width="160px"
                >

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
                        width="220px"
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
                        prop="enabled"
                        label="状态"
                >
                    <template slot-scope="scope">
                        {{users[scope.$index].enabled|enableFilter()}}
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        width="250px"
                >
                    <template slot="header" slot-scope="scope">
                        <el-input
                                v-model="search"
                                size="mini"
                                prefix-icon="el-icon-search"
                                placeholder="输入用户名搜索"
                                @change="searchUser"
                        />
                    </template>
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="updateUser(users[scope.$index])"
                                size="mini"
                                type="primary"
                        >
                            编辑
                        </el-button>
                        <el-button
                                @click.native.prevent="banUser(users[scope.$index].userId,users[scope.$index].enabled)"
                                size="mini"
                                type="warning"
                        >
                            <template>
                                {{users[scope.$index].enabled|banOrUnBan()}}
                            </template>
                        </el-button>
                        <el-button
                                @click.native.prevent="deleteUser(users[scope.$index].userId,scope.$index)"
                                size="mini"
                                type="danger"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-card style="border-radius: 15px;top:20px;position: relative;">
                <div style="float: left;">共选择了{{multipleSelection.length}}个用户</div>
                <el-button
                        type="danger"
                        class="footer-button"
                        @click="batchDelete"
                >
                    全部删除
                </el-button>
                <el-button
                        type="warning"
                        class="footer-button"
                        @click="batchBan"
                >
                    全部封禁
                </el-button>
            </el-card>
        </el-row>
        <el-row style="position: fixed;bottom: 15px;left: 49%;">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="userSize"
            >
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    import EditForm from "./EditForm";

    export default {
        name: "UsersManage",
        components: {EditForm},
        data() {
            return {
                users: [],
                currentPage: 1,
                pageSize: 12,
                multipleSelection: [],
                userSize: 1,
                search: ''
            }
        },
        mounted() {
            this.loadUser(this.currentPage);
        },
        filters: {
            enableFilter: function (val) {
                return val ? "正常" : "封禁"
            },
            banOrUnBan: function (val) {
                return val ? "封禁" : "解禁"
            }
        },
        methods: {
            loadUser(currentPage) {
                let _this = this;
                this.$axios
                    .get('/api/users?pageNum=' + currentPage)
                    .then(r => {
                        if (r.data.code === 1) {
                            _this.users = r.data.data["userList"];
                            _this.userSize = r.data.data["pageSize"];
                            _this.pageSize = 12
                        } else if (r.data.code !== 1) {
                            _this.$message.error(r.data.message + '，错误代码：' + r.data.code);
                        }
                    })
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                this.loadUser(currentPage);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            updateUser(user) {
                this.$refs.userEdit.userDialog = true
                let locate=[]
                locate.push(user.userLocation.provinceCode)
                locate.push(user.userLocation.cityCode)
                this.$refs.userEdit.userForm = {
                    userId: user.userId,
                    userName: user.userName,
                    userNickName: user.userNickName,
                    userLocate: locate,
                    userTel: user.userTel,
                    userEmail: user.userEmail,
                }
            },
            ban(val) {
                let _this = this;
                this.$axios
                    .put('/api/user/ban',
                        {
                            'ids': val
                        })
                    .then(r => {
                        if (r.data.code === 1) {
                            _this.$message.success("成功封禁" + r.data.data + "名用户");
                        } else {
                            _this.$message.error("操作失败，错误代码：" + r.data.code)
                        }
                    })
            },
            banUser(val,en) {
				if(en){
					let selectedId = [];
					selectedId.push(val);
					this.ban(selectedId);
				}else{
					let _this=this;
					this.$axios
						.put('/api/user/unban',
							{
								id:val
							})
					.then(r=>{
						if(r.data.code===1){
							_this.$message.success("成功解封")
						}else{
							_this.$message.error("操作失败，错误代码：" + r.data.code)
						}
					})
				}

            },
            batchBan() {
                let selectedId = [];
                this.multipleSelection.forEach((value) => {
                    selectedId.push(value.userId)
                })
                this.ban(selectedId);
            },
            deleteUser(val,index) {
              let _this=this;
              this.$axios
                  .delete('/api/user/'+val)
                  .then(r=>{
                    if(r.data.code===1){
                      _this.$message.success("删除成功");
                      _this.users.splice(index,1);
                    }else{
                      _this.$message.error(r.data.message);
                    }
                  })
            },
            batchDelete() {
                let selectedId = [];
                this.multipleSelection.forEach((value) => {
                    selectedId.push(value.userId)
                })
                console.log(selectedId)
            },
            searchUser() {
                let _this = this;
                if (this.search === '') {
                    _this.loadUser(_this.currentPage)
                } else {
                    this.$axios
                        .get('/api/user/search/' + _this.search)
                        .then(r => {
                            if (r.data.code === 1) {
                                _this.users = r.data.data;
                                _this.currentPage = 1;
                                _this.userSize = r.data.data.length
                                _this.pageSize = 1001010
                            } else {
                                _this.$message.error(r.data.message + "错误代码：" + r.data.code);
                            }
                        })
                }
            }
        }
    }
</script>

<style scoped>
    .footer-button {
        float: right;
        position: relative;
        margin-left: 15px;
        bottom: 8px
    }
</style>