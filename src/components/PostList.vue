<template>
<div class="flex bg-gray-100">
    <!-- Sidebar -->
    <div class="static">
        <SidebarCom />
    </div>

    <!-- Main Content -->
    <div class="flex flex-col flex-1 overflow-hidden">
        <!-- Header -->
        <div class="static">
            <HeaderCom />
        </div>
        <div class="px-6 container mx-auto py-5 h-[90vh] overflow-y-auto ">
            <div class="flex items-center mb-6">
                <h2 class="text-3xl font-bold text-black">Post List</h2>
            </div>
            <div class="grid grid-cols-3 gap-7">
                <!-- Render boxes dynamically with fetched data -->

                <div v-for="(post, index) in postsWithTags" :key="index" class="bg-white rounded-lg shadow-md p-6 pb-8 flex flex-col justify-between " style="border-radius: 14px;">
                    <div>
                        <p class="text-[16px] font-bold mt-4">{{ post.title }}</p>
                        <p class="mt-4">{{ post.body }}</p>
                    </div>
                    <div class="mt-4 flex items-center justify-between">
                        <div class="">
                            <span  v-for="(tag, tagIndex) in post.tags" :key="tagIndex" :class="getTagClass(tagIndex)" style="margin-right: 10px; width: 60px; font-weight: 600; ">{{ tag.charAt(0).toUpperCase() + tag.slice(1) }}</span>
                        </div>
                        <div class=" gap-1 bg-rose-600  text-white rounded-full p-2 flex justify-between items-center  w-[60px] h-[33px]">
                            <img src="../assets/dil.png" alt="" class="w-[18px] h-[18px]">
                            <p class="">0{{ post.reactions }}</p>
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
import HeaderCom from './HeaderCom.vue';
import SidebarCom from './SiderbarCom.vue';

export default {
    name: 'PostList',
    components: {
        HeaderCom,
        SidebarCom
    },
    data() {
        return {
            posts: []
        };
    },
    computed: {
        postsWithTags() {
            return this.posts.map(post => ({
                ...post,
                tags: Array.isArray(post.tags) ? post.tags : []
            }));
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('https://dummyjson.com/posts');

                if (Array.isArray(response.data)) {
                    this.posts = response.data;
                } else if (response.data && typeof response.data === 'object' && Array.isArray(response.data.posts)) {
                    this.posts = response.data.posts;
                } else {
                    console.error('Error fetching data: Invalid response format');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        getTagClass(index) {
            const colors = [
                'bg-emerald-100 text-emerald-500',
                'bg-orange-100 text-yellow-500',
                'bg-purple-200 text-purple-500'
            ];
            return `px-2 py-1 rounded mr-2 ${colors[index % colors.length]}`;
        }
    }
};
</script>

<style>
/* Add your styles here */
</style>
