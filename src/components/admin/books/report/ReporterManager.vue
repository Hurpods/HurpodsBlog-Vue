<template>
	<div>
		<el-row>
			<el-table
				tooltip-effect="dark"
				height="701px"
				:data="reporters"
				style="width: 100%;border-radius: 15px;;box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);"
				@selection-change="handleSelectionChange"
			>
				<el-table-column
					type="selection"
					width="55"
				>
				</el-table-column>
				<el-table-column
					fixed
					prop="reporterId"
					label="ID"
					width="100px"
				>
				</el-table-column>
				<el-table-column
					prop="reporterTitle"
					label="标题"
					width="400px"
				>
				</el-table-column>
				<el-table-column
					prop="bookTitle"
					label="书籍"
					width="250px"
				>
					<template slot-scope="scope">
						{{ reporters[scope.$index].book.bookTitle }}
					</template>
				</el-table-column>
				<el-table-column
					prop="bookRate"
					label="评分"
					width="100px"
				>
				</el-table-column>
				<el-table-column
					prop="postTime"
					label="发布时间"
					width="220px"
				>
				</el-table-column>
				<el-table-column
					prop="authorID"
					label="作者"
					width="230px"
				>
					<template slot-scope="scope">
						{{
							reporters[scope.$index].user.userNickName + '(' + reporters[scope.$index].user.userName + ')'
						}}
					</template>
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
							placeholder="输入标题或书籍名进行搜索"
							@change="searchReporter"
						/>
					</template>
					<template slot-scope="scope">
						<el-button
							@click.native.prevent="editReporter(reporters[scope.$index].reporterId)"
							size="mini"
							type="primary"
						>
							编辑
						</el-button>
						<el-button
							@click.native.prevent="deleteReporter(reporters[scope.$index].reporterId,scope.$index)"
							size="mini"
							type="danger"
						>
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-card style="border-radius: 15px;top:20px;position: relative;">
				<div style="float: left;">共选择了{{ multipleSelection.length }}篇书评</div>
				<el-button
					type="danger"
					class="footer-button"
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
				:total="reporterSize"
			>
			</el-pagination>
		</el-row>
	</div>
</template>

<script>
export default {
	name: "ReporterManager",
	data() {
		return {
			reporters: [],
			currentPage: 1,
			pageSize: 12,
			multipleSelection: [],
			reporterSize: 1,
			search: ''
		}
	},
	mounted() {
		this.loadReporter(this.currentPage);
	},
	methods: {
		loadReporter(currentPage) {
			let _this = this;
			this.$axios
				.get('/content/reporter?pageNum=' + currentPage)
				.then(r => {
					if (r.data.code === 1) {
						_this.reporters = r.data.data["reporterList"];
						_this.reporterSize = r.data.data["pageSize"];
						_this.pageSize = 12
					} else if (r.data.code !== 1) {
						_this.$message.error(r.data.message + '，错误代码：' + r.data.code);
					}
				})
		},
		editReporter(val) {
			localStorage.setItem('reporterId', val);
			this.$router.push('/content/reporters/write');
		},
		deleteReporter(val, index) {
			let _this = this;
			this.$axios
				.delete('/content/reporter/' + val)
				.then(r => {
					if (r.data.code === 1) {
						_this.$message.success("删除成功");
						_this.reporters.splice(index, 1);
					} else {
						_this.$message.error(r.data.message);
					}
				})
		},
		searchReporter() {
			let _this = this;
			if (_this.search === "") {
				_this.loadReporter(_this.currentPage)
			} else {
				this.$axios
					.get('/content/reporter/search/' + _this.search)
					.then(r => {
						if (r.data.code === 1) {
							_this.reporters = r.data.data;
							_this.currentPage = 1;
							_this.reporterSize = r.data.data.length
							_this.pageSize = 1001010
						} else {
							_this.$message.error(r.data.message + "错误代码：" + r.data.code);
						}
					})
			}
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		handleCurrentChange: function (currentPage) {
			this.currentPage = currentPage;
			this.loadReporter(currentPage);
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