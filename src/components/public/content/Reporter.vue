<template>
	<div style="position: relative;width: 55%;margin: 0 auto;">
		<div class="main-content">
			<div class="book">
				<el-card>
					<img :src="book.bookCover" width="200px" alt="封面" style="float: left" ref="cover">
					<div class="book-info" :style="{height:infoHeight}">
						<span style="font-size: 26px;font-weight: bolder">《{{ book.bookTitle }}》</span><br>
						<span style="color: #9c9c9c">作者：</span><span>{{ book.bookAuthor }}</span><br>
						<span style="color: #9c9c9c">出版社：</span><span>{{ book.bookPress }}</span><br>
						<span style="color: #9c9c9c">出版日期：</span><span>{{ book.postDate }}</span><br>
						<el-divider>书籍简介</el-divider>
						<span style="text-overflow: ellipsis;">{{ book.bookAbs|ellipsis(book.bookAbs) }}</span><br>
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
			<div class="ck-content" v-html="content" style="padding:20px"></div>
			<div class="footer">
				<span>{{ postTime }}</span>
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
	name: "Reporter",
	data() {
		return {
			content: '',
			postTime: '',
			book: '',
			bookRate: 0,
			infoHeight: 0,
			comment: '',
			comments: [],
			isManager: false,
		}
	},
	components: {
		CkEditor,
		// eslint-disable-next-line
	},
	filters: {
		ellipsis(val) {
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
					}
				});
		},
		submitComment() {
			let _this = this;
			this.comment = this.$refs.editor.editorData

			this.$axios
				.post('/comment', {
					commentContent: _this.comment,
					commentAuthorId: localStorage.getItem("userId"),
					status: 1,
					contentId: this.$route.params.reporterId
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
			let contentId = this.$route.params.reporterId
			this.$axios
				.get('/comment/reporter/' + contentId)
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
	position: relative;
}

.ck-editor__editable_inline {
	min-height: 205px;
}


.other-content {
	position: relative;
	margin-top: 50px;
	padding-bottom: 100px;
}

.comment-box {
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
	margin-top: 50px;
}

.footer {
	cursor: default;
	padding: 15px;
	font-size: 14px;
	font-weight: 500;
	float: right;
}
</style>