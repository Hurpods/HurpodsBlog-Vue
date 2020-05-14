<template>
    <el-menu
            :default-active="this.$route.path"
            class="el-menu-demo"
            mode="horizontal"
            v-bind:router="true"
            background-color="#FFFFFF"
            text-color="#222"
            active-text-color="lightseagreen"
            style="margin: 10px"
    >
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
            {{item.navItem}}
        </el-menu-item>
        <li>
            <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold;cursor:default">HurpodsBlog——成长的道路</span>
        </li>
        <i class="el-icon-switch-button" v-on:click="logout"
           style="float:right;font-size: 40px;color: #222;padding: 10px;cursor:pointer;outline: 0"></i>
    </el-menu>
</template>

<script>
    export default {
        name: "NavMenu",
        data(){
            return{
                navList: [
                    {name: '/', navItem: '首页'},
                    {name: '/talking', navItem: '碎碎念'},
                    {name: '/library', navItem: '图书馆'}
                ],
                activeIndex: '1'
            }
        },
        methods:{
            logout(){
                let _this=this;
                this.$axios.get('/logout').then(resp=>{
                    if(resp.data.code===200){
                        this.$alert(resp.data.message,'提示');
                        _this.$router.replace('/');
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>