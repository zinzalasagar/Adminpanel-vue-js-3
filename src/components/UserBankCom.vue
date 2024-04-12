<template>
<div class="flex bg-gray-100">
    <!-- Sidebar -->
    <SiderbarCom />

    <!-- Main Content -->
    <div class="flex flex-col flex-1 overflow-hidden">
        <!-- Header -->
        <HeaderCom />
        <div class="px-6 container mx-auto py-5 h-[90vh] overflow-y-auto">
            <div class="flex items-center mb-6">
                <h2 class="text-[32px] font-bold text-black">{{ this.formData?.id ? "Edit user" : "Add user" }}</h2>
            </div>
            <div class="container mx-auto">
                <div class="bg-white rounded-2xl shadow-md py-24">
                    <!-- User Creation Form -->
                    <div class="flex justify-center items-center">
                        <form @submit.prevent="createUser">
                            <!-- Bank Card Number -->
                            <div>
                                <div class="mt-5 mb-10">
                                    <label for="cardNumber" class="block text-[14px] font-medium text-gray-600">Bank Card Number</label>
                                    <input type="text" id="cardNumber" placeholder="01234 5678 9012 3456" v-model="formData.bank.cardNumber" class="mt-1 py-3 pl-4 bg-gray-200 block w-[780px] h-[52px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                                    <p v-if="!formData.bank?.cardNumber && submitClicked" class="text-red-600">
                                        Please enter bank card number
                                    </p>
                                </div>
                            </div>
                            <!-- Bank Card Expire -->
                            <div class="flex justify-between">
                                <div>
                                    <div class="mt-5 mb-10">
                                        <label for="cardExpire" class="block text-[14px] font-medium text-gray-600">Bank Card Expire</label>
                                        <input type="text" id="cardExpire" placeholder="MM / YY" v-model="formData.bank.cardExpire" class="mt-1 py-3 pl-4 bg-gray-200 block w-[360px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                                        <p v-if="!formData.bank?.cardExpire && submitClicked" class="text-red-600">
                                            Please enter bank card expire date
                                        </p>
                                    </div>
                                </div>
                                <!-- Bank Card Type -->
                                <div>
                                    <div class="mt-5 mb-10">
                                        <label for="cardType" class="block text-[14px] font-medium text-gray-600">Bank Card Type</label>
                                        <select id="cardType" v-model="formData.bank.cardType" placeholder="" class="mt-1 py-3 pl-4 pr-8 text-gray-500 bg-gray-200 block w-[360px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                            <option value="" disabled selected>
                                                Select Bank Card Type
                                            </option>
                                            <option v-for="cardType in cardTypes" :key="cardType" :value="cardType" class="text-black bg-white">
                                                {{ cardType }}
                                            </option>
                                        </select>
                                        <p v-if="!formData.bank?.cardType && submitClicked" class="text-red-600">
                                            Please select bank card type
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!-- Submit Button -->
                            <div class="mt-6 text-center">
                                <button type="submit" class="bg-blue-500 w-[260px] h-[56px] hover:bg-blue-700 text-white font-bold rounded-xl" :disabled="loading">
                                    <div class="flex items-center justify-center gap-2">
                                        <template v-if="loading">
                                            <!-- Simple loader -->
                                            <span>Saving...</span>
                                            <div class="loader"></div>
                                        </template>
                                        <template v-else>
                                            {{ formData?.id ? "Edit User" : "Add Now" }}
                                        </template>
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    toast
} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import HeaderCom from "./HeaderCom.vue";
import SiderbarCom from "./SiderbarCom.vue";
import {
    mapActions,
    // mapState,
    // mapGetters,
    //   mapState,
} from "vuex";
import axios from 'axios';

export default {
    name: "UserBankCom",
    components: {
        SiderbarCom,
        HeaderCom,
    },
    data() {
        return {
            // formData: {},
            cardTypes: [],
            loading: false,
            submitClicked: false,
            successShown: false,
            actionType: null
        };
    },

    setup() {
        const notify = (message) => {

            toast.success(message, {
                autoClose: 3000,
            });
        };
        return {
            notify
        };
    },
    computed: {
        // ...mapState(['getFormData'])
        formData() {
            return this.$store.state.user.formData;
        }
    },
    created() {
        this.fetchCardTypesData();

        const editUserData = JSON.parse(localStorage.getItem('editUserData'));
        // console.log(editUserData);
        if (editUserData) {
            this.$store.dispatch('updateFormData', editUserData);
        }
    },
    methods: {
        ...mapActions(["postDataToAPI"]),
        async fetchCardTypesData() {
            try {
                // Make API call to fetch department data
                const response = await axios.get('https://dummyjson.com/users?limit=101');
                // Update departments array with department names from the response
                const cardTypes = response.data.users.map(user => user.bank.cardType);
                this.cardTypes = Array.from(new Set(cardTypes));
            } catch (error) {
                console.error('Error fetching department data:', error);
            }
        },
        async createUser() {
            this.submitClicked = true;
            if (
                !this.formData ||
                !this.formData.bank.cardNumber ||
                !this.formData.bank.cardExpire ||
                !this.formData.bank.cardType
            ) {
                console.error("Form data or bank details are not defined.");
                return;
            }
            if (
                !this.formData.bank.cardNumber ||
                !this.formData.bank.cardExpire ||
                !this.formData.bank.cardType
            ) {
                alert("Please fill in all bank card fields.");
                return;
            }

            const userData = {
                ...this.formData,

            };

            if (this.loading) return;
            this.loading = true;

            try {
                const message = this.formData.id ? "User Successfully Updated" : "User Successfully  Added";
                const response = await this.postDataToAPI(userData);
                console.log("User created successfully:", response, this.formData.bank);

                this.notify(message);
                this.resetForm();

                this.$store.dispatch('updateFormData', this.$store.state.user.formData);
                localStorage.removeItem('editUserData');
                setTimeout(() => {
                    this.$router.push('/UserTable');
                }, 2000);
            } catch (error) {
                console.error("Error:", error);
                this.notify("Error occurred while saving user data");
            } finally {
                this.loading = false;
                this.submitting = false;
            }

            console.log("this.$store.state.formData", this.$store.state.user.formData);

        },
        resetForm() {
            this.submitClicked = false;
        },
    },
};
</script>

<style scoped>
.loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Add your component-specific styles here */
</style>
