<template>
    <header>
        <div class="l-content">
            <el-button
                circle
                icon="el-icon-menu"
                size="small"
                @click="handleMenu"
            ></el-button>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item
                    style="color: white"
                    v-for="item in tags"
                    :key="item.path"
                    :to="{ path: item.path }"
                    >{{ item.label }}</el-breadcrumb-item
                >
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="small">
                <span>
                    <img class="user" :src="userImg" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<style lang="less">
header {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    color: rgb(220, 245, 245);
    .l-content {
        display: flex;
        align-items: center;
        .el-button {
            margin-right: 20px;
        }
        .el-breadcrumb__inner {
            color: #bbb;
        }
        .el-breadcrumb__item:last-child > *{
            color: #f5c070;
        }
    }
    .r-content {
        display: flex;
        text-align: center;
        .user {
            margin-top: 5px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
}
</style>

<script>
import { mapState } from "vuex";
export default {
    name: "CommonHeader",
    data() {
        return {
            userImg: require("../assets/avatar.jpeg"),
        };
    },
    methods: {
        handleMenu() {
            this.$store.commit("collapseMenu");
        },
    },
    computed: {
        ...mapState({
            tags: (state) => state.tab.tabsList,
        }),
    },
};
</script>