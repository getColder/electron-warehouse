import Mock from "mockjs"

//图表数据
let List = []
export default {
    getStatisticalData: () => {
        //Mock.Random.float 产生随机数 ： 100~8000 保留小数 最小位0 最大位0
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    魅族: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0)
                })
            )
        }
        return {
            code: 20000,
            data: {
                //图表
                tableData: [
                    {
                        name: "调压箱RX. DN50 X 80",
                        pcs: "台",
                        number: 3,
                        group: "材料"
                    },
                    {
                        name: "双放射PE球阀De110",
                        pcs: "个",
                        number: 1,
                        group: "材料"
                    },
                    {
                        name: "PE燃气管材De90",
                        pcs: "米",
                        number: 100,
                        group: "材料"
                    },
                    {
                        name: "DN80管",
                        pcs: "米",
                        number: 3,
                        group: "材料"
                    },
                    {
                        name: "热熔弯头De110",
                        pcs: "个",
                        number: 5,
                        group: "材料"
                    },
                    {
                        name: "热熔等径三角 De110",
                        pcs: "个",
                        number: 5,
                        group: "材料"
                    },
                    {
                        name: "热熔等径四角 De110",
                        pcs: "个",
                        number: 15,
                        group: "材料"
                    }
                ],
                itemGroupData: [
                    { group: '材料', number: 35, color: '#7f6542' },
                    { group: '组件', number: 15, color: '#e61320' },
                    { group: '成品', number: 70, color: '#e69f00' },
                    { group: '其他', number: 45, color: '#2050f0' },
                ],
                itemStockData:{
                    date:  ["2022/03/25"].concat(Array(4).fill("")).concat(["2022/04/05"]),
                    in: [10,70,60,20,90,90],
                    out: [90,70,90,80,30,60]
                }
            }
        }
    }
}