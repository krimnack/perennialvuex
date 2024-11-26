<script setup>
import { RouterView } from 'vue-router'
import HeaderSection from './components/HeaderSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <HeaderSection />
  <RouterView />
  <FooterSection />
</template>
