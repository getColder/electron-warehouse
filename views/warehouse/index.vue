<template>
    <div class="manager">
        <el-dialog
            :title="operateType === 'add' ? '新增项目' : '更改项目'"
            :visible.sync="isShow"
        >
            <common-form
                :formLabel="operateFormLabel"
                :form="operateForm"
                :inline="true"
                ref="form"
            ></common-form>
            <div slot="footer" class="dialog-foot">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </div>
        </el-dialog>
        <div class="manager-header">
            <el-button
                type="success"
                size="mini"
                style="margin-bottom: 20px"
                @click="addItemDialog"
                >新增项目</el-button
            >
            <common-form
                :formLabel="formLabel"
                :form="searchForm"
                :inline="true"
                ref="form"
                ><el-button type="primary" @click="getList">搜索</el-button>
            </common-form>
        </div>
        <common-table
            :tableData="tableData"
            :tableLabel="tableLabel"
            :config="config"
            @changePage="getList()"
            @edit="editItemDialog(row)"
            @delete="remove(row)"
            @stockin="stockin(row)"
            @stockout="stockout(row)"
        >
        </common-table>
    </div>
</template>

<style lang="less">
.manager {
    .manager-header {
        display: flex;
        justify-content: space-between;
    }
}
</style>

<script>
import CommonForm from "../../src/components/CommonForm.vue";
import CommonTable from "../../src/components/CommonTable.vue";
import {
    createItem,
    updateItem,
    deleteItem,
    stockInItem,
    stockOutItem,
} from "../../api/data";

export default {
    name: "warehouse",
    components: {
        CommonForm,
        CommonTable,
    },
    data() {
        return {
            operateType: "add",
            isShow: false,
            operateFormLabel: [
                {
                    model: "name",
                    label: "项目名称",
                    type: "input",
                },
                {
                    model: "number",
                    label: "数量",
                    type: "input",
                },
                {
                    model: "pcs",
                    label: "计量单位",
                    type: "input",
                },
                {
                    model: "group",
                    label: "分组",
                    type: "select",
                    opts: [
                        { label: "分组1", value: "g1" },
                        { label: "分组2", value: "g2" },
                    ],
                },
            ],
            operateForm: {
                name: "",
                number: "",
                psc: "",
            },
            formLabel: [
                {
                    model: "keyword",
                    label: "",
                    type: "input",
                },
            ],
            searchForm: {
                keyword: "",
            },
            tableLabel: [
                {
                    prop: "item",
                    label: "项目名称",
                    width: "250",
                },
                {
                    prop: "number",
                    label: "存量",
                    width: "150",
                },
                {
                    prop: "pcs",
                    label: "单位",
                    width: "150",
                },
                {
                    prop: "group",
                    label: "分组",
                    width: "250",
                },
            ],
            tableData: Array(40).fill({
                item: "物品1",
                number: "5",
                pcs: "个",
                group: "分组1",
            }),
            config: {
                page: 1,
                total: 20,
            },
        };
    },
    methods: {
        confirm() {
            if (this.operateType === "add") {
                this.create();
            } else if (this.operateType === "edit") {
                this.edit();
            }
        },
        addItemDialog() {
            this.isShow = true;
            this.operateType = "add";
        },
        editItemDialog(row) {
            this.isShow = true;
            this.operateType = "edit";
        },
        create(param) {
            createItem(this.operateForm)
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 20000) {
                        this.$message.success("添加成功！");
                    } else if (code === 20001) {
                        this.$message.warning("项目已存在!");
                    } else {
                        this.$message.error("添加失败！");
                    }
                })
                .catch((err) => {
                    this.$message.error("添加失败！");
                    console.log(err, "错误");
                });
        },
        edit(param) {
            updateItem(this.operateForm)
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 20000) {
                        this.$message.success("修改成功！");
                    } else if (code === 20001) {
                        this.$message.warning("项目不存在!");
                    } else {
                        this.$message.error("修改失败！");
                    }
                })
                .catch((err) => {
                    this.$message.error("修改失败！");
                    console.log(err, "错误");
                });
        },
        remove(row) {
            console.log(row);
            deleteItem(row)
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 20000) {
                        this.$message.success("删除成功！");
                    } else if (code === 20001) {
                        this.$message.warning("项目不存在!删除失败！");
                    } else {
                        this.$message.error("删除失败！");
                    }
                })
                .catch((err) => {
                    this.$message.error("删除失败！");
                    console.log(err, "错误");
                });
        },
        stockin(row) {
            console.log(row);
            stockInItem(row)
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 20000) {
                        this.$message.success("入库成功！");
                    } else if (code === 20001) {
                        this.$message.warning("入库失败 ");
                    } else {
                        this.$message.error("入库失败！");
                    }
                })
                .catch((err) => {
                    this.$message.error("入库失败！");
                    console.log(err, "错误");
                });
        },
        stockout(row) {
            console.log(row);
            stockOutItem(row)
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 20000) {
                        this.$message.success("出库成功！");
                    } else if (code === 20001) {
                        this.$message.warning("出库失败！库存不足！ ");
                    } else {
                        this.$message.error("出库失败！");
                    }
                })
                .catch((err) => {
                    this.$message.error("出库失败！");
                    console.log(err, "错误");
                });
        },
    },
};
</script>