<template>
    <div style="position: relative;width: 55%;margin: 0 auto;">
        <div class="main-content">
            <div id="contentArea"></div>
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
                content: ''
            }
        },
        components: {
            // eslint-disable-next-line
            ClassicEditor
        },
        mounted() {
            let _this = this;
            this.$axios.get('/api/content/reporter/67').then(r => {
                if (r.data.code === 1) {
                    console.log(r);
                    _this.content = _this.unescapeHtml(r.data.data.reporterContent);
                    this.initCkEditor(_this.content);
                }
            });
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
            }
        }
    }
</script>

<style>
    .main-content .ck.ck-reset_all {
        display: none !important;
    }

    .main-content .ck .ck-content {
        border: 0 !important;
    }
</style>