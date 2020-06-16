<template>
    <div style="padding: 20px">
        <el-row>
            <el-card class="scsc" shadow="hover" v-for="item in specialRole" :key="item.userId">
                <el-avatar :size="100" :src="item.userAvatar"></el-avatar>
                <br>
                <span style="font-weight: bolder">{{item.userName}}</span>
                <hr style="border:0;background-color: #9c9c9c;height: 2px">
                <span><i class="el-icon-s-custom">{{item.roles[0].roleDescription}}</i></span>
                <br>
                <span>加入HB：{{new Date(item.registerTime)|timeFilter2()}}天</span>
            </el-card>
            <el-tooltip class="item" effect="dark" content="添加新的特殊用户" placement="top">
                <el-card class="scsc" style="width: 235px" shadow="hover"><i class="el-icon-circle-plus-outline plus"></i></el-card>
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
    export default {
        name: "PermissionManage",
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
            }
        },
        filters: {
            timeFilter: function (value, format) {
                let o = {
                    "M+": value.getMonth() + 1,
                    "d+": value.getDate(),
                    "h+": value.getHours(),
                    "m+": value.getMinutes(),
                    "s+": value.getSeconds(),
                }
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (value.getFullYear() + "").substr(4 - RegExp.$1.length));
                    for (let k in o) {
                        if (new RegExp(`(${k})`).test(format)) {
                            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
                        }
                    }
                    return format;
                }
            },
            timeFilter2: function (value) {
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
        text-align: center;
        margin-left: 65px;
        border-radius: 15px;
        cursor: default;
        margin-bottom: 110px;
    }

    .plus {
        font-size: 190px;
        cursor: pointer;
    }
</style>