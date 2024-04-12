<template>
  <div class="form-container relative w-[560px] h-auto">
    <h2 class="form-title ">Manage Account</h2>
    <button @click="closeForm" class="close-icon">
      <img src="../assets/Logout/Group.png" class="w-6 h-6 mb-4" alt="Cancel Logout">
    </button>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name" class="form-label">Name:</label>
        <input type="text" v-model="formData.name" id="name" class="form-input " placeholder="Enter your name">
        <div v-if="!isNameValid" class="error-message">Name is required</div>
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email:</label>
        <input type="email" v-model="formData.email" id="email" class="form-input" placeholder="Enter your email">
        <div v-if="!isEmailValid" class="error-message">Please enter a valid email address</div>
      </div>
      <div class="form-group">
        <label for="image" class="form-label">Profile Picture:</label>
        <input type="file" @change="handleImageChange" id="image" accept="image/*" class="form-input">
        <img :src="imageUrl" v-if="imageUrl" alt="Selected Image" class="preview-image">
      </div>
      <button type="submit" class="form-button">Update</button>
    </form>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'ManageAccountForm',
  data() {
    return {
      formData: {
        name: '',
        email: ''
      },
      imageUrl: null,
      isNameValid: true,
      isEmailValid: true,
      toastShown: false
    };
  },
  methods: {
    handleSubmit() {
      if (!this.formData.name) {
        this.isNameValid = false;
        return;
      } else {
        this.isNameValid = true;
      }
      if (!this.validateEmail(this.formData.email)) {
        this.isEmailValid = false;
        return;
      } else {
        this.isEmailValid = true;
      }

      // Add logic to update the account details
      console.log('Form submitted with data:', this.formData);

      // Display success message using toast
      toast.success('Account updated successfully', {
        autoClose: 2000,
      });
      this.$emit('close');
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Convert the selected image to a data URL
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageUrl = null;
      }
    },
    validateEmail(email) {
      // Email validation regex pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
    // After updating, you can close the form
    closeForm() {
      console.log('Close button clicked');
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}

.form-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.form-button:hover {
  background-color: #0056b3;
}

.preview-image {
  max-width: 100%;
  margin-top: 10px;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #333;
}

.close-icon img {
  width: 24px;
  height: 24px;
}
</style>
