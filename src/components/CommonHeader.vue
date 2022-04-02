<template>
    <header>
        <div class="l-content">
            <el-button circle icon="el-icon-menu" size="small" @click="handleMenu"></el-button>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="small">
                <span>
                    <img class="user" :src="userImg" />
                </span>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown>
        </div>
    </header>
</template>

<style lang="less" scoped>
header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    color: rgb(220, 245, 245);
    align-items: center;
    .l-content {
        display: flex;
        align-items: center;
        .el-button {
            margin-right: 20px;
        }
    }
    .r-content {
        text-align: center;
        .user {
            margin-top: 70px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
}
</style>

<script>
export default {
    name: "CommonHeader",
    data() {
        return {
            userImg: require("../assets/avatar.jpeg"),
        };
    },
    methods: {
        handleMenu(){
            this.$store.commit('collapseMenu');
        }
    }
};
</script>