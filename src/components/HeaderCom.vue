<template>
<div>
    <header class=" bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3">
        <!-- Search Bar -->
        <div class="flex items-center">
            <div class="relative mr-5 ">
                <input type="text" placeholder="Search..." class="border  w-[387px] h-[38px] border-gray-100 bg-gray-100 px-10 py-1 rounded-3xl focus:outline-none focus:border-gray-500">
                <span class="absolute inset-y-0  flex items-center">
                    <img class="ml-3" src="../assets/userTable/search.png" alt="Search Icon">
                </span>

            </div>

        </div>
        <!-- Bell Icon -->
        <div class="flex items-center relative">
            <button class="ml-4 focus:outline-none cursor-pointer">
                <img src="../assets/Icon/Group 1.png" class="mr-2" alt="Group">
            </button>
            <!-- Username and Photo -->
            <div class="ml-4 flex items-center relative  cursor-pointer" @click="toggleDropdown">
                <img src="../assets/user.png" alt="User Photo" class="w-9 h-9 rounded-full object-cover">
                <div>
                    <span class="ml-2 text-gray-800 text-[14px] font-bold">Moni Roy</span>
                    <span class="ml-2 text-gray-800 text-[12px] font-semibold block">Admin</span>
                </div>
                <!-- Chevron Icon -->
                <button class="ml-2 mt-1 ">
                    <img src="../assets/Icon/More.png" class="mr-2" alt="More">
                </button>

                <!-- Dropdown Menu -->
                <div v-if="showDropdown" class=" absolute top-full right-0 mt-3 py-4 bg-white border hover:text-black border-gray-200  rounded-2xl shadow-md w-52 z-10">
                    <a href="#" class=" dropdown-item  px-6 py-2 text-[14px] font-semibold rounded-t-lg  text-gray-800 hover:text-white hover:bg-gray-600 flex items-center" @click.prevent="openManageAccountForm">
                        <img src="../assets/ProfileIcon/Manage.png" class="mr-2" alt="Manage">
                        Manage Account
                    </a>
                    <a href="#" class=" dropdown-item  px-6 py-2 text-[14px] font-semibold text-gray-800 hover:text-white hover:bg-gray-600 flex items-center" @click.prevent="openChangePasswordForm">
                        <img src="../assets/ProfileIcon/changeP.png" class="mr-2" alt="changePassword">
                        Change Password
                    </a>
                    <a href="#" class="dropdown-item  px-6 py-2  text-[14px] font-semibold rounded-b-lg text-gray-800 hover:text-white hover:bg-gray-600 flex items-center" @click.prevent="showModal = true">
                        <img src="../assets/ProfileIcon/Logout.png" class="mr-2" alt="Logout">
                        Log out
                    </a>
                </div>

            </div>
        </div>
    </header>
    <!-- <ManageAccount ref="manageAccount" /> -->
    <LogoutModal :showModal="showModal" :onConfirm="handleConfirmLogout" />
    <div v-if="showManageAccountForm || showChangePasswordForm" class="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
        <div v-if="showManageAccountForm">
          <ManageAccountForm @close="closeManageAccountForm" />
        </div>
        <div v-if="showChangePasswordForm">
          <ChangePasswordForm @close="closeChangePasswordForm" />
        </div>
      </div>
  

</div>
</template>

<script>
import ManageAccountForm from './ManageAccountForm .vue';
import ChangePasswordForm from './ChangePasswordForm.vue';

import LogoutModal from './LogoutModal.vue';

import {
    ref
} from 'vue';
export default {
    name: 'HeaderCom',
    components: {
        LogoutModal,
        ManageAccountForm,
        ChangePasswordForm
    },
    setup() {
        const showDropdown = ref(false);
        const showModal = ref(false);
        const showManageAccountForm = ref(false);
        const showChangePasswordForm = ref(false);

        const toggleDropdown = () => {
            showDropdown.value = !showDropdown.value;
        };

        const openManageAccountForm = () => {
            showManageAccountForm.value = true;
        };

        const closeManageAccountForm = () => {
            showManageAccountForm.value = false;
        };

        const openChangePasswordForm = () => {
            showChangePasswordForm.value = true;
        };

        const closeChangePasswordForm = () => {
            showChangePasswordForm.value = false;
        };
        const handleConfirmLogout = () => {
            // Close the modal dialog for logout confirmation
            showModal.value = false;
            // Additional logic for handling logout confirmation can be added here
        };

       

        return {
            showDropdown,
            showModal,
            toggleDropdown,
            showManageAccountForm,
            openManageAccountForm,
            showChangePasswordForm,
            openChangePasswordForm,
            closeChangePasswordForm,
            handleConfirmLogout,
            closeManageAccountForm
        };
    },

}
</script> 

<style scoped>

</style>
