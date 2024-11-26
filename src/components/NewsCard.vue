<script setup>
import { dateConverter } from '@/utils'

defineProps({
  cardData: {
    type: Object,
    required: true,
  },
})

const openNewsDetails = (detailsURL) => {
  window.open(detailsURL)
  return
}
</script>

<template>
  <div>
    <img :src="cardData?.urlToImage" alt="Title_Image" loading="lazy" />
    <a href="#" @click="openNewsDetails(cardData?.url)">
      <h2>
        {{ cardData?.title }}
      </h2>
    </a>
    <span class="author tooltip">
      <h4 class="title">Author</h4>
      <h4 class="author-text">
        - {{ cardData?.author }}
        <p class="tooltiptext">{{ cardData?.author }}</p>
      </h4>
    </span>
    <span>
      <p>{{ cardData?.description }}</p>
    </span>
    <span>
      <p class="published-text">
        {{
          dateConverter(cardData?.publishedAt) ||
          cardData?.publishedAt ||
          'DD-MMM-YYYY at HH:MM AM/PM'
        }}
      </p>
    </span>
  </div>
</template>

<style scoped>
.card-container img {
  width: auto;
  max-width: 364px;
  height: 256px;
  object-fit: cover;
  border-radius: 5px;
}

.card-container a {
  text-decoration: none;
  color: #fff;
}

.card-container h2 {
  font-size: 24px;
  margin-bottom: 8px;
}

.card-container .author {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;
  padding: 4px 0px;
}

.card-container .author .title {
  color: #0fbf61;
}

.card-container .author .author-text {
  max-width: 256px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.card-container p {
  font-size: 14px;
  margin: 8px 0 0;
}

.card-container .published-text {
  margin-top: 18px;
  font-size: 14px;
  color: #0fbf61;
  font-weight: 600;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: min-content;
  background-color: #0fbf61;
  color: #fff;
  text-align: center;
  padding: 8px 12px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
