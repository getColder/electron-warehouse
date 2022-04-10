import axios from 'axios'
import config from '../config'

//axios简单的二次封装
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest
{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    getInsideConfig(){
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config;
    }

    interceptors(instance){
        instance.interceptors.request.use(config => {
            //请求时操作
            return config;
        },err => {
            //请求错误
            return Promise.reject(err);
        })

        instance.interceptors.response.use(response => {
            //响应时拦截操作
            return response;
        },
        err => {
            //响应错误 ，例如404
            return Promise.reject(err);
        })
    }

    //请求接口
    request(options) {
        const instance = axios.create();
        console.log(this.getInsideConfig());
        options = {...this.getInsideConfig(), ...options};
        console.log(options);
        this.interceptors(instance);
        return instance(options);
    }
}

export default new HttpRequest(baseUrl);


