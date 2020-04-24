var Mock = require('mockjs')

Mock.mock('admin', 'post', {
    data: {
        id: 1,
        username: 'admin',
        nickName: '管理员',
        headImgUrl: null,
        token: '124656789abcdeftghijklmn',
        //通过hidden来控制页面是否显示
        menuList: [{
                path: "/layout/1",
                hidden: false,
                component: "public-page",
                meta: {
                    id: "1",
                    icon: "el-icon-menu",
                    title: "一级菜单"
                }
            },
            {
                path: "/layout/2",
                hidden: false,
                component: "public-box",
                meta: {
                    id: "2",
                    icon: "el-icon-menu",
                    title: "二级菜单"
                },
                children: [{
                        path: "2-1",
                        hidden: false,
                        component: "public-page",
                        meta: {
                            id: "2-1",
                            icon: "el-icon-menu",
                            title: "菜单一"
                        }
                    },
                    {
                        path: "2-2",
                        hidden: false,
                        component: "public-page",
                        meta: {
                            id: "2-2",
                            icon: "el-icon-menu",
                            title: "菜单二"
                        }
                    }
                ]
            },
            {
                path: "/layout/3",
                hidden: false,
                component: "public-box",
                meta: {
                    id: "3",
                    icon: "el-icon-menu",
                    title: "三级菜单"
                },
                children: [{
                        path: "3-1",
                        hidden: false,
                        component: "public-page",
                        meta: {
                            id: "3-1",
                            icon: "el-icon-menu",
                            title: "菜单一"
                        },
                    },
                    {
                        path: "3-2",
                        hidden: false,
                        component: "public-page",
                        meta: {
                            id: "3-2",
                            icon: "el-icon-menu",
                            title: "菜单二"
                        }
                    }
                ]
            }
        ]
    }
})
Mock.mock('user', 'post', {
    data: {
        id: 2,
        username: 'user',
        nickName: '普通用户',
        headImgUrl: null,
        token: 'abcdeftghijklmn124656789',
        //通过hidden来控制页面是否显示
        menuList: [{
            path: "/layout/1",
            hidden: true,
            component: "public-page",
            meta: {
                id: "1",
                icon: "el-icon-menu",
                title: "一级菜单"
            }
        },
        {
            path: "/layout/2",
            hidden: false,
            component: "public-box",
            meta: {
                id: "2",
                icon: "el-icon-menu",
                title: "二级菜单"
            },
            children: [{
                    path: "2-1",
                    hidden: false,
                    component: "public-page",
                    meta: {
                        id: "2-1",
                        icon: "el-icon-menu",
                        title: "菜单一"
                    }
                },
                {
                    path: "2-2",
                    hidden: true,
                    component: "public-page",
                    meta: {
                        id: "2-2",
                        icon: "el-icon-menu",
                        title: "菜单二"
                    }
                }
            ]
        },
        {
            path: "/layout/3",
            hidden: false,
            component: "public-box",
            meta: {
                id: "3",
                icon: "el-icon-menu",
                title: "三级菜单"
            },
            children: [{
                    path: "3-1",
                    hidden: true,
                    component: "public-page",
                    meta: {
                        id: "3-1",
                        icon: "el-icon-menu",
                        title: "菜单一"
                    },
                },
                {
                    path: "3-2",
                    hidden: false,
                    component: "public-page",
                    meta: {
                        id: "3-2",
                        icon: "el-icon-menu",
                        title: "菜单二"
                    }
                }
            ]
        }
    ]
    }
})