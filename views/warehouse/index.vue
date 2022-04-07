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
                @click="addItem"
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
            @edit="editItem()"
            @delete="deleteItem()"
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
import { Model } from "echarts";
import CommonForm from "../../src/components/CommonForm.vue";
import CommonTable from "../../src/components/CommonTable.vue";

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
                this.$http.post("/warehouse/add", this.operateForm, (res) => {
                    console.log(res);
                    this.isShow = false;
                });
            } else if (this.operateType === "edit") {
                this.$http.post("/warehouse/edit", this.operateForm, (res) => {
                    console.log(res);
                    this.isShow = false;
                });
            }
        },
        addItem() {
            this.isShow = true;
            this.operateType = "add";
        },
        getList() {},
    },
};
</script>