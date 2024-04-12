<template>
<div class="flex   bg-gray-200 ">
    <!-- Sidebar -->
    <SiderbarCom class="sidebar " />

    <!-- Main Content -->
    <div class="flex flex-col flex-1 overflow-hidden">
        <!-- Header -->
        <HeaderCom class="header " />

        <!-- Content Area -->
        <div class=" h-[90vh] overflow-y-auto">
            <div class="px-6 container mx-auto py-5 ">
                <!-- Dashboard Title -->
                <div class="flex items-center mb-6" style="width: 161px; height: 44px; ">
                    <h2 class="text-[32px]">Dashboard</h2>
                </div>
    
                <!-- Grid Layout for User, Product, and Post Sections -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- User Section -->
    
                    <div class="bg-white rounded-2xl shadow-md p-6 flex flex-col">
                        <!-- Added 'items-end' class -->
                        <div class="flex justify-between w-full">
                            <p class="text-gray-600 text-left font-semibold">Total User</p>
                            <img src="../assets/HomesIcons/Users.png" class="mr-2" alt="Users">
                        </div>
                        <span class="text-[28px] font-semibold text-black-500 -mt-2 text-left">{{ totalProducts }}</span>
                        <div class="mt-6 flex items-center">
                            <img src="../assets/Buttons/ic-trending-up-24px (1).png" class="mr-2" alt="user">
                            <span class="textColor font-bold">{{ userChangePercentage }}</span>
                            <p class="ml-2"> {{ userChangeMessage }}</p>
                        </div>
                    </div>
    
                    <!-- Product Section -->
                    <div class="bg-white rounded-2xl shadow-md p-6 flex flex-col">
                        <!-- Added 'items-end' class -->
                        <div class="flex justify-between w-full">
                            <p class="text-gray-600 text-left  font-bold">Total Products</p>
                            <img src="../assets/HomesIcons/Product.png" class="mr-2" alt="Product">
                        </div>
                        <span class="text-[28px] font-bold text-black-500 -mt-2 text-left">{{ totalProducts }}</span>
                        <div class="mt-6 flex items-center">
                            <img src="../assets/Buttons/ic-trending-up-24px (1).png" class="mr-2" alt="Icon">
                            <span class="textColor font-bold">{{ productChangePercentage }}</span>
                            <p class="ml-2"> {{ productChangeMessage }}</p>
                        </div>
                    </div>
    
                    <!-- Post Section -->
                    <div class="bg-white rounded-2xl shadow-md p-6 flex flex-col">
                        <!-- Added 'items-end' class -->
                        <div class="flex justify-between w-full">
                            <p class="text-gray-600 text-left font-bold">Total Post</p>
                            <img src="../assets/HomesIcons/Posts.png" class="mr-2" alt="Post">
                        </div>
                        <span class="text-[28px] font-semibold text-black-500 -mt-2 text-left">{{ totalPosts }}</span>
                        <div class="mt-6 flex items-center">
                            <img src="../assets/Buttons/ic-trending-down-24px.png" class="mr-2" alt="Post">
                            <span class="textC font-bold">{{ postChangePercentage }}</span>
                            <p class="ml-2"> {{ postChangeMessage  }}</p>
                        </div>
                    </div>
                </div>
    
                <!-- TodoList.vue -->
    
                <div class="container mx-auto py-5">
                    <div class="bg-white rounded-2xl shadow-md p-6">
                        <h2 class="text-[24px]  font-bold mb-6">Todo list</h2>
                        <div class="overflow-x-auto">
                            <div class="h-96 overflow-y-auto">
                                <table class="table-auto w-full">
                                    <thead class="ml-1">
                                        <tr class="bg-gray-200 text-black-400 font-bold  rounded-md">
                                            <td class="py-4  text-[14px] pl-4 rounded-l-lg">Id</td>
                                            <td class="py-4 text-[14px] ">ToDo</td>
                                            <td class="py-4  text-[14px] pr-14 text-right rounded-r-lg pl-5">Status</td>
                                        </tr>   
                                    </thead>
                                    <tbody>
                                        <tr class="border-b" v-for="(todo, index) in paginatedTodos" :key="todo.id">
                                            <td class="py-6  text-[14px] font-semibold pl-3">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                                            <td class="py-6 text-[14px] font-semibold">{{ todo.todo }}</td>
                                            <td class="py-2 pr-4 flex justify-end items-center mt-2">
                                                <button class="px-4 py-1 bg-green-400 text-white rounded-3xl hover:bg-green-600" v-if="todo.completed">
                                                    Completed
                                                </button>
                                                <button class="px-6 py-1 bg-yellow-400 text-white rounded-3xl hover:bg-yellow-500" v-else>
                                                    Pending
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
export default {
    name: 'HomeCom',
    components: {
        SiderbarCom,
        HeaderCom,
    },
    data() {
        return {
            totalUsers: '',
            userChangePercentage: '',
            userChangeMessage: '',
            totalProducts: 'Loading...',
            productChangePercentage: '',
            productChangeMessage: '',
            totalPosts: 'Loading...',
            postChangePercentage: '',
            postChangeMessage: '',
            totalTodoData: '',
            todos: [],
            currentPage: 1,
            pageSize: 10,
        }
    },
    created() {
        this.fetchUserData();
        this.fetchProductData();
        this.fetchPostData();
        this.fetchTodoData();
    },
    computed: {
        totalPages() {
            return Math.ceil(this.todos.length / this.pageSize);
        },
        paginatedTodos() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.todos.slice(startIndex, endIndex);
        }
    },
    methods: {

        async loadData() {
            let user = await localStorage.getItem('isLoggedIn');

            if (!user) {
                this.$router.push({
                    path: '/Login',
                });
            } else {
                this.name = JSON.parse(user).name;
            }
        },
        fetchUserData() {
            // User Data Fetch
            fetch('https://dummyjson.com/users')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data || typeof data.total === 'undefined') {
                        throw new Error('Invalid data format: Expected an object with a "totalUsers" property');
                    }

                    const totalUsers = data.total;
                    const changePercentage = '8.5%';
                    const changeMessage = 'Up from yesterday';

                    this.totalUsers = totalUsers.toLocaleString();
                    this.userChangePercentage = changePercentage;
                    this.userChangeMessage = changeMessage;
                })
                .catch(error => console.error('Error fetching user data:', error.message));
        },

        // Product Data Fetch
        fetchProductData() {
            fetch('https://dummyjson.com/products')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // console.log(data);
                    // Check if data is an array or if it needs to be extracted from the response
                    if (Array.isArray(data)) {

                        const totalProducts = data.length;
                        this.totalProducts = totalProducts.toLocaleString();
                        this.productChangePercentage = '1.3%';
                        this.productChangeMessage = 'Up from past week';

                    } else if (data && data.products && Array.isArray(data.products)) {
                        // Extract array of products from response
                        const totalProducts = data.total;
                        this.totalProducts = totalProducts.toLocaleString();
                        this.productChangePercentage = '1.3%';
                        this.productChangeMessage = 'Up from past week';

                    } else {
                        throw new Error('Invalid data format: Expected an array');
                    }
                })
                .catch(error => console.error('Error fetching product data:', error.message));
        },

        fetchPostData() {
            // Post Data Fetch
            fetch('https://dummyjson.com/posts')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data || typeof data.total === 'undefined') {
                        throw new Error('Invalid data format: Expected an object with a "totalPosts" property');
                    }

                    const totalPosts = data.total;
                    const changePercentage = '4.3%';
                    const changeMessage = 'Down from yesterday';

                    this.totalPosts = totalPosts.toLocaleString();
                    this.postChangePercentage = changePercentage;
                    this.postChangeMessage = changeMessage;
                })
                .catch(error => console.error('Error fetching post data:', error.message));
        },

        // Corrected placement of fetchTodoData method
        fetchTodoData() {
            fetch('https://dummyjson.com/todos?limit=10&skip=0')
                .then(response => response.json())
                .then(data => {
                    this.todos = data.todos;
                })
                .catch(error => console.error('Error fetching todo data:', error.message));
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        }

    },
    async mounted() {
        await this.loadData();
    }
}
</script>

<style>
.textColor {
    color: rgba(0, 182, 155, 1);

}

.textC {
    color: rgba(249, 60, 101, 1);

}
</style>
