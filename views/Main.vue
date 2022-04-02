<template>
    <el-container>
        <el-aside width="auto">
            <common-aside></common-aside>
        </el-aside>
        <el-container>
            <el-header> <common-header></common-header></el-header>
            <el-main>
                <img alt="Vue logo" src="../src/assets/logo.png" />
                <router-view></router-view
            ></el-main>
        </el-container>
    </el-container>
</template>
<script>
import CommonAside from "../src/components/CommonAside.vue";
import CommonHeader from "../src/components/CommonHeader.vue";
export default {
    name: "Home",
    data() {
        return {};
    },
    components: {
        CommonAside,
        CommonHeader,
    },
};
</script>
<style lang="less" scoped>
.el-container {
    height: 100%;
}

.el-header {
    background-color: #334;
}
</style>