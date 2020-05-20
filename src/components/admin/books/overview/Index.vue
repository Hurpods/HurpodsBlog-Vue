<template>
    <div class="backstage-main">
        <el-container>
            <el-header>
                <Header @indexSelect="listByCategory" ref="tab" @searchTrigger="searchResult"></Header>
            </el-header>
            <el-main>
                <BooksOverView ref="booksArea"></BooksOverView>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Header from "./Header";
    import BooksOverView from "./BooksOverView";

    export default {
        name: "Index",
        components: {
            Header,
            BooksOverView
        },
        methods: {
            listByCategory() {
                let _this = this;
                let cid = this.$refs.tab.activeName;
                let requestUrl = 'api/content/cat/' + cid + '/books';
                this.$axios
                    .get(requestUrl)
                    .then(r => {
                        if (r.data.code === 1) {
                            _this.$refs.booksArea.books = r.data.data;
                            _this.$refs.booksArea.currentPage = 1;
                        }
                    })
            },
            searchResult() {
                this.$refs.tab.activeName = '0';
            }
        }
    }
</script>

<style scoped>

</style>