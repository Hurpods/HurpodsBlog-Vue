<template>
    <div>
        <div class="top-carousel">
            <el-carousel :interval="4000" type="card" height="500px">
                <el-carousel-item v-for="(item,index) in carousel" :key="index">
                    <router-link v-if="index%2===0" :to="'/content/article/'+item.articleId">
                        <img src="https://api.dujin.org/bing/1920.php">
                    </router-link>
                    <router-link v-if="index%2===1" :to="'/content/reporter/'+item.reporterId">
                        <img :src="item.book.bookCover"/>
                    </router-link>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="main-contain-left">
            <el-card class="card" :body-style="{ padding: '0px'}" v-for="article in articles" :key="article.articleId">
                <img class="img-cover" src="https://api.dujin.org/bing/1920.php" alt="daily">
                <div class="content-info">
                    <router-link :to="'/content/article/'+article.articleId" class="article-title">
                        {{article.articleTitle}}
                    </router-link>
                    <br/>
                    <p></p>
                    <span class="article-summary">{{article.articleSummary}}</span>
                    <br/>
                    <p></p>
                    <span><router-link to="/content/tag/"><i class="el-icon-price-tag">标签1</i></router-link><el-divider
                            direction="vertical"></el-divider></span>
                    <span><router-link to="/content/tag/"><i class="el-icon-price-tag">标签2</i></router-link><el-divider
                            direction="vertical"></el-divider></span>
                    <span><router-link to="/content/tag/"><i class="el-icon-price-tag">标签3</i></router-link><el-divider
                            direction="vertical"></el-divider></span>
                </div>
            </el-card>

        </div>
        <div class="main-content-right">
            <span style="position: absolute;font-weight: bolder;font-size: 30px;cursor: default;top: 61%;right: 18%;color: #9c9c9c;z-index: 1">小老虎最近在读什么？</span>
            <el-card class="card" :body-style="{ padding: '0px'}" v-for="reporter in reporters"
                     :key="reporter.reporterId">
                <img style="width: 100%;float: left;filter: brightness(0.8) contrast(80%);"
                     :src="reporter.book.bookCover"
                     alt="pic">
                <div class="content-info">
                    <router-link :to="'/content/reporter/'+reporter.reporterId" class="article-title">
                        {{reporter.reporterTitle}}
                    </router-link>
                    <br/>
                    <p></p>
                    <span class="article-summary">{{reporter.book.bookAbs|ellipsis(reporter.book.bookAbs)}}</span>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ContentList",
        data() {
            return {
                articles: [],
                reporters: [],
                carousel: []
            }
        },
        mounted() {
            this.loadArticles()
            this.loadReporters()
            this.loadCarousel()
        },
        filters: {
            ellipsis(val) {
                if (!val) {
                    return ''
                }
                if (val.length > 49) {
                    return val.slice(0, 49) + '...'
                }
                return val
            }
        },
        methods: {
            loadArticles() {
                let _this = this;
                this.$axios.get('/content/article').then(r => {
                    if (r.data.code === 1) {
                        _this.articles = r.data.data;
                    }
                })
            },
            loadReporters() {
                let _this = this;
                this.$axios.get('/content/reporter').then(r => {
                    if (r.data.code === 1) {
                        _this.reporters = r.data.data;
                    }
                })
            },
            loadCarousel() {
                let _this = this;
                this.$axios.get('/content/carousel').then(r => {
                    if (r.data.code === 1) {
                        _this.carousel = r.data.data
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .top-carousel {
        width: 80%;
        margin: 0 auto;
    }

    .main-contain-left {
        width: 55%;
        margin-left: 10%;
        float: left;
    }

    .main-content-right {
        width: 22%;
        margin-right: 10%;
        float: right;
    }

    .card {
        background-color: RGBA(255, 255, 255, 0.5);
        margin-bottom: 20px;
        border-radius: 10px 10px 0 0;
    }

    .img-cover {
        width: 100%;
        height: 400px;
        display: block;
        border-radius: 10px 10px 0 0;
        object-fit: cover;
        filter: brightness(0.8) contrast(80%);
        position: relative;
        float: left;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .content-info {
        padding: 14px;
        position: relative;
        float: left;
    }

    .article-title {
        position: relative;
        float: left;
        font-weight: bold;
        font-size: 24px;
    }

    .article-summary {
        position: relative;
        float: left;
    }
</style>