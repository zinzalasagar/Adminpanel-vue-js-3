<template>
<div class="flex bg-gray-100">
    <!-- Sidebar -->
    <SiderbarCom />

    <!-- Main Content -->
    <div class="flex flex-col flex-1 overflow-hidden">
        <!-- Header -->
        <HeaderCom />
        <div class="h-[90vh] overflow-y-auto">
            <div class="px-6 container mx-auto py-5">
                <div class="flex justify-between mt-4 items-center mb-6">
                    <h2 class="text-3xl font-bold text-black">Product List</h2>
                    <button @click="navigateToProductCreation" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[147px] h-[49px]">
                        Add Product
                    </button>
                </div>

                <!-- Product Table -->
                <div class="container mx-auto py-5">
                    <div class="bg-white rounded-2xl shadow-md p-6 relative">
                        <!-- Pagination and Total Records -->
                        <div class="justify-between mb-4">
                            <div class="mr-3 pagination-inputs">
                                <div class="flex items-center">
                                    <p class="mr-4 text-gray-500">Show</p>
                                    <select class="custom-select cursor-pointer bg-gray-100 rounded-3xl" v-model="pageSize" @change="pageSizeChanged">
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
                                    </select>
                                    <p class="ml-4 text-gray-500">Entries</p>
                                </div>

                                <div class="flex items-center">
                                    <div class="relative mr-5">
                                        <input type="text" v-model="searchQuery" placeholder="Search..." @input="search" class="border w-[323px] border-gray-100 bg-gray-100 px-10 py-1 rounded-3xl focus:outline-none focus:border-gray-500" />
                                        <span class="absolute inset-y-0 flex items-center">
                                            <img class="ml-3 cursor-pointer" src="../assets/userTable/search.png" alt="Search Icon" />
                                        </span>
                                    </div>
                                    <div @click="toggleFilterBox">
                                        <img src="../assets/userTable/Frame 19.png" alt="Filter" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="showFilterBox" class="bg-white absolute right-16 rounded-2xl shadow-2xl p-6 mb-6" style="width: 408px;">
                            <h3 class="text-[18px] font-bold mb-6">Filter by Category</h3>
                            <p class="">Category</p>
                            <select v-model="selectedCategory" class="placeholder-gray-300 rounded-lg border-gray-600 px-2 custom-select mb-4 bg-gray-100 w-full">
                                <option value="">Select Category</option>
                                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                            </select>
                            <button @click="applyFilter" class="bg-blue-500 block m-auto hover:bg-blue-700 text-white font-bold mt-4 mb-2 py-2 px-4 rounded w-[130px]">
                                Apply
                            </button>
                        </div>
                        <!-- Table -->
                        <div class="h-[350px] overflow-auto">
                            <table class="table-auto w-full">
                                <!-- Table Headers -->
                                <thead>
                                    <tr class="bg-gray-100 text-black font-bold text-lg">
                                        <th class="ml-5 text-left rounded-l-lg">
                                            <p class="flex justify-between items-center  cursor-pointer" @click="sortColumn('title')">
                                                Product<span class="float-end mt-1 ml-5">
                                                    <img v-if="sortByColumn === 'title'" :src="sortDirection === 'asc' ? ascendingIcon : descendingIcon" class="mr-12" alt="" />
                                                    <img v-else :src="defaultIcon" class="mr-12 " alt="" />
                                                </span>
                                            </p>
                                        </th>
                                        <th class=" ">
                                            <p class="flex items-center justify-between cursor-pointer" @click="sortColumn('price')">
                                                Price
                                                <span class="float-end mt-1">
                                                    <img v-if="sortByColumn === 'price'" :src="sortDirection === 'asc' ? ascendingIcon : descendingIcon" class="ml-12 mr-12" alt="" />
                                                    <img v-else :src="defaultIcon" class="ml-12 mr-12" alt="" />
                                                </span>
                                            </p>
                                        </th>

                                        <th class="py-4 text-left pl-5">
                                            <p class="flex items-center justify-between cursor-pointer" @click="sortColumn('discountPercentage')">
                                                Discount
                                                <span class="float-end mt-1">
                                                    <img v-if="sortByColumn === 'discountPercentage'" :src="sortDirection === 'asc' ? ascendingIcon : descendingIcon" class="ml-10 mr-14" alt="" />
                                                    <img v-else :src="defaultIcon" class="ml-10 mr-14" alt="" />
                                                </span>
                                            </p>
                                        </th>
                                        <th class="py-4 text-left pl-5">
                                            <p class="flex items-center justify-between cursor-pointer" @click="sortColumn('brand')">
                                                Brand
                                                <span class="float-end mt-1">
                                                    <img v-if="sortByColumn === 'brand'" :src="sortDirection === 'asc' ? ascendingIcon : descendingIcon" class="ml-10 mr-14" alt="" />
                                                    <img v-else :src="defaultIcon" class="ml-10 mr-14" alt="" />
                                                </span>
                                            </p>
                                        </th>
                                        <th class="py-4 text-left pl-5">
                                            <p class="flex items-center justify-between cursor-pointer" @click="sortColumn('category')">
                                                Category
                                                <span class="float-end mt-1">
                                                    <img v-if="sortByColumn === 'category'" :src="sortDirection === 'asc' ? ascendingIcon : descendingIcon" class="ml-12 mr-12" alt="" />
                                                    <img v-else :src="defaultIcon" class="ml-12 mr-12" alt="" />
                                                </span>
                                            </p>
                                        </th>
                                        <th class="py-4 text-left pl-5">
                                            <p class="flex items-center justify-between cursor-pointer" @click="sortColumn('rating')">
                                                Rating
                                                <span class="float-end mt-1">
                                                    <img v-if="sortByColumn === 'rating'" :src="sortDirection === 'asc' ? ascendingIcon : descendingIcon" class="ml-10 mr-14" alt="" />
                                                    <img v-else :src="defaultIcon" class="ml-10 mr-14" alt="" />
                                                </span>

                                            </p>
                                        </th>
                                        <th class="py-4 text-center rounded-r-lg">Actions</th>
                                    </tr>
                                </thead>
                                <!-- Table Body -->
                                <tbody>
                                    <tr v-if="noResultsFound" class="border-b-2">
                                        <td colspan="5" class="px-4 py-2 text-center text-red-500 font-bold">
                                            No users found with the provided name.
                                        </td>
                                    </tr>
                                    <template v-else>
                                        <tr v-for="product in displayedProduct" :key="product.id" class="border-b-2">
                                            <td class="px-4 py-2">
                                                <div class="flex items-center mt-2 mb-2">
                                                    <img :src="product.thumbnail" alt="Product Thumbnail" class="h-[40px] w-[75px] rounded mr-2" />
                                                    <span class="text-lg font-semibold">{{
                                                     product.title
                                                     }}</span>
                                                </div>
                                            </td>
                                            <td class="px-4 py-2 text-lg">{{ product.price }}</td>
                                            <td class="px-4 py-2 text-lg">
                                                {{ product.discountPercentage }}
                                            </td>
                                            <td class="px-4 py-2 text-lg">{{ product.brand }}</td>
                                            <td class="px-4 py-2 text-lg">{{ product.category }}</td>
                                            <td class="px-4 py-2 text-lg">{{ product.rating }}</td>
                                            <td class="px-4 py-2 text-center">
                                                <div class="flex justify-center">
                                                    <div class="icon-box">
                                                        <button @click="viewData(product)" class="focus:outline-none">
                                                            <div class="icon-container border px-5 rounded-l-lg p-2 w-[32px]">
                                                                <img src="../assets/userTable/eye.png" alt="View" class="h-5 w-5">
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div class="icon-box">
                                                        <button @click="editData(product)" class="focus:outline-none">
                                                            <div class="icon-container border px-5 p-2  w-[32px]">
                                                                <img src="../assets/userTable/pencil-write.png" alt="Edit" class="h-5 w-5">
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div class="icon-box">
                                                        <button @click="deleteData(product)" class="focus:outline-none">
                                                            <div class="icon-container border rounded-r-lg px-5 py-2  w-[32px]">
                                                                <img src="../assets/userTable/bin.png" alt="Delete" class="h-5 w-5">
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination -->
                        <div class="container mx-auto py-5" v-if="!noResultsFound">
                            <div class="flex justify-between">
                                <div>
                                    Showing {{ (currentPage - 1) * pageSize + 1 }} -
                                    {{ Math.min(currentPage * pageSize, totalRecords) }} of
                                    {{ totalRecords }}
                                </div>
                                <div class="flex">
                                    <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 focus:outline-none pagination-box border border-gray-200 hover:bg-gray-200 rounded-l-lg">
                                        <img src="../assets/userTable/Previous.png" alt="Previous" class="h-5 w-5" />
                                    </button>
                                    <template v-for="pageNumber in totalPages" :key="pageNumber">
                                        <button @click="gotoPage(pageNumber)" :class="{ 'bg-gray-200': pageNumber === currentPage }" class="pagination-box border border-gray-200 px-5 py-2 text-[14px] hover:bg-gray-200">
                                            {{ pageNumber }}
                                        </button>
                                    </template>
                                    <button @click="nextPage" :disabled="currentPage * pageSize >= totalRecords" class="pagination-box border border-gary-100 px-3 py-1 text-white rounded-r-lg hover:bg-gray-200 focus:outline-none">
                                        <img src="../assets/userTable/Next.png" alt="Next" class="h-5 w-5" />
                                    </button>
                                </div>
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
import HeaderCom from './HeaderCom.vue'
import SiderbarCom from './SiderbarCom.vue'
import axios from 'axios';

import {
    mapState
} from 'vuex';

export default {
    name: 'ProductList',
    components: {
        SiderbarCom,
        HeaderCom
    },
    data() {
        return {
            products: [],
            currentPage: 1,
            pageSize: 10,
            totalRecords: 0,
            sortByColumn: '',
            sortDirection: 'asc',
            ascendingIcon: require('@/assets/userTable/ascending.png'),
            descendingIcon: require('@/assets/userTable/descending.png'),
            defaultIcon: require('@/assets/userTable/Vector.png'),
            searchQuery: '',
            selectedCategory: '',
            categories: [],
            showFilterBox: false,
            noResultsFound: false,
            filteredProducts: []
        };
    },
    created() {
        localStorage.removeItem('editProductData');
        this.$store.dispatch('setResetFormData', this.product);
        this.fetchProducts();
    },
    computed: {
        ...mapState(["product"]),
        displayedProduct() {
            const ProductsToDisplay = this.filteredProducts.length > 0 ? this.filteredProducts : this.users;

            if (!this.products || this.products.length === 0) {
                return [];
            }

            let filteredProducts = [...this.products];
            if (this.sortByColumn) {
                filteredProducts.sort((a, b) => {
                    let fieldA = a[this.sortByColumn];
                    let fieldB = b[this.sortByColumn];

                    // Ensure field values are strings before applying toLowerCase
                    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
                        fieldA = fieldA.toLowerCase();
                        fieldB = fieldB.toLowerCase();
                    }

                    if (fieldA < fieldB) return this.sortDirection === 'asc' ? -1 : 1;
                    if (fieldA > fieldB) return this.sortDirection === 'asc' ? 1 : -1;
                    return 0;
                });
            }

            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = Math.min(startIndex + this.pageSize, filteredProducts.length);
            return ProductsToDisplay.slice(startIndex, endIndex);

        },

        totalPages() {
            return Math.ceil(this.totalRecords / this.pageSize);
        }
    },
    methods: {
        search() {
            this.filteredProducts = this.products.filter(product =>
                product.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
                (!this.selectedCategory || product.category.toLowerCase() === this.selectedCategory.toLowerCase())
            );

            this.totalRecords = this.filteredProducts.length;
            this.currentPage = 1;
            this.noResultsFound = this.totalRecords === 0;
        },

        navigateToProductCreation() {
            this.$router.push({
                path: '/AddProduct'
            });
        },
        fetchProducts() {
            axios.get('https://dummyjson.com/products?limit=100')
                .then(response => {
                    if (response.data && Array.isArray(response.data.products)) {
                        this.totalRecords = response.data.total;
                        this.products = response.data.products.map(product => ({
                            id: product.id,
                            title: product.title,
                            description: product.description,
                            price: product.price,
                            discountPercentage: product.discountPercentage,
                            images: product.images,
                            brand: product.brand,
                            category: product.category,
                            rating: product.rating,
                            stock: product.stock,
                            thumbnail: product.thumbnail,
                        }));
                        this.categories = Array.from(new Set(this.products.map(product => product.category)));
                        this.filteredProducts = [...this.products];

                    } else {
                        console.error('Product data not found in response:', response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        },
        viewData(product) {
            console.log('Viewing data:', product);
            this.$router.push({
                path: '/ProductDetail',
                query: {
                    productId: product.id,
                }

            });

        },
        editData(product) {
            localStorage.setItem('editProductData', JSON.stringify(product));
            // console.log('Editing data:', this.$store.state.product);
            // console.log("updateProductFormData", product);
            this.$router.push({
                path: `/AddProduct`,

            });
            this.$store.dispatch('updateProductFormData', product);
            // console.log("ProductDat0000000000000a", this.$store.state.product.productForm)
        },
        deleteData(product) {
            console.log('Deleting data:', product);
            const index = this.products.findIndex(p => p.id === product.id);
            if (index !== -1) {
                this.products.splice(index, 1);
                this.totalRecords--;
            } else {
                console.error('Product not found:', product);
            }
        },
        nextPage() {
            if (this.currentPage * this.pageSize < this.totalRecords) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        pageSizeChanged() {
            this.currentPage = 1; // Reset to first page when page size changes
        },
        gotoPage(pageNumber) {
            this.currentPage = pageNumber;
        },
        sortColumn(column) {
            // Toggle sorting direction if the same column is clicked again
            if (this.sortByColumn === column) {
                // Toggle sorting direction if the same column is clicked again
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                // Default to ascending order when a new column is selected
                this.sortDirection = 'asc';
            }
            this.sortByColumn = column;

            // Sort the filteredProducts array based on the selected column and sorting direction
            this.filteredProducts.sort((a, b) => {
                let fieldA = a[column];
                let fieldB = b[column];

                // Ensure field values are strings before applying toLowerCase
                if (typeof fieldA === 'string' && typeof fieldB === 'string') {
                    fieldA = fieldA.toLowerCase();
                    fieldB = fieldB.toLowerCase();
                }

                if (fieldA < fieldB) return this.sortDirection === 'asc' ? -1 : 1;
                if (fieldA > fieldB) return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        },
        toggleFilterBox() {
            this.showFilterBox = !this.showFilterBox;
        },
        applyFilter() {
            if (this.selectedCategory) {
                this.filteredProducts = this.products.filter(product =>
                    product.category.toLowerCase() === this.selectedCategory.toLowerCase()
                );
            } else {
                this.filteredProducts = [...this.products];
            }
            this.totalRecords = this.filteredProducts.length;
            this.currentPage = 1;
            this.showFilterBox = false;
        },

    },
};
</script>

<style scoped>
.custom-select {
    height: 40px;
    padding: 10px 24px;
    margin-top: 15px;
    margin-bottom: 15px;
}

.pagination-inputs {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pagination-inputs select {
    width: 100px;
}

/* Additional styles for the table and its headers */
.table-auto th {
    text-align: left;
    font-weight: bold;
}

.table-auto td,
.table-auto th {
    padding: 10px;
}

/* Additional styles for the icons in the table */
.icon-box {
    margin-right: 10px;
}

.icon-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
}

/* Adjustments for the pagination buttons */
.container mx-auto .py-5 .flex .justify-between .m-4 button {
    padding: 5px 10px;
}
</style>
