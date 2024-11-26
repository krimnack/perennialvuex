<script setup>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import NewsCard from '@/components/NewsCard.vue'
import { computed, ref } from 'vue'
import { newsCategories } from '@/constants/constants'
import { countriesObject } from '@/utils'

const getStore = useStore()

const query = ref('')
const country = ref('')
const category = ref('')
const page = ref(1)

const totalResults = computed(() => getStore.getters.totalResults)
const loading = computed(() => getStore.getters.loading)
const error = computed(() => getStore.getters.error)

const searchNews = () => {
  getStore.dispatch('fetchNews', {
    query: query.value,
    country: country.value,
    category: category.value,
    page: page.value,
  })
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    searchNews()
  }
}

const nextPage = () => {
  page.value++
  searchNews()
}

const checkEmptyParams = () => {
  return query.value === '' && category.value === '' && country.value === '' && page.value === 1
}

const resetFilters = () => {
  query.value = ''
  category.value = ''
  country.value = ''
  page.value = 1

  searchNews()
}
onBeforeMount(() => {
  searchNews()
})
</script>
<template>
  <div class="news-search">
    <div class="filters">
      <div class="input-container">
        <input v-model="query" type="search" placeholder="Search for news" />
      </div>
      <div class="select-container">
        <select v-model="country">
          <option value="">All Countries</option>
          <option
            v-for="(countryKey, index) in countriesObject"
            :key="`${index}_${countryKey.code}`"
            :value="countryKey.code"
          >
            {{ countryKey.name }}
          </option>
        </select>
      </div>
      <div class="select-container">
        <select v-model="category">
          <option value="">All Categories</option>
          <option
            v-for="(categories, index) in newsCategories"
            :key="`${index}_${categories.code}`"
            :value="categories.code"
          >
            {{ categories.name }}
          </option>
        </select>
      </div>
      <div class="button-container">
        <button type="searchButton" @click="searchNews">Search</button>
        <button type="resetButton" :disabled="checkEmptyParams()" @click="resetFilters">
          Reset
        </button>
      </div>
    </div>
    <div v-if="totalResults > 0" class="pagination">
      <span><button @click="prevPage" :disabled="page === 1">Previous</button></span>
      <span>Page </span>
      <span style="color: #0fbf61; font-weight: 600">{{ page }}</span>
      <span>
        <button @click="nextPage">Next</button>
      </span>
    </div>
    <div class="total-results">
      <p>Total results -</p>
      <p style="color: #0fbf61; font-weight: 600">{{ totalResults }}</p>
      <p>articles found</p>
    </div>
  </div>
  <main>
    <div v-if="!error && !loading && getStore?.state.news?.length > 0" class="card-wrapper">
      <div
        v-for="(articles, index) in getStore.state.news"
        :key="`map_${articles.source?.name}_${index}`"
        :class="`card-container`"
      >
        <news-card :card-data="articles" :card-index="index"></news-card>
      </div>
    </div>
    <div v-else-if="loading" class="wait-or-error">
      <h2>...Loading</h2>
    </div>
    <div v-else class="wait-or-error">
      <img src="../assets//images/error-icon.svg" alt="Error_Icon" class="error-icon" />
      <h2>No articles found</h2>
      <h2>Please try refining your search</h2>
    </div>
  </main>
</template>

<style scoped>
.filters {
  display: grid;
  gap: 20px;
  margin: 20px auto;
  width: 100%;
  max-width: 1200px;
  align-items: center;
}

.input-container,
.select-container,
.button-container {
  width: 100%;
}

.input-container {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
}

input[type='search'] {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #f9f9f9;
  color: #333333;
}

input[type='search']::placeholder {
  color: #888888;
}

.select-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
}
::after {
  font-size: 16px;
  color: #888;
  position: absolute;
  right: 16px;
  top: 50%;
  pointer-events: none;
}

select {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  color: #151d41;
  background-color: #f9f9f9;
  border-radius: 4px;
  cursor: pointer;
}

select option[disabled] {
  color: #888;
}

.button-container {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
}

button[type='searchButton'] {
  width: 40%;
  padding: 16px 16px;
  background-color: #0fbf61;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  color: #fff;
}
button[type='searchButton']:hover {
  transition: transform 0.5s ease;
  transform: scale(1.05);
  cursor: pointer;
}
button[type='resetButton'] {
  width: 40%;
  padding: 16px 16px;
  background-color: #151d41;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  color: #fff;
}
button[type='resetButton']:hover {
  transition: transform 0.5s ease;
  transform: scale(1.05);
  cursor: pointer;
}
button[type='resetButton']:disabled {
  background-color: #888;
  cursor: not-allowed;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px;
}
.pagination span {
  display: flex;
  align-items: center;
}
.pagination button {
  padding: 8px 15px;
  font-size: 16px;
  color: #ffffff;
  background-color: #151d41;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.pagination button:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}
.pagination button:hover:not(:disabled) {
  background-color: #151d41;
}

.total-results {
  display: flex;
  color: #151d41;
  font-size: 18px;
  font-weight: 800;
  margin: 16px auto;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  margin: 20px auto;
  max-width: 1280px;
}
.card-container {
  flex: 0 1 calc(33.333% - 20px);
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: left;
  transition: transform 0.3s ease;
  background: rgb(21, 29, 65, 0.96);
  color: #fff;
  box-shadow: 8px 4px 8px #0fbf61;
}

.wait-or-error {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 64px 0px;
  color: #151d41;
  font-weight: 500;
}

.error-icon {
  width: 64px;
  height: auto;
  padding-bottom: 24px;
}

@media (min-width: 1024px) {
  .filters {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
  .card-wrapper {
    justify-content: center;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .filters {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .card-wrapper {
    justify-content: center;
  }
}
@media (max-width: 768px) {
  .pagination {
    flex-direction: column;
    gap: 5px;
  }
  .pagination button {
    font-size: 14px;
    width: 100%;
  }
  .pagination span {
    justify-content: center;
  }
  select {
    font-size: 14px;
    padding: 10px 12px;
  }
  button[type='button'] {
    font-size: 14px;
    padding: 10px 12px;
  }
  input[type='text'],
  input[type='search'] {
    font-size: 14px;
    padding: 10px 12px;
  }
  .button-container {
    width: 100%;
    text-align: center;
  }
  .card-wrapper {
    justify-content: center;
  }
}
@media (max-width: 767px) {
  .filters {
    grid-template-columns: 1fr;
  }
}
</style>
