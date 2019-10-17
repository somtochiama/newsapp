import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    count: null,
    news: [],
    error: null
  },
  getters: {
    totalCount: (state) => state.count,
    allNews: (state) => state.news
  },
  mutations: {
    setNews: (state, data) => (state.news = state.news.concat(data)),
    setCount: (state, count) => (state.count = count),
    setError: (state, error) => (state.error = error),
    setLoggedIn: (state, bool) => {
      return state.isLoggedIn = bool
    }
  },
  actions: {
    async getNews({ commit}, { page}) {
      const url = "https://newsapi.org/v2/top-headlines";
      // return new Promise((reject, resolve) => {
      await Axios.get(url, {
          params: {
            language: 'en',
            page,
            apiKey: process.env.VUE_APP_API_KEY,
          },
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`
          }
        })
        .then(response => {
          const { articles, totalResults } = response.data;
          commit('setNews', articles);
          commit('setCount', totalResults)
          // resolve();
        })
        .catch(err => {
          commit('setError', err.response || err)
          // console.log(err.response || err);
          // reject(err)
        })

      // })
    }
  },
  modules: {
  }
})
