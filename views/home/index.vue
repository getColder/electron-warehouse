<template>
    <div>
        <el-row class="home" :gutter="20">
            <el-col :span="5">
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
            <el-col :span="17">
                <div class="search-bar">
                    <el-input style="width: 92%" size="mini"></el-input>
                    <el-button type="primary" size="mini">搜索</el-button>
                </div>
                <el-card class="data-card">
                    <el-table :data="tableData" max-height="330px">
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
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="item-group-graph" ref="itemGroupChart"></div>
                </el-card>
            </el-col>
            <el-col :span="7">
                <el-card shadow="hover">
                    <div
                        class="item-group-d-graph"
                        ref="itemDistributionChart"
                    ></div>
                </el-card>
            </el-col>
            <el-col :span="7">
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
        padding: 0 0px;
    }
    .data-card {
        margin-top: 12px;
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
import { getData, getGroup } from "../../api/data.js";
import * as echarts from "echarts";

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
            itemGroupData: [
                {
                    group: this.$store.state.groups.groupsInfo[0].label,
                    number: this.$store.state.groups.groupsInfo[0].number,
                    color: "#409eff",
                },
                {
                    group: this.$store.state.groups.groupsInfo[1].label,
                    number: this.$store.state.groups.groupsInfo[1].number,

                    color: "#67c23a",
                },
                {
                    group: this.$store.state.groups.groupsInfo[2].label,
                    number: this.$store.state.groups.groupsInfo[2].number,

                    color: "#f5c070",
                },
                {
                    group: this.$store.state.groups.groupsInfo[3].label,
                    number: this.$store.state.groups.groupsInfo[3].number,

                    color: "#f52040",
                },
            ],
            itemStockData: [
                {
                    date: "2022/4/1",
                    in: "40",
                    out: "0",
                },
                {
                    date: "2022/4/2",
                    in: "30",
                    out: "10",
                },
                {
                    date: "2022/4/3",
                    in: "30",
                    out: "50",
                },
                {
                    date: "2022/4/4",
                    in: "10",
                    out: "10",
                },
                {
                    date: "2022/4/5",
                    in: "0",
                    out: "20",
                },
            ],
        };
    },
    mounted() {
        getGroup().then((res) => {
            const { code, data } = res.data;
            if (code === 20000) {
                //展示全数据-表格
                console.log(data.info);
            }
        });
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
        let itemGroupData = this.itemGroupData;
        //展示分组-柱状图
        const itemGroupOption = {
            grid: {
                left: "10%",
            },
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: "category",
                data: itemGroupData.map((item) => item.group),
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
                            value: item.number,
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
        const G = echarts.init(this.$refs.itemGroupChart);
        G.setOption(itemGroupOption);
        //展示分布-饼状图
        const itemDistributionOption = {
            tooltip: {
                trigger: "item",
            },
            color: this.itemGroupData.map((item) => item.color),
            series: [
                {
                    data: this.itemGroupData.map((item) => {
                        return {
                            name: item.group,
                            value: item.number,
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
        const D = echarts.init(this.$refs.itemDistributionChart);
        D.setOption(itemDistributionOption);
        const itemStockOption = {
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: "category",
                data: this.itemStockData.date,
                axisLine: {
                    lineStyle: {
                        color: "#ff2510",
                    },
                },
                axisLabel: {
                    interval: 0,
                    color: "#333",
                },
            },
            yAxis: {},
            series: [
                {
                    name: "入库",
                    data: this.itemStockData.in,
                    type: "line",
                },
                {
                    name: "出库",
                    data: this.itemStockData.out,
                    type: "line",
                },
            ],
        };
        //展示出入库-折线图
        const S = echarts.init(this.$refs.itemStockChart);
        S.setOption(itemStockOption);
    },
};
</script>