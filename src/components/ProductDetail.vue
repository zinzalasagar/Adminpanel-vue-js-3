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
                <h2 class="text-3xl font-bold text-black">Product Detail</h2>
                <button @click="navigateToEditProduct" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit Product
                </button>
            </div>

            <div class="container" v-if="product">
                <div class="grid grid-cols-12 bg-white rounded-xl ">
                    <div class="col-span-6 p-4 pt-10 rounded-xl">
                        <div class="flex justify-center">
                            <img :src="product.thumbnail" class="w-[513px] h-[413px] rounded-lg" alt="">
                        </div>
                        <div class="flex justify-center gap-7 ">
                            <!-- Display other images here -->
                            <template v-for="(image, index) in product.images" :key="index">
                                <img @click="setThumbnail(image)" :src="image" class="mt-3 rounded-md w-[80px] h-[80px] cursor-pointer" :alt="'Image ' + (index + 1)" :class="{ 'opacity-50': image === product.thumbnail}">
                            </template>
                        </div>
                    </div>
                    <div class="col-span-6 p-4 pt-10 w-[100%] rounded-xl">
                        <div>
                            <!-- Display other product details here -->
                            <div>
                                <h3 class="text-[28px] font-bold">{{ product.title }}</h3>
                                <p class="text-[18px] font-normal">{{ product.description }}</p>
                            </div>
                            <div class="mt-10 grid grid-cols-6">
                                <div>
                                    <p class="text-[14px] font-bold ">Price</p>
                                    <p>{{ product.price }}</p>
                                </div>
                                <div class="ml-20">
                                    <p class="text-[14px] font-bold">DiscountPercentage</p>
                                    <p>{{ product.discountPercentage }}</p>
                                </div>
                            </div>
                            <div class="mt-5 grid grid-cols-6">
                                <div>
                                    <p class="text-[14px] font-bold"> Stock</p>
                                    <p>{{ product.stock }}</p>
                                </div>
                                <div class="ml-20">
                                    <p class="text-[14px] font-bold"> Rating</p>
                                    <p>{{ product.rating }}</p>
                                </div>
                            </div>
                            <div class="mt-5 grid grid-cols-6">
                                <div>
                                    <p class="text-[14px] font-bold">Category</p>
                                    <p>{{ product.category }}</p>
                                </div>
                                <div class="ml-20">
                                    <p class="text-[14px] font-bold">Brand</p>
                                    <p>{{ product.brand }}</p>
                                </div>
                            </div>

                            <!-- Example: Display product description -->
                        </div>
                    </div>
                </div>

            </div>
            <div v-else>
                <p>Loading product details...</p>
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

import HeaderCom from './HeaderCom.vue';
import SiderbarCom from './SiderbarCom.vue';

export default {
    name: 'ProductDetail',
    components: {
        SiderbarCom,
        HeaderCom
    },
    data() {
        return {
            product: null
        };
    },
    created() {
        this.fetchProductDetails();
    },
    computed: {
        ...mapGetters(['formData']),
    },
    methods: {
        fetchProductDetails() {
            const productId = this.$route.query.productId;
            console.log(productId);
            if (productId) {
                axios.get(`https://dummyjson.com/products/${productId}`)
                    .then(response => {
                        this.product = response.data;
                    })
                    .catch(error => {
                        console.error('Error fetching product details:', error);
                    });
            } else {
                console.error('error');
            }
        },
        navigateToEditProduct() {
            if (this.product) {
                // Pass the product data as query parameter
                this.$router.push({
                    path: '/AddProduct',
                    
                });

                // Update productFormData in Vuex store
                this.$store.dispatch('updateProductFormData', this.product);
            } else {
                console.error('Product details are not available');
            }

        },
        setThumbnail(image) {
            this.product.thumbnail = image;
        }
    }
};
</script>

  
<style scoped>
/* Add your component-specific styles here */
</style>
