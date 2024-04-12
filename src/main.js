import { createApp } from 'vue'

import App from './App.vue'
import router from './routes';


import '@fontsource-variable/nunito-sans';

import "@fontsource/nunito-sans/200.css";
import "@fontsource/nunito-sans/300.css";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/500.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/nunito-sans/700.css";
import "@fontsource/nunito-sans/800.css";

import './index.css'
import store from './store';
const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
