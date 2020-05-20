<template>
    <ckeditor :editor="editor" v-model="editorData" @ready="onInit"></ckeditor>
</template>

<script>
    import ClassicEditor from "@/components/in-editor/core/ckeditor";
    import CKEditor from '@ckeditor/ckeditor5-vue'
    import axios from 'axios'

    export default {
        name: "CkEditor",
        data() {
            return {
                editor: ClassicEditor,
                editorData: '',
                editorConfig: {}
            }
        },
        components: {
            ckeditor: CKEditor.component
        },
        methods: {
            onInit(editor) {
                editor.plugins.get('FileRepository').createUploadAdapter = (uploader) => {
                    return new MyUploadAdapter(uploader);
                }
            }
        }
    }

    class MyUploadAdapter {
        constructor(loader) {
            // Save Loader instance to update upload progress.
            this.loader = loader;
        }

        async upload() {
            const data = new FormData();
            data.append('typeOption', 'upload_image');
            data.append('upload', await this.loader.file);
            data.append('allowSize', '5');
            return new Promise((resolve, reject) => {
                axios({
                    url: '/api/upload/image',
                    method: 'post',
                    data,
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    },
                    withCredentials: true
                }).then(res => {
                    let resData = res.data;
                    resData.default = resData.url;
                    resolve(resData);
                }).catch(error => {
                    reject(error)
                });
            });
        }
    }

</script>

<style scoped>

</style>