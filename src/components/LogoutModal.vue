<template>
<div v-if="showModal" class="  fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div class="bg-white p-6 relative  flex justify-center rounded-lg shadow-lg" style="width: 560px; height: 400px;border-radius: 14px;">
        <div class="absolute right-[50px]">
            <button @click="cancelLogout" class=" ">
                <img src="../assets/Logout/Group.png" class="w-6 h-6 mb-4" alt="Cancel Logout">
            </button>
        </div>
        <!-- Image -->
        <div>
            <div style="width: 206px; height: 319px ; gap: 30px;">
                <div class="flex justify-center">
                    <img src="../assets/Logout/Logout.png" class="w-200 h-200 mb-4" alt="Logout Image">
                </div>
                <!-- Logout Confirmation Text -->
                <p style="font-family: 'Nunito Sans'; font-size: 18px; font-weight: 600; line-height: 20px; letter-spacing: 0px; text-align: center;">Are you sure you want to log out?</p>
                <!-- Button -->
                <div class="flex justify-center">
                    <button @click="confirmLogout" class="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-600" style="width: 179px; height: 49px; padding: 12px 60px; margin-top: 40px;">Logout</button>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import {
    useRouter
} from 'vue-router';

export default {
    name: 'LogoutModal',
    props: {
        showModal: {
            type: Boolean,
            required: true
        },
        onConfirm: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const router = useRouter();

        const confirmLogout = () => {
            localStorage.removeItem('isLoggedIn');
            router.push('/Login');
        };

        const cancelLogout = () => {
            // Emit an event to the parent component to close the modal
            props.onConfirm();
        };

        return {
            confirmLogout,
            cancelLogout,
            // showModal: props.showModal,
            // onConfirm: props.onConfirm
        };
    }
}
</script>

<style scoped>
/* Your scoped styles here */
</style>
