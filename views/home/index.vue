<template slot-scope>
    <div>
        <el-row :gutter="20">
            <el-col :span="5" class="home hidden-xs-only">
                <el-card class="user-card" shadow="hover">
                    <div class="user" slot="header">
                        <img width="125px" height="125px" :src="userImg" />
                        <div class="user-info">
                            <h1 class="name">Admin</h1>
                            <p class="access">超级管理员</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登录时间: <span>2022-4-1</span></p>
                        <p>上次登录地点: <span>贵阳</span></p>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="22" :span="19">
                <div class="search-bar">
                    <el-input
                        v-model="filterStr"
                        style="margin-left: 1rem; width: 50vw"
                    ></el-input>
                    <el-button
                        type="primary"
                        style="margin: 0 1rem"
                        size="mini"
                    >
                        搜索</el-button
                    >
                </div>
                <el-card class="data-card">
                    <el-table
                        :data="
                            tableData.filter((value) => {
                                return filterRegx.test(value.name);
                            })
                        "
                        max-height="70%"
                    >
                        <el-table-column
                            v-for="(val, key) in tableLabel"
                            :key="key"
                            :prop="key"
                            :label="val"
                        ></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="info" :gutter="0">
            <el-col :xs="24" :span="7">
                <el-card shadow="hover">
                    <div class="item-group-graph" ref="itemGroupChart"></div>
                </el-card>
            </el-col>
            <el-col :xs="24" :span="7">
                <el-card shadow="hover">
                    <div
                        class="item-group-d-graph"
                        ref="itemDistributionChart"
                    ></div>
                </el-card>
            </el-col>
            <el-col :xs="24" :span="9">
                <el-card shadow="hover">
                    <div class="item-stock-graph" ref="itemStockChart"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="less" scopaaed>
.home {
    .user-card {
        text-align: center;
        .user {
            img {
                border-radius: 15%;
                vertical-align: middle;
            }
            .user-info {
                font-size: 20px;
                vertical-align: middle;
            }
        }
        .login-info {
            text-align: left;
            margin-left: 15%;
            color: #959595;
        }
    }
    .search-bar {
        display: flex;
        justify-content: space-between;
        padding: 0 0;
    }
    .data-card {
        margin-top: 1rem;
    }
}
.info {
    .item-group-graph,
    .item-group-d-graph,
    .item-stock-graph {
        height: 270px;
    }
}
</style>


<script>
import { getData, getGroup, getStockListByLatest } from "../../api/data.js";
import * as echarts from "echarts";
import { generatorDay } from "../../src/utils/dateManage";

export default {
    name: "home",
    data() {
        return {
            userImg: require("../../src/assets/avatar.jpeg"),
            tableData: [],
            tableLabel: {
                name: "存货名称",
                number: "数量",
                pcs: "单位",
                group: "分组",
            },
            today: new Date(),
            filterStr: "",
        };
    },
    mounted() {
        getData()
            .then((res) => {
                const { code, data } = res.data;
                if (code === 20000) {
                    //展示全数据-表格
                    this.tableData = data.tableData;
                }
            })
            .catch((err) => {
                console.log(err, "错误");
            });
        getGroup().then((res) => {
            const { code, data } = res.data;
            if (code === 20000) {
                this.$store.commit("getGroup", data.info);
                //展示分组-柱状图
                const itemGroupOption = {
                    title: {
                        text: "物品统计",
                        x: "center",
                        y: "93%",
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "bold",
                        },
                    },
                    grid: {
                        left: "10%",
                    },
                    tooltip: {
                        trigger: "axis",
                    },
                    xAxis: {
                        type: "category",
                        data: this.itemGroupData.map((item) => item.group),
                        axisLine: {
                            lineStyle: {
                                color: "#67c23a",
                            },
                        },
                        axisLabel: {
                            interval: 0,
                            color: "#409eff",
                        },
                    },
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                    color: "#67c23a",
                                },
                            },
                            axisLabel: {
                                interval: 0,
                                color: "#409eff",
                            },
                        },
                    ],
                    color: ["#2ec7c9"],
                    series: [
                        {
                            name: "分组数量",
                            data: this.itemGroupData.map((item) => {
                                return {
                                    value: item.number.amount,
                                    itemStyle: {
                                        color: item.color,
                                    },
                                };
                            }),
                            type: "bar",
                            itemStyle: {
                                shadowColor: "#999",
                                opacity: 0.6,
                                borderWidth: 3,
                                borderType: "solid",
                                borderRadius: 3,
                                shadowBlur: 3,
                            },
                        },
                    ],
                };
                //展示分布-饼状图
                const itemDistributionOption = {
                    title: {
                        text: "分组统计",
                        x: "center",
                        y: "93%",
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "bold",
                        },
                    },
                    tooltip: {
                        trigger: "item",
                    },
                    color: this.itemGroupData.map((item) => item.color),
                    series: [
                        {
                            data: this.itemGroupData.map((item) => {
                                return {
                                    name: item.group,
                                    value: item.number.total,
                                };
                            }),
                            type: "pie",
                            itemStyle: {
                                shadowColor: "#999",
                                opacity: 0.6,
                                borderWidth: 3,
                                borderType: "solid",
                                barBorderRadius: 3,
                                shadowBlur: 3,
                            },
                        },
                    ],
                };
                const G = echarts.init(this.$refs.itemGroupChart);
                G.setOption(itemGroupOption);
                const D = echarts.init(this.$refs.itemDistributionChart);
                D.setOption(itemDistributionOption);
            }
        });
        //展示出入库-折线图
        getStockListByLatest().then((res) => {
            const { code, data } = res.data;
            if (code === 20000) {
                this.$store.commit("getStock7", data);
                const itemStockOption = {
                    title: {
                        text: "出入库统计",
                        x: "center",
                        y: "93%",
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "bold",
                        },
                    },
                    tooltip: {
                        trigger: "axis",
                    },
                    legend: {
                        orient: "vertical",
                        x: "right",
                        y: "top",
                        data: ["出库", "入库"],
                    },
                    xAxis: {
                        type: "category",
                        data: this.day7Latest,
                        axisLabel: {
                            showMinLabel: true,
                            showMaxLabel: true,
                            interval: 6,
                            color: "#222",
                        },
                    },
                    yAxis: {},
                    series: [
                        {
                            name: "入库",
                            data: this.itemStockData.in,
                            type: "line",
                            color: "#d34040",
                        },
                        {
                            name: "出库",
                            data: this.itemStockData.out,
                            type: "line",
                            color: "#40d340",
                        },
                    ],
                };
                const S = echarts.init(this.$refs.itemStockChart);
                S.setOption(itemStockOption);
            }
        });
    },
    computed: {
        itemGroupData() {
            return [
                {
                    group: this.groupsInfo[0].group,
                    number: this.groupsInfo[0].number,
                    color: "#409eff",
                },
                {
                    group: this.groupsInfo[1].group,
                    number: this.groupsInfo[1].number,
                    color: "#67c23a",
                },
                {
                    group: this.groupsInfo[2].group,
                    number: this.groupsInfo[2].number,
                    color: "#f5c070",
                },
                {
                    group: this.groupsInfo[3].group,
                    number: this.groupsInfo[3].number,
                    color: "#f52040",
                },
            ];
        },
        groupsInfo() {
            return this.$store.state.groups.groupsInfo;
        },
        sevenDayRange() {
            return this.generatorDay();
        },
        itemStockData() {
            return {
                date: ["1", "", "", "", "", "", ""],
                in: this.$store.state.stock.stockData7.in,
                out: this.$store.state.stock.stockData7.out,
            };
        },
        day7Latest() {
            return Array.from(generatorDay(this.today, 7));
        },
        filterRegx() {
            return new RegExp(
                `${this.filterStr === "" ? "." : this.filterStr}`,
                "gi"
            );
        },
    },
    methods: {},
};
</script>