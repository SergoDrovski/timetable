import { createRouter, createWebHistory } from 'vue-router';
import TestLayout from '/src/shared/ui/layouts/TestLayout.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior: () => {
        return { top: 0 };
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('/src/pages/home/Home.vue')
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('/src/pages/test/Test.vue'),
            meta: {
                layout: TestLayout,
            }
        },
    ],
});

export default router;