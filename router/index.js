import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../views/Main.vue'),
        redirect: 'home',
        children: [ 
            {
                path: '/login',
                name: 'login',
                component: () =>import('../views/login')
            }
        ]
    }
]

const debugRoutes =  {
    menu: [
        {
            path: "/home",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "home/index",
        },
        {
            path: "/warehouse",
            name: "warehouse",
            label: "仓库",
            icon: "s-shop",
            url: "warehouse/index",
        },
        {
            path: "/user",
            name: "user",
            label: "用户管理",
            icon: "user",
            url: "user/index",
        },
        {
            label: "其他",
            icon: "location",
            children: [
                {
                    path: "/stock-record",
                    name: "stock-record1",
                    label: "出入库记录",
                    icon: "setting",
                    url: "other/stock-record",
                },
                {
                    path: "/other",
                    name: "other",
                    label: "其他",
                    icon: "setting",
                    url: "other/page",
                },
            ],
        },
    ],
}

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router