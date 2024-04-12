// import { createStore } from 'vuex';
const formInputInit = {
    id: null,
    firstName: '',
    lastName: '',
    age: null,
    gender: '',
    email: '',
    phone: '',
    birthDate: '',
    image: '',
    address: {
      address: '',
      city: '',
      state: ''
    },
    university: '',
    bank: {
      cardExpire: '',
      cardNumber: '',
      cardType: '',
    },
    company: {
      address: {
        address: '',
        city: '',
        state: ''
      },
      department: '',
      name: '',
    },
}
const userStore  ={
  state: {
    formData: formInputInit,
    error: null, 
    userData: null,
  },
  mutations: {
    // Mutation to set form data
    setResetFormData(state) {
      state.formData = formInputInit;
    },
    // setFormData(state, data) {
    //   state.formData = data;
    // },
    setUserData(state, userData) {
      state.userData = userData;
    },
    setError(state, error) {
      state.error = error;
    },
    updateFormData(state, formData) {
      state.formData = formData;
    },
    // Mutation to clear error message
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    // Action to update form data
    updateFormData({ commit }, formData) {
      commit('updateFormData', formData);
    },
    setResetFormData({ commit }) {
      commit('setResetFormData');
    },
    setUserData({ commit }, userData) {
      commit('setUserData', userData);
    },
    // Action to post data to the API
    // Action to post data to the API
    async postDataToAPI({ commit }, userData) {
      try {
        let url;
        let method;
        if (userData.id) {
          // If user has an ID, it's an update
          url = `https://dummyjson.com/users/${userData.id}`;
          method = 'PUT'; 
        } else {
          // Otherwise, it's a new user
          url = 'https://dummyjson.com/users/add';
          method = 'POST';
        }

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error('Failed to post data to API');
        }

        const responseData = await response.json();
        console.log('API Response:', responseData);
        commit('setResetFormData'); 
        commit('clearError');
        return responseData;
      } catch (error) {
        console.error('Error:', error);
        // Set error message in the state
        commit('setError', 'Failed to submit data. Please try again later.');
        // Handle error 
        throw error;
      }
    },
  },
  getters: {
    // Getter to retrieve form data
    getFormData(state) {
      return state.formData;
    },
    getUserData(state) {
      return state.userData;
    },
    // Getter to retrieve error message
    // getError(state) {
    //   return state.error;
    // },
    userData(state) {
      return state.userData;
    },
  },
};

export default userStore ;
