<template>
    <div>
        <el-row>
            <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
            <el-tooltip effect="dark" placement="right"
                        v-for="item in books.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                        :key="item.id">
                <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
                <p slot="content" style="font-size: 13px;margin-bottom: 6px">
                    <span>{{item.author}}</span> /
                    <span>{{item.date}}</span> /
                    <span>{{item.press}}</span>
                </p>
                <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
                <el-card class="book" bodyStyle="padding:10px" shadow="hover">
                    <div class="cover">
                        <img :src="item.cover" alt="封面">
                    </div>
                    <div class="info">
                        <div class="title">
                            <a href="">{{item.title}}</a>
                        </div>
                    </div>
                    <div class="author">{{item.author}}</div>
                </el-card>
            </el-tooltip>
        </el-row>
        <el-row style="position: fixed;bottom: 15px;left: 49%;">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="books.length">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    import SearchBar from "./SearchBar";

    export default {
        name: "BooksOverView",
        components: {
            SearchBar
        },
        data() {
            return {
                books: [],
                currentPage: 1,
                pageSize: 16
            }
        },
        mounted() {
            this.loadBooks();
        },
        methods: {
            loadBooks() {
                let _this = this;
                this.$axios
                    .get('/api/content/books')
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
                    .get('/api/content/search/books/' + keywords)
                    .then(r => {
                        if (r.data.code === 1) {
                            _this.books = r.data.data;
                            _this.$emit('searchResult');
                        } else if (r.data.code === 10002) {
                            this.$message.warning("搜索内容不得为空");
                        }
                    })
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
    }
</style>