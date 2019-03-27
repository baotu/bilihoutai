import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		user:{}, 
  },
  mutations: {
		setuser:(state,value) => {
		  state.user = value;
		}
  },
  actions: {

  }
})
