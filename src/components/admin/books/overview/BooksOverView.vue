<template>
    <div>
        <el-row>
            <edit-form @onSubmit="loadBooks()" ref="edit"></edit-form>
            <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
            <el-tooltip effect="dark" placement="right"
                        v-for="item in books.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                        :key="item.bookId">
                <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.bookTitle}}</p>
                <p slot="content" style="font-size: 13px;margin-bottom: 6px">
                    <span>{{item.bookAuthor}}</span> /
                    <span>{{item.postDate}}</span> /
                    <span>{{item.bookPress}}</span>
                </p>
                <p slot="content" style="width: 300px" class="abstract">{{item.bookAbs}}</p>
                <el-card class="book" bodyStyle="padding:10px" shadow="hover">
                    <div class="cover" @click="editBook(item)">
                        <img :src="item.bookCover" alt="封面">
                    </div>
                    <div class="info">
                        <div class="title">
                            <a href="">{{item.bookTitle|trans}}</a>
                        </div>
                        <i class="el-icon-delete" @click="deleteBook(item.bookId)"></i>
                    </div>
                    <div class="author">{{item.bookAuthor}}</div>
                </el-card>
            </el-tooltip>
        </el-row>
        <el-row style="position: fixed;bottom: 15px;left: 49%;">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="books.length"
            >
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    import SearchBar from "./SearchBar";
    import EditForm from "./EditForm";

    export default {
        name: "BooksOverView",
        components: {
            SearchBar,
            EditForm
        },
        data() {
            return {
                books: [],
                currentPage: 1,
                pageSize: 18
            }
        },
        mounted() {
            this.loadBooks();
        },
        filters:{
          trans(value){
            if(value.length>=8){
              return value.slice(0,4)+'...'
            }else{
              return value
            }
          }
        },
        methods: {
            loadBooks() {
                let _this = this;
                this.$axios
                    .get('/api/backStage/books')
                    .then(r => {
                        if (r.data.code === 1) {
                            _this.books = r.data.data;
                        }
                    })
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
            searchResult() {
                let _this = this;
                let keywords = this.$refs.searchBar.keywords;
                this.$axios
                    .get('/api/backStage/books/search/' + keywords)
                    .then(r => {
                        if (r.data.code === 1) {
                            _this.books = r.data.data;
                            _this.$emit('searchResult');
                        } else if (r.data.code === 10002) {
                            this.$message.warning("搜索内容不得为空");
                        }
                    })
            },
            deleteBook(bookId) {
                let _this = this;
                this.$confirm('此操作将永久删除该图书，是否继续？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios
                        .delete('/api/backStage/books/' + bookId)
                        .then(r => {
                            if (r.data.code === 1) {
                                _this.$message.success(r.data.data);
                                _this.loadBooks()
                            } else {
                                _this.$message.error(r.data.data);
                            }
                        })
                        .catch(r => {
                            _this.$message(r)
                        })
                }).catch(() => {

                })

            },
            editBook(book) {
                this.$refs.edit.dialogFormVisible = true
                this.$refs.edit.form = {
                    bookId: book.bookId,
                    bookCover: book.bookCover,
                    bookTitle: book.bookTitle,
                    bookAuthor: book.bookAuthor,
                    postDate: book.postDate,
                    bookPress: book.bookPress,
                    bookAbs: book.bookAbs,
                    category: {
                        categoryId: book.category.categoryId.toString(),
                        categoryName: book.category.categoryName
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .cover {
        width: 115px;
        height: 172px;
        margin-bottom: 7px;
        overflow: hidden;
        cursor: pointer;
    }

    img {
        width: 115px;
        height: 172px;
    }

    .title {
        font-size: 14px;
        text-align: left;
    }

    .author {
        color: #333;
        width: 102px;
        font-size: 13px;
        margin-bottom: 6px;
        text-align: left;
    }

    .book {
        width: 135px;
        margin-bottom: 125px;
        height: 233px;
        float: left;
        margin-left: 50px;
        transition: .5s;
    }

    .el-icon-delete {
        cursor: pointer;
        float: right;
        margin-top: 1.5px;
    }
</style>