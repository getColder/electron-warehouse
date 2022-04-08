import Cookie from 'js-cookie'
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
            Cookie.set('menu', JSON.stringify(val));
        },
        clearMenu(state, val) {
            state.menu = [];
            Cookie.remove('menu');
        },
        addMenu(state, router) {
            if(!Cookie.get('menu')) {
                return;
            }
            const menu = JSON.parse(Cookie.get('menu'));
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
            console.log(menuArray);
            menuArray.forEach(item => {
                router.addRoute('Main', item);
            })
        }
    }
}