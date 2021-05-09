<template>
    <div class="auth-swipper">
        <el-carousel height="200px" style="top: 35%">
            <el-carousel-item>
                <img src="@/assets/img/lunbo/1.png"/>
            </el-carousel-item>
            <el-carousel-item>
                <img src="@/assets/img/lunbo/2.png"/>
            </el-carousel-item>
            <el-carousel-item>
                <img src="@/assets/img/lunbo/3.png"/>
            </el-carousel-item>
            <el-carousel-item>
                <img src="@/assets/img/lunbo/4.png"/>
            </el-carousel-item>
        </el-carousel>
        <div style="position: relative;top: 40%;font-size: 20px;font-weight: bold">
            <span>前端技术栈为:</span><br>
            <span>Vue<el-divider direction="vertical"></el-divider>Element UI<el-divider
                    direction="vertical"></el-divider>axios</span><br>
            <span>后端技术栈为:</span><br>
            <span>Spring Boot<el-divider direction="vertical"></el-divider>Spring Security<el-divider
                    direction="vertical"></el-divider><br>
                Json Web Token<el-divider direction="vertical"></el-divider>My Batis</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Auth"
    }
</script>

<style scoped>
    .auth-swipper {
        width: 21%;
        position: absolute;
        height: 100%;
        background-image: linear-gradient(135deg, rgb(26, 210, 253) 0%, rgb(0, 138, 255) 100%);
        text-align: center;
    }
</style>