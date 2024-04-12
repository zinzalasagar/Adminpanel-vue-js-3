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
                <h2 class="text-[32px] font-bold text-black">{{ this.formData?.id ? "Edit Product" : "Add New Product" }}</h2>
            </div>
            <div class="container mx-auto mt-3 ">
                <div class="bg-white rounded-2xl shadow-md py-28 px-36">
                    <!-- Product Creation Form -->
                    <form @submit.prevent="createProduct">
                        <!-- Title -->
                        <div class="w-[780px] my-0 mx-auto">
                            <div class="flex justify-between ">
                                <div class="mb-16">
                                    <label for="title" class="block text-[14px] font-medium text-gray-600">Title</label>
                                    <input type="text" id="title" placeholder="Enter title" v-model="formData.title" class="mt-1 placeholder:text-[14px] py-3 pl-4 block w-[360px] h-[52px]  bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                    <p v-if="!formData || !formData.title && submitClicked" class="text-red-600">Please enter a title</p>
                                </div>

                                <!-- Price -->
                                <div class="mb-16 ">
                                    <label for="price" class="block text-[14px] font-medium text-gray-600">Price</label>
                                    <input type="number" id="price" placeholder="Enter price" v-model="formData.price" class="mt-1 placeholder:text-[14px] py-3 pl-4 block w-[360px] h-[52px]  bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                    <p v-if="!formData || !isValidPrice(formData.price) && submitClicked" class="text-red-600">Please enter a price</p>
                                </div>

                            </div>
                            <!-- Description -->
                            <div class="flex justify-center px-14">
                                <div class="mb-16">
                                    <label for="description" class="block text-[14px] font-medium text-gray-600">Description</label>
                                    <textarea id="description" placeholder="Enter description" v-model="formData.description" class="mt-1 placeholder:text-[14px] py-3 pl-4 block w-[780px] h-[100px] bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
                                    <p v-if="!formData || !formData.description && submitClicked" class="text-red-600">Please enter a description</p>
                                </div>
                            </div>

                            <!-- Discount -->
                            <div class="flex justify-between">
                                <div class="mb-16">
                                    <label for="discount" class="block text-[14px] font-medium text-gray-600">Discount</label>
                                    <input type="number" id="discount" placeholder="Enter discount" v-model="formData.discountPercentage" class="mt-1 placeholder:text-[14px] py-3 pl-4 block w-[220px] h-[52px]  bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" step="any">
                                    <p v-if="!formData || !formData.discountPercentage && submitClicked" class="text-red-600">Please enter a discount</p>
                                </div>

                                <!-- Rating -->
                                <div class="mb-16">
                                    <label for="rating" class="block text-[14px] font-medium text-gray-600">Rating</label>
                                    <input type="number" id="rating" placeholder="Enter rating" v-model="formData.rating" class="mt-1 placeholder:text-[14px] py-3 pl-4 block w-[220px] h-[52px]   bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" step="any">
                                    <p v-if="!formData || !formData.rating && submitClicked" class="text-red-600">Please enter a rating</p>
                                </div>

                                <!-- Stock -->
                                <div class="mb-16">
                                    <label for="stock" class="block text-[14px] font-medium text-gray-600">Stock</label>
                                    <input type="number" id="stock" placeholder="Enter stock" v-model="formData.stock" class="mt-1 placeholder:text-[14px] py-3 pl-4 block w-[220px] h-[52px]  bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" step="any">
                                    <p v-if="!formData || !formData.stock && submitClicked" class="text-red-600">Please enter a stock</p>
                                </div>

                            </div>

                            <!-- Brand -->
                            <div class="flex justify-between">
                                <div class="mb-16">
                                    <label for="brand" class="block text-[14px] font-medium text-gray-600">Brand</label>
                                    <select id="brand" v-model="formData.brand" class="mt-1 block w-[360px]  h-[52px]  bg-gray-100  border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                        <option value="">Select Brand</option>
                                        <option v-for="(brand, index) in brandNames" :key="index" :value="brand">{{ brand }}</option>
                                    </select>
                                    <p v-if="!formData || !formData.brand && submitClicked" class="text-red-600">Please select a brand</p>
                                </div>

                                <!-- Category -->
                                <div class="mb-16">
                                    <label for="category" class="block text-[14px] font-medium text-gray-600">Category</label>
                                    <select id="category" v-model="formData.category" class="mt-1 block w-[360px] h-[52px] bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                        <option value="">Select Category</option>
                                        <option v-for="(category, index) in categoryNames" :key="index" :value="category">{{ category }}</option>
                                    </select>
                                    <p v-if="!formData || !formData.category && submitClicked" class="text-red-600">Please select a category</p>
                                </div>
                            </div>

                            <div class="flex justify-between">
                                <!-- Thumbnail -->
                                <div class="mb-16">
                                    <label for="thumbnail" class="block text-[14px] font-medium text-gray-600">Thumbnail</label>
                                    <input type="file" id="thumbnail" accept="image/*" @change="handleThumbnailChange" class="mt-1 placeholder:text-[14px] py-3 pl-4 block w-[360px] h-[52px] bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                    <div v-if="formData.thumbnail || thumbnailUrl" class="mt-2 ">
                                        <img :src="thumbnailUrl" alt="Thumbnail Preview" class="max-w-[150px] h-auto">
                                    </div>
                                    <p v-if="!formData || !formData.thumbnail && submitClicked" class="text-red-600">Please select a thumbnail</p>
                                </div>

                                <!-- Images -->
                                <div class="mb-16">
                                    <label for="images" class="block text-[14px] font-medium text-gray-600">Images</label>
                                    <input type="file" id="images" multiple accept="image/*" @change="handleImagesChange" class="mt-1 placeholder:text-[14px] py-3 pl-4 block w-[360px] h-[52px]  bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                    <div v-if="formData.images && formData.images.length" class="mt-2">
                                        <!-- Display only the first image from the images array -->
                                        <img :src="getImageUrl(formData.images[0])" alt="Image Preview" class="max-w-[150px] h-auto">
                                    </div>

                                    <p v-if="!formData || (!formData.images || (formData.images && !formData.images.length && submitClicked))" class="text-red-600">Please select at least one image</p>
                                </div>

                            </div>
                            <!-- Submit Button -->
                            <div class="mt-6 text-center">
                                <button type="submit" class="bg-blue-500 w-[260px] h-[56px] hover:bg-blue-700 text-white font-bold rounded-xl items-center" :disabled="loading">
                                    <div class="flex items-center gap-[20px] justify-center">
                                        <template v-if="loading">
                                            <span>Add Now</span>
                                            <div class="loader"></div>
                                        </template>
                                        <template v-else>
                                            {{ formData.id ? "Edit Now" : "Add Now" }}
                                        </template>
                                    </div>
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import {
    toast
} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {
    mapActions,
    mapState
} from 'vuex';
import HeaderCom from './HeaderCom.vue'
import SiderbarCom from './SiderbarCom.vue'

export default {
    name: 'ProductCreation',
    components: {
        SiderbarCom,
        HeaderCom
    },

    data() {
        return {
            formData: {
                title: "",
                price: null,
                description: "",
                discountPercentage: "",
                rating: "",
                stock: "",
                brand: "",
                category: "",
                thumbnail: null,
                images: []
            },
            loading: false,
            submitClicked: false,
            brandNames: [],
            categoryNames: []
        };
    },
    setup() {

        const notify = (message) => {
            toast.success(message, {
                autoClose: 3000,

            });
        }
        return {
            notify
        };
    },
    computed: {
        ...mapState('product', ['productForm', 'error']),

        thumbnailUrl() {
            if (this.formData.thumbnail) {
                if (this.formData.thumbnail instanceof File || this.formData.thumbnail instanceof Blob) {
                    return URL.createObjectURL(this.formData.thumbnail);
                } else if (typeof this.formData.thumbnail === 'string') {
                    return this.formData.thumbnail;
                }
            }
            return null;
        },
    },
    created() {

        // Check if product data is passed from Product Detail page
        const productData = this.$route.query.productData;
    if (productData) {
        this.formData = JSON.parse(productData);
        // Clear the product data from query parameter
        this.$router.replace({ query: null });
    }
    
        this.fetchBrandNamesAndCategoryNamesData();

        this.formData = this.$store.state.product.productForm;

        console.log("ProductData", this.$store.state.product.productForm);

        const editProductData = JSON.parse(localStorage.getItem('editProductData'));

        if (editProductData) {
            this.formData = editProductData;
            if (editProductData.images && editProductData.images.length > 0) {
                // Set the existing images in the formData object
                this.formData.images = editProductData.images;
            }
        }

    },

    methods: {

        ...mapActions(['addProduct', 'updateProductFormData']),
        // ...mapState(['addProduct', 'updateProductFormData']),
        async fetchBrandNamesAndCategoryNamesData() {
            try {
                // Make API call to fetch data
                const response = await axios.get('https://dummyjson.com/products');

                if (response.data && response.data.products && Array.isArray(response.data.products)) {

                    const brandNames = response.data.products.map(product => product.brand);

                    this.brandNames = Array.from(new Set(brandNames));

                    const categoryNames = response.data.products.map(product => product.category);

                    this.categoryNames = Array.from(new Set(categoryNames));
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching brand names and category names:', error);
            }
        },

        async createProduct(event) {
            event.preventDefault();
            this.submitClicked = true;

            console.log("Form Data before submission:", this.formData);

            if (!this.formData.thumbnail || !this.formData.images) {
                console.log("Thumbnail or images not found");
                return;

            }

            const productFormData = {
                ...this.formData
            };
            if (this.submitting) return;
            this.submitting = true;
            this.loading = true;
            try {

                const message = this.formData.id ? "Product Successfully Updated" : "Product Successfully  Added";
                await this.addProduct(productFormData);
                console.log("Product created successfully");

                this.notify(message);
                // this.updateProductFormData(productFormData);

                this.resetForm();
                this.$store.dispatch('updateProductFormData', {
                    ...this.$store.state.product.productForm
                });
                localStorage.removeItem('editUserData');

                setTimeout(() => {
                    this.$router.push('/ProductList');
                }, 2000);
            } catch (error) {
                console.error('Error creating product:', error);

            } finally {
                this.loading = false;
                this.submitting = false;
            }
        },
        resetForm() {
            this.formData = {
                title: "",
                price: null,
                description: "",
                discountPercentage: "",
                rating: "",
                stock: "",
                brand: "",
                category: "",
                thumbnail: null,
                images: []
            };
            this.submitClicked = false;
        },
        handleThumbnailChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.formData.thumbnail = file;
            }
        },

        handleImagesChange(event) {
            const files = event.target.files;
            this.formData.images = files ? Array.from(files) : [];
            this.formData.imageUrls = [];
            for (let i = 0; i < this.formData.images.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.formData.imageUrls.push(e.target.result);
                };
                reader.readAsDataURL(this.formData.images[i]);
            }
        },
        getImageUrl(image) {
            if (image instanceof File || image instanceof Blob) {
                return URL.createObjectURL(image);
            } else if (typeof image === 'string') {
                return image;
            }
            return null;
        },
        isValidPrice(price) {
            const numericPattern = /^[+-]?\d+(\.\d+)?$/;
            return numericPattern.test(price);
        },
    }
};
</script>

<style scoped>
/* Add your component-specific styles here */
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
</style>
