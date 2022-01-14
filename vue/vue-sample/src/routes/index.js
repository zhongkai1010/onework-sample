export default [
    {
        path: '/',
        component: import('../views/layout.vue'),

        children: [
            {
                path: '',
                component: import('../views/main.vue'),
            },
            {
                path: 'user',
                component: import('../views/user/index.vue'),
            },
            {
                path: 'role',
                component: import('../views/role/index.vue'),
            },

        ]
    },
    {
        path: '/login',
        component: import('../views/login.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: import('../views/not-found.vue'),
    },
]