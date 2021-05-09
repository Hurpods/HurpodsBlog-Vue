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
			@click="submitContent"
		>
			提交
		</el-button>
	</div>
</template>

<script>
import CkEditor from "@/components/publicComponents/CkEditor";

export default {
	name: "WriteArticle",
	data() {
		return {
			title: '',
			content: ''
		}
	},
	components: {CkEditor},
	methods: {
		submitContent() {
			let _this = this;
			this.$axios.post('/content/article', {
				title: _this.title,
				content: _this.$refs.editor.editorData,
				userName:localStorage.getItem("userName")
			}).then(r => {
				if (r.data.code === 1) {
					_this.$message.success(r.data.data);
					_this.$router.replace("/content/articles/manage")
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

.editor-box {
	position: relative;
	float: left;
	margin-top: 20px;
	min-width: 100%;
}

</style>