<template>
    <div>
        <el-card>
            <el-table
                :data="tableData"
                max-height="vh0.7"
                title="出入库记录"
                stripe="true"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <div class="notePanel">{{ props.row.note }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="日期">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        {{ scope.row.time}}
                    </template>
                </el-table-column>
                <el-table-column
                    v-for="(val, key) in stockInfo"
                    :key="key"
                    :prop="key"
                    :label="val"
                    :width="key"
                >
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<style scoped>
.notePanel {
    border-left: 1.7em solid #999;
    padding: 0 4em 1.5em 4em;
    white-space: pre-line;
    font-size: 1.1em;
    color: #666;
}
.notePanel::first-line {
    font-size: 1.3em;
    font-weight: bold;
    color: black;
    line-height: 2.5em;
}
</style>

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
                    const operateMap = new Map()
                        .set("stockin", "入库")
                        .set("stockout", "出库")
                        .set("stockNew", "新增")
                        .set("stockUpdate", "编辑")
                        .set("stockDelete", "删除");
                    data.tableData.forEach((element) => {
                        element.operate = operateMap.get(element.operate);
                        element.time = new Date(element.time).toLocaleString();
                    });
                    this.tableData = data.tableData.reverse();
                }
            })
            .catch((err) => {
                console.log(err, "错误");
            });
    },
    computed: {
        stockInfo(){
            var obj = {};
            Object.assign(obj, this.tableLabel);
            delete obj.time;
            return obj;
        }
    }
};
</script>