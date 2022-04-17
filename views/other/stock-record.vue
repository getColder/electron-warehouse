<template>
  <div>
    <el-card>
      <el-table
        :data="tableData"
        max-height="vh0.7"
        title="出入库记录"
        stripe="true"
      >
        <el-table-column
          v-for="(val, key) in tableLabel"
          :key="key"
          :prop="key"
          :label="val"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getStockListByDate } from "../../api/data";
export default {
  name: "pageOne",
  data() {
    return {
      tableLabel: {
        name: "存货名称",
        time: "日期",
        operate: "操作",
        number: "数量",
        remain: "剩余",
        pcs: "单位",
        group: "所属组",
      },
      tableData: [],
    };
  },
  mounted() {
    getStockListByDate()
      .then((res) => {
        const { code, data } = res.data;
        if (code === 20000) {
          //展示全数据-表格
          data.tableData.forEach((element) => {
            element.operate = element.operate === "stockin" ? "入库" : "出库";
            element.time = new Date(element.time).toLocaleString();
          });
          this.tableData = data.tableData;
        }
      })
      .catch((err) => {
        console.log(err, "错误");
      });
  },
};
</script>