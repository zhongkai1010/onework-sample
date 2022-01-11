export default [
    {
        path: '/',
        component: import('../views/Layout.vue'),
        children: [
            {
                path: 'user',
                component: import('../views/Index/User.vue'),
            },
            {
                path: 'role',
                component: import('../views/Index/Role.vue'),
            }
        ]
    },
    {
        path: '/login',
        component: import('../views/Login.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: import('../views/NotFound.vue'),
    },
]