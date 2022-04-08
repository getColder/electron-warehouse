export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body);
        if (username === 'admin' && '123456' === password) {
            return {
                code: 20000,
                token: 123,
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
                                path: "/page1",
                                name: "page1",
                                label: "页面1",
                                icon: "setting",
                                url: "other/pageOne",
                            },
                            {
                                path: "/page2",
                                name: "page2",
                                label: "页面2",
                                icon: "setting",
                                url: "other/pageTwo",
                            },
                        ],
                    },
                ],
            }
        }
        if (username === 'user' && '12345' === password) {
            return {
                code: 20000,
                token: 125553,
                menu: [
                    {
                        path: "/home",
                        name: "home",
                        label: "首页",
                        icon: "s-home",
                        url: "home/index",
                    }
                ],
            }
        }
    }
}