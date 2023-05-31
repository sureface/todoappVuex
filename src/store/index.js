import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    employers: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    addProduct({state}, employers) {
      state.employers.push(employers)
    },

    editProduct({state}, editedProduct) {
      const changedProductsIndex = state.employers.findIndex(product => product.id === editedProduct.id)
      state.employers[changedProductsIndex] = editedProduct
    },

    refreshEmployers({state}, newEmployers) {
      state.employers = newEmployers
    }
  },
  modules: {
  }
})
