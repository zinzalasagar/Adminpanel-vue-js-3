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
                            <!-- Your form fields -->

                            <!-- Address -->
                            <div class="">
                                <div class="mt-5 mb-10">
                                    <label for="address" class="block text-[14px] font-medium text-gray-600">Address</label>
                                    <textarea type="textarea" id="address" placeholder="Enter address" v-model="formData.address.address" class="mt-1 py-3 pl-4 bg-gray-200 block w-[780px] h-[100px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
                                    <p v-if="!formData.address.address && submitClicked" class="text-red-600">Please enter address</p>
                                </div>
                            </div>

                            <!-- City Field -->
                            <div class="flex justify-between">
                                <div>
                                    <div class="mt-5 mb-10">
                                        <label for="city" class="block text-[14px] font-medium text-gray-600">City</label>
                                        <select id="city" v-model="formData.address.city" class="mt-1 py-3 pl-4 pr-10 text-gray-500 bg-gray-200 block w-[360px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                            <option value="" disabled>Select city</option>
                                            <option v-for="city in cityData" :key="city.id" :value="city.name">{{ city.name }}</option>
                                        </select>
                                        <p v-if="!formData.address.city && submitClicked" class="text-red-600">Please select city</p>
                                    </div>
                                </div>

                                <!-- State Field -->
                                <div>
                                    <div class="mt-5 mb-10">
                                        <label for="state" class="block text-[14px] font-medium text-gray-600">State</label>
                                        <select id="state" v-model="formData.address.state" class="mt-1 py-3 pl-4 pr-8 text-gray-500 bg-gray-200 block w-[360px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                            <option value="" disabled>Select state</option>
                                            <option v-for="state in stateData" :key="state.id" :value="state.name">{{ state.name }}</option>
                                        </select>
                                        <p v-if="!formData.address.state && submitClicked" class="text-red-600">Please select state</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="mt-6 text-center">
                                <button type="submit" class="bg-blue-500 w-[260px] h-[56px] hover:bg-blue-700 text-white font-bold rounded-xl">Next</button>
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
import axios from 'axios';

import {
    mapActions,
    mapGetters,
    // mapState
} from 'vuex';
import HeaderCom from './HeaderCom.vue'
import SiderbarCom from './SiderbarCom.vue'

export default {
    name: 'UserAddressCom',
    components: {
        SiderbarCom,
        HeaderCom
    },
    computed: {
        title() {

            return this.isEditing ? 'Edit User' : 'Add New User';
        },
        ...mapGetters(['getFormData']),
    },

    data() {
        return {

            // formData: {
            //     address: {
            //         address: '',
            //         city: '',
            //         state: ''
            //     }
            // },
            cityData: [],
            stateData: [],
           
            submitClicked: false
        };
    },

    created() {
        this.fetchCityAndStateData();

        this.formData = this.$store.state.user.formData;
    
        const editUserData = JSON.parse(localStorage.getItem('editUserData'));
        // console.log(editUserData);
        if (editUserData) {
            // Set the form data to the edited data from localStorage

            this.formData = editUserData
        }
        
    },
    methods: {
        ...mapActions(['updateFormData']),
        async fetchCityAndStateData() {
            try {
                const response = await axios.get('https://dummyjson.com/users?limit=101');
                const userData = response.data.users; // Access the 'users' array within the response data
                userData.forEach(user => {
                    const city = user.address.city;
                    const state = user.address.state;
                    if (city && !this.cityData.some(item => item.name === city)) {
                        this.cityData.push({
                            id: this.cityData.length + 1,
                            name: city
                        });
                    }
                    if (state && !this.stateData.some(item => item.name === state)) {
                        this.stateData.push({
                            id: this.stateData.length + 1,
                            name: state
                        });
                    }
                });
            } catch (error) {
                console.error('Error fetching city and state data:', error);
            }
        },
        createUser(event) {
            event.preventDefault();

            this.submitClicked = true;

            if (!this.formData.address.address || !this.formData.address.city || !this.formData.address.state) {
                this.submitClicked = true;
                return;
            }
            this.$store.dispatch('updateFormData', this.$store.state.user.formData);
            console.log('Form Data:', {
                ...this.$store.state.user.formData
            });
            this.$router.push({
                path: '/UserCompanyCom',

            });
        }
    }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
