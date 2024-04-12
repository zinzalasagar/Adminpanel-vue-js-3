<template>
<div class="flex bg-gray-100">
    <!-- Sidebar -->
    <SiderbarCom />

    <!-- Main Content -->
    <div class="flex flex-col flex-1 overflow-hidden">
        <!-- Header -->
        <HeaderCom />
        <div class="px-6 container mx-auto py-5 h-[90vh] overflow-y-auto">

            <div class="flex justify-between mt-4 items-center mb-6">
                <h2 class="text-3xl font-bold text-black">User Detail</h2>
                <button @click="navigateToUserCreation" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit Profile
                </button>
            </div>

            <div class="container" v-if="user">
                <div class="grid grid-cols-12 ">
                    <div class=" col-span-3 w-[262px] h-auto bg-white p-4 pt-10 rounded-xl">
                        <div class=" flex justify-center">
                            <img :src=" user.image" class="rounded-full w-[110px] h-[110px] " alt="">
                        </div>
                        <div class="block mt-5 ">
                            <div class="flex text-center items-center justify-center">
                                <p class="flex justify-center text-[16px] font-bold">{{user.firstName}}</p>
                                <p class="flex justify-center text-[16px] font-bold">{{user.lastName}}</p>
                            </div>
                            <p class="flex justify-center text-[14px] mt-1">{{ user.email }}</p>
                        </div>
                        <div class="border-t border-gray-300 mt-6">
                            <div class="flex">
                                <p class="mt-6 text-[14px] font-bold">Age <span class="block mt-2  text-[16px] font-normal">{{ user.age }}</span> </p>
                                <p class="mt-6 text-[14px] font-bold ml-[60px]">Gender <span class="block mt-2  text-[16px] font-normal">{{ user.gender }}</span> </p>
                            </div>
                            <p class="mt-6 text-[14px] font-bold">MaidenName <span class="block mt-2  text-[16px] font-normal">{{ user.maidenName }}</span> </p>
                            <p class="mt-6 text-[14px] font-bold">Number <span class="block mt-2  text-[16px] font-normal">{{ user.phone }}</span> </p>
                            <p class="mt-6 text-[14px] font-bold">Username <span class="block mt-2  text-[16px] font-normal">{{ user.username }}</span> </p>
                            <p class="mt-6 text-[14px] font-bold">Password <span class="block mt-2  text-[16px] font-normal">{{ user.password }}</span> </p>
                            <p class="text-[14px] font-bold mt-7">DOB <span class="block text-[16px] font-normal mt-3">{{ user.birthDate }}</span> </p>
                            <p class="text-[14px] font-bold mt-7">BloodGroup <span class="block text-[16px] font-normal mt-3">{{ user.bloodGroup }}</span> </p>
                            <p class="text-[14px] font-bold mt-7">Height <span class="block text-[16px] font-normal mt-3">{{ user.height }}</span> </p>
                            <p class="text-[14px] font-bold mt-7">Weight <span class="block text-[16px] font-normal mt-3">{{ user.weight }}</span> </p>
                            <p class="text-[14px] font-bold mt-7">EyeColor <span class="block text-[16px] font-normal mt-3">{{ user.eyeColor }}</span> </p>
                            <div class="grid grid-cols-3 ">
                                <p class="text-[14px] font-bold mt-7">HairColor <span class="block text-[16px] font-normal mt-3">{{ user.hair.color }}</span> </p>
                                <p class="text-[14px] font-bold mt-7">HairType <span class="block text-[16px] font-normal mt-3">{{ user.hair.type }}</span> </p>
                            </div>
                            <p class="text-[14px] font-bold mt-7">University <span class="block text-[16px] font-normal mt-3">{{ user.university }}</span> </p>
                        </div>
                    </div>

                    <div class=" col-span-9 ">
                        <div class=" bg-white p-4 pt8 rounded-xl pl-8">
                            <p class="text-[24px] font-bold">Address info</p>
                            <p class="mt-6 text-[14px] font-bold">Address <span class=" mt-2 block text-[16px] font-normal">{{ user.address.address }}</span> </p>

                            <div class="grid grid-cols-3 ">

                                <p class="mt-6 text-[14px] font-bold  ">City <span class=" mt-2 block text-[16px] font-normal">{{ user.address.city }}</span> </p>
                                <p class="mt-6 text-[14px] font-bold ">State <span class=" mt-2 block text-[16px] font-normal">{{ user.address.state }}</span> </p>
                            </div>
                            <div class="grid grid-cols-3 ">

                                <p class="mt-6 text-[14px] font-bold ">lat <span class=" mt-2 block text-[16px] font-normal">{{ user.address.coordinates.lat }}</span> </p>
                                <p class="mt-6 text-[14px] font-bold ">lng <span class=" mt-2 block text-[16px] font-normal">{{ user.address.coordinates.lng }}</span> </p>
                            </div>
                            <div class="grid grid-cols-3 ">

                                <p class="mt-6 text-[14px] font-bold ">postalCode <span class=" mt-2 block text-[16px] font-normal">{{ user.address.postalCode }}</span> </p>

                            </div>
                        </div>
                        <div class="mt-6 bg-white p-4 pt-8 rounded-xl pl-8">
                            <p class="text-[24px] font-bold">Company info</p>
                            <div class="grid grid-cols-3 ">

                                <p class="mt-6 text-[14px] font-bold  ">Name <span class=" mt-2 block text-[16px] font-normal">{{ user.company.name }}</span> </p>
                                <p class="mt-6 text-[14px] font-bold ">Department <span class=" mt-2 block text-[16px] font-normal">{{user.company.department}}</span> </p>
                            </div>
                            <div class="grid grid-cols-3 ">
                                <p class="mt-6 text-[14px] font-bold">title <span class=" mt-2 block text-[16px] font-normal">{{ user.company.title }}</span> </p>
                                <p class="mt-6 text-[14px] font-bold">Address <span class=" mt-2 block text-[16px] font-normal">{{ user.company.address.address }}</span> </p>
                            </div>
                            <div class="grid grid-cols-3 ">

                                <p class="mt-6 text-[14px] font-bold  ">City <span class=" mt-2 block text-[16px] font-normal">{{ user.company.address.city }}</span> </p>
                                <p class="mt-6 text-[14px] font-bold ">State <span class=" mt-2 block text-[16px] font-normal">{{ user.company.address.state }}</span> </p>
                            </div>
                            <div class="grid grid-cols-3 ">

                                <p class="mt-6 text-[14px] font-bold ">lat <span class=" mt-2 block text-[16px] font-normal">{{ user.company.address.coordinates.lat }}</span> </p>
                                <p class="mt-6 text-[14px] font-bold ">lng <span class=" mt-2 block text-[16px] font-normal">{{ user.company.address.coordinates.lng }}</span> </p>
                            </div>
                            <div class="grid grid-cols-3 ">
                                <p class="mt-6 text-[14px] font-bold  ">postalCode <span class=" mt-2 block text-[16px] font-normal">{{ user.company.address.postalCode }}</span> </p>
                            </div>
                        </div>
                        <!-- Bank info -->
                        <div class="mt-6 bg-white p-4 pt-8 rounded-xl pl-8">
                            <p class="text-[24px] font-bold">Bank info</p>

                            <p class="mt-6 text-[14px] font-bold">Card Number <span class="mt-3 block text-[16px] font-normal">{{ user.bank.cardNumber }}</span> </p>

                            <div class="grid grid-cols-3 ">

                                <p class="mt-6 text-[14px] font-bold ">CardExpire <span class=" mt-2 block text-[16px] font-normal">{{ user.bank.cardExpire }}</span> </p>
                                <p class="mt-6 text-[14px] font-bold ">CardNumber <span class=" mt-2 block text-[16px] font-normal">{{ user.bank.cardNumber }}</span> </p>
                            </div>
                            <div class="grid grid-cols-3 ">

                                <p class="mt-6 text-[14px] font-bold ">Currency <span class=" mt-2 block text-[16px] font-normal">{{ user.bank.currency }}</span> </p>
                                <p class="mt-6 text-[14px] font-bold ">Iban <span class=" mt-2 block text-[16px] font-normal">{{ user.bank.iban }}</span> </p>
                            </div>
                        </div>
                        <div class="mt-6 bg-white p-4 pt-8 rounded-xl pl-8">
                            <p class="text-[24px] font-bold">Other info</p>
                            <div class="grid grid-cols-3 ">

                                <p class="mt-6 text-[14px] font-bold ">Domain <span class=" mt-2 block text-[16px] font-normal">{{ user.domain }}</span> </p>
                                <p class="mt-6 text-[14px] font-bold ">Ip <span class=" mt-2 block text-[16px] font-normal">{{ user.ip }}</span> </p>
                            </div>
                            <div class="grid grid-cols-3 ">

                                <p class="mt-6 text-[14px] font-bold ">MacAddress <span class=" mt-2 block text-[16px] font-normal">{{ user.macAddress }}</span> </p>
                                <p class="mt-6 text-[14px] font-bold ">Ein <span class=" mt-2 block text-[16px] font-normal">{{ user.ein }}</span> </p>
                            </div>
                            <div class="grid grid-cols-3 ">

                                <p class="mt-6 text-[14px] font-bold ">Ssn <span class=" mt-2 block text-[16px] font-normal">{{ user.ssn }}</span> </p>
                                <p class="mt-6 text-[14px] font-bold ">UserAgent <span class=" mt-2 block text-[16px] font-normal">{{ user.userAgent }}</span> </p>
                            </div>
                            <div class="grid grid-cols-3 ">

                                <p class="mt-6 text-[14px] font-bold ">Crypto Coin <span class=" mt-2 block text-[16px] font-normal">{{ user.crypto.coin }}</span> </p>
                                <p class="mt-6 text-[14px] font-bold ">Crypto Wallet <span class=" mt-2 block text-[16px] font-normal">{{ user.crypto.wallet }}</span> </p>
                            </div>
                            <div class="grid grid-cols-3 ">

                                <p class="mt-6 text-[14px] font-bold ">Network <span class=" mt-2 block text-[16px] font-normal">{{ user.crypto.network }}</span> </p>
                                
                            </div>
                        </div>

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
    mapGetters
} from 'vuex';

import HeaderCom from './HeaderCom.vue'
import SiderbarCom from './SiderbarCom.vue'

export default {
    name: 'UserDetailsCom',
    components: {
        SiderbarCom,
        HeaderCom
    },
    data() {
        return {
            user: null
        };
    },
    created() {

        // this.formData = this.$store.state.formData;
        // Retrieve the user object from the query parameters
        this.fetchUserDetails();
        // this.user = JSON.parse(this.$route.query.user);
    },
    computed: {
        ...mapGetters(['formData']),
    },
    methods: {
        fetchUserDetails() {
            const userId = this.$route.query.userId;
            // console.log(userId)
            // Make a GET request to the API endpoint that provides user details
            if (userId) {
                axios.get(`https://dummyjson.com/users/${userId}`)
                    .then(response => {
                        // Update the user data with the fetched user details
                        this.user = response.data;
                    })
                    .catch(error => {
                        console.error('Error fetching user details:', error);
                    });
            }
        },
        navigateToUserCreation() {
            // Navigate to the edit profile page
            if (this.user) {
                // Pass the product data as query parameter
                this.$router.push({
                    path: '/UserCreation',
                    
                });

                // Update productFormData in Vuex store
                this.$store.dispatch('updateFormData', this.user);

            } else {
                console.error('user details are not available');
            }
        },

        submitForm() {}
    }
};
</script>
