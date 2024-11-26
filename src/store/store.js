import { createStore } from 'vuex'
import axios from 'axios'

const API_KEY = '2b88d25df0d44b61a11db6b910aff39d'
const BASE_URL = 'https://newsapi.org/v2'

export default createStore({
  state: {
    news: [],
    totalResults: 0,
    loading: false,
    error: null,
  },
  mutations: {
    SET_NEWS(state, { articles, totalResults }) {
      state.news = articles
      state.totalResults = totalResults
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
  },
  actions: {
    async fetchNews({ commit }, { query, country, category, page = 1 }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await axios.get(
          `${BASE_URL}/${country || category ? 'top-headlines' : 'everything'}`,
          {
            params: {
              q:
                (country && query) || (category && query) || (category && country)
                  ? query
                  : country || category
                    ? ''
                    : query || 'tesla',
              country,
              category,
              page,
              apiKey: API_KEY,
            },
          },
        )

        // Filter articles having values for every key, hence excluding articles with the null and undefined values
        let filteredArticles = response.data.articles.filter((article) => {
          return Object.keys(article).every((key) => {
            const value = article[key]
            if (value && typeof value === 'object') {
              return Object.keys(value).every(
                (subKey) => value[subKey] !== null && value[subKey] !== '',
              )
            }
            return value !== null && value !== '' && value !== undefined
          })
        })
        commit('SET_NEWS', {
          articles: filteredArticles,
          totalResults: filteredArticles?.length,
        })
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
  },

  getters: {
    news: (state) => state.news,
    totalResults: (state) => state.totalResults,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
})
