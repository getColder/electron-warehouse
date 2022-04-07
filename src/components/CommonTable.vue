<template>
    <div class="common-table">
        <el-card class="table-view">
            <el-table class="table-body-view" :data="tableData" height="90%" stripe>
                <el-table-column
                    show-overflow-tooltip
                    v-for="item in tableLabel"
                    :key="item.prop"
                    :label="item.label"
                    :width="item.width ? item.width : 125"
                    header-align="center"
                    align="center"
                >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                            scope.row[item.prop]
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" header-align="center" align="center" min-width="180">
                    <el-button size="mini" @click="handleEdit">编辑</el-button>
                    <el-button size="mini" type="warning" @click="handleDelete"
                        >删除</el-button
                    >
                    <el-button size="mini" @click="handleEdit" type="primay"
                        >入库</el-button
                    >
                    <el-button size="mini" @click="handleEdit" type="primay"
                        >出库</el-button
                    >
                </el-table-column>
            </el-table>
            <el-pagination
                class="pager"
                layout="prev, pager, next"
                :total="config.total"
                :current-page.sync="config.page"
                @current-page="changePage"
                :page-size="20"
            ></el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "CommonTable",
    data() {
        return {};
    },
    props: {
        tableData: Array,
        tableLabel: Array,
        config: Object,
    },
    methods: {
        handleEdit(row) {
            this.$emit("edit", row);
        },
        handleDelete(row) {
            this.$emit("delete", row);
        },
        changePage(page) {
            this.$emit("changePage", page);
        },
    },
};
</script>

<style lang="less">
.common-table {
    height: calc(100% - 62px);
    background: #ff0;
    .table-view {
        text-align: center;
        .pager {
            bottom: 0;
            right: 20%;
        }
    }
}
</style>