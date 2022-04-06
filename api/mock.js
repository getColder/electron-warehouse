import Mock from "mockjs"
import homeAPI from "./mockSeverData/home"


Mock.mock('/home/getData', homeAPI.getStatisticalData);

