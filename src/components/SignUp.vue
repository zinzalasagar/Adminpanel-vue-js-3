<template>
  <div class=" image-set min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-7 px-4 shadow sm:rounded-3xl sm:px-10">
        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
          <h2 class="text-center text-3xl font-bold text-gray-900">Create an Account</h2>
        </div>
        <form class="space-y-6" @submit.prevent="register">
          <div class="mt-8">
            <label for="email" class="block text-sm font-medium text-gray-700">Name:</label>
            <div class="mt-3">
              <input id="email" name="name" type="text" autocomplete="name" required v-model="name" placeholder="Enter your name" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 hover:bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>
          <div class="mt-8">
            <label for="email" class="block text-sm font-medium text-gray-700">Email address:</label>
            <div class="mt-3">
              <input id="email" name="email" type="email" autocomplete="email" required v-model="email" placeholder="Enter your Email" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 hover:bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
            <div class="mt-3">
              <input id="password" name="password" type="password" autocomplete="new-password" required v-model="password" placeholder="Enter your Password" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 hover:bg-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>
          <div class="mt-6">
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
          </div>
        </form>
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-00">Already have an account?</span>
              <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Sign in here</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "SignUp",
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    register() {
      // Perform registration logic here
      console.log('Registering with:', this.email, this.password);
    }
  }
};
</script>

<style>
.image-set{
    background-image: url(../assets/backGround.jpg);
}

</style>
