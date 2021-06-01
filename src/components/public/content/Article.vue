<template>
    <div style="position: relative;width: 55%;margin: 0 auto;" >
        <div class="main-content">
            <div class="author">
                <el-avatar :size="160" src="http://localhost:8090/file/avatar/0.png"></el-avatar>
                <br>
                <span style="font-size: 24px;font-weight: bolder">小老虎不做梦</span>
                <hr>
            </div>
            <div class="ck-content" v-html="content" style="padding:20px"></div>
            <div class="footer">
                <span>{{postTime}}</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{updateTime}}</span>
            </div>
        </div>
		<br/>
		<div class="other-content">
			<div class="commentArea">
				<ck-editor ref="editor"></ck-editor>
			</div>
			<br/>
			<el-button type="primary" style="float: right" @click="submitComment">提交</el-button>
		</div>
		<hr>
		<div class="comment-box">
			<div v-if="comments.length>0">
				<el-card v-for="comment in comments" :key="comment.commentId" style="margin-bottom: 20px">
					<div class="comment-avatar">
						<el-avatar :src="comment.user.userAvatar" :size="110"/>
						<div style="text-align: center;display: inline-block;width: 110px;">
							<span>{{ comment.user.userNickName }}</span>
						</div>
					</div>
					<div v-html="comment.commentContent" class="ck-content comment-content">
					</div>
					<div style="vertical-align: top;float:right;" v-show="isManager">
						<el-button type="text" icon="el-icon-delete" @click="deleteComment(comment.commentId)"></el-button>
					</div>
					<div
						style="vertical-align: top; display: inline-block; float: right;padding-right: 12px;padding-top: 12px;font-size: 14px">
						{{ comment.commentPostTime }}
					</div>
				</el-card>
			</div>
			<div v-else>
				<el-card>目前还没有评论……快来发表一条吧</el-card>
			</div>
		</div>
    </div>
</template>

<script>
import CkEditor from "@/components/publicComponents/CkEditor";

    export default {
        name: "Article",
        data() {
            return {
                content: '',
                postTime: '',
                updateTime: '',
                fullscreenLoading: true,
				comment: '',
				comments: [],
				isManager: false,
            }
        },
        components: {
			CkEditor,
            // eslint-disable-next-line
        },
        mounted() {
            this.loadArticle()
			if (this.$store.getters.isLogin) {
				this.$axios
					.post('/auth/authComment')
					.then(r => {
						if (r.data.code === 1) {
							this.isManager = true
						}
					})
			}
			this.loadComment()
        },
        methods: {
            loadArticle() {
                let _this = this;
                let articleId = this.$route.params.articleId
                this.fullscreenLoading = true;
                this.$axios
                    .get('/content/article/' + articleId)
                    .then(r => {
                        if (r.data.code === 1) {
                            _this.content = _this.unescapeHtml(r.data.data.articleContent);
                            _this.postTime = "发表时间：" + r.data.data.articleCreateTime
                            _this.updateTime = "最后修改时间：" + r.data.data.articleUpdateTime
                            document.title = r.data.data.articleTitle
                        }
                    });
                this.fullscreenLoading = false
            },
			submitComment() {
				let _this = this;
				this.comment = this.$refs.editor.editorData

				this.$axios
					.post('/comment', {
						commentContent: _this.comment,
						commentAuthorId: localStorage.getItem("userId"),
						status: 0,
						contentId: this.$route.params.articleId
					})
					.then(r => {
						if (r.data.code === 1) {
							_this.$message.success("发表成功");
							_this.$router.go(0);
						}
					})
			},
			loadComment() {
				let _this = this;
				let contentId = this.$route.params.articleId
				this.$axios
					.get('/comment/article/' + contentId)
					.then(r => {
						if (r.data.code === 1) {
							_this.comments = r.data.data
						} else if (r.data.code === 60001) {
							_this.$message.warning(r.data.message)
						}
					})
			},
			deleteComment(val) {
				let _this = this;
				this.$axios
					.delete('/comment/' + val)
					.then(r => {
						if (r.data.code === 1) {
							_this.$message.success("删除成功")
							_this.$router.go(0)
						}
					})
				_this.visible = false
			}
        },
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
	.ck-editor__editable_inline {
		min-height: 205px;
	}
	.other-content{
		position: relative;
		margin-top: 50px;
		padding-bottom: 100px;
	}
	.comment-box{
		padding-bottom: 100px;
	}
	.comment-avatar {
		width: 110px;
		display: inline-block;
	}

	.comment-content {
		vertical-align: top;
		width: 88%;
		padding-left: 20px;
		display: inline-block;
		word-break: break-all;
		word-wrap: break-word
	}

	.comment-content p {
		margin-top: 0;
		margin-bottom: 0;

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