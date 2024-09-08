import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior: () => {
        return { top: 0 };
    },
    routes: [
        {
            path: '/:id',
            name: 'event-list',
            component: () => import('/src/pages/event-list/EventList.vue'),
        },
    ],
});

export default router;