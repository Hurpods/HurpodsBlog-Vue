<template>
	<div class="backstage-main">
		<el-row>
			<el-table
				tooltip-effect="dark"
				height="701px"
				:data="articles"
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
					prop="articleId"
					label="ID"
					width="100px"
				>
				</el-table-column>
				<el-table-column
					prop="articleTitle"
					label="标题"
					width="450px"
				>
				</el-table-column>
				<el-table-column
					prop="articleCreateTime"
					label="首次发布时间"
					width="220px"
				>

				</el-table-column>
				<el-table-column
					prop="articleUpdateTime"
					label="最后修改时间"
					width="220px"
				>
				</el-table-column>
				<el-table-column
					prop="articleViewCount"
					label="浏览量"
					width="100px"
				>
				</el-table-column>
				<el-table-column
					prop="authorID"
					label="作者"
					width="230px"
				>
					<template slot-scope="scope">
						{{
							articles[scope.$index].user.userNickName + '(' + articles[scope.$index].user.userName + ')'
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
							placeholder="输入标题或作者名进行搜索"
							@change="searchArticle"
						/>
					</template>
					<template slot-scope="scope">
						<el-button
							@click.native.prevent="editArticle(articles[scope.$index].articleId)"
							size="mini"
							type="primary"
						>
							编辑
						</el-button>
						<el-button
							@click.native.prevent="deleteArticle(articles[scope.$index].articleId,scope.$index)"
							size="mini"
							type="danger"
						>
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-card style="border-radius: 15px;top:20px;position: relative;">
				<div style="float: left;">共选择了{{ multipleSelection.length }}篇文章</div>
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
				:total="articleSize"
			>
			</el-pagination>
		</el-row>
	</div>
</template>

<script>
export default {
	name: "ArticleManager",
	data(){
		return{
			articles: [],
			currentPage: 1,
			pageSize: 12,
			multipleSelection: [],
			articleSize: 1,
			search: ''
		}
	},
	mounted() {
		this.loadArticle(this.currentPage)
	},
	methods:{
		loadArticle(currentPage) {
			let _this = this;
			this.$axios
				.get('/content/article?pageNum='+currentPage)
				.then(r=>{
					if(r.data.code===1){
						_this.articles=r.data.data["articleList"];
						_this.articleSize=r.data.data["articleSize"];
						_this.pageSize = 12
					}else if (r.data.code !== 1) {
						_this.$message.error(r.data.message + '，错误代码：' + r.data.code);
					}
				})
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		handleCurrentChange: function (currentPage) {
			this.currentPage = currentPage;
			this.loadArticle(currentPage);
		},
		searchArticle(){

		},
		editArticle(){

		},
		deleteArticle(){

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