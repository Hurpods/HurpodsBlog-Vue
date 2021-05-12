<template>
    <div>
        <i class="el-icon-circle-plus-outline" @click="dialogFormVisible = true">新增图书</i>
        <el-dialog
                title="添加/修改图书"
                :visible.sync="dialogFormVisible"
                @close="clear"
                width="40%"
        >
            <el-form v-model="form" style="text-align: left" ref="dataForm">
                <el-form-item label="书名" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="form.bookTitle" autocomplete="off" placeholder="书名无需添加《》"></el-input>
                </el-form-item>
                <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
                    <el-input v-model="form.bookAuthor" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出版日期" :label-width="formLabelWidth" prop="date">
                    <el-input v-model="form.postDate" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出版社" :label-width="formLabelWidth" prop="press">
                    <el-input v-model="form.bookPress" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="封面" :label-width="formLabelWidth" prop="cover">
                    <el-input v-model="form.bookCover" autocomplete="off" placeholder="图片 URL"
                              style="width: 60%"></el-input>
                    <img-upload @onUpload="uploadImg" ref="imgUpload"
                                style="position:relative;float: right"></img-upload>
                </el-form-item>
                <el-form-item label="简介" :label-width="formLabelWidth" prop="abs">
                    <el-input type="textarea" v-model="form.bookAbs" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类" :label-width="formLabelWidth" prop="cid">
                    <el-select v-model="form.category.categoryName" placeholder="请选择分类" value-key="categoryId"
                               @change="handleChange">
                        <el-option
                                v-for="item in options"
                                :key="item.categoryId"
                                :label="item.categoryName"
                                :value="item.categoryId"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="id" style="height: 0">
                    <el-input type="hidden" v-model="form.bookId" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ImgUpload from "./ImgUpload";

    export default {
        name: "EditForm",
        components: {ImgUpload},
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    bookId: '',
                    bookTitle: '',
                    bookAuthor: '',
                    postDate: '',
                    bookPress: '',
                    bookCover: '',
                    bookAbs: '',
                    category: {
                        categoryId: '',
                        categoryName: ''
                    }
                },
                formLabelWidth: '100px',
                options: [
                    {
                        id: '',
                        name: ''
                    }
                ],
                obj: {}
            }
        },
        mounted() {
            let _this = this;
            this.$axios
                .get('/content/cats')
                .then(r => {
                    if (r.data.code === 1) {
                        _this.options = r.data.data;
                    }
                })
        },
        methods: {
            clear() {
                this.form = {
                    bookId: '',
                    bookTitle: '',
                    bookAuthor: '',
                    postDate: '',
                    bookPress: '',
                    bookCover: '',
                    bookAbs: '',
                    category: {
                        categoryId: '',
                        categoryName: ''
                    }
                }
            },
            handleChange(value) {
                this.form.category = this.options.find((item) => {
                    return item.categoryId === value;
                });
                console.log(this.obj);
            },
            onSubmit() {
                let _this = this;
                this.$axios
                    .post('/content/books', {
                        bookId: this.form.bookId,
                        bookCover: this.form.bookCover,
                        bookTitle: this.form.bookTitle,
                        bookAuthor: this.form.bookAuthor,
                        postDate: this.form.postDate,
                        bookPress: this.form.bookPress,
                        bookAbs: this.form.bookAbs,
                        category: this.form.category
                    })
                    .then(r => {
                        if (r.data.code === 1) {
                            this.dialogFormVisible = false;
                            _this.$message.success(r.data.data);
                            this.$emit('onSubmit');
                        }
                    })
            },
            uploadImg() {
                this.form.bookCover = this.$refs.imgUpload.url;
            }
        }
    }
</script>

<style scoped>
    .el-icon-circle-plus-outline {
        font-size: 25px;
        float: right;
        cursor: pointer;
        position: relative;
        right: 98px;
    }
</style>