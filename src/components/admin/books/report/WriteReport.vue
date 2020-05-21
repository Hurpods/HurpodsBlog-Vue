<template>
    <div class="backstage-main">
        <el-select v-model="value" filterable placeholder="请选择书籍" class="reporter-book">
            <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
            >
            </el-option>
        </el-select>
        <el-input
                type="text"
                placeholder="请输入标题"
                v-model="title"
                maxlength="30"
                show-word-limit
                class="reporter-title"
        >
        </el-input>
        <div class="rate-group">
            <span style="position: relative;float: left;">评分：</span>
            <el-rate
                    v-model="rate"
                    :colors="colors"
                    :allow-half='true'
            >
            </el-rate>
        </div>
        <div class="editor-box">
            <CkEditor ref="editor"></CkEditor>
        </div>
        <el-button type="primary"
                   style="position: relative;float: right;margin: 20px 0;width: 100px"
                   @click="submitContent"
        >
            提交
        </el-button>
        <el-button type="info"
                   style="position: relative;float: right;margin: 20px ;width: 100px"
                   @click="saveContent"
        >
            暂存
        </el-button>
    </div>
</template>

<script>
    import CkEditor from "@/components/publicComponents/CkEditor";

    export default {
        name: "WriteReport",
        data() {
            return {
                title: '',
                value: '',
                options: [
                    {
                        id: '',
                        title: ''
                    }
                ],
                rate: null,
                colors: ['#99A9BF', '#F7BA2A', '#FF9900']
            }
        },
        components: {CkEditor},
        mounted() {
            let _this = this;
            this.$axios
                .get('/api/content/books')
                .then(r => {
                    if (r.data.code === 1) {
                        _this.options = r.data.data;
                    }
                })
        },
        methods: {
            saveContent() {

            },
            submitContent() {
                let _this = this;
                this.$axios
                    .post('/api/content/reporter/write/post', {
                        title: this.title,
                        content: this.$refs.editor.editorData,
                        rate: this.rate,
                        book: this.value
                    })
                    .then(r => {
                        console.log(r);
                        if (r.data.code === 1) {
                            _this.$message.success(r.data.data);
                        } else {
                            _this.$message.error(r.data.message + '错误：' + r.data.code);
                        }
                    })
            }
        }
    }
</script>

<style>
    .ck-editor__editable_inline {
        min-height: 705px;
    }

    .reporter-book {
        position: relative;
        float: left;
        margin-right: 30px;

    }

    .reporter-title {
        position: relative;
        float: left;
        width: 30%;
    }

    .rate-group {
        position: relative;
        width: 180px;
        float: left;
        margin-top: 10px;
        font-size: 14px;
        margin-left: 20px;
    }

    .editor-box {
        position: relative;
        float: left;
        margin-top: 20px;
        min-width: 100%;
    }
</style>