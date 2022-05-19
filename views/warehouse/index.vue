<template>
    <div class="manager">
        <el-dialog :visible.sync="confirmDeleteShow" center="true">
            <div slot="title">警告</div>
            <span style="font-size: 1.4rem"
                >项目删除后不可恢复! 你确认要删除吗？</span
            >
            <transition name="el-zoom-in-top">
                <div v-show="editNoteShow" class="transition-box">
                    <el-input
                        type="textarea"
                        v-model="operateForm.note"
                        placeholder="此处添加备注..."
                    ></el-input>
                </div>
            </transition>
            <div slot="footer" class="dialog-foot">
                <el-button
                    :disabled="submitting"
                    circle
                    icon="el-icon-edit"
                    @click="editNoteShow = !editNoteShow"
                ></el-button>
                <div>
                    <el-button :disabled="submitting" @click="cancel">取消</el-button>

                    <el-button
                        type="danger"
                        :disabled="submitting"
                        @click="confirm"
                        >确认</el-button
                    >
                </div>
            </div>
        </el-dialog>
        <el-dialog :title="'库存管理'" :visible.sync="stockShow" center="true">
            <div style="font-size: 1.2rem; margin: auto; text-align: center">
                {{ operateType === "stockin" ? "入库" : "出库" }}数量：
                <el-input-number
                    v-model="stockMount"
                    :min="1"
                    :step="this.factor + 1 + this.factor * 2"
                    controls-position="right"
                ></el-input-number>
                <transition name="el-zoom-in-top">
                    <div v-show="editNoteShow" class="transition-box">
                        <el-input
                            type="textarea"
                            v-model="operateForm.note"
                            placeholder="此处添加备注..."
                        ></el-input>
                    </div>
                </transition>
            </div>
            <div slot="footer" class="dialog-foot">
                <el-button
                    :disabled="submitting"
                    circle
                    icon="el-icon-edit"
                    @click="editNoteShow = !editNoteShow"
                ></el-button>
                <div>
                    <el-button :disabled="submitting" @click="cancel">取消</el-button>
                    <el-button
                        type="primary"
                        :disabled="submitting"
                        @click="confirm"
                        >确认</el-button
                    >
                </div>
            </div>
        </el-dialog>
        <el-dialog
            :title="operateType === 'add' ? '新增项目' : '更改项目'"
            :visible.sync="isShow"
            center="true"
        >
            <common-form
                :formLabel="operateFormLabel"
                :form="operateForm"
                :inline="true"
                ref="form"
            ></common-form>
            <transition name="el-zoom-in-top">
                <div v-show="editNoteShow" class="transition-box">
                    <el-input
                        type="textarea"
                        v-model="operateForm.note"
                        placeholder="此处添加备注..."
                    ></el-input>
                </div>
            </transition>
            <div slot="footer" class="dialog-foot">
                <el-button
                    :disabled="submitting"
                    circle
                    icon="el-icon-edit"
                    @click="editNoteShow = !editNoteShow"
                ></el-button>
                <div>
                    <el-button :disabled="submitting" @click="cancel">取消</el-button>

                    <el-button
                        type="primary"
                        :disabled="submitting"
                        @click="confirm"
                        >确认</el-button
                    >
                </div>
            </div>
        </el-dialog>
        <el-dialog :title="'分组命名'" :visible.sync="groupShow" center="true">
            <common-form
                :formLabel="editGroupFormLabel"
                :form="groupForm"
                :inline="true"
                ref="form"
            ></common-form>
            <div slot="footer" class="dialog-foot">
                <div><div>
                <div>
                    <el-button :disabled="submitting" @click="cancel">取消</el-button>
                    <el-button
                        type="primary"
                        :disabled="submitting"
                        @click="confirm"
                        >确认</el-button
                    >
                </div>
            </div>
        </el-dialog>
        <div class="manager-header">
            <div>
                <el-button
                    :disabled="submitting"
                    type="success"
                    size="medium"
                    style="margin-bottom: 1rrem"
                    icon="el-icon-plus"
                    @click="addItemDialog"
                    >新增项目</el-button
                >
                <el-button
                    :disabled="submitting"
                    type="primary"
                    size="medium"
                    style="margin-bottom: 20px"
                    icon="el-icon-paperclip"
                    @click="groupEditDialog"
                    >分组命名</el-button
                >
            </div>
            <common-form
                :formLabel="formLabel"
                :form="searchForm"
                :inline="true"
                ref="form"
                ><el-button type="primary" @click="getList">搜索</el-button>
            </common-form>
        </div>
        <div class="hidden-xs-only">       
             <common-table
            v-loading="submitting"
            :tableData="tableData.filter( value => {
                return filterRegx.test(value.name);
            })"
            :tableLabel="tableLabel"
            :config="config"
            @changePage="getList()"
            @edit="editItemDialog"
            @delete="deleteDialog"
            @stockin="stockinDialog"
            @stockout="stockoutDialog"
        >
            </common-table>
        </div>
        <div class="hidden-sm-and-up">       
             <xs-table
            v-loading="submitting"
            :tableData="tableData.filter( value => {
                return filterRegx.test(value.name);
            })"
            :tableLabel="tableLabel"
            :config="config"
            @changePage="getList()"
            @edit="editItemDialog"
            @delete="deleteDialog"
            @stockin="stockinDialog"
            @stockout="stockoutDialog"
        >
            </xs-table>
        </div>
    </div>
</template>

<style lang="less" scoped>
@media (min-width: 768px) {
    .manager {
        .manager-header {
            display: flex;
            justify-content: space-between;
        }
    }
    .el-textarea {
        margin-top: 1.2em;
    }
    .dialog-foot {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .el-button {
            margin-left: 0.75em;
        }
    }
}
@media (max-width: 767px) {
    .manager {
        .manager-header {
            text-align: center;
        }
    }
    .el-textarea {
        margin-top: 1.2em;
    }
    .dialog-foot {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .el-button {
            margin-left: 0.75em;
        }
    }
}
</style>

<script>
import CommonForm from "../../src/components/CommonForm.vue";
import CommonTable from "../../src/components/CommonTable.vue";
import XsTable from "../../src/components/xsTable.vue";
import {
    getData,
    getGroupList,
    submitGroupList,
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
        XsTable,
    },
    data() {
        return {
            operateType: "add",
            operateRow: [],
            stockMount: 1,
            isShow: false,
            confirmDeleteShow: false,
            stockShow: false,
            groupShow: false,
            editNoteShow: false,
            editGroupFormLabel: [
                {
                    model: "group1",
                    label: "组一",
                    type: "input",
                },
                {
                    model: "group2",
                    label: "组二",
                    type: "input",
                },
                {
                    model: "group3",
                    label: "组三",
                    type: "input",
                },
                {
                    model: "group4",
                    label: "组四",
                    type: "input",
                },
            ],
            operateForm: {
                name: "",
                number: "",
                pcs: "",
                group: "",
                note: "",
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
                    prop: "name",
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
            groupForm: {
                group1: "X",
                group2: "Y",
                group3: "Z",
                group4: "U",
            },
            tableData: [{ name: "物品1", number: 50, pcs: "个", group: "组1" }],
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
                this.edit(this.operateRow);
            } else if (this.operateType === "delete") {
                this.remove(this.operateRow);
            } else if (this.operateType === "stockin") {
                this.stockin(this.operateRow, this.stockMountInt);
            } else if (this.operateType === "stockout") {
                this.stockout(this.operateRow, this.stockMountInt);
            } else if (this.operateType === "groupEdit") {
                this.editGroupList();
            }
            this.$store.commit("submit");
            this.isShow = false;
            this.groupShow = false;
            this.stockShow = false;
            this.confirmDeleteShow = false;
            this.editNoteShow = false;
        },
        cancel() {
            this.editNoteShow = false;
            this.stockShow = false;
            this.isShow = false;
            this.groupShow = false;
            this.confirmDeleteShow = false;
        },
        addItemDialog() {
            this.operateForm.note = "";
            this.isShow = true;
            this.operateType = "add";
        },
        groupEditDialog() {
            this.groupShow = true;
            this.operateType = "groupEdit";
        },
        stockinDialog(row) {
            this.operateForm.note = "";
            this.operateRow = row;
            this.operateType = "stockin";
            this.stockShow = true;
        },
        stockoutDialog(row) {
            this.operateForm.note = "";
            this.operateRow = row;
            this.operateType = "stockout";
            this.stockShow = true;
        },
        editItemDialog(row) {
            this.operateForm.note = "";
            this.operateRow = row;
            this.operateForm = {
                name: this.operateRow.name,
                number: this.operateRow.number,
                pcs: this.operateRow.pcs,
                group: this.operateRow.group,
                note: this.operateForm.note,
            };
            this.isShow = true;
            this.operateType = "edit";
        },
        deleteDialog(row) {
            this.operateForm.note = "";
            this.operateRow = row;
            this.confirmDeleteShow = true;
            this.operateType = "delete";
        },
        create() {
            createItem(this.operateForm)
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 20000) {
                        this.$message.success("添加成功！");
                        this.tableData = data.tableData;
                    } else if (code === 20001) {
                        this.$message.warning("项目已存在!");
                    } else {
                        this.$message.error("添加失败！");
                    }
                    this.$store.commit("finish");
                })
                .catch((err) => {
                    this.$store.commit("finish");
                    this.$message.error("添加失败！");
                    console.log(err, "错误");
                });
        },
        edit(row) {
            this.operateForm.oldName = row.name;
            updateItem(this.operateForm)
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 20000) {
                        this.$message.success("修改成功！");
                        this.tableData = data.tableData;
                    } else if (code === 20001) {
                        this.$message.warning("项目不存在!");
                    } else {
                        this.$message.error("修改失败！");
                    }
                    this.$store.commit("finish");
                })
                .catch((err) => {
                    this.$store.commit("finish");
                    this.$message.error("修改失败！");
                    console.log(err, "错误");
                });
        },
        remove(row) {
            const note = this.operateForm.note;
            deleteItem({ name: row.name, note })
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 20000) {
                        this.$message.success("删除成功！");
                        this.tableData = data.tableData;
                    } else if (code === 20001) {
                        this.$message.warning("项目不存在!");
                    } else {
                        this.$message.error("删除失败！");
                    }
                    this.$store.commit("finish");
                })
                .catch((err) => {
                    this.$store.commit("finish");
                    this.$message.error("删除失败！");
                    console.log(err, "错误");
                });
        },
        stockin(row, _mount = 1) {
            const note = this.operateForm.note;
            stockInItem({
                name: row.name,
                mount: _mount,
                note: note,
            })
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 20000) {
                        this.$message.success("入库成功！");
                        this.tableData = data.tableData;
                    } else if (code === 20001) {
                        this.$message.warning("项目不存在! ");
                        this.tableData = data.tableData;
                    } else {
                        this.$message.error("入库失败！");
                    }
                    this.$store.commit("finish");
                })
                .catch((err) => {
                    this.$store.commit("finish");
                    this.$message.error("入库失败！");
                    console.log(err, "错误");
                });
        },
        stockout(row, _mount = 1) {
            const note = this.operateForm.note;
            stockOutItem({
                name: row.name,
                mount: _mount,
                note: note,
            })
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 20000) {
                        this.$message.success("出库成功！");
                        this.tableData = data.tableData;
                    } else if (code === 20001) {
                        this.$message.warning("项目不存在 ");
                    } else if (code === 20002) {
                        this.$message.warning("库存不足!");
                    } else {
                        this.$message.error("出库失败！");
                    }
                    this.$store.commit("finish");
                })
                .catch((err) => {
                    this.$store.commit("finish");
                    this.$message.error("出库失败！");
                    console.log(err, "错误");
                });
        },
        editGroupList() {
            submitGroupList(this.groupForm)
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 20000) {
                        this.groupForm = data;
                        this.$message.success("分组命名修改成功!");
                        getData().then((res) => {
                            const { data, code } = res.data;
                            if (code === 20000) this.tableData = data.tableData;
                        });
                    } else {
                        this.$message.warning("分组命名修改失败!");
                    }
                    this.$store.commit("finish");
                })
                .catch((err) => {
                    this.$store.commit("finish");
                    this.$message.warning("分组命名修改失败!");
                });
        },
    },
    mounted() {
        getData().then((res) => {
            const { data, code } = res.data;
            if (code === 20000) this.tableData = data.tableData;
        });
        getGroupList().then((res) => {
            const { data, code } = res.data;
            if (code === 20000) this.groupForm = data.groupData;
        });
    },
    computed: {
        factor() {
            return Math.ceil(this.stockMount / 50) - 1;
        },
        stockMountInt() {
            if (typeof this.stockMount !== "number") {
                return 0;
            }
            return Math.floor(this.stockMount);
        },
        groupLabel() {
            return this.$store.state.groups.groupsInfo;
        },
        operateFormLabel() {
            return [
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
                        {
                            label: this.groupLabel[0].group,
                            value: this.groupLabel[0].group,
                        },
                        {
                            label: this.groupLabel[1].group,
                            value: this.groupLabel[1].group,
                        },
                        {
                            label: this.groupLabel[2].group,
                            value: this.groupLabel[2].group,
                        },
                        {
                            label: this.groupLabel[3].group,
                            value: this.groupLabel[3].group,
                        },
                    ],
                },
            ];
        },
        submitting() {
            return this.$store.state.form.submitting;
        },
        filterRegx() {
            return new RegExp(
                `${
                    this.searchForm.keyword === ""
                        ? "."
                        : this.searchForm.keyword
                }`,
                "gi"
            );
        },
    },
};
</script>