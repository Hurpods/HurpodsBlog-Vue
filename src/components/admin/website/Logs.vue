<template>
	<div class="backstage-main">
		<el-card class="c1">
			<div slot="header" class="clearfix">
				<span>日志记录</span>
				<el-button style="float: right; padding: 3px 0;font-size: 15px" type="text" @click="deleteAll">清空日志</el-button>
			</div>
			<el-scrollbar>
				<el-card v-for="log in logs" :key="log" style="margin-bottom: 20px;">
					<i class="el-icon-document" style="font-size: 16px;width: 51%">{{ log }}</i>
					<el-button type="primary" icon="el-icon-reading" @click="readLog(log)">查看</el-button>
					<el-button type="danger" icon="el-icon-delete" @click="deleteLog(log)">删除</el-button>
				</el-card>
			</el-scrollbar>

		</el-card>
		<el-card class="c2">
			<div slot="header" class="clearfix">
				<span>{{ date }}</span>
			</div>
			<el-scrollbar style="height: 100%">
				<div id="contentArea"></div>
			</el-scrollbar>

		</el-card>
	</div>
</template>

<script>
import ClassicEditor from "@/components/in-editor/core/ckeditor";

export default {
	name: "Logs",
	data() {
		return {
			content: '',
			logs: [],
			date: ''
		}
	},
	components: {
		// eslint-disable-next-line
		ClassicEditor
	},
	mounted() {
		this.readList()
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
		readLog(v) {
			let _this = this;
			const val = v.replace("年", "").replace("月", "").replace("日", "")
			this.$axios
				.get('/api/backStage/logs/' + val)
				.then(r => {
					if (r.data.code === 1) {
						_this.date = v
						_this.content = r.data.data
						_this.initCkEditor(_this.content)
					}
				})
		},
		readList() {
			let _this = this;
			this.$axios
				.get('/api/backStage/logs')
				.then(r => {
					if (r.data.code === 1) {
						for (const v of r.data.data) {
							const d = v.substring(0, 4) + "年" + v.substring(4, 6) + "月" + v.substring(6, 8) + "日"
							_this.logs.unshift(d)
						}
						_this.date = _this.logs[0]
						_this.readLog(_this.date)
					}
				})
		},
		deleteLog(v){

			let _this = this;
			const val = v.replace("年", "").replace("月", "").replace("日", "")
			this.$axios
				.delete('/api/backStage/logs/' + val)
				.then(r => {
					if (r.data.code === 1) {
						_this.$message.success("删除成功")
						_this.readList()
					}
				})
		},
		deleteAll(){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '操作取消'
				});
			});
		}
	}
}
</script>

<style>
.ck .ck-reset_all {
	display: none !important;
}

.ck .ck-content {
	border: 0 !important;
	background-color: RGBA(255, 255, 255, 0);
}

.ck-editor__editable {
	max-height: 910px;
}

.c1 {
	position: fixed;
	width: 23%;
	float: left;
	height: 910px;
}

.c2 {
	position: relative;
	width: 70%;
	float: right;
	height: 910px;
}

</style>