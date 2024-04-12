<template>
<div class="flex flex-col bg-gray-200  " style="width: 240px;">
    <div class="bg-white pr-4 relative h-screen">
        <div class="flex items-center justify-center h-15 m-4" style="font-family: 'Nunito Sans';">
            <h5 class="text-blue-500 font-extrabold	 text-[20px] font-NunitoSans">Dash<span class="text-black font-bold">Stack</span></h5>
        </div>

        <div class="">
            <router-link to="/" :class="{'bg-blue-500 text-white': selectedButton === '/'}" @click="selectButton('/')" class="box flex items-center m-3 px-6 py-3 rounded-md font-semibold text-[14px] text-black hover:bg-blue-500 hover:text-white ">
                <img :class="{'invert': selectedButton === '/'}" src="../assets/Icon/watch.png" class="mr-2 font-custom" alt="watch">
                Dashboard
            </router-link>

            <router-link to="/UserTable" :class="{
              'bg-blue-500 text-white': ['/UserTable', '/UserCreation', '/UserAddressCom', '/UserDetails', '/UserCompanyCom', '/UserBankCom'].includes(selectedButton)
            }" @click="selectButton('/UserTable')" class="flex items-center m-3 px-6 py-3 rounded-md text-black hover:bg-blue-500 hover:text-white font-semibold text-[14px] font-NunitoSans">
                <img :class="{'invert': ['/UserTable', '/UserCreation', '/UserAddressCom', '/UserDetails', '/UserCompanyCom', '/UserBankCom'].includes(selectedButton)}" src="../assets/Icon/User.png" class="mr-2 " alt="User">
                Users
            </router-link>

            <router-link to="/ProductList" :class="{
              'bg-blue-500 text-white': ['/ProductList', '/AddProduct', '/ProductDetail'].includes(selectedButton)
            }" @click="selectButton('/ProductList')" class="flex items-center m-3 px-6 py-3 rounded-md text-black hover:bg-blue-500 hover:text-white font-semibold text-[14px] font-NunitoSans">
                <img :class="{'invert': ['/ProductList', '/AddProduct', '/ProductDetail'].includes(selectedButton)}" src="../assets/Icon/Product.png" class="mr-2 " alt="Product">
                Products
            </router-link>

            <router-link to="/PostList" :class="{'bg-blue-500 text-white': selectedButton === '/PostList'}" @click="selectButton('/PostList')" class="flex  items-center m-3 px-6 py-3 rounded-md text-black hover:bg-blue-500 font-semibold text-[14px] hover:text-white font-NunitoSans">
                <img :class="{ 'invert': selectedButton === '/PostList'}" src="../assets/Icon/Post.png" class="mr-2" alt="Post">
                Posts
            </router-link>

        </div>

        <div>
            <!-- Spacer div to push "Logout" to the bottom -->
            <!-- <div class="flex"></div> -->
            <div class="border-t absolute inset-x-0 bottom-0 border-gray-300 mt-auto">
                <a href="#" class="flex items-center m-3 px-6 py-3 rounded-md text-black hover:bg-blue-500 hover:text-white" @click.prevent="showModal = true">
                    <img src="../assets/Icon/Logout.png" class="mr-2 hover:fill-white" style="" alt="Logout">
                    Logout
                </a>
            </div>
        </div>
    </div>
</div>
<LogoutModal :showModal="showModal" :onConfirm="handleConfirmLogout" />
</template>

<script>
import LogoutModal from './LogoutModal.vue';
import {
    ref
} from 'vue';
export default {
    name: 'SidebarCom',
    components: {
        LogoutModal
    },
    data() {
        return {
            selectedButton: null
        };
    },
    setup(){
        const showModal = ref(false);

        return{
            showModal
        }
    },
    methods: {
        selectButton(button) {
            if (this.selectedButton === button) {
                this.selectedButton = null;
            } else {
                this.selectedButton = button;
            }
        },
        handleConfirmLogout() {
          
            this.showModal = false; // Close the modal, for example
        }
        
    },
    created() {
        this.selectedButton = this.$route.path;
    }
}
</script>

<style>
a:hover {
    color: white;
}

a:hover img {
    filter: brightness(0) invert(100%);
}

.invert {
    filter: brightness(0) invert(100%);
}

a.bg-blue-500.text-white {
    background-color: #3b82f6;
}
</style>
