import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import GraphPage from './views/GraphPage.vue'
import HelloWorld from './components/HelloWorld.vue'


const routes = [
    { path: '/', component: HelloWorld },
    { path: '/graph', component: GraphPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app')