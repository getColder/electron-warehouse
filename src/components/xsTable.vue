<template>
    <div class="xs-table">
        <el-card class="table-view">
            <el-table
                class="table-body-view"
                :data="localTableData"
                height="60vh"
                stripe
                fit
                row-key
            >
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-form
                            v-for="item in tableLabel"
                            :key="item.prop"
                            label-position="left"
                            inline
                        >
                            <el-form-item
                                :label="item.label"
                                class="info-expand"
                            >
                                <span> {{ scope.row[item.prop] }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="项目名称" prop="name">
                </el-table-column>
                <el-table-column
                    label="操作"
                    header-align="center"
                    align="left"
                    min-width="180"
                >
                    <template slot-scope="scope">
                        <div class="item-options">
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.row)"
                                type="primary"
                                >编辑</el-button
                            >
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)"
                                >删除</el-button
                            >
                            <el-button
                                size="mini"
                                @click="handleStockin(scope.row)"
                                >入库</el-button
                            >
                            <el-button
                                size="mini"
                                @click="handleStockOut(scope.row)"
                                >出库</el-button
                            >
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="pager"
                layout="prev, pager, next"
                :total="localConfig.total"
                :current-page="localConfig.page"
                @current-page="changePage"
                :page-size="20"
            ></el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "XsTable",
    data() {
        return {
            localConfig: this.config,
            localTableData: this.tableData,
        };
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
        handleStockin(row) {
            this.$emit("stockin", row);
        },
        handleStockOut(row) {
            this.$emit("stockout", row);
        },
        changePage(page) {
            this.$emit("changePage", page);
        },
    },
    watch: {
        tableData: function (val) {
            this.localTableData = val;
        },
    },
};
</script>

<style lang="less">
.xs-table {
    .table-view {
        text-align: center;
        .info-expand label {
            width: 90px;
            color: #99a9bf;
        }
        .item-options {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        .pager {
            bottom: 0;
            right: 20%;
        }
    }
}
</style>