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
                <div class="flex justify-between mt-4 items-center mb-6 ">
                    <h2 class="text-3xl font-bold text-black">User List</h2>
                    <button @click="navigateToUserCreation" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[147px] h-[49px]">
                        Add New User
                    </button>
                </div>

                <!-- User Table -->
                <div class="container mx-auto py-5 ">
                    <div class="bg-white rounded-2xl shadow-md p-6 relative">
                        <!-- Pagination and Total Records -->
                        <div class=" justify-between mb-4">
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
                                        <input v-model="searchQuery" type="text" placeholder="Search..." @input="search" class="border w-[323px] border-gray-100 bg-gray-100 px-10 py-1 rounded-3xl focus:outline-none focus:border-gray-500">
                                        <span class="absolute inset-y-0 flex items-center">
                                            <img class="ml-3 cursor-pointer" src="../assets/userTable/search.png" alt="Search Icon">
                                        </span>
                                    </div>
                                    <div @click="toggleFilterBox">
                                        <img src="../assets/userTable/Frame 19.png" alt="Filter">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="showFilterBox" class="bg-white absolute right-16 rounded-2xl shadow-2xl p-6 mb-6" style="width: 408px;">
                            <h3 class="text-[18px] font-bold mb-6">Filter by University</h3>
                            <p class="">University</p>
                            <select v-model="selectedUniversity" class="placeholder-gray-300 rounded-lg border-gray-600 px-2 custom-select mb-4 bg-gray-100 w-full">
                                <option value="">Select University</option>
                                <option v-for="university in universities" :key="university" :value="university">{{ university }}</option>
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
                                        <th class="ml-3 text-left  rounded-l-lg ">
                                            <p class="flex justify-between items-center cursor-pointer" @click="sortColumn('name')">User<span class="float-end mt-1">
                                                    <img v-if="sortByColumn === 'name'" :src="sortDirection === 'asc' ? ascendingIcon : descendingIcon" class="mr-12 " alt="">
                                                    <img v-else :src="defaultIcon" class="mr-12" alt="" />
                                                </span></p>
                                        </th>
                                        <th class=" ">
                                            <p class="flex items-center justify-between cursor-pointer " @click="sortColumn('email')">Email<span class="float-end mt-1">
                                                    <img v-if="sortByColumn === 'email'" :src="sortDirection === 'asc' ? ascendingIcon : descendingIcon" class="mr-12 " alt="">
                                                    <img v-else :src="defaultIcon" class="mr-12" alt="" />
                                                </span>
                                            </p>
                                        </th>

                                        <th class="py-4 text-left pl-1">
                                            <p class="flex items-center justify-between cursor-pointer w-[200px]" @click="sortColumn('phone')">Phone<span class="float-end mt-1"> <img v-if="sortByColumn === 'phone'" :src="sortDirection === 'asc' ? ascendingIcon : descendingIcon" class="mr-14 " alt="">
                                                    <img v-else :src="defaultIcon" class="mr-14" alt="" />
                                                </span></p>
                                        </th>
                                        <th class="py-4 text-left pl-5">
                                            <p class="flex items-center justify-between cursor-pointer" @click="sortColumn('university')">University <span class="float-end mt-1"> <img v-if="sortByColumn === 'university'" :src="sortDirection === 'asc' ? ascendingIcon : descendingIcon" class="mr-12 " alt="">
                                                    <img v-else :src="defaultIcon" class="mr-24" alt="" />
                                                </span> </p>
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
                                        <tr v-for="user in displayedUsers" :key="user.id" class="border-b-2">
                                            <td class="px-4 py-2">
                                                <div class="flex items-center mt-2 mb-2">
                                                    <img :src="user.image" alt="User Image" class="h-10 w-10 rounded-full mr-2">
                                                    <span class="text-lg font-semibold">{{ user.name }}</span>
                                                </div>
                                            </td>
                                            <td class="px-4 py-2 text-lg">{{ user.email }}</td>
                                            <td class="px-4 py-2 text-lg">{{ user.phone }}</td>
                                            <td class="px-4 py-2 text-lg">{{ user.university }}</td>
                                            <td class="px-4 py-2 text-center">
                                                <div class="flex justify-center">
                                                    <div class="icon-box">
                                                        <button @click="viewData(user)" class="focus:outline-none">
                                                            <div class="icon-container border px-5 rounded-l-lg p-2">
                                                                <img src="../assets/userTable/eye.png" alt="View" class="h-5 w-5">
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div class="icon-box">
                                                        <button @click="editData(user)" class="focus:outline-none">
                                                            <div class="icon-container border px-5 p-2">
                                                                <img src="../assets/userTable/pencil-write.png" alt="Edit" class="h-5 w-5">
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div class="icon-box">
                                                        <button @click="deleteData(user)" class="focus:outline-none">
                                                            <div class="icon-container border rounded-r-lg px-5 py-2">
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
                        <div class="container mx-auto  py-5" v-if="!noResultsFound">
                            <div class="flex justify-between  ">
                                <div>
                                    Showing {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, totalRecords) }} of {{ totalRecords }}
                                </div>
                                <div class="flex ">
                                    <button @click="prevPage" :disabled="currentPage === 1" class=" px-3 py-1 focus:outline-none pagination-box  border border-gray-200 hover:bg-gray-200 rounded-l-lg ">
                                        <img src="../assets/userTable/Previous.png" alt="Previous" class="h-5 w-5">
                                    </button>
                                    <template v-for="pageNumber in totalPages" :key="pageNumber">
                                        <button @click="gotoPage(pageNumber)" :class="{ 'bg-gray-200': pageNumber === currentPage }" class=" pagination-box border border-gray-200   px-5 py-2 text-[14px]    hover:bg-gray-200">{{ pageNumber }}</button>
                                    </template>
                                    <button @click="nextPage" :disabled="currentPage * pageSize >= totalRecords" class=" pagination-box border border-gary-100  px-3 py-1  text-white rounded-r-lg hover:bg-gray-200 focus:outline-none">
                                        <img src="../assets/userTable/Next.png" alt="Next" class="h-5 w-5">
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
    name: 'UserTable',
    components: {
        SiderbarCom,
        HeaderCom
    },
    data() {
        return {
            users: [],
            currentPage: 1,
            pageSize: 10,
            totalRecords: 0,
            sortByColumn: '',
            sortDirection: 'asc',
            ascendingIcon: require('@/assets/userTable/ascending.png'),
            descendingIcon: require('@/assets/userTable/descending.png'),
            defaultIcon: require('@/assets/userTable/Vector.png'),
            searchQuery: '',
            selectedUniversity: '',
            universities: [],
            showFilterBox: false,
            noResultsFound: false,
            filteredUsers: [],
        };
    },

    created() {
        localStorage.removeItem('editUserData');
        this.$store.dispatch('setResetFormData', this.user);
        this.fetchUsers();
    },

    computed: {
        ...mapState(["user"]),
        displayedUsers() {
            const usersToDisplay = this.filteredUsers.length > 0 ? this.filteredUsers : this.users;

            if (!this.users || this.users.length === 0) {
                return [];
            }

            let filteredUsers = [...this.users];
            if (this.sortByColumn) {
                filteredUsers.sort((a, b) => {
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
            const endIndex = Math.min(startIndex + this.pageSize, filteredUsers.length);

            return usersToDisplay.slice(startIndex, endIndex);

        },
        totalPages() {
            return Math.ceil(this.totalRecords / this.pageSize);
        }
    },

    methods: {
        search() {
            this.filteredUsers = this.users.filter(user =>
                user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
                (!this.selectedUniversity || user.university.toLowerCase() === this.selectedUniversity.toLowerCase())
            );
            this.totalRecords = this.filteredUsers.length;
            this.currentPage = 1;

            this.noResultsFound = this.totalRecords === 0;
        },
        navigateToUserCreation() {

            this.$router.push({
                path: '/UserCreation'
            });
        },
        fetchUsers() {
            axios.get('https://dummyjson.com/users?limit=100')
                .then(response => {
                    if (response.data && Array.isArray(response.data.users)) {
                        this.totalRecords = response.data.total;
                        this.users = response.data.users.map(user => ({
                            id: user.id,
                            name: `${user.firstName} ${user.lastName}`,
                            email: user.email,
                            phone: user.phone,
                            birthDate: user.birthDate,
                            image: user.image,
                            address: {
                                address: user.address.address,
                                city: user.address.city,
                                state: user.address.state
                            },
                            university: user.university,
                            bank: {
                                cardExpire: user.bank.cardExpire,
                                cardNumber: user.bank.cardNumber,
                                cardType: user.bank.cardType,
                            },
                            company: {
                                address: {
                                    address: user.company.address.address,
                                    city: user.company.address.city,
                                    state: user.company.address.state
                                },
                                department: user.company.department,
                                name: user.company.name,
                            }
                        }));
                        this.universities = Array.from(new Set(this.users.map(user => user.university)));
                        this.filteredUsers = [...this.users];
                    } else {
                        console.error('User data not found in response:', response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        },
        viewData(user) {
            // this.$router.push('/UserDetails');
            console.log('Viewing data:', user);
            this.$router.push({
                path: '/UserDetails',
                query: {
                    userId: user.id,
                }
            });
        },
        editData(user) {
            localStorage.setItem('editUserData', JSON.stringify(user));

            this.$router.push({
                path: `/UserCreation`,

            });

            this.$store.dispatch('updateFormData', user);
        },

        deleteData(user) {
            console.log('Deleting user:', user);
            const index = this.users.findIndex(u => u.id === user.id);
            if (index !== -1) {
                this.users.splice(index, 1);
                this.totalRecords = this.users.length;
                console.log('User deleted successfully.');
            } else {
                console.error('User not found:', user);
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
            this.currentPage = 1;
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

            // Sort the filteredUsers array based on the selected column and sorting direction
            this.filteredUsers.sort((a, b) => {
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
            if (this.selectedUniversity) {
                this.filteredUsers = this.users.filter(user =>
                    user.university.toLowerCase() === this.selectedUniversity.toLowerCase()
                );
            } else {
                this.filteredUsers = [...this.users];
            }
            this.totalRecords = this.filteredUsers.length;
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
