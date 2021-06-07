<template>
	<div class="backstage-main">
		<el-input
			type="text"
			placeholder="请输入标题"
			v-model="title"
			maxlength="50"
			show-word-limit
			class="article-title"
		>
		</el-input>
		<div class="editor-box">
			<CkEditor ref="editor"></CkEditor>
		</div>
		<el-button
			type="primary"
			style="position: relative;float: right;margin: 20px 0;width: 100px"
			@click="dialogFormVisible=true"
			v-show="!updateMode"
		>
			提交
		</el-button>
		<el-button
			type="primary"
			style="position: relative;float: right;margin: 20px 0;width: 100px"
			@click="dialogFormVisible=true"
			v-show="updateMode"

		>
			提交
		</el-button>
		<el-dialog
			title="上传封面"
			width="30%"
			:visible.sync="dialogFormVisible"
			center
		>
			<el-upload
				drag
				action="http://localhost:8090/api/upload/cover"
				:headers="myHeader"
				:on-success="handleSuccess"
				:on-exceed="handleExceed"
			>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>（不上传则使用默认封面）</div>
			</el-upload>
			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitContent">确 认</el-button>
			</span>

		</el-dialog>
	</div>
</template>

<script>
import CkEditor from "@/components/publicComponents/CkEditor";

export default {
	name: "WriteArticle",
	data() {
		return {
			title: '',
			content: '',
			dialogFormVisible: false,
			uploaded: false,
			myHeader: {
				Authorization: localStorage.getItem('token')
			},
			cover: '',
			updateMode:false
		}
	},
	components: {CkEditor},
	mounted() {
		let articleId=localStorage.getItem("articleId");
		if(articleId){
			this.loadArticle(articleId)
			sessionStorage.setItem("articleId",articleId);
			localStorage.removeItem("articleId")
		}
	},
	methods: {
		loadArticle(articleId){
			let _this=this;
			this.$axios
				.get('/content/article/'+articleId)
				.then(r=>{
					if (r.data.code === 1){
						_this.title=r.data.data.articleTitle
						_this.$refs.editor.editorData=r.data.data.articleContent
						_this.updateMode=true
					}
				})
		},
		submitContent() {
			let _this = this;
			if(!this.updateMode){
				this.$axios.post('/content/article', {
					title: _this.title,
					content: _this.$refs.editor.editorData,
					userName:localStorage.getItem("userName"),
					cover:_this.cover
				}).then(r => {
					if (r.data.code === 1) {
						_this.$message.success(r.data.data);
						_this.$router.replace("/content/articles/manage")
					} else {
						_this.$message.error(r.data.message + '错误：' + r.data.code);
					}
				})
			}else{
				this.$axios.put('/content/article/'+sessionStorage.getItem("articleId"),{
					title: _this.title,
					content: _this.$refs.editor.editorData,
					userName:localStorage.getItem("userName"),
					cover:_this.cover
				}).then(r=>{
					if (r.data.code === 1) {
						sessionStorage.removeItem("articleId")
						_this.$message.success(r.data.data);
						_this.$router.replace("/content/articles/manage")
					} else {
						_this.$message.error(r.data.message + '错误：' + r.data.code);
					}
				})
			}
		},
		handleSuccess(response) {
			this.cover = response.data
			this.$message.success('上传成功')
		},
		handleExceed(files, fileList) {
			this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
		},
	}
}
</script>

<style>

.ck-editor__editable_inline {
	min-height: 755px;
}

.editor-box {
	position: relative;
	float: left;
	margin-top: 20px;
	min-width: 100%;
}

.el-dialog .el-dialog__body {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>