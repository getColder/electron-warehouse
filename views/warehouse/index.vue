<template>
  <div class="manager">
    <el-dialog title="警告" :visible.sync="confirmDeleteShow">
      <span style="font-size: 1.4rem"
        >项目删除后不可恢复! 你确认要删除吗？</span
      >
      <div slot="footer" class="dialog-foot">
        <el-button @click="confirmDeleteShow = false">取消</el-button>
        <el-button type="danger" @click="confirm">确认</el-button>
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
      </div>
      <div slot="footer" class="dialog-foot">
        <el-button @click="stockShow = false">取消</el-button>
        <el-button type="success" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
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
    <el-dialog :title="'分组命名'" :visible.sync="groupShow" center="true">
      <common-form
        :formLabel="editGroupFormLabel"
        :form="groupForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-foot">
        <el-button @click="groupShow = false">取消</el-button>
        <el-button type="success" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
    <div class="manager-header">
      <div>
        <el-button
          type="success"
          size="medium"
          style="margin-bottom: 20px"
          icon="el-icon-plus"
          @click="addItemDialog"
          >新增项目</el-button
        >
        <el-button
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
    <common-table
      :tableData="tableData"
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
</template>

<style lang="less" scoped>
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
      this.isShow = false;
      this.groupShow = false;
      this.stockShow = false;
      this.confirmDeleteShow = false;
    },
    addItemDialog() {
      this.isShow = true;
      this.operateType = "add";
    },
    groupEditDialog() {
      this.groupShow = true;
      this.operateType = "groupEdit";
    },
    stockinDialog(row) {
      this.operateRow = row;
      this.operateType = "stockin";
      this.stockShow = true;
    },
    stockoutDialog(row) {
      this.operateRow = row;
      this.operateType = "stockout";
      this.stockShow = true;
    },
    editItemDialog(row) {
      this.operateRow = row;
      this.operateForm = {
        name: this.operateRow.name,
        number: this.operateRow.number,
        pcs: this.operateRow.pcs,
        group: this.operateRow.group,
      };
      this.isShow = true;
      this.operateType = "edit";
    },
    deleteDialog(row) {
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
        })
        .catch((err) => {
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
        })
        .catch((err) => {
          this.$message.error("修改失败！");
          console.log(err, "错误");
        });
    },
    remove(row) {
      deleteItem({ name: row.name })
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
        })
        .catch((err) => {
          this.$message.error("删除失败！");
          console.log(err, "错误");
        });
    },
    stockin(row, _mount = 1) {
      stockInItem({ name: row.name, mount: _mount })
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
        })
        .catch((err) => {
          this.$message.error("入库失败！");
          console.log(err, "错误");
        });
    },
    stockout(row, _mount = 1) {
      stockOutItem({ name: row.name, mount: _mount })
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
        })
        .catch((err) => {
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
        })
        .catch((err) => {
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
  },
};
</script>