<template>
    <div style="padding: 20px">
        <el-row>
            <edit-form ref="specialForm"></edit-form>
            <el-card class="scsc" shadow="hover" v-for="item in specialRole" :key="item.userId">
                <div slot="header">
                    <span style="font-size: large;font-weight: bolder;">{{item.userName}}</span>
                    <el-tooltip class="item" effect="dark" content="移除该员工" placement="top">
                        <i class="el-icon-close"
                           style="float: right; padding: 3px 0;font-size: 22px;cursor: pointer;font-weight: bolder;"
                           @click="removeSpecial(item.userId)"
                        ></i>
                    </el-tooltip>
                </div>
                <div style="text-align: center">
                    <el-avatar :size="100" :src="item.userAvatar" style="vertical-align: middle"></el-avatar>
                    <span style="font-weight: bold;margin-left: 16px"></span>
                    <hr style="border:0;background-color: #9c9c9c;height: 2px">
                    <span><i class="el-icon-s-custom">{{item.roles[0].roleDescription}}</i></span>
                    <br>
                    <span>加入HB：{{new Date(item.registerTime)|timeFilter()}}天</span>
                </div>
            </el-card>
            <el-tooltip class="item" effect="dark" content="添加新的特殊用户" placement="top">
                <i class="el-icon-circle-plus-outline" style="font-size: 190px;cursor: pointer;"
                   @click="$refs.specialForm.specialDialog=true"></i>
            </el-tooltip>
        </el-row>
        <el-row style="position: fixed;bottom: 15px;left: 49%;">
            <el-pagination
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="specialSize"
            >
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    import EditForm from "./EditForm";

    export default {
        name: "PermissionManage",
        components: {
            EditForm
        },
        data() {
            return {
                specialRole: [],
                currentPage: 1,
                pageSize: 9,
                specialSize: 1
            }
        },
        mounted() {
            this.loadSpecialRole(this.currentPage)
        },
        methods: {
            loadSpecialRole(currentPage) {
                let _this = this;
                this.$axios
                    .get('/api/specialUser?pageNum=' + currentPage)
                    .then(r => {
                        if (r.data.code === 1) {
                            _this.specialRole = r.data.data["specialList"];
                            _this.specialSize = r.data.data["specialSize"];
                        } else {
                            _this.$message.error(r.data.data + "错误代码：" + r.data.code)
                        }
                    }).catch(r => {
                    _this.$message.error(r)
                })
            },
            removeSpecial(val){
                console.log(val)
            }
        },
        filters: {
            timeFilter: function (value) {
                let nowTime = new Date();
                let time = nowTime - value;
                return Math.floor(time / (24 * 3600 * 1000));
            }
        }
    }
</script>

<style scoped>
    .scsc {
        position: relative;
        float: left;
        width: 15%;
        margin-left: 65px;
        border-radius: 15px;
        cursor: default;
        margin-bottom: 110px;
    }

</style>