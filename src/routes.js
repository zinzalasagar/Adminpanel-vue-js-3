
import { createRouter, createWebHistory } from 'vue-router';
import SignUp from './components/SignUp.vue';
import Login from './components/Login.vue'
import DashHome from './components/DashHome.vue'
import ToDo from './components/TodoListCom.vue'
import LogoutModal from './components/LogoutModal.vue'
import UserTable from './components/UserTable .vue';
import ProductList from './components/ProductList.vue';
import AddProduct from './components/AddProduct.vue';
import PostList from './components/PostList.vue';
import PageNotFound from './components/PageNotFound.vue';
import UserCreation from './components/UserCreation.vue';
import UserAddressCom from './components/UserAddressCom.vue';
import UserCompanyCom from './components/UserCompanyCom.vue';
import UserBankCom from './components/UserBankCom.vue';
import UserDetails from './components/UserDetails.vue';
import ProductDetail from './components/ProductDetail.vue';


// Vue.use(VueRouter);

const routes = [
    {
        name: SignUp,
        path: '/SignUp',
        component: SignUp
    },
    {
        name: Login,
        path: '/Login',
        component: Login,
        meta: { requiresUnauth: true }
    },
    {
        name: DashHome,
        path: '/',
        component: DashHome,

        meta: {
            requiresAuth: true
          }
    },
    {
        name: ToDo,
        path: '/ToDo',
        component: ToDo
    },
    {
        name: LogoutModal,
        path: '/LogoutModal',
        component: LogoutModal
    },
    {
        name: UserTable,
        path: '/UserTable',
        component: UserTable,
        
    },
    {
        name: UserCreation,
        path: '/UserCreation',
        component: UserCreation,
    },
    {
        name: UserAddressCom,
        path: '/UserAddressCom',
        component: UserAddressCom
    },
    {
        name: UserCompanyCom,
        path: '/UserCompanyCom',
        component: UserCompanyCom
    },
    {
        name: UserBankCom,
        path: '/UserBankCom',
        component: UserBankCom
    },
   
    {
        name: UserDetails,
        path: '/UserDetails',
        component: UserDetails,
        props: true
    },
    {
        name: ProductList,
        path: '/ProductList',
        component: ProductList,
        
    },
    {
        name: AddProduct,
        path: '/AddProduct',
        component: AddProduct
    },
    {
        name: PostList,
        path: '/PostList',
        component: PostList
    },
    {
        name: ProductDetail,
        path: '/ProductDetail',
        component: ProductDetail,
        props:true
    },
    {
        name: PageNotFound,
        path: '/:pathMatch(.*)*',
        component: PageNotFound
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isLoggedIn) {
        next('/login') 
      } else {
        next() 
      }
    } else if (to.matched.some(record => record.meta.requiresUnauth)) {
      if (isLoggedIn) {
        next('/'); 
      } else {
        next(); 
      }
    } else {
      next();
    }
  })
export default router;  