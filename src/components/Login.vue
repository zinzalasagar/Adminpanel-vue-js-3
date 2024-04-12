<template>
<div class="image-set min-h-screen bg-gray-100 flex flex-col justify-center py-10 sm:px-6 lg:px-8">

    <div class="mt-2 sm:mx-auto">
        <div class="bg-white w-[630px] h-[735px] flex flex-col items-center justify-center py-7 px-4 shadow sm:rounded-3xl sm:px-10">

            <div class="sm:mx-auto" >
                <h2 class="text-center text-[32px] font-bold text-gray-900">Login to Account</h2>
            </div>
            <div v-if="submitClicked" class="loader-container">
                <div class="loader"></div>
              </div>
            <!-- <div v-if="submitClicked" class="loader w-16 h-16 border-4 border-indigo-300 border-opacity-25 rounded-full"></div> -->
            <div class="mt-3 sm:mx-auto" v-if="!submitClicked">
                <h2 class="text-center text-[18px] text-gray-700">Please enter your email and password to continue</h2>
              </div>
          
            <form v-if="!submitClicked" class="space-y-6 flex flex-col items-center" @submit.prevent="login" ref="form">

                <div class="mt-9">
                    <label for="email" class="block text-[18px] font-medium text-gray-700">Email address:</label>
                    <div class="mt-3">
                        <input id="email" name="email" type="email" autocomplete="email" v-model="email" placeholder="Enter your Email" class="appearance-none block w-[516px] h-[56px] px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 hover:bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-[18px]">
                        <p v-if="!email.trim() && submitClicked" class="text-red-600">Please enter email</p>
                    </div>
                </div>

                <div>
                    <div class="flex justify-between mt-3">
                        <label for="password" class="block text-[18px] font-medium text-gray-700">Password:</label>
                    </div>
                    <div class="mt-3">
                        <input id="password" name="password" type="password" autocomplete="current-password" v-model="password" placeholder="Enter your Password" class="appearance-none block w-[516px] h-[56px] px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 hover:bg-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-[18px]">
                        <p v-if="!password.trim() && submitClicked" class="text-red-600">Please enter password</p>
                    </div>
                </div>
                <div class="px-7 text-center">
                    <button type="submit" class="w-[416px] h-[56px] flex mt-8 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-[20px] font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style="background-color: rgba(72, 128, 255, 1);" :disabled="submitClicked">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import {
    toast
} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            submitClicked: false,
            toastShown: false
        };
    },
    methods: {
        login() {
            if (this.submitClicked) return;
            this.submitClicked = true;

            if (!this.email.trim() || !this.password.trim()) {
                this.submitClicked = false; // Re-enable the button
                return;
            }

            if (this.email !== "s@z.com" || this.password !== "Admin@123") {
                if (!this.toastShown) {
                    this.showErrorMessage("Incorrect email or password.");
                    this.toastShown = true; 
                }
                this.submitClicked = false;
                return;
            } else {
                localStorage.setItem("isLoggedIn", true);
                this.showSuccessMessage("Login successfully");
                // if (!this.toastShown) {
                //     this.showSuccessMessage("Login successfully");
                //     this.toastShown = true;
                // }

                setTimeout(() => {
                    this.$router.push({
                        path: "/"
                    });
                }, 1000);
            }

        },
        showErrorMessage(message) {
            toast.error(message, {
                autoClose: 2000,
                hideProgressBar: true,
                closeButton: true,
                position: "top-right",
            });
        },
        showSuccessMessage(message) {
            toast.success(message, {
                autoClose: 2000,
                hideProgressBar: true,
                closeButton: true,
                position: "top-right",
            });
        },
    },
};
</script>

<style>
.image-set {
    background-image: url(../assets/backGround.jpg);
}

.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
  
  .loader {
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
