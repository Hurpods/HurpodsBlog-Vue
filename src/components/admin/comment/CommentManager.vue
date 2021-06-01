<template>
	<div class="backstage-main">
		<el-row>
			<el-table
				ref="userTable"
				tooltip-effect="dark"
				:data="comments"
				style="width: 100%;border-radius: 15px;;box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);"
				height="701px"
				@selection-change="handleSelectionChange"
			>
				<el-table-column
					type="selection"
					width="55"
				>
				</el-table-column>
				<el-table-column
					fixed
					prop="commentId"
					label="CID"
					width="50px"
				>
				</el-table-column>
				<el-table-column
					prop="commentAuthorId"
					label="用户"
					width="200px"
				>
					<template slot-scope="scope">
						{{ comments[scope.$index].user.userNickName }}({{ comments[scope.$index].user.userName }})
					</template>
				</el-table-column>

				<el-table-column
					prop="commentContent"
					label="发表内容"
					width="600px"
				>
				</el-table-column>
				<el-table-column
					prop="commentPostTime"
					label="发表时间"
					width="160px"
				>

				</el-table-column>
				<el-table-column
					prop="status"
					label="发布类型"
					width="150px"
				>
					<template slot-scope="scope">
						{{ comments[scope.$index].status|typeFilter() }}
					</template>
				</el-table-column>
				<el-table-column
					prop="contentId"
					label="评论文章"
					width="220px"
				>
				</el-table-column>
				<el-table-column
					fixed="right"
					width="250px"
				>
					<template slot="header" slot-scope="scope">
						<el-input
							v-model="search"
							size="mini"
							prefix-icon="el-icon-search"
							placeholder="键入搜索"
							@change="searchComment"
						/>
					</template>
					<template slot-scope="scope">
						<el-button
							@click.native.prevent="deleteComment(comments[scope.$index].commentId,comments[scope.$index])"
							size="mini"
							type="danger"
						>
							删除评论
						</el-button>
						<el-button
							@click.native.prevent="banUser(comments[scope.$index].user.userId)"
							size="mini"
							type="warning"
						>
							封禁用户
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-card style="border-radius: 15px;top:20px;position: relative;">
				<div style="float: left;">共选择了{{ multipleSelection.length }}条评论</div>
				<el-button
					type="danger"
					class="footer-button"
					@click="batchDelete"
				>
					全部删除
				</el-button>
			</el-card>
		</el-row>
		<el-row style="position: fixed;bottom: 15px;left: 49%;">
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="pageSize"
				:total="commentSize"
			>
			</el-pagination>
		</el-row>
	</div>
</template>

<script>
export default {
	name: "CommentManager",
	data() {
		return {
			comments: [],
			currentPage: 1,
			pageSize: 12,
			multipleSelection: [],
			commentSize: 1,
			search: ''
		}
	}
	, filters: {
		typeFilter: function (val) {
			return val === 1 ? '书评' : '文章'
		}
	},
	mounted() {
		this.loadComment(this.currentPage)
	},
	methods: {
		handleCurrentChange: function (currentPage) {
			this.currentPage = currentPage;
			this.loadComment(currentPage);
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		loadComment(currentPage) {
			let _this = this;
			this.$axios
				.get('/comment?pageNum=' + currentPage)
				.then(r => {
					if (r.data.code === 1) {
						_this.comments = r.data.data["commentList"]
						_this.commentSize = r.data.data["pageSize"]
						_this.pageSize = 12
					} else if (r.data.code !== 1) {
						_this.$message.error(r.data.message + '，错误代码：' + r.data.code);
					}
				})

		},
		searchComment() {
			let _this = this;
			if (this.search === "") {
				_this.loadComment(_this.currentPage)
			} else {
				this.$axios
					.get('/comment/search/' + _this.search)
					.then(r => {
						if (r.data.code === 1) {
							_this.comments = r.data.data;
							_this.currentPage = 1;
							_this.reporterSize = r.data.data.length
							_this.pageSize = 1001010
						} else {
							_this.$message.error(r.data.message + "错误代码：" + r.data.code);
						}
					})
			}
		},
		deleteComment(val, index) {
			console.log(val)
			console.log(index)
			let _this = this;
			this.$axios
				.delete('/comment/' + val)
				.then(r => {
					if (r.data.code === 1) {
						_this.$message.success("删除成功")
						_this.comments.splice(index)
					} else {
						_this.$message.error(r.data.message);
					}
				})
		},
		banUser(val) {
			let _this = this;
			this.$axios
				.put('/api/user/ban',
					{
						'ids': val
					})
				.then(r => {
					if (r.data.code === 1) {
						_this.$message.success("成功封禁" + r.data.data + "名用户");
					} else {
						_this.$message.error("操作失败，错误代码：" + r.data.code)
					}
				})
		},
		batchDelete() {
			let selectedId = [];
			this.multipleSelection.forEach((value) => {
				selectedId.push(value.commentId)
			})
			let _this = this;
			this.$axios
				.put('/comment/batchDelete', {ids: selectedId})
				.then(r=>{
					if(r.data.code===1){
						_this.$message.success("删除成功")
						_this.$router.go(0)
					}else{
						_this.$message.error("操作失败，错误代码：" + r.data.code)
					}
			})
		}
	}
}
</script>

<style scoped>
.footer-button {
	float: right;
	position: relative;
	margin-left: 15px;
	bottom: 8px
}
</style>