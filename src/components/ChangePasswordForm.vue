<template>
<div :class="{ 'bg-white': !errorsExist, 'bg-red-100': errorsExist }" class="bg-white z-10 w-[560px] h-auto rounded-lg p-8 shadow-md">
    <h2 class="text-2xl font-semibold mb-6">Change Password</h2>
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-y-4">
        <div>
            <label for="oldPassword" class="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
            <input type="password" v-model="oldPassword" id="oldPassword" name="oldPassword" autocomplete="current-password" placeholder="Enter your old password" class="input-field">
            <span class="error-message" v-if="errors.oldPassword">{{ errors.oldPassword }}</span>
        </div>
        <div class="relative">
            <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input :type="showPassword ? 'text' : 'password'" v-model="newPassword" id="newPassword" name="newPassword" autocomplete="new-password" placeholder="Enter your new password" class="input-field pr-10 relative">
            <span class="absolute inset-y-0 right-0 flex items-center pr-3 top-5">
              <button type="button" @click="togglePasswordVisibility" class="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 " viewBox="0 0 20 20" fill="currentColor">
                  <path v-if="showPassword" fill-rule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  <path fill-rule="evenodd" d="M10 4c-4.42 0-8 4.33-8 6a8 8 0 0016 0c0-1.67-3.58-6-8-6zm0 10c1.11 0 2.16-.37 3-1a4 4 0 00-6 0c.84.63 1.89 1 3 1zm0-8a3 3 0 100 6 3 3 0 000-6z" clip-rule="evenodd"/>
                </svg>
              </button>
            </span>
            <span class="error-message" v-if="errors.newPassword">{{ errors.newPassword }}</span>
          </div>
        <i class="fa-solid fa-eye-slash"></i>
                <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input type="password" v-model="confirmPassword" id="confirmPassword" name="confirmPassword" autocomplete="new-password" placeholder="Confirm your new password" class="input-field">
            <span class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
        </div>
        <div class="flex justify-end">
            <button type="button" class="btn-secondary mr-4" @click="closeForm">Cancel</button>
            <button type="submit" class="btn-primary">Change Password</button>
        </div>
    </form>
</div>
</template>

  
<script>
import {
    toast
} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    name: 'ChangePasswordForm',
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            errors: {},
            toastShown: false,
            showPassword: false
        };
    },
    methods: {
        handleSubmit() {
            this.errors = {};

            if (!this.oldPassword) {
                this.errors.oldPassword = 'Please enter your old password.';
            }
            if (!this.newPassword) {
                this.errors.newPassword = 'Please enter your new password.';
            }
            if (!this.confirmPassword) {
                this.errors.confirmPassword = 'Please confirm your new password.';
            }
            if (this.newPassword !== this.confirmPassword) {
                this.errors.confirmPassword = 'New password and confirm password must match.';
            }

            if (Object.keys(this.errors).length > 0) {
                return;
            }
            toast.success('Password Change Successfully ', {
                autoClose: 2000, // Hide the icon
            });
            console.log('Submitting change password form...');
            this.$emit('close');
        },
        closeForm() {
            this.oldPassword = '';
            this.newPassword = '';
            this.confirmPassword = '';
            this.errors = {};
            this.$emit('close');
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        }
    }
};
</script>

  
<style scoped>
.input-field {
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    padding: 0.5rem;
    width: 100%;
}

.error-message {
    color: #ff0000;
    font-size: 0.75rem;
    margin-top: 0.25rem;
}

.btn-primary {
    background-color: #3490dc;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-primary:hover {
    background-color: #2779bd;
}

.btn-secondary {
    color: #3490dc;
    background-color: transparent;
    border: 1px solid #3490dc;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-secondary:hover {
    background-color: #f0f0f0;
}

.bg-red-100 {
    background-color: #FEE2E2;
    
}
</style>
