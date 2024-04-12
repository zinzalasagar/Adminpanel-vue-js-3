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
                            <div class="flex justify-between">
                                <!-- Company Name Field -->
                                <div>
                                    <div class="mt-5 mb-10">
                                        <label for="name" class="block text-[14px] font-medium text-gray-600">Company Name</label>
                                        <input type="text" id="name" placeholder="Enter company name" v-model="formData.company.name" class="mt-1 py-3 pl-4 bg-gray-200 block w-[360px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                        <p v-if="!formData.company.name && submitClicked" class="text-red-600">Please enter company name</p>
                                    </div>
                                </div>

                                <!-- Department Field -->
                                <div>
                                    <div class="mt-5 mb-10">
                                        <label for="department" class="block text-[14px] font-medium text-gray-600">Department</label>
                                        <select id="department" v-model="formData.company.department" class="mt-1 py-3 pl-4 pr-8 text-gray-500 bg-gray-200 block w-[360px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                            <option value="" disabled selected>Select department</option>
                                            <option v-for="department in departments" :key="department" :value="department" class="text-black bg-white">{{ department }}</option>
                                        </select>
                                        <p v-if="!formData.company.department && submitClicked" class="text-red-600">Please select department</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Company Address -->
                            <div class="">
                                <div class="mt-5 mb-10">
                                    <label for="address" class="block text-[14px] font-medium text-gray-600">Company Address</label>
                                    <textarea type="textarea" id="address" placeholder="Enter address" v-model="formData.company.address.address" class="mt-1 py-3 pl-4 bg-gray-200 block w-[780px] h-[100px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
                                    <p v-if="!formData.company.address.address  && submitClicked" class="text-red-600">Please enter company address</p>
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
import {
    mapActions,
    mapState
} from 'vuex';
import HeaderCom from './HeaderCom.vue';
import SiderbarCom from './SiderbarCom.vue';
import axios from 'axios';

export default {
    name: 'UserCompanyCom',
    components: {
        SiderbarCom,
        HeaderCom
    },

    data() {
        return {
            departments: [],
            // departments: [
            //     'Human Resources', 'IT', 'Accounting and Finance', 'Marketing', 'Research and Development (R&D)', 'Production'
            // ],
            submitClicked: false
        };
    },
    computed: {
        ...mapState(['getFormData'])
    },
    created() {
        this.fetchDepartmentData();
        this.formData = this.$store.state.user.formData
        console.log("this.$store.state", this.$store.state.user.formData);
        if (!this.formData) {

            this.formData = this.$store.state.user.formData
        }   
        const editUserData = JSON.parse(localStorage.getItem('editUserData'));
        if (editUserData) {

            this.formData = editUserData
        }
    },
    methods: {
        ...mapActions(['updateFormData']),
        async fetchDepartmentData() {
      try {
        // Make API call to fetch department data
        const response = await axios.get('https://dummyjson.com/users?limit=101');
        // Update departments array with department names from the response
        const departments = response.data.users.map(user => user.company.department);
        this.departments = Array.from(new Set(departments));

      } catch (error) {
        console.error('Error fetching department data:', error);
      }
    },
        createUser(event) {
            event.preventDefault();

            this.submitClicked = true;

            if (!this.formData.company.name || !this.formData.company.department || !this.formData.company.address.address.trim()) {
                this.submitClicked = true;

                return;
            }
            this.$store.dispatch('updateFormData', this.$store.state.user.formData);
            console.log('Form Data:', {
                ...this.$store.state.user.formData
            });
            this.$router.push({
                path: '/UserBankCom',   

            });
        }
    }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
