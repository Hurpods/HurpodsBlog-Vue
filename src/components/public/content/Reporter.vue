<template>
    <div style="position: relative;width: 55%;margin: 0 auto;">
        <div class="main-content">
            <div class="book">
                <el-card>
                    <img :src="book.bookCover" width="200px" alt="封面" style="float: left" ref="cover">
                    <div class="book-info" :style="{height:infoHeight}">
                        <span style="font-size: 26px;font-weight: bolder">《{{book.bookTitle}}》</span><br>
                        <span style="color: #9c9c9c">作者：</span><span>{{book.bookAuthor}}</span><br>
                        <span style="color: #9c9c9c">出版社：</span><span>{{book.bookPress}}</span><br>
                        <span style="color: #9c9c9c">出版日期：</span><span>{{book.postDate}}</span><br>
                        <el-divider>书籍简介</el-divider>
                        <span style="text-overflow: ellipsis;">{{book.bookAbs|ellipsis(book.bookAbs)}}</span><br>
                        <div class="rate">
                            <span style="color: #9c9c9c">主观评分：</span>
                            <el-rate
                                    v-model="bookRate"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value}"
                            >
                            </el-rate>
                        </div>
                    </div>
                    <div style="clear: both"></div>
                </el-card>
            </div>
            <div id="contentArea"></div>
            <div class="footer">
                <span>{{postTime}}</span>
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
        name: "Reporter",
        data() {
            return {
                content: '',
                postTime: '',
                book: '',
                bookRate: 0,
                infoHeight: 0
            }
        },
        components: {
            // eslint-disable-next-line
            ClassicEditor
        },
        filters: {
            ellipsis(val) {
                console.log(val)
                if (!val) {
                    return ''
                }
                if (val.length > 120) {
                    return val.slice(0, 120) + '...'
                }
                return val
            }
        },
        mounted() {
            this.loadReporter()
            this.$nextTick(() => {
                setTimeout(() => {
                    const cover = this.$refs.cover
                    this.infoHeight = cover.offsetHeight + 'px'
                }, 300)
            })
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
            loadReporter() {
                let _this = this;
                let reporterId = this.$route.params.reporterId
                this.$axios.get('/content/reporter/' + reporterId)
                    .then(r => {
                        if (r.data.code === 1) {
                            document.title = r.data.data.reporterTitle
                            _this.book = r.data.data.book
                            _this.postTime = "发布时间：" + r.data.data.postTime
                            _this.content = _this.unescapeHtml(r.data.data.reporterContent);
                            _this.bookRate = r.data.data.bookRate
                            this.initCkEditor(_this.content);
                        }
                    });
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
    }

    .book {
        padding: 20px;
        position: relative;
    }

    .book-info {
        position: relative;
        float: left;
        width: 77%;
        padding-left: 20px;
    }

    .rate {
        position: absolute;
        bottom: 0;
    }

    .footer {
        cursor: default;
        padding: 15px;
        font-size: 14px;
        font-weight: 500;
        float: right;
    }
</style>