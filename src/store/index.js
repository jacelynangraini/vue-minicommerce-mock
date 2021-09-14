import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import routeMock from '../api-mock'

// axios mock method
const mock = new MockAdapter(axios)

mock.onGet("/api/products").reply(200, {
  ...routeMock[0].response.data
})

for (let index = 0; index < routeMock.length; index++) {
  mock.onGet(`/api/products/product-${index}`).reply(200, {
    ...routeMock[index].response.data
  })
}

// // Product 1
// mock.onGet("/api/products/product-1").reply(200, {
//   ...routeMock[1].response.data
// })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    product:{},
    products:[],
    carts:[],
    shipping:{},
    payment: {}
  },
  mutations: {
    setProduct (state, value) {
      state.product = value
    },
    setProducts (state, value) {
      state.products = value
    }
  },
  actions: {
    getProducts ({ commit }) {
      axios.get("/api/products").then(function (response) {
        commit('setProducts', response.data)
      });
    },
    getProduct({commit}, {data}){
      axios.get(`/api/products/${data.id}`).then(function (response) {
        commit('setProduct', response.data)
      });
    }
  },
  getters: {
    products: state => state.products,
    product: state => state.product
  }

})
