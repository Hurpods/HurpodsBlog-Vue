<template>
    <div class="backstage-main">
        <el-select v-model="value" filterable placeholder="请选择书籍" class="reporter-book">
            <el-option
                v-for="item in options"
                :key="item.bookId"
                :label="item.bookTitle"
                :value="item.bookId"
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
                   v-show="!updateMode"
        >
            提交
        </el-button >
        <el-button type="primary"
                   style="position: relative;float: right;margin: 20px 0;width: 100px"
                   @click="submitUpdate"
                   v-show="updateMode"
        >
            提交
        </el-button>
    </div>
</template>

<script>
import CkEditor from "@/components/publicComponents/CkEditor";

export default {
    name: "WriteReport",
    data() {
        return {
            updateMode:false,
            title: '',
            value: '',
            options: [
                {
                    bookId: '',
                    bookTitle: ''
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
            .get('/api/backStage/books')
            .then(r => {
                if (r.data.code === 1) {
                    _this.options = r.data.data;
                }
            })
        let reporterId=localStorage.getItem("reporterId");
        if(reporterId){
            _this.loadReporter(reporterId);
            sessionStorage.setItem("reporterId",reporterId);
            localStorage.removeItem("reporterId");
        }
    },
    methods: {
        loadReporter(reporterId) {
            let _this = this;
            this.$axios.get('/content/reporter/' + reporterId)
                .then(r => {
                    if (r.data.code === 1) {
                        _this.$axios
                            .get('/api/backStage/books')
                            .then(r => {
                                if (r.data.code === 1) {
                                    _this.options = r.data.data;
                                }
                            })
                        _this.title=r.data.data.reporterTitle
                        _this.value=r.data.data.book.bookId
                        _this.$refs.editor.editorData = _this.unescapeHtml(r.data.data.reporterContent)
                        _this.rate = r.data.data.bookRate
                        _this.updateMode=true
                    }
                });
        },
        submitUpdate(){
            let reporterId=sessionStorage.getItem("reporterId");
            let _this = this;
            this.$axios.put('/content/reporter/'+reporterId,{
                title:this.title,
                content: this.$refs.editor.editorData,
                rate: this.rate,
                book: this.value
            })
                .then(r=>{
                    if(r.data.code===1){
                        _this.$message.success("编辑成功");
                        _this.$router.replace("/content/reporters/manage")
                    }else {
                        _this.$message.error(r.data.message + '错误：' + r.data.code);
                    }
            });

        },
        submitContent() {
            let _this = this;
            this.$axios
                .post('/content/reporter', {
                    title: this.title,
                    content: this.$refs.editor.editorData,
                    rate: this.rate,
                    book: this.value
                })
                .then(r => {
                    if (r.data.code === 1) {
                        _this.$message.success("提交成功");
                        _this.$router.replace("/content/reporters/manage")
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
    min-height: 755px;
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