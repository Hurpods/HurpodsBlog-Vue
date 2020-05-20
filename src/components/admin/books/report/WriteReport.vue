<template>
    <div class="backstage-main">
        <CkEditor ref="editor"></CkEditor>
        <el-button type="primary"
                   style="position: relative;float: right;margin: 20px 0;width: 100px"
                   @click="submitContent"
        >
            提交
        </el-button>
        <el-button type="info"
                   style="position: relative;float: right;margin: 20px ;width: 100px"
                   @click="saveContent"
        >
            暂存
        </el-button>
    </div>
</template>

<script>
    import CkEditor from "@/components/publicComponents/CkEditor";

    export default {
        name: "WriteReport",
        components: {CkEditor},
        methods: {
            saveContent() {

            },
            submitContent() {
                console.log(this.$refs.editor.editorData);
            }
        }
    }
</script>

<style>
    .ck-editor__editable_inline {
        min-height: 700px;
    }
</style>