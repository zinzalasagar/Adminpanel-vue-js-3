<template>
    <!-- Form Components -->
    <UserCreationForm />
    <UserAddressCom />
    <UserCompanyCom />
    <UserBankCom />
  
    <!-- Submit Button -->
    <div class="mt-6 text-center">
      <button @click="submitForm" class="bg-blue-500 w-[260px] h-[56px] hover:bg-blue-700 text-white font-bold rounded-xl">Submit</button>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  import UserCreationForm from './UserCreation.vue'
  import UserAddressCom from './UserAddressCom.vue'
  import UserCompanyCom from './UserCompanyCom.vue'
  import UserBankCom from './UserBankCom.vue'
  
  export default {
    name: 'FormContainer',
    components: {
      UserCreationForm,
      UserAddressCom,
      UserCompanyCom,
      UserBankCom
    },
    computed: mapState(['formData']),
    methods: {
      submitForm() {
        fetch('https://dummyjson.com/users/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        })
        .then(res => res.json())
        .then(console.log)
        .catch(console.error);
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  