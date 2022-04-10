import Mock from "mockjs"
import homeAPI from "./mockSeverData/home"
import warehouseAPI from "./mockSeverData/warehouse"
import permission from "./mockSeverData/permission"


Mock.mock('/home/getData', homeAPI.getStatisticalData);
Mock.mock(/\/warehouse\/add/, 'post', warehouseAPI.createItem);
Mock.mock(/\/warehouse\/edit/, 'post', warehouseAPI.updateItem);
