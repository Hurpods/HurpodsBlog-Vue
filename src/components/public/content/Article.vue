<template>
    <div style="position: relative;width: 55%;margin: 0 auto;" >
        <div class="main-content">
            <div class="author">
                <el-avatar :size="160" src="http://localhost:8090/file/avatar/0.png"></el-avatar>
                <br>
                <span style="font-size: 24px;font-weight: bolder">小老虎不做梦</span>
                <hr>
            </div>
            <div id="contentArea"></div>
            <div class="footer">
                <span>{{postTime}}</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{updateTime}}</span>
            </div>
        </div>
        <div class="other-content">
            <div class="commentArea">

            </div>
        </div>
    </div>
</template>

<script>
    import ClassicEditor from "@/components/in-editor/core/ckeditor";

    export default {
        name: "Article",
        data() {
            return {
                content: '',
                postTime: '',
                updateTime: '',
                fullscreenLoading: true
            }
        },
        components: {
            // eslint-disable-next-line
            ClassicEditor
        },
        mounted() {
            this.loadArticle()
        },
        methods: {
            initCkEditor(content) {
                ClassicEditor
                    .create(document.querySelector('#contentArea'))
                    .then(editor => {
                        editor.isReadOnly = true;
                        editor.setData(content);
                    })
                    .catch(r => {
                        this.$message.error(r)
                    })
            },
            loadArticle() {
                let _this = this;
                let articleId = this.$route.params.articleId
                this.fullscreenLoading = true;
                this.$axios
                    .get('/content/article/' + articleId)
                    .then(r => {
                        if (r.data.code === 1) {
                            _this.content = _this.unescapeHtml(r.data.data.articleContent);
                            this.initCkEditor(_this.content);
                            _this.postTime = "发表时间：" + r.data.data.articleCreateTime
                            _this.updateTime = "最后修改时间：" + r.data.data.articleUpdateTime
                            document.title = r.data.data.articleTitle
                        }
                    });
                this.fullscreenLoading = false
            }
        }
    }
</script>

<style>
    .main-content .ck .ck-reset_all {
        display: none !important;
    }

    .main-content .ck .ck-content {
        border: 0 !important;
        background-color: RGBA(255, 255, 255, 0);
    }

    .main-content {
        background-color: RGBA(255, 255, 255, 0.7);
        border-radius: 10px;
        margin-bottom: 20px;
        cursor: default;
    }

    .author {
        text-align: center;
        padding: 25px 25px 0;
    }

    hr {
        margin-top: 7px;
        border: 0;
        background-color: cadetblue;
        height: 3px;
        width: 50%;
    }

    .footer {
        cursor: default;
        padding: 15px;
        font-size: 14px;
        font-weight: 500;
        float: right;
    }
</style>