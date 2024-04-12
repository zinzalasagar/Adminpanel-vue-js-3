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
            <div class="container mx-auto  ">
                <div class="bg-white rounded-2xl shadow-md py-24 ">
                    <!-- User Creation Form -->
                    <div class="">
                        <form @submit.prevent="createUser">
                            <!-- Camera Field -->
                            <div class="flex justify-center items-center mb-6">
                                <div class="block">
                                    <!-- Image preview -->

                                    <label for="image" class="text-lg font-medium text-blue-500 cursor-pointer">
                                        <span> <img v-if="formData.image" :src="imagePreview" alt="Selected Image" width="80px" height="80px" class="rounded-full" /></span>
                                        <span><img v-if="!formData.image" src="../assets/userTable/Image.png" width="80px" height="80px" alt=""></span>
                                    </label>
                                    <input type="file" id="image" accept="image/*" class="hidden" @change="handleImageUpload">
                                    <p class="text-[14px] text-blue-500">Upload Photo</p>
                                    <p v-if="!formData.image && submitClicked" class="text-red-600">Please enter image</p>
                                </div>
                            </div>
                            <!-- Name -->
                            <div class="flex justify-evenly">
                                <div class="mt-2  mb-10">
                                    <label for="firstName" class="block text-[14px] font-medium text-gray-600"> First Name</label>
                                    <input type="text" id="firstName" placeholder="Enter first name" v-model="formData.firstName" class="mt-1 placeholder:text-[14px]  py-3 pl-4  block w-[360px] bg-gray-200 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                    <p v-if="!formData.firstName && submitClicked" class="text-red-600">Please enter firstName </p>
                                </div>

                                <!-- Last Name -->
                                <div class="mt-2  mb-10">
                                    <label for="lastName" class="block text-[14px] font-medium text-gray-600">Last Name</label>
                                    <input type="text" id="lastName" placeholder="Enter last name" v-model="formData.lastName" class="mt-1 py-3 pl-4  text-[14px] bg-gray-200  bg-gray-200block w-[360px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                    <p v-if="!formData.lastName && submitClicked" class="text-red-600">Please enter lastName</p>
                                </div>
                            </div>

                            <div class="flex justify-evenly">
                                <!-- Email -->
                                <div class="mt-5  mb-10">
                                    <label for="email" class="block text-[14px] font-medium text-gray-600">Email</label>
                                    <input type="email" id="email" placeholder="Enter email" v-model="formData.email" class="mt-1 block py-3 pl-4 bg-gray-200 w-[360px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                    <p v-if="!formData.email && submitClicked" class="text-red-600">Please enter email</p>
                                    <p v-if="validationErrors.email && !isValidEmail(formData.email)" class="text-red-600">Invalid email address</p>
                                    <p v-if="formData.email && !formData.email.includes('@')" class="text-red-600">Please include an '@' in the email address</p>

                                </div>

                                <!-- Phone Number -->
                                <div class="mt-5  mb-10">
                                    <label for="phone" class="block text-[14px] font-medium text-gray-600">Phone Number</label>
                                    <input type="text" id="phone" placeholder="Enter phone number" v-model="formData.phone" class="mt-1  py-3  pl-4 bg-gray-200 block w-[360px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                    <p v-if="!formData.phone && submitClicked" class="text-red-600">Please enter phone</p>
                                    <p v-if="validationErrors.phone && !isValidPhoneNumber(formData.phone)" class="text-red-600">Invalid phone number</p>
                                </div>
                            </div>

                            <!-- University -->
                            <div class="flex justify-evenly">
                                <div class="mt-5  mb-10">
                                    <label for="university" class="block text-[14px] font-medium text-gray-600">University</label>
                                    <input type="text" id="university" placeholder="Enter University" v-model="formData.university" class="mt-1  py-3 pl-4 bg-gray-200 block w-[360px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                    <p v-if="!formData.university && submitClicked" class="text-red-600">Please enter university</p>
                                    <p v-if="validationErrors.university" class="text-red-600">Please provide a valid university</p> <!-- Custom error message -->
                                </div>

                                <!-- Birth Date -->
                                <div class="mt-5  mb-10">
                                    <label for="birthDate" class="block text-[14px] font-medium text-gray-600">Birth Date</label>
                                    <input type="date" id="birthDate" placeholder="DD / MM / YYYY" v-model="formData.birthDate" class="mt-1 py-3 pl-4 bg-gray-200 block w-[360px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                    <p v-if="!formData.birthDate && submitClicked" class="text-red-600">Please enter birthDate</p>
                                    <p v-if="validationErrors.birthDate" class="text-red-600">Please provide a valid birth date</p> <!-- Custom error message -->
                                </div>

                            </div>

                            <!-- Submit Button -->
                            <div class="mt-6 text-center">
                                <button type="submit" @click="submit" class="bg-blue-500 w-[260px] h-[56px] hover:bg-blue-700 text-white font-bold rounded-xl">Next</button>
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

} from 'vuex';

import HeaderCom from './HeaderCom.vue'
import SiderbarCom from './SiderbarCom.vue'

export default {
    name: 'UserCreation',
    components: {
        SiderbarCom,
        HeaderCom
    },

    data() {
        return {

            submitClicked: false,
            users: [],
            validationErrors: {
                email: false,
                phone: false,
                university: false,
                birthDate: false
            }
        };
    },
    created() {
        this.formData = this.$store.state.user.formData;
        // console.log("this.formData",this.user.formData)
        console.log("FormUserCreationData", this.$store.state.user.formData)
        // Check if there is edited data in localStorage
        const editUserData = JSON.parse(localStorage.getItem('editUserData'));
        // console.log(editUserData);
        if (editUserData) {
            // Set the form data to the edited data from localStorage

            this.formData = editUserData
            const nameParts = this.formData.name.split(' ');
            this.formData.firstName = nameParts[0] || '';
            this.formData.lastName = nameParts[1] || '';
        }
    },

    methods: {

        ...mapActions(['updateFormData']),

        isValidEmail(email) {
            // Basic email validation
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email) && email.includes('@');
            // return email.includes('@');

        },
        async createUser(event) {
            event.preventDefault();
            this.submitClicked = true;

            this.validationErrors = {
                email: false,
                phone: false,
                university: false,
                birthDate: false
            };

            if (!this.formData.image || !this.formData.firstName || !this.formData.lastName || !this.formData.email || !this.formData.phone || !this.formData.university || !this.formData.birthDate) {
                // this.submitClicked = true; 
                console.log('Required fields are missing.');
                return;
            }

            if (!this.isValidEmail(this.formData.email)) {
                this.validationErrors.email = true;
                return;
            }
           
            
            this.$store.dispatch('updateFormData', {
                ...this.formData
            });

            this.$router.push({
                path: '/UserAddressCom',

            });

        },

       
        handleImageUpload(event) {
            // Handle image upload
            this.formData.image = event.target.files[0];
        }
    },
    computed: {
        imagePreview() {
            if (this.formData.image instanceof File) {
                try {
                    return URL.createObjectURL(this.formData.image);
                } catch (error) {
                    console.error('Error creating object URL:', error);
                    return '';
                }
            } else if (typeof this.formData.image === 'string') {
                return this.formData.image;
            } else {
                return '';
            }
        },

    },

};
</script>
