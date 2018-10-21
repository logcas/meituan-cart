import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

import Cart from '../views/cart.vue';
import Gooditem from '../components/Gooditem.vue';

const routes = [
    {
        name: 'Index',
        path: '/',
        component: Cart
    },
    {
        name: 'Item',
        path: '/item',
        component: Gooditem
    }
];

const router = new Router({
    routes
});

export default router;