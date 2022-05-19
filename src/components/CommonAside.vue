<template>
    <el-menu
        default-active="1-4-1"
        class="el-menu-vertical"
        id="sideMenu"
        text-color="#1F1F4A"
        active-text-color="#C9A06A"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
    >
        <h3>{{ isCollapse ? "后台" : title }}</h3>
        <div style="border-bottom: 6px solid #a07070"></div>
        <el-menu-item
            v-for="item in noChildren"
            :index="item.path"
            :key="item.path"
            @click="clickMenu(item)"
        >
            <i :class="'el-icon-' + item.icon"></i>
            <span>{{ item.label }}</span>
        </el-menu-item>
        <el-submenu
            v-for="child in hasChildren"
            :index="child.label"
            :key="child.path"
        >
            <i :class="'el-icon-' + child.icon" slot="title"></i>
            <span slot="title">{{ child.label }}</span>
            <el-menu-item
                v-for="item in child.children"
                :index="item.path"
                :key="item.path"
                @click="clickMenu(item)"
                >{{ item.label }}</el-menu-item
            >
        </el-submenu>
        <div class="hidden-sm-and-up button-exit">
            <el-button
                icon="el-icon-s-fold"
                @click="touchEmpty"
                type="primary"
            ></el-button>
        </div>
    </el-menu>
</template>

<style lang="less" scoped>
@media (max-width: 767px) {
    .el-menu-vertical:not(.el-menu--collapse) {
        width: 55vw;
        min-height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
    }
    .el-menu-vertical.el-menu--collapse {
        width: 0;
        min-height: 1vh;
    }
    .el-menu {
        background-color: #efefef;
        height: 100vw;
        border: none;
        text-align: center;
        h3 {
            color: #5f45a7;
            line-height: 1.2em;
        }
        .button-exit {
            position: absolute;
            right: 2rem;
            bottom: 0;
        }
    }
}

@media screen and (min-width: 768px) {
    .el-menu-vertical:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-menu {
        background-color: #efefef;
        height: 100%;
        border: none;
        text-align: center;
        h3 {
            color: #5f45a7;
            line-height: 48px;
        }
    }
}
</style>


<script>
import "element-ui/lib/theme-chalk/display.css";
export default {
    data() {
        return {
            title: "仓库后台管理",
            menu: [],
        };
    },
    methods: {
        handleOpen(key, keyPath) {},
        handleClose(key, keyPath) {},
        clickMenu(item) {
            this.$router.push({
                name: item.name,
            });
            this.$store.commit("selectMenu", item);
            this.$store.commit("collapseMenu");
        },
        touchEmpty() {
            this.$store.commit("collapseMenu");
        },
    },
    computed: {
        noChildren() {
            return this.asyncMenu.filter((item) => !item.children);
        },
        hasChildren() {
            return this.asyncMenu.filter((item) => item.children);
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse;
        },
        asyncMenu() {
            return this.$store.state.tab.menu;
        },
    },
};
</script>