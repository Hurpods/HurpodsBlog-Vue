<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0">

        </el-tab-pane>
        <el-tab-pane v-for="(item,i) in catList" :key="i" :label="item.name" :name="item.id.toString()">

        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                activeName: "0",
                catList: []
            }
        },
        mounted() {
            let _this = this;
            this.$axios
                .get('/api/content/cats')
                .then(r => {
                    if (r.data.code === 1) {
                        _this.catList = r.data.data;
                    } else {
                        _this.$message.warning(r.data.message);
                    }
                })
        },
        methods: {
            handleClick(key) {
                this.activeName = key.name;
                this.$emit('indexSelect');
            }
        }
    }
</script>

<style scoped>

</style>