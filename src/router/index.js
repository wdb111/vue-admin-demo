import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/login"
import Layout from "@/views/layout"
import Home from "@/views/home-page"
import NotFind from "@/views/not-find"
import UserJurisdiction from "@/views/userJurisdiction"
// import PublicBox from "@/views/public-box"
// import Public from "@/views/public-page"
const _import = require('./' + process.env.NODE_ENV)

Vue.use(Router)
var getRouter //用来获取后台拿到的路由

// 固定路由
const fixedRouters = [{
        path: '/',
        redirect: '/login', //重定向
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/layout",
        name: "Layout",
        component: Layout,
        children: [{
                path: "/home",
                name: "Home",
                component: Home,
                meta: {
                    title: "首页"
                }
            },
            {
                path: "/userJurisdiction",
                name: 'UserJurisdiction',
                component: UserJurisdiction,
                meta: {
                    title: "用户权限"
                }
            }
        ]
    }
]

// 权限路由
// let getroute = [{
//         path: "/layout/1",
//         hidden: false,
//         component: "public-page",
//         meta: {
//             id: "1",
//             icon: "el-icon-menu",
//             title: "一级菜单"
//         }
//     },
//     {
//         path: "/layout/2",
//         hidden: false,
//         component: "public-box",
//         meta: {
//             id: "2",
//             icon: "el-icon-menu",
//             title: "二级菜单"
//         },
//         children: [{
//                 path: "2-1",
//                 hidden: false,
//                 component: "public-page",
//                 meta: {
//                     id: "2-1",
//                     icon: "el-icon-menu",
//                     title: "菜单一"
//                 }
//             },
//             {
//                 path: "2-2",
//                 hidden: false,
//                 component: "public-page",
//                 meta: {
//                     id: "2-2",
//                     icon: "el-icon-menu",
//                     title: "菜单二"
//                 }
//             }
//         ]
//     },
//     {
//         path: "/layout/3",
//         hidden: false,
//         component: "public-box",
//         meta: {
//             id: "3",
//             icon: "el-icon-menu",
//             title: "三级菜单"
//         },
//         children: [{
//                 path: "3-1",
//                 hidden: false,
//                 component: "public-page",
//                 meta: {
//                     id: "3-1",
//                     icon: "el-icon-menu",
//                     title: "菜单一"
//                 },
//             },
//             {
//                 path: "3-2",
//                 hidden: false,
//                 component: "public-page",
//                 meta: {
//                     id: "3-2",
//                     icon: "el-icon-menu",
//                     title: "菜单二"
//                 }
//             }
//         ]
//     }
// ]

const router = new Router({
    routes: fixedRouters
})
router.beforeEach((to, from, next) => {
    // 判断是否登录
    let token = localStorage.getItem("token");
    if (to.path === "/login") {
        next()
    } else if (token) {
        // 后台获取的路由
        let getroute = JSON.parse(localStorage.getItem("menuList"))
        const routerList = getroute || [];
        console.log(getRouter)
        if (!getRouter) { //不加这个判断，路由会陷入死循环
            getRouter = routerList;
            routerGo(to, next) //执行路由跳转方法
        } else {
            next()
        }
    } else {
        next('/login')
    }




})

//添加路由
function routerGo(to, next) {
    getRouter = filterAsyncRouter(getRouter); //过滤路由（组装路由）
    fixedRouters[2].children.push(...getRouter)
    fixedRouters.push({
        path: "*",
        name: "NotFind",
        component: NotFind
    })
    console.log(fixedRouters)
    router.addRoutes(fixedRouters); //动态添加路由
    // global.antRouter = getRouter //(其实前面已经将路由存进sessionStorage了，
    //这里也可以用vuex来处理)
    //将路由数据传递给全局变量，
    //做侧边栏菜单渲染工作
    //修改方法，以确保addRoutes是完整的
    //设置replace: true，这样导航就不会留下历史记录
    next({
        ...to,
        replace: true
    })
}
//将数据中的component换成文件路径
function filterAsyncRouter(asyncRouterMap) {
    const accessedRouters = asyncRouterMap.filter(route => {
        route.component = _import(route.component)
        if (route.children && route.children.length) { //递归
            route.children = filterAsyncRouter(route.children)
        }
        return true; //filter要有返回值
    })
    return accessedRouters;

}
export default router;