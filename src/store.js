import { createStore } from 'vuex';
import userStore from './modules/userstore';
import productStore from './modules/productstore';
import testStore from './modules/testStore';

export default createStore({
    modules: {
        user: userStore,
        product: productStore,
        jokes:testStore
    }
});
