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
      <el-button type="primary" @click="addItem">新增项目</el-button>
      <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
        ><el-button type="primary" @click="getList"
          >搜索</el-button
        ></common-form
      >
    </div>
  </div>
</template>

<script>
import { Model } from "echarts";
import CommonForm from "../../src/components/CommonForm.vue";

export default {
  name: "warehouse",
  components: {
    CommonForm,
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