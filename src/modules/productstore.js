
const formData = {
  id: null,
  title: '',
  description: '',
  price: null,
  discountPercentage: null,
  rating: null,
  stock: null,
  brand: '',
  category: '',
  thumbnail: '',
  images: []
};

const productStore = {
  // namespaced: true,
  state: {
    productForm: { ...formData },
    error: null,
    productFormData: null,
  },
  mutations: {
    setResetFormData(state) {
      state.productForm = { ...formData };
    },
    setProductData(state, productFormData) {
      state.productFormData = productFormData;
    },
    setError(state, error) {
      state.error = error;
    },
    updateProductFormData(state, productForm) {
      state.productForm = productForm;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    updateProductFormData({ commit }, productForm) {
      commit('updateProductFormData', productForm);
    },
     setResetFormData({ commit }) {
      commit('setResetFormData');
    },
     setProductData({ commit }, productFormData) {
      commit('setProductData', productFormData);
    },
    async addProduct({ commit }, productFormData) {
      try {
        
        // let method;
        // if (productFormData.id) {
          // url = `https://dummyjson.com/products/${productFormData.id}`;
              // method = 'PATCH';
          // } else {
            // url = 'https://dummyjson.com/products/add';
            // method = 'POST';
            // }
            const url = 'https://dummyjson.com/products/add';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productFormData)
            });
    
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error('Failed to post data to API');
            }
            console.log('API Response:', responseData);
            commit('setResetFormData');
            commit('clearError');
            return responseData;
      } catch (error) {
          console.error('Error adding product:', error);
          commit('setError', error.message || 'Failed to add product');
          throw error;
      }
  }
  
  },
  getters: {
    getProductForm(state) {
      return state.productForm;
    },
    getProductFormData(state) {
      return state.productFormData;
    },
    productFormData(state) {
      return state.productFormData;
    },
  }
};

export default productStore;


