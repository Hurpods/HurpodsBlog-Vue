<template>
    <el-upload
            ref="upload"
            action="http://localhost:8090/api/upload/cover"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            :on-exceed="handleExceed"
            :headers="myHeader"
    >
        <el-button type="primary">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </el-upload>
</template>

<script>
    export default {
        name: "ImgUpload",
        data() {
            return {
                url: '',
                myHeader: {
                    Authorization: localStorage.getItem('token')
                }
            }
        },
        methods: {
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
            },
            beforeUpload(file) {
                const isOverSize = file.size / 1024 / 1024 > 3;
                if (isOverSize) {
                    this.$message.warning("上传文件大小不能超过3MB")
                }
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${file.name}？`)
            },
            handleSuccess(response) {
                this.url = response.data
                this.$emit('onUpload')
                this.$message.success('上传成功')
            },
            clear() {
                this.$refs.upload.clearFiles()
            }
        }
    }
</script>

<style scoped>

</style>