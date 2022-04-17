export default{
    state: {
        isCollapse: true,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null,
        menu: []
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state, val){
            if(val.name !== 'home'){
                state.currentMenu = val;
                const result = state.tabsList.findIndex(item => item.name === val.name);
                if( result === -1){
                    state.tabsList.push(val)
                }
            } else{
                state.currentMenu  = null;
            }
        },
        setMenu(state, val) {
            state.menu = val;
            localStorage.setItem('menu', JSON.stringify(val));
        },
        clearMenu(state) {
            state.menu = [];
            localStorage.removeItem('menu')
        },
        addMenu(state, router) {
            if(!localStorage.getItem('menu')) {
                return;
            }
            const menu = JSON.parse(localStorage.getItem('menu'));
            state.menu = menu;
            const menuArray = [];
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}.vue`);
                        return item;
                    })
                    menuArray.push(...item.children);
                }
                else {
                    item.component = () => import(`../views/${item.url}.vue`);
                    menuArray.push(item);
                }
            });
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item);
            })
        }
    }
}